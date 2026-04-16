# Home Workbench: Staged Workspace Pipeline

Goal: Replace brittle one-shot workspace fill with a staged, deterministic pipeline that favors reliability over compatibility.

## Findings

| Area | Finding |
|---|---|
| Generation flow | A one-shot workspace fill is the brittle point and should be replaced by explicit stages. |
| Target architecture | The requested stages are template selection, text generation, hydration, and actions. |
| Input handling | Near-miss JSON should be normalized deterministically rather than handled ad hoc. |
| Failure behavior | Failures must stay loud and observable. |
| Recovery | Rebuild and retry flows must remain first-class. |
| Product posture | Reliability takes priority over compatibility. |
| Scope guardrail | Freeform layout generation is out of scope. |
| Safety guardrail | There must be no silent fallback to markdown-as-workspace. |

## Plan

| Step | Plan | Expected outcome |
|---|---|---|
| 1 | Define a staged pipeline contract: template selection -> text generation -> hydration -> actions. | Clear handoffs and isolated failure points. |
| 2 | Restrict generation to approved templates only. | Deterministic structure with no freeform layout generation. |
| 3 | Add deterministic normalization for near-miss JSON before hydration. | Recoverable input cleanup without hidden behavior drift. |
| 4 | Make hydration fail loudly on invalid or incomplete structured data. | Observable failures instead of silent degradation. |
| 5 | Keep rebuild and retry as explicit flows that re-enter the staged pipeline. | Reliable operator recovery without one-shot fragility. |
| 6 | Remove any markdown-as-workspace fallback path. | No silent fallback behavior. |
| 7 | Add observability at each stage with explicit stage-level errors and outcomes. | Fast diagnosis and bounded recovery. |

## Tasks

| Priority | Task | Done when |
|---|---|---|
| P0 | Define the stage boundaries and inputs/outputs for template selection, text generation, hydration, and actions. | Each stage has a clear contract and failure surface. |
| P0 | Enforce template-only workspace creation. | Freeform layout generation is impossible in the main path. |
| P0 | Implement deterministic normalization for near-miss JSON. | Repeated runs on the same near-miss input produce the same normalized output. |
| P0 | Make invalid structured data fail loudly before or during hydration. | Errors are visible and no markdown workspace is produced silently. |
| P1 | Preserve rebuild and retry entry points against the staged pipeline. | Operators can rebuild or retry without bypassing stage controls. |
| P1 | Add stage-level observability for success, failure, and retry outcomes. | Each failure is attributable to a specific stage. |
| P1 | Remove or block silent markdown-as-workspace fallback behavior. | The fallback path cannot trigger unnoticed. |

## Risks

| Risk | Why it matters | Mitigation |
|---|---|---|
| Over-normalization | Deterministic cleanup could mask malformed input if it becomes too permissive. | Keep normalization narrowly scoped to near-miss JSON only and fail outside those rules. |
| Hidden compatibility regressions | Reliability-first changes may break older assumptions. | Accept compatibility loss where needed and keep failures explicit. |
| Stage boundary ambiguity | Blurry ownership between stages can recreate one-shot brittleness. | Define strict contracts and reject out-of-stage responsibilities. |
| Retry loops without insight | Retries can waste time if observability is weak. | Emit stage-specific failure signals and preserve rebuild/retry context. |
| Fallback reintroduction | A convenience shortcut could silently restore markdown-as-workspace behavior. | Remove the path entirely or guard it with a hard failure. |

## Recommendation

Adopt the staged pipeline as the only supported creation path, keep normalization deterministic and narrow, and prefer explicit hard failures over compatibility-preserving ambiguity.
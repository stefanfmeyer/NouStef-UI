import type { Session } from '@noustef-ui/protocol';

export interface SessionVisibilityDecision {
  hidden: boolean;
  reason?: string;
}

interface SessionFilterRule {
  id: string;
  reason: string;
  pattern: RegExp;
  fields: Array<'id' | 'runtimeSessionId' | 'title' | 'summary'>;
}

const sessionFilterRules: SessionFilterRule[] = [
  {
    id: 'explicit-test-markers',
    reason: 'Synthetic test or integration marker detected in the session metadata.',
    pattern: /(^|[\W_])(fixture|playwright|vitest|jest|cypress|integration|e2e|test-run|qa-run)(?=$|[\W_])/i,
    fields: ['id', 'runtimeSessionId', 'title', 'summary']
  },
  {
    id: 'bridge-smoke-prompts',
    reason: 'Known bridge smoke-test prompt detected in the session metadata.',
    pattern: /\b(browser bridge persistence smoke|stream this bridge reply|you are hermes ui bridge v1)\b/i,
    fields: ['title', 'summary']
  },
  {
    id: 'bridge-execution-notes',
    reason: 'Bridge-generated execution note session detected in the session metadata.',
    pattern: /\bbridge execution note\b/i,
    fields: ['title', 'summary']
  }
];

export function classifySessionVisibility(session: Pick<Session, 'id' | 'runtimeSessionId' | 'title' | 'summary'>): SessionVisibilityDecision {
  for (const rule of sessionFilterRules) {
    const matches = rule.fields.some((field) => {
      const value = session[field];
      return typeof value === 'string' && rule.pattern.test(value);
    });

    if (matches) {
      return {
        hidden: true,
        reason: rule.reason
      };
    }
  }

  return {
    hidden: false
  };
}

export function getSyntheticSessionFilterRules() {
  return sessionFilterRules.map((rule) => ({
    id: rule.id,
    reason: rule.reason,
    pattern: rule.pattern.source,
    fields: rule.fields
  }));
}

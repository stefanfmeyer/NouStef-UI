// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { classifySessionVisibility } from './session-filter-rules';
describe('classifySessionVisibility', () => {
    it('hides explicit synthetic session ids that use underscores', () => {
        expect(classifySessionVisibility({
            id: 'runtime-20260408_160439_fixture_04',
            runtimeSessionId: '20260408_160439_fixture_04',
            title: 'Bridge reset planning session',
            summary: 'Fixture-only session'
        })).toEqual({
            hidden: true,
            reason: 'Synthetic test or integration marker detected in the session metadata.'
        });
    });
    it('hides known bridge smoke prompts even when the id is otherwise normal', () => {
        expect(classifySessionVisibility({
            id: 'runtime-20260408_160339_session_03',
            runtimeSessionId: '20260408_160339_session_03',
            title: 'Browser bridge persistence smoke',
            summary: 'Most recent smoke prompt'
        })).toEqual({
            hidden: true,
            reason: 'Known bridge smoke-test prompt detected in the session metadata.'
        });
    });
    it('hides bridge-generated execution-note sessions from normal browsing', () => {
        expect(classifySessionVisibility({
            id: 'runtime-20260408_200655_1f0738',
            runtimeSessionId: '20260408_200655_1f0738',
            title: 'Check my unread email. Bridge execution note: Use only the active profile.',
            summary: 'Bridge execution note: Return only the final assistant answer.'
        })).toEqual({
            hidden: true,
            reason: 'Bridge-generated execution note session detected in the session metadata.'
        });
    });
});

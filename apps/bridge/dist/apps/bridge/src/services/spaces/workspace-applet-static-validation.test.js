// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { analyzeWorkspaceAppletModule } from './workspace-applet-static-validation';
describe('workspace applet static validation', () => {
    it('tracks collection, entity, tab, and patch usage from the stable workspace SDK surface', () => {
        const source = `import {
  Button,
  DetailPanel,
  Heading,
  Stack,
  Table,
  Tabs,
  Tab,
  Text,
  defineApplet,
  patchWorkspace,
  runPromptAction,
  useCollection,
  useEntity,
  useSelection,
  useTabState,
  useWorkspace
} from 'workspace-applet-sdk';

export default defineApplet(() => {
  useWorkspace();
  useCollection('primary');
  useEntity('email-1');
  useSelection('primary');
  useTabState('tab-overview');
  patchWorkspace([
    { op: 'set_selection', collectionId: 'primary', entityIds: ['email-1'] },
    { op: 'set_action_state', actionId: 'refresh-space', state: { status: 'running', message: 'Refreshing' } }
  ]);

  return (
    <Stack>
      <Heading>Inbox summary</Heading>
      <Tabs>
        <Tab id="tab-overview" label="Overview">
          <Text>Unread email triage</Text>
          <Table collectionId="primary" fieldKeys={['sender']} />
          <DetailPanel collectionId="primary" fieldKeys={['sender']} />
          <Button action={runPromptAction('refresh-space')}>Refresh</Button>
        </Tab>
      </Tabs>
    </Stack>
  );
});`;
        const result = analyzeWorkspaceAppletModule(source, {
            fileName: 'applet.tsx',
            kind: 'source'
        });
        expect(result.ok).toBe(true);
        expect(result.collectionIds).toEqual(['primary']);
        expect(result.entityIds).toEqual(['email-1']);
        expect(result.tabIds).toEqual(['tab-overview']);
        expect(result.patchUsages.map((usage) => usage.op)).toEqual(['set_selection', 'set_action_state']);
        expect(result.features.usesPatching).toBe(true);
        expect(result.usedHooks).toEqual(expect.arrayContaining(['useCollection', 'useEntity', 'useSelection', 'useTabState', 'useWorkspace']));
    });
    it('fails when collection or tab ids are not literal in the new SDK contract', () => {
        const source = `import { Table, Tabs, Tab, defineApplet, patchWorkspace, useCollection } from 'workspace-applet-sdk';

const dynamicCollectionId = 'primary';
const dynamicTabId = 'tab-overview';

export default defineApplet(() => {
  useCollection(dynamicCollectionId);
  patchWorkspace([{ op: 'remove_tab', tabId: dynamicTabId }]);
  return (
    <Tabs>
      <Tab id={dynamicTabId} label="Overview">
        <Table collectionId={dynamicCollectionId} />
      </Tab>
    </Tabs>
  );
});`;
        const result = analyzeWorkspaceAppletModule(source, {
            fileName: 'applet.tsx',
            kind: 'source'
        });
        expect(result.ok).toBe(false);
        expect(result.errors.join(' ')).toContain('literal collection id');
        expect(result.errors.join(' ')).toContain('literal tabId');
    });
});

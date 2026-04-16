// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { analyzeRecipeAppletModule } from './recipe-applet-static-validation';
describe('recipe applet static validation', () => {
    it('tracks collection, entity, tab, and patch usage from the stable recipe SDK surface', () => {
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
  patchRecipe,
  runPromptAction,
  useCollection,
  useEntity,
  useSelection,
  useTabState,
  useRecipe
} from 'recipe-applet-sdk';

export default defineApplet(() => {
  useRecipe();
  useCollection('primary');
  useEntity('email-1');
  useSelection('primary');
  useTabState('tab-overview');
  patchRecipe([
    { op: 'set_selection', collectionId: 'primary', entityIds: ['email-1'] },
    { op: 'set_action_state', actionId: 'refresh-recipe', state: { status: 'running', message: 'Refreshing' } }
  ]);

  return (
    <Stack>
      <Heading>Inbox summary</Heading>
      <Tabs>
        <Tab id="tab-overview" label="Overview">
          <Text>Unread email triage</Text>
          <Table collectionId="primary" fieldKeys={['sender']} />
          <DetailPanel collectionId="primary" fieldKeys={['sender']} />
          <Button action={runPromptAction('refresh-recipe')}>Refresh</Button>
        </Tab>
      </Tabs>
    </Stack>
  );
});`;
        const result = analyzeRecipeAppletModule(source, {
            fileName: 'applet.tsx',
            kind: 'source'
        });
        expect(result.ok).toBe(true);
        expect(result.collectionIds).toEqual(['primary']);
        expect(result.entityIds).toEqual(['email-1']);
        expect(result.tabIds).toEqual(['tab-overview']);
        expect(result.patchUsages.map((usage) => usage.op)).toEqual(['set_selection', 'set_action_state']);
        expect(result.features.usesPatching).toBe(true);
        expect(result.usedHooks).toEqual(expect.arrayContaining(['useCollection', 'useEntity', 'useSelection', 'useTabState', 'useRecipe']));
    });
    it('fails when collection or tab ids are not literal in the new SDK contract', () => {
        const source = `import { Table, Tabs, Tab, defineApplet, patchRecipe, useCollection } from 'recipe-applet-sdk';

const dynamicCollectionId = 'primary';
const dynamicTabId = 'tab-overview';

export default defineApplet(() => {
  useCollection(dynamicCollectionId);
  patchRecipe([{ op: 'remove_tab', tabId: dynamicTabId }]);
  return (
    <Tabs>
      <Tab id={dynamicTabId} label="Overview">
        <Table collectionId={dynamicCollectionId} />
      </Tab>
    </Tabs>
  );
});`;
        const result = analyzeRecipeAppletModule(source, {
            fileName: 'applet.tsx',
            kind: 'source'
        });
        expect(result.ok).toBe(false);
        expect(result.errors.join(' ')).toContain('literal collection id');
        expect(result.errors.join(' ')).toContain('literal tabId');
    });
});

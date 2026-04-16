function escapeTemplateLiteral(value) {
    return value.replace(/\\/gu, '\\\\').replace(/`/gu, '\\`').replace(/\$\{/gu, '\\${');
}
function capabilityAssertions(capabilities) {
    return capabilities
        .map((capability) => {
        const capabilityId = escapeTemplateLiteral(capability.id);
        return `  {
    name: 'declares capability ${capabilityId}',
    run({ manifest }) {
      expectCapability(manifest, '${capabilityId}');
    }
  }`;
    })
        .join(',\n');
}
function actionAssertions(actionIds) {
    return actionIds
        .map((actionId) => {
        const escapedActionId = escapeTemplateLiteral(actionId);
        return `  {
    name: 'declares action ${escapedActionId}',
    run({ manifest }) {
      expectActionDeclared(manifest, '${escapedActionId}');
    }
  }`;
    })
        .join(',\n');
}
export function buildWorkspaceAppletGeneratedTests(manifest) {
    const dynamicCases = [
        `  {
    name: 'renders at least one node',
    run({ renderTree }) {
      assert(Array.isArray(renderTree.root) && renderTree.root.length > 0, 'Workspace applet must render at least one node.');
    }
  }`
    ];
    if (manifest.usesTabs) {
        dynamicCases.push(`  {
    name: 'renders tabs',
    run({ renderTree }) {
      expectNodeKind(renderTree, 'tabs');
    }
  }`);
    }
    if (manifest.usesPagination) {
        dynamicCases.push(`  {
    name: 'renders a paginator',
    run({ renderTree }) {
      expectNodeKind(renderTree, 'paginator');
    }
  }`);
    }
    if (manifest.usesImages) {
        dynamicCases.push(`  {
    name: 'renders an image node',
    run({ renderTree }) {
      expectNodeKind(renderTree, 'image');
    }
  }`);
    }
    const actionCases = actionAssertions(manifest.actions.map((action) => action.id));
    if (actionCases) {
        dynamicCases.push(actionCases);
    }
    const capabilityCases = capabilityAssertions(manifest.requestedCapabilities);
    if (capabilityCases) {
        dynamicCases.push(capabilityCases);
    }
    return {
        kind: 'applet_test_source',
        schemaVersion: 'space_applet_test_source/v1',
        source: `import { assert, defineAppletTests, expectActionDeclared, expectCapability, expectNodeKind } from 'workspace-applet-test-sdk';

export default defineAppletTests(() => [
${dynamicCases.join(',\n')}
]);
`
    };
}

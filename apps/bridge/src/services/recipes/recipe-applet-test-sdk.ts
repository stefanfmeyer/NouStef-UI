type RecipeAppletNode = {
  kind: string;
  children?: RecipeAppletNode[];
  tabs?: Array<{
    id: string;
    label: string;
    children: RecipeAppletNode[];
  }>;
  actionId?: string;
  actionIds?: string[];
};

type RecipeAppletRenderTree = {
  kind: 'applet_render_tree';
  schemaVersion: string;
  root: RecipeAppletNode[];
};

type RecipeAppletManifest = {
  title: string;
  actions?: Array<{ id: string }>;
  requestedCapabilities?: Array<{ id: string }>;
};

export interface RecipeAppletGeneratedTestCaseContext {
  renderTree: RecipeAppletRenderTree;
  manifest: RecipeAppletManifest;
  context: unknown;
}

export interface RecipeAppletGeneratedTestCase {
  name: string;
  run: (context: RecipeAppletGeneratedTestCaseContext) => void | Promise<void>;
}

export type RecipeAppletGeneratedTestsFactory = (
  context: RecipeAppletGeneratedTestCaseContext
) => RecipeAppletGeneratedTestCase[] | Promise<RecipeAppletGeneratedTestCase[]>;

function visitNodes(nodes: RecipeAppletNode[], visitor: (node: RecipeAppletNode) => void) {
  for (const node of nodes) {
    visitor(node);

    switch (node.kind) {
      case 'stack':
      case 'inline':
      case 'grid':
      case 'card':
        visitNodes(node.children ?? [], visitor);
        break;
      case 'tabs':
        for (const tab of node.tabs ?? []) {
          visitNodes(tab.children, visitor);
        }
        break;
      case 'button_group':
        visitNodes(node.children ?? [], visitor);
        break;
      default:
        break;
    }
  }
}

export function defineAppletTests(factory: RecipeAppletGeneratedTestsFactory) {
  return factory;
}

export function assert(condition: unknown, message = 'Assertion failed.'): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function expectNodeKind(renderTree: RecipeAppletRenderTree, kind: string) {
  let found = false;
  visitNodes(renderTree.root, (node) => {
    if (node.kind === kind) {
      found = true;
    }
  });

  assert(found, `Expected applet render tree to contain a ${kind} node.`);
}

export function expectActionDeclared(manifest: RecipeAppletManifest, actionId: string) {
  const actionIds = new Set((manifest.actions ?? []).map((action) => action.id));
  assert(actionIds.has(actionId), `Expected manifest ${manifest.title} to declare action ${actionId}.`);
}

export function expectCapability(manifest: RecipeAppletManifest, capabilityId: string) {
  const capabilityIds = new Set((manifest.requestedCapabilities ?? []).map((capability) => capability.id));
  assert(capabilityIds.has(capabilityId), `Expected manifest ${manifest.title} to declare capability ${capabilityId}.`);
}

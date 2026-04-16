import type {
  RecipeAppletNode,
  RecipeAppletRenderTree
} from '@hermes-recipes/protocol';

export function visitRecipeAppletNodes(nodes: RecipeAppletNode[], visitor: (node: RecipeAppletNode) => void) {
  for (const node of nodes) {
    visitor(node);

    switch (node.kind) {
      case 'stack':
      case 'inline':
      case 'grid':
      case 'card':
        visitRecipeAppletNodes(node.children, visitor);
        break;
      case 'tabs':
        for (const tab of node.tabs) {
          visitRecipeAppletNodes(tab.children, visitor);
        }
        break;
      case 'button_group':
        visitRecipeAppletNodes(node.children, visitor);
        break;
      default:
        break;
    }
  }
}

export function collectRecipeAppletNodeKinds(tree: RecipeAppletRenderTree) {
  const kinds: RecipeAppletNode['kind'][] = [];
  visitRecipeAppletNodes(tree.root, (node) => {
    kinds.push(node.kind);
  });
  return kinds;
}

export function collectRecipeAppletActionIds(tree: RecipeAppletRenderTree) {
  const actionIds = new Set<string>();
  visitRecipeAppletNodes(tree.root, (node) => {
    switch (node.kind) {
      case 'button':
        actionIds.add(node.actionId);
        break;
      case 'button_group':
        node.children.forEach((child) => actionIds.add(child.actionId));
        break;
      case 'card':
      case 'table':
      case 'list':
      case 'detail_panel':
      case 'callout':
        for (const actionId of node.actionIds ?? []) {
          actionIds.add(actionId);
        }
        break;
      default:
        break;
    }
  });
  return [...actionIds];
}

export function validateRecipeAppletSmallPane(tree: RecipeAppletRenderTree) {
  const errors: string[] = [];

  visitRecipeAppletNodes(tree.root, (node) => {
    switch (node.kind) {
      case 'grid':
        if ((node.columns ?? 1) > 2) {
          errors.push(`Grid ${node.id} exceeds the 2-column compact-pane limit.`);
        }
        break;
      case 'table':
      case 'list':
      case 'paginator':
        if ((node.pageSize ?? 6) > 6) {
          errors.push(`${node.kind} ${node.id} exceeds the compact page-size limit.`);
        }
        break;
      case 'image':
        if ((node.maxHeight ?? 180) > 240) {
          errors.push(`Image ${node.id} exceeds the compact max-height limit.`);
        }
        break;
      case 'button_group':
        if (node.children.length > 3) {
          errors.push(`Button group ${node.id} exceeds the compact action density limit.`);
        }
        break;
      default:
        break;
    }
  });

  return errors;
}

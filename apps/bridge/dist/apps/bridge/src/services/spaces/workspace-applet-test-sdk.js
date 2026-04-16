function visitNodes(nodes, visitor) {
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
export function defineAppletTests(factory) {
    return factory;
}
export function assert(condition, message = 'Assertion failed.') {
    if (!condition) {
        throw new Error(message);
    }
}
export function expectNodeKind(renderTree, kind) {
    let found = false;
    visitNodes(renderTree.root, (node) => {
        if (node.kind === kind) {
            found = true;
        }
    });
    assert(found, `Expected applet render tree to contain a ${kind} node.`);
}
export function expectActionDeclared(manifest, actionId) {
    const actionIds = new Set((manifest.actions ?? []).map((action) => action.id));
    assert(actionIds.has(actionId), `Expected manifest ${manifest.title} to declare action ${actionId}.`);
}
export function expectCapability(manifest, capabilityId) {
    const capabilityIds = new Set((manifest.requestedCapabilities ?? []).map((capability) => capability.id));
    assert(capabilityIds.has(capabilityId), `Expected manifest ${manifest.title} to declare capability ${capabilityId}.`);
}

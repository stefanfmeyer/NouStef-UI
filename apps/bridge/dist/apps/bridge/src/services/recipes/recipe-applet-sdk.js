let currentContext = null;
let currentNodeCounter = 0;
function withRenderContext(context, run) {
    const previousContext = currentContext;
    const previousCounter = currentNodeCounter;
    currentContext = context;
    currentNodeCounter = 0;
    try {
        return run();
    }
    finally {
        currentContext = previousContext;
        currentNodeCounter = previousCounter;
    }
}
function nextNodeId(prefix, explicitId) {
    if (explicitId && explicitId.trim().length > 0) {
        return explicitId.trim();
    }
    currentNodeCounter += 1;
    return `${prefix}-${currentNodeCounter}`;
}
function normalizeText(value) {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number') {
        return String(value);
    }
    return '';
}
function flattenChildren(children) {
    if (Array.isArray(children)) {
        return children.flatMap((child) => flattenChildren(child));
    }
    return [children];
}
function normalizeActionId(value) {
    if (typeof value === 'string') {
        return value;
    }
    if (value && typeof value.actionId === 'string') {
        return value.actionId;
    }
    return '';
}
function normalizeChildNodes(children) {
    const nodes = [];
    for (const child of flattenChildren(children)) {
        if (child === null || child === undefined || child === false) {
            continue;
        }
        if (typeof child === 'string' || typeof child === 'number') {
            const text = normalizeText(child).trim();
            if (!text) {
                continue;
            }
            nodes.push({
                id: nextNodeId('text'),
                kind: 'text',
                text,
                tone: 'default'
            });
            continue;
        }
        if (typeof child === 'object' && '__tab' in child) {
            continue;
        }
        nodes.push(child);
    }
    return nodes;
}
function normalizeTabChildren(children) {
    return flattenChildren(children).flatMap((child) => {
        if (child && typeof child === 'object' && '__tab' in child) {
            return [
                {
                    id: child.id,
                    label: child.label,
                    children: child.children
                }
            ];
        }
        return [];
    });
}
function normalizeButtonChildren(children) {
    return normalizeChildNodes(children).flatMap((child) => (child.kind === 'button' ? [child] : []));
}
function childText(children) {
    return flattenChildren(children)
        .map((child) => (typeof child === 'string' || typeof child === 'number' ? normalizeText(child) : ''))
        .join('')
        .trim();
}
export function defineApplet(render) {
    return {
        render(context) {
            return withRenderContext(context, () => normalizeChildNodes(render(context)));
        }
    };
}
export function useRecipe() {
    if (!currentContext) {
        throw new Error('useRecipe() can only be used while rendering an applet.');
    }
    return currentContext;
}
export function useRecipeData() {
    return useRecipe();
}
export function useAppletState(key, initialValue) {
    return {
        key,
        initialValue
    };
}
export function useCollection(collectionId) {
    return {
        collectionId
    };
}
export function useEntity(entityId) {
    return {
        entityId
    };
}
export function useSelection(collectionId) {
    return {
        collectionId
    };
}
export function usePagination(collectionId, options = {}) {
    return {
        collectionId,
        pageSize: options.pageSize ?? 6
    };
}
export function useFilters(collectionId, fieldKeys = [], placeholder) {
    return {
        collectionId,
        fieldKeys,
        placeholder
    };
}
export function useFormState(formId, fields = []) {
    return {
        formId,
        fields
    };
}
export function useTabState(tabId) {
    return {
        tabId
    };
}
export function runPromptAction(actionId) {
    return { actionId };
}
export function runPrompt(actionId) {
    return { actionId };
}
export function callApprovedApi(actionId) {
    return { actionId };
}
export function refreshRecipe(actionId = 'refresh-recipe') {
    return { actionId };
}
export function updateLocalState(patch) {
    return patch;
}
export function patchRecipe(operations) {
    return operations;
}
export function openLink(actionId) {
    return { actionId };
}
export function confirmAction(actionId) {
    return { actionId };
}
export function Stack(props) {
    return {
        id: nextNodeId('stack', props.id),
        kind: 'stack',
        gap: props.gap ?? 3,
        children: normalizeChildNodes(props.children ?? [])
    };
}
export function Inline(props) {
    return {
        id: nextNodeId('inline', props.id),
        kind: 'inline',
        gap: props.gap ?? 2,
        wrap: props.wrap ?? true,
        children: normalizeChildNodes(props.children ?? [])
    };
}
export function Grid(props) {
    return {
        id: nextNodeId('grid', props.id),
        kind: 'grid',
        columns: props.columns ?? 1,
        gap: props.gap ?? 3,
        children: normalizeChildNodes(props.children ?? [])
    };
}
export function Card(props) {
    return {
        id: nextNodeId('card', props.id),
        kind: 'card',
        title: props.title,
        subtitle: props.subtitle,
        eyebrow: props.eyebrow,
        tone: props.tone ?? 'neutral',
        actionIds: props.actionIds ?? [],
        children: normalizeChildNodes(props.children ?? [])
    };
}
export function Stat(props) {
    return {
        id: nextNodeId('stat', props.id),
        kind: 'stat',
        label: props.label,
        value: normalizeText(props.value),
        helpText: props.helpText,
        tone: props.tone ?? 'neutral'
    };
}
export function Badge(props) {
    return {
        id: nextNodeId('badge', props.id),
        kind: 'badge',
        label: props.label ?? (childText(props.children ?? []) || 'Badge'),
        tone: props.tone ?? 'neutral'
    };
}
export function Heading(props) {
    return {
        id: nextNodeId('heading', props.id),
        kind: 'heading',
        level: props.level ?? 2,
        text: props.text ?? (childText(props.children ?? []) || 'Heading')
    };
}
export function Text(props) {
    return {
        id: nextNodeId('text', props.id),
        kind: 'text',
        text: props.text ?? childText(props.children ?? []),
        tone: props.tone ?? 'default',
        lineClamp: props.lineClamp
    };
}
export function Markdown(props) {
    return {
        id: nextNodeId('markdown', props.id),
        kind: 'markdown',
        markdown: props.markdown ?? childText(props.children ?? [])
    };
}
export function Tab(props) {
    return {
        __tab: true,
        id: nextNodeId('tab', props.id),
        label: props.label,
        children: normalizeChildNodes(props.children ?? [])
    };
}
export function Tabs(props) {
    return {
        id: nextNodeId('tabs', props.id),
        kind: 'tabs',
        defaultTabId: props.defaultTabId,
        tabs: normalizeTabChildren(props.children ?? [])
    };
}
export function Table(props) {
    const datasetId = props.collectionId ?? props.datasetId ?? 'primary';
    return {
        id: nextNodeId('table', props.id),
        kind: 'table',
        datasetId,
        fieldKeys: props.fieldKeys ?? [],
        pageSize: props.pageSize ?? 6,
        actionIds: props.actionIds ?? [],
        emptyState: props.emptyState ?? {
            title: 'No rows',
            description: 'Nothing is available for this table yet.'
        }
    };
}
export function List(props) {
    const datasetId = props.collectionId ?? props.datasetId ?? 'primary';
    return {
        id: nextNodeId('list', props.id),
        kind: 'list',
        datasetId,
        fieldKeys: props.fieldKeys ?? [],
        pageSize: props.pageSize ?? 6,
        actionIds: props.actionIds ?? [],
        emptyState: props.emptyState ?? {
            title: 'No items',
            description: 'Nothing is available for this list yet.'
        }
    };
}
export function DetailPanel(props) {
    const datasetId = props.collectionId ?? props.datasetId ?? 'primary';
    return {
        id: nextNodeId('detail-panel', props.id),
        kind: 'detail_panel',
        datasetId,
        source: props.source ?? 'selected',
        fieldKeys: props.fieldKeys ?? [],
        actionIds: props.actionIds ?? [],
        emptyState: props.emptyState ?? {
            title: 'Nothing selected',
            description: 'Choose an item to inspect the details.'
        }
    };
}
export function EmptyState(props) {
    return {
        id: nextNodeId('empty-state', props.id),
        kind: 'empty_state',
        title: props.title,
        description: props.description
    };
}
export function ErrorState(props) {
    return {
        id: nextNodeId('error-state', props.id),
        kind: 'error_state',
        title: props.title,
        description: props.description
    };
}
export function LoadingState(props) {
    return {
        id: nextNodeId('loading-state', props.id),
        kind: 'loading_state',
        title: props.title,
        description: props.description
    };
}
export function SkeletonSection(props) {
    return {
        id: nextNodeId('skeleton-section', props.id),
        kind: 'skeleton_section',
        title: props.title,
        description: props.description,
        lines: props.lines ?? 3
    };
}
export function Paginator(props) {
    const datasetId = props.collectionId ?? props.datasetId ?? 'primary';
    return {
        id: nextNodeId('paginator', props.id),
        kind: 'paginator',
        datasetId,
        pageSize: props.pageSize ?? 6
    };
}
export function Image(props) {
    return {
        id: nextNodeId('image', props.id),
        kind: 'image',
        src: props.src,
        alt: props.alt,
        fit: props.fit ?? 'cover',
        maxHeight: props.maxHeight ?? 180
    };
}
export function Button(props) {
    return {
        id: nextNodeId('button', props.id),
        kind: 'button',
        label: props.label ?? (childText(props.children ?? []) || 'Action'),
        actionId: props.actionId ?? (normalizeActionId(props.action) || 'action'),
        intent: props.intent ?? 'neutral'
    };
}
export function ButtonGroup(props) {
    return {
        id: nextNodeId('button-group', props.id),
        kind: 'button_group',
        children: normalizeButtonChildren(props.children ?? [])
    };
}
export function Input(props) {
    return {
        id: nextNodeId('input', props.id),
        kind: 'input',
        fieldKey: props.fieldKey,
        label: props.label,
        placeholder: props.placeholder
    };
}
export function Select(props) {
    return {
        id: nextNodeId('select', props.id),
        kind: 'select',
        fieldKey: props.fieldKey,
        label: props.label,
        placeholder: props.placeholder,
        options: props.options ?? []
    };
}
export function Textarea(props) {
    return {
        id: nextNodeId('textarea', props.id),
        kind: 'textarea',
        fieldKey: props.fieldKey,
        label: props.label,
        placeholder: props.placeholder
    };
}
export function Divider(props = {}) {
    return {
        id: nextNodeId('divider', props.id),
        kind: 'divider'
    };
}
export function Callout(props) {
    return {
        id: nextNodeId('callout', props.id),
        kind: 'callout',
        tone: props.tone ?? 'info',
        title: props.title,
        description: props.description,
        actionIds: props.actionIds ?? []
    };
}
export const Fragment = Symbol.for('recipe-applet-fragment');
export function jsx(type, props) {
    if (type === Fragment) {
        return props.children ?? [];
    }
    if (typeof type === 'function') {
        return type(props);
    }
    throw new Error('Recipe applets only support SDK components, not intrinsic HTML elements.');
}
export const jsxs = jsx;

export type RecipeAppletNodeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
export type RecipeAppletTextTone = 'default' | 'muted' | 'success' | 'warning' | 'danger' | 'accent';
export type RecipeAppletActionIntent = 'neutral' | 'primary' | 'secondary' | 'danger';
export type RecipeAppletRecordSource = 'selected' | 'first' | 'single';

export interface RecipeAppletRenderContext {
  recipe: {
    id: string;
    title: string;
    description?: string;
    status: string;
    metadata?: Record<string, unknown>;
  };
  summary: unknown | null;
  analysis: unknown | null;
  normalizedData: unknown | null;
  assistantContext: unknown | null;
  recipeModel: unknown | null;
}

type RenderablePrimitive = string | number;
type RenderableValue = RecipeAppletNode | RecipeAppletTabElement | RenderablePrimitive | null | false | undefined;
type RenderableChildren = RenderableValue | RenderableValue[];

export interface RecipeAppletNodeBase {
  id: string;
  kind: string;
}

export interface RecipeAppletTabNodeDescriptor {
  id: string;
  label: string;
  children: RecipeAppletNode[];
}

export interface RecipeAppletTabElement extends RecipeAppletTabNodeDescriptor {
  __tab: true;
}

export type RecipeAppletNode =
  | {
      id: string;
      kind: 'stack';
      gap: number;
      children: RecipeAppletNode[];
    }
  | {
      id: string;
      kind: 'inline';
      gap: number;
      wrap: boolean;
      children: RecipeAppletNode[];
    }
  | {
      id: string;
      kind: 'grid';
      columns: 1 | 2;
      gap: number;
      children: RecipeAppletNode[];
    }
  | {
      id: string;
      kind: 'card';
      title?: string;
      subtitle?: string;
      eyebrow?: string;
      tone: RecipeAppletNodeTone;
      actionIds: string[];
      children: RecipeAppletNode[];
    }
  | {
      id: string;
      kind: 'heading';
      level: 1 | 2 | 3;
      text: string;
    }
  | {
      id: string;
      kind: 'text';
      text: string;
      tone: RecipeAppletTextTone;
      lineClamp?: number;
    }
  | {
      id: string;
      kind: 'markdown';
      markdown: string;
    }
  | {
      id: string;
      kind: 'badge';
      label: string;
      tone: RecipeAppletNodeTone;
    }
  | {
      id: string;
      kind: 'stat';
      label: string;
      value: string;
      helpText?: string;
      tone: RecipeAppletNodeTone;
    }
  | {
      id: string;
      kind: 'tabs';
      defaultTabId?: string;
      tabs: RecipeAppletTabNodeDescriptor[];
    }
  | {
      id: string;
      kind: 'table';
      datasetId: string;
      fieldKeys: string[];
      pageSize: number;
      actionIds: string[];
      emptyState: {
        title: string;
        description: string;
      };
    }
  | {
      id: string;
      kind: 'list';
      datasetId: string;
      fieldKeys: string[];
      pageSize: number;
      actionIds: string[];
      emptyState: {
        title: string;
        description: string;
      };
    }
  | {
      id: string;
      kind: 'detail_panel';
      datasetId: string;
      source: RecipeAppletRecordSource;
      fieldKeys: string[];
      actionIds: string[];
      emptyState: {
        title: string;
        description: string;
      };
    }
  | {
      id: string;
      kind: 'paginator';
      datasetId: string;
      pageSize: number;
    }
  | {
      id: string;
      kind: 'image';
      src: string;
      alt: string;
      fit: 'cover' | 'contain';
      maxHeight: number;
    }
  | {
      id: string;
      kind: 'button';
      label: string;
      actionId: string;
      intent: RecipeAppletActionIntent;
    }
  | {
      id: string;
      kind: 'button_group';
      children: Array<Extract<RecipeAppletNode, { kind: 'button' }>>;
    }
  | {
      id: string;
      kind: 'input';
      fieldKey: string;
      label: string;
      placeholder?: string;
    }
  | {
      id: string;
      kind: 'select';
      fieldKey: string;
      label: string;
      placeholder?: string;
      options: Array<{ label: string; value: string }>;
    }
  | {
      id: string;
      kind: 'textarea';
      fieldKey: string;
      label: string;
      placeholder?: string;
    }
  | {
      id: string;
      kind: 'divider';
    }
  | {
      id: string;
      kind: 'callout';
      tone: RecipeAppletNodeTone;
      title: string;
      description: string;
      actionIds: string[];
    }
  | {
      id: string;
      kind: 'empty_state';
      title: string;
      description: string;
    }
  | {
      id: string;
      kind: 'error_state';
      title: string;
      description: string;
    }
  | {
      id: string;
      kind: 'loading_state';
      title: string;
      description: string;
    }
  | {
      id: string;
      kind: 'skeleton_section';
      title?: string;
      description?: string;
      lines: number;
    };

let currentContext: RecipeAppletRenderContext | null = null;
let currentNodeCounter = 0;

function withRenderContext<T>(context: RecipeAppletRenderContext, run: () => T) {
  const previousContext = currentContext;
  const previousCounter = currentNodeCounter;
  currentContext = context;
  currentNodeCounter = 0;
  try {
    return run();
  } finally {
    currentContext = previousContext;
    currentNodeCounter = previousCounter;
  }
}

function nextNodeId(prefix: string, explicitId?: string) {
  if (explicitId && explicitId.trim().length > 0) {
    return explicitId.trim();
  }

  currentNodeCounter += 1;
  return `${prefix}-${currentNodeCounter}`;
}

function normalizeText(value: unknown) {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return String(value);
  }
  return '';
}

function flattenChildren(children: RenderableChildren): RenderableValue[] {
  if (Array.isArray(children)) {
    return children.flatMap((child) => flattenChildren(child));
  }
  return [children];
}

function normalizeActionId(value: string | { actionId: string } | null | undefined) {
  if (typeof value === 'string') {
    return value;
  }
  if (value && typeof value.actionId === 'string') {
    return value.actionId;
  }
  return '';
}

function normalizeChildNodes(children: RenderableChildren): RecipeAppletNode[] {
  const nodes: RecipeAppletNode[] = [];

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

function normalizeTabChildren(children: RenderableChildren): RecipeAppletTabNodeDescriptor[] {
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

function normalizeButtonChildren(children: RenderableChildren) {
  return normalizeChildNodes(children).flatMap((child) => (child.kind === 'button' ? [child] : []));
}

function childText(children: RenderableChildren) {
  return flattenChildren(children)
    .map((child) => (typeof child === 'string' || typeof child === 'number' ? normalizeText(child) : ''))
    .join('')
    .trim();
}

export function defineApplet(render: (context: RecipeAppletRenderContext) => RenderableChildren) {
  return {
    render(context: RecipeAppletRenderContext) {
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

export function useAppletState<T>(key: string, initialValue: T) {
  return {
    key,
    initialValue
  };
}

export function useCollection(collectionId: string) {
  return {
    collectionId
  };
}

export function useEntity(entityId: string) {
  return {
    entityId
  };
}

export function useSelection(collectionId: string) {
  return {
    collectionId
  };
}

export function usePagination(collectionId: string, options: { pageSize?: number } = {}) {
  return {
    collectionId,
    pageSize: options.pageSize ?? 6
  };
}

export function useFilters(collectionId: string, fieldKeys: string[] = [], placeholder?: string) {
  return {
    collectionId,
    fieldKeys,
    placeholder
  };
}

export function useFormState(formId: string, fields: string[] = []) {
  return {
    formId,
    fields
  };
}

export function useTabState(tabId: string) {
  return {
    tabId
  };
}

export function runPromptAction(actionId: string) {
  return { actionId };
}

export function runPrompt(actionId: string) {
  return { actionId };
}

export function callApprovedApi(actionId: string) {
  return { actionId };
}

export function refreshRecipe(actionId = 'refresh-recipe') {
  return { actionId };
}

export function updateLocalState<T>(patch: T) {
  return patch;
}

export function patchRecipe<T>(operations: T) {
  return operations;
}

export function openLink(actionId: string) {
  return { actionId };
}

export function confirmAction(actionId: string) {
  return { actionId };
}

export function Stack(props: { id?: string; gap?: number; children?: RenderableChildren }): RecipeAppletNode {
  return {
    id: nextNodeId('stack', props.id),
    kind: 'stack',
    gap: props.gap ?? 3,
    children: normalizeChildNodes(props.children ?? [])
  };
}

export function Inline(props: { id?: string; gap?: number; wrap?: boolean; children?: RenderableChildren }): RecipeAppletNode {
  return {
    id: nextNodeId('inline', props.id),
    kind: 'inline',
    gap: props.gap ?? 2,
    wrap: props.wrap ?? true,
    children: normalizeChildNodes(props.children ?? [])
  };
}

export function Grid(props: { id?: string; columns?: 1 | 2; gap?: number; children?: RenderableChildren }): RecipeAppletNode {
  return {
    id: nextNodeId('grid', props.id),
    kind: 'grid',
    columns: props.columns ?? 1,
    gap: props.gap ?? 3,
    children: normalizeChildNodes(props.children ?? [])
  };
}

export function Card(props: {
  id?: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  tone?: RecipeAppletNodeTone;
  actionIds?: string[];
  children?: RenderableChildren;
}): RecipeAppletNode {
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

export function Stat(props: {
  id?: string;
  label: string;
  value: string | number;
  helpText?: string;
  tone?: RecipeAppletNodeTone;
}): RecipeAppletNode {
  return {
    id: nextNodeId('stat', props.id),
    kind: 'stat',
    label: props.label,
    value: normalizeText(props.value),
    helpText: props.helpText,
    tone: props.tone ?? 'neutral'
  };
}

export function Badge(props: { id?: string; label?: string; tone?: RecipeAppletNodeTone; children?: RenderableChildren }): RecipeAppletNode {
  return {
    id: nextNodeId('badge', props.id),
    kind: 'badge',
    label: props.label ?? (childText(props.children ?? []) || 'Badge'),
    tone: props.tone ?? 'neutral'
  };
}

export function Heading(props: { id?: string; level?: 1 | 2 | 3; text?: string; children?: RenderableChildren }): RecipeAppletNode {
  return {
    id: nextNodeId('heading', props.id),
    kind: 'heading',
    level: props.level ?? 2,
    text: props.text ?? (childText(props.children ?? []) || 'Heading')
  };
}

export function Text(props: {
  id?: string;
  text?: string;
  tone?: RecipeAppletTextTone;
  lineClamp?: number;
  children?: RenderableChildren;
}): RecipeAppletNode {
  return {
    id: nextNodeId('text', props.id),
    kind: 'text',
    text: props.text ?? childText(props.children ?? []),
    tone: props.tone ?? 'default',
    lineClamp: props.lineClamp
  };
}

export function Markdown(props: { id?: string; markdown?: string; children?: RenderableChildren }): RecipeAppletNode {
  return {
    id: nextNodeId('markdown', props.id),
    kind: 'markdown',
    markdown: props.markdown ?? childText(props.children ?? [])
  };
}

export function Tab(props: { id?: string; label: string; children?: RenderableChildren }): RecipeAppletTabElement {
  return {
    __tab: true,
    id: nextNodeId('tab', props.id),
    label: props.label,
    children: normalizeChildNodes(props.children ?? [])
  };
}

export function Tabs(props: { id?: string; defaultTabId?: string; children?: RenderableChildren }): RecipeAppletNode {
  return {
    id: nextNodeId('tabs', props.id),
    kind: 'tabs',
    defaultTabId: props.defaultTabId,
    tabs: normalizeTabChildren(props.children ?? [])
  };
}

export function Table(props: {
  id?: string;
  datasetId?: string;
  collectionId?: string;
  fieldKeys?: string[];
  pageSize?: number;
  actionIds?: string[];
  emptyState?: { title: string; description: string };
}): RecipeAppletNode {
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

export function List(props: {
  id?: string;
  datasetId?: string;
  collectionId?: string;
  fieldKeys?: string[];
  pageSize?: number;
  actionIds?: string[];
  emptyState?: { title: string; description: string };
}): RecipeAppletNode {
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

export function DetailPanel(props: {
  id?: string;
  datasetId?: string;
  collectionId?: string;
  source?: RecipeAppletRecordSource;
  fieldKeys?: string[];
  actionIds?: string[];
  emptyState?: { title: string; description: string };
}): RecipeAppletNode {
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

export function EmptyState(props: { id?: string; title: string; description: string }): RecipeAppletNode {
  return {
    id: nextNodeId('empty-state', props.id),
    kind: 'empty_state',
    title: props.title,
    description: props.description
  };
}

export function ErrorState(props: { id?: string; title: string; description: string }): RecipeAppletNode {
  return {
    id: nextNodeId('error-state', props.id),
    kind: 'error_state',
    title: props.title,
    description: props.description
  };
}

export function LoadingState(props: { id?: string; title: string; description: string }): RecipeAppletNode {
  return {
    id: nextNodeId('loading-state', props.id),
    kind: 'loading_state',
    title: props.title,
    description: props.description
  };
}

export function SkeletonSection(props: { id?: string; title?: string; description?: string; lines?: number }): RecipeAppletNode {
  return {
    id: nextNodeId('skeleton-section', props.id),
    kind: 'skeleton_section',
    title: props.title,
    description: props.description,
    lines: props.lines ?? 3
  };
}

export function Paginator(props: { id?: string; datasetId?: string; collectionId?: string; pageSize?: number }): RecipeAppletNode {
  const datasetId = props.collectionId ?? props.datasetId ?? 'primary';
  return {
    id: nextNodeId('paginator', props.id),
    kind: 'paginator',
    datasetId,
    pageSize: props.pageSize ?? 6
  };
}

export function Image(props: { id?: string; src: string; alt: string; fit?: 'cover' | 'contain'; maxHeight?: number }): RecipeAppletNode {
  return {
    id: nextNodeId('image', props.id),
    kind: 'image',
    src: props.src,
    alt: props.alt,
    fit: props.fit ?? 'cover',
    maxHeight: props.maxHeight ?? 180
  };
}

export function Button(props: {
  id?: string;
  label?: string;
  actionId?: string;
  action?: string | { actionId: string } | null;
  intent?: RecipeAppletActionIntent;
  children?: RenderableChildren;
}): RecipeAppletNode {
  return {
    id: nextNodeId('button', props.id),
    kind: 'button',
    label: props.label ?? (childText(props.children ?? []) || 'Action'),
    actionId: props.actionId ?? (normalizeActionId(props.action) || 'action'),
    intent: props.intent ?? 'neutral'
  };
}

export function ButtonGroup(props: { id?: string; children?: RenderableChildren }): RecipeAppletNode {
  return {
    id: nextNodeId('button-group', props.id),
    kind: 'button_group',
    children: normalizeButtonChildren(props.children ?? [])
  };
}

export function Input(props: { id?: string; fieldKey: string; label: string; placeholder?: string }): RecipeAppletNode {
  return {
    id: nextNodeId('input', props.id),
    kind: 'input',
    fieldKey: props.fieldKey,
    label: props.label,
    placeholder: props.placeholder
  };
}

export function Select(props: {
  id?: string;
  fieldKey: string;
  label: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
}): RecipeAppletNode {
  return {
    id: nextNodeId('select', props.id),
    kind: 'select',
    fieldKey: props.fieldKey,
    label: props.label,
    placeholder: props.placeholder,
    options: props.options ?? []
  };
}

export function Textarea(props: { id?: string; fieldKey: string; label: string; placeholder?: string }): RecipeAppletNode {
  return {
    id: nextNodeId('textarea', props.id),
    kind: 'textarea',
    fieldKey: props.fieldKey,
    label: props.label,
    placeholder: props.placeholder
  };
}

export function Divider(props: { id?: string } = {}): RecipeAppletNode {
  return {
    id: nextNodeId('divider', props.id),
    kind: 'divider'
  };
}

export function Callout(props: {
  id?: string;
  tone?: RecipeAppletNodeTone;
  title: string;
  description: string;
  actionIds?: string[];
}): RecipeAppletNode {
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

export function jsx(type: unknown, props: Record<string, unknown>) {
  if (type === Fragment) {
    return props.children ?? [];
  }
  if (typeof type === 'function') {
    return type(props);
  }
  throw new Error('Recipe applets only support SDK components, not intrinsic HTML elements.');
}

export const jsxs = jsx;

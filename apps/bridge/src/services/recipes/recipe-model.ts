import type {
  Recipe,
  RecipeActionDefinition,
  RecipeActionSpec,
  RecipeAssistantContext,
  RecipeFallbackState,
  RecipeLink,
  RecipeNormalizedData,
  RecipeNormalizedDataset,
  RecipeSummary,
  RecipeCollection,
  RecipeCollectionPreferredView,
  RecipeEntity,
  RecipeModel,
  RecipePatch,
  RecipePatchOperation,
  RecipeSection,
  RecipeDslTab,
  RecipeView
} from '@noustef-ui/protocol';
import {
  RecipeModelSchema,
  RecipePatchSchema
} from '@noustef-ui/protocol';

export interface BuildRecipeModelInput {
  recipe: Pick<Recipe, 'id' | 'title' | 'description' | 'status' | 'metadata'>;
  summary: RecipeSummary | null;
  assistantContext: RecipeAssistantContext | null;
  normalizedData: RecipeNormalizedData | null;
  actionSpec: RecipeActionSpec | null;
  fallback: RecipeFallbackState | null;
  previousModel?: RecipeModel | null;
}

function stableEquals(left: unknown, right: unknown) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function dedupeById<T extends { id: string }>(items: T[]) {
  const seen = new Set<string>();
  const output: T[] = [];

  for (const item of items) {
    if (seen.has(item.id)) {
      continue;
    }
    seen.add(item.id);
    output.push(item);
  }

  return output;
}

function dedupeLinks(links: RecipeLink[]) {
  const seen = new Set<string>();
  const output: RecipeLink[] = [];

  for (const link of links) {
    const key = `${link.kind}:${link.url}:${link.label}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    output.push(link);
  }

  return output;
}

function buildLinksMarkdown(links: RecipeLink[]) {
  if (links.length === 0) {
    return null;
  }

  return links.map((link) => `- [${link.label}](${link.url})`).join('\n');
}

function buildNotesMarkdown(notes: string[]) {
  if (notes.length === 0) {
    return null;
  }

  return notes.map((note) => `- ${note}`).join('\n');
}

function mapPreferredView(dataset: RecipeNormalizedDataset): RecipeCollectionPreferredView {
  switch (dataset.preferredPresentation) {
    case 'markdown':
      return 'markdown';
    case 'list':
      return 'list';
    case 'detail':
      return 'detail_panel';
    case 'cards':
    default:
      return dataset.preferredPresentation === 'table' ? 'table' : 'cards';
  }
}

function mapSectionKind(preferredView: RecipeCollectionPreferredView): RecipeSection['kind'] {
  switch (preferredView) {
    case 'list':
      return 'list';
    case 'detail_panel':
      return 'detail_panel';
    case 'markdown':
      return 'markdown';
    case 'cards':
      return 'cards';
    case 'table':
    default:
      return 'table';
  }
}

function resolveCollectionSelectionMode(actions: RecipeActionDefinition[], collectionId: string): RecipeCollection['selectionMode'] {
  const relevantActions = actions.filter((action) => action.visibility.datasetId === collectionId);
  if (relevantActions.some((action) => action.visibility.requiresSelection === 'single')) {
    return 'single';
  }
  if (
    relevantActions.some((action) =>
      action.visibility.requiresSelection === 'one_or_more' || action.visibility.requiresSelection === 'any'
    )
  ) {
    return 'multiple';
  }
  return 'multiple';
}

function toRecipeEntity(dataset: RecipeNormalizedDataset, item: RecipeNormalizedDataset['items'][number]): RecipeEntity {
  return {
    id: item.id,
    kind: dataset.kind,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    badges: item.badges ?? [],
    fields: item.fields ?? [],
    links: item.links ?? [],
    image: item.image,
    stats: [],
    status: undefined,
    notes: [],
    metadata: item.metadata ?? {}
  };
}

function toRecipeCollection(dataset: RecipeNormalizedDataset, actions: RecipeActionDefinition[]): RecipeCollection {
  return {
    id: dataset.id,
    label: dataset.label,
    entityKind: dataset.kind,
    entityIds: dataset.items.map((item) => item.id),
    preferredView: mapPreferredView(dataset),
    fieldKeys: dataset.fields.map((field) => field.key),
    pageSize: dataset.pageInfo.pageSize,
    selectionMode: resolveCollectionSelectionMode(actions, dataset.id),
    detailEntityId: dataset.items[0]?.id ?? null,
    filterKeys: dataset.fields.slice(0, 4).map((field) => field.key),
    sort: undefined,
    emptyState: {
      title: `No ${dataset.label.toLowerCase()} yet`,
      description: dataset.notes[0] ?? 'Nothing is available for this collection yet.'
    },
    metadata: dataset.metadata ?? {}
  };
}

function buildOverviewSections(input: {
  summary: RecipeSummary | null;
  assistantContext: RecipeAssistantContext | null;
  normalizedData: RecipeNormalizedData | null;
  actions: RecipeActionDefinition[];
  fallback: RecipeFallbackState | null;
  linksMarkdown: string | null;
  notesMarkdown: string | null;
}): RecipeSection[] {
  const sections: RecipeSection[] = [];
  const summaryBody = input.summary?.note ?? input.assistantContext?.summary;
  sections.push({
    id: 'section-summary',
    kind: 'summary',
    title: input.summary?.title ?? 'Recipe summary',
    description: input.summary?.subtitle ?? input.assistantContext?.responseLead,
    collectionId: null,
    entityId: null,
    actionIds: [],
    fieldKeys: [],
    status: 'ready',
    body: summaryBody,
    metadata: {
      badges: input.summary?.badges ?? [],
      links: input.summary?.links ?? []
    }
  });

  const stats = input.summary?.stats ?? input.normalizedData?.summaryStats ?? [];
  if (stats.length > 0) {
    sections.push({
      id: 'section-stats',
      kind: 'stats',
      title: 'Highlights',
      description: undefined,
      collectionId: null,
      entityId: null,
      actionIds: [],
      fieldKeys: [],
      status: 'ready',
      body: undefined,
      metadata: {
        stats
      }
    });
  }

  const primaryCollectionId = input.normalizedData?.primaryDatasetId ?? input.normalizedData?.datasets[0]?.id ?? null;
  if (primaryCollectionId) {
    const primaryDataset = input.normalizedData?.datasets.find((dataset) => dataset.id === primaryCollectionId) ?? null;
    if (primaryDataset) {
      const preferredView = mapPreferredView(primaryDataset);
      sections.push({
        id: `section-collection-${primaryDataset.id}`,
        kind: mapSectionKind(preferredView),
        title: primaryDataset.label,
        description: primaryDataset.notes[0],
        collectionId: primaryDataset.id,
        entityId: null,
        actionIds: input.actions
          .filter((action) => !action.visibility.datasetId || action.visibility.datasetId === primaryDataset.id)
          .map((action) => action.id),
        fieldKeys: primaryDataset.fields.map((field) => field.key),
        status: 'ready',
        body: undefined,
        emptyState: {
          title: `No ${primaryDataset.label.toLowerCase()} yet`,
          description: primaryDataset.notes[0] ?? 'Nothing is available for this collection yet.'
        },
        metadata: {
          preferredView
        }
      });
      sections.push({
        id: `section-detail-${primaryDataset.id}`,
        kind: 'detail_panel',
        title: `${primaryDataset.label} details`,
        description: undefined,
        collectionId: primaryDataset.id,
        entityId: primaryDataset.items[0]?.id ?? null,
        actionIds: input.actions
          .filter((action) => !action.visibility.datasetId || action.visibility.datasetId === primaryDataset.id)
          .map((action) => action.id),
        fieldKeys: primaryDataset.fields.map((field) => field.key),
        status: 'ready',
        body: undefined,
        emptyState: {
          title: 'Nothing selected',
          description: 'Choose an item to inspect its details.'
        },
        metadata: {}
      });
    }
  } else if (input.fallback?.summaryMarkdown) {
    sections.push({
      id: 'section-fallback',
      kind: 'markdown',
      title: input.fallback.title,
      description: input.fallback.message,
      collectionId: null,
      entityId: null,
      actionIds: [],
      fieldKeys: [],
      status: 'ready',
      body: input.fallback.summaryMarkdown,
      metadata: {}
    });
  }

  if (input.actions.length > 0) {
    sections.push({
      id: 'section-actions',
      kind: 'actions',
      title: 'Actions',
      description: undefined,
      collectionId: null,
      entityId: null,
      actionIds: input.actions.map((action) => action.id),
      fieldKeys: [],
      status: 'ready',
      body: undefined,
      metadata: {}
    });
  }

  if (input.linksMarkdown) {
    sections.push({
      id: 'section-links',
      kind: 'markdown',
      title: 'Links',
      description: undefined,
      collectionId: null,
      entityId: null,
      actionIds: [],
      fieldKeys: [],
      status: 'ready',
      body: input.linksMarkdown,
      metadata: {}
    });
  }

  if (input.notesMarkdown) {
    sections.push({
      id: 'section-notes',
      kind: 'markdown',
      title: 'Notes',
      description: undefined,
      collectionId: null,
      entityId: null,
      actionIds: [],
      fieldKeys: [],
      status: 'ready',
      body: input.notesMarkdown,
      metadata: {}
    });
  }

  return sections;
}

function buildDatasetSections(dataset: RecipeNormalizedDataset, actions: RecipeActionDefinition[]): RecipeSection[] {
  const preferredView = mapPreferredView(dataset);
  return [
    {
      id: `section-collection-${dataset.id}`,
      kind: mapSectionKind(preferredView),
      title: dataset.label,
      description: dataset.notes[0],
      collectionId: dataset.id,
      entityId: null,
      actionIds: actions
        .filter((action) => !action.visibility.datasetId || action.visibility.datasetId === dataset.id)
        .map((action) => action.id),
      fieldKeys: dataset.fields.map((field) => field.key),
      status: 'ready',
      body: undefined,
      emptyState: {
        title: `No ${dataset.label.toLowerCase()} yet`,
        description: dataset.notes[0] ?? 'Nothing is available for this collection yet.'
      },
      metadata: {
        preferredView
      }
    },
    {
      id: `section-detail-${dataset.id}`,
      kind: 'detail_panel',
      title: `${dataset.label} details`,
      description: undefined,
      collectionId: dataset.id,
      entityId: dataset.items[0]?.id ?? null,
      actionIds: actions
        .filter((action) => !action.visibility.datasetId || action.visibility.datasetId === dataset.id)
        .map((action) => action.id),
      fieldKeys: dataset.fields.map((field) => field.key),
      status: 'ready',
      body: undefined,
      emptyState: {
        title: 'Nothing selected',
        description: 'Choose an item to inspect its details.'
      },
      metadata: {}
    }
  ];
}

function nextCollectionState(normalizedData: RecipeNormalizedData | null) {
  return Object.fromEntries(
    (normalizedData?.datasets ?? []).map((dataset) => [
      dataset.id,
      {
        selectedEntityIds: dataset.items[0]?.id ? [dataset.items[0].id] : [],
        page: 1,
        filters: {},
        sort: undefined
      }
    ])
  );
}

export function applyRecipePatchOperations(
  model: RecipeModel,
  patchOrOperations: RecipePatch | RecipePatchOperation[]
): RecipeModel {
  const operations = Array.isArray(patchOrOperations) ? patchOrOperations : patchOrOperations.operations;
  const nextModel = structuredClone(model);

  for (const operation of operations) {
    switch (operation.op) {
      case 'upsert_entities': {
        const byId = new Map(nextModel.entities.map((entity) => [entity.id, entity] as const));
        operation.entities.forEach((entity) => byId.set(entity.id, entity));
        nextModel.entities = [...byId.values()];
        break;
      }
      case 'remove_entities': {
        const removedIds = new Set(operation.entityIds);
        nextModel.entities = nextModel.entities.filter((entity) => !removedIds.has(entity.id));
        nextModel.collections = nextModel.collections.map((collection) => ({
          ...collection,
          entityIds: collection.entityIds.filter((entityId) => !removedIds.has(entityId))
        }));
        break;
      }
      case 'update_collection': {
        const byId = new Map(nextModel.collections.map((collection) => [collection.id, collection] as const));
        byId.set(operation.collection.id, operation.collection);
        nextModel.collections = [...byId.values()];
        break;
      }
      case 'remove_collection':
        nextModel.collections = nextModel.collections.filter((collection) => collection.id !== operation.collectionId);
        nextModel.sections = nextModel.sections.filter((section) => section.collectionId !== operation.collectionId);
        break;
      case 'reorder_collection':
        nextModel.collections = nextModel.collections.map((collection) =>
          collection.id === operation.collectionId ? { ...collection, entityIds: [...operation.entityIds] } : collection
        );
        break;
      case 'create_tab': {
        const byId = new Map(nextModel.tabs.map((tab) => [tab.id, tab] as const));
        byId.set(operation.tab.id, operation.tab);
        nextModel.tabs = [...byId.values()];
        break;
      }
      case 'update_tab':
        nextModel.tabs = nextModel.tabs.map((tab) => (tab.id === operation.tab.id ? operation.tab : tab));
        if (!nextModel.tabs.some((tab) => tab.id === operation.tab.id)) {
          nextModel.tabs.push(operation.tab);
        }
        break;
      case 'remove_tab':
        nextModel.tabs = nextModel.tabs.filter((tab) => tab.id !== operation.tabId);
        if (nextModel.state.activeTabId === operation.tabId) {
          nextModel.state.activeTabId = nextModel.tabs[0]?.id ?? null;
        }
        break;
      case 'replace_view':
        nextModel.views = nextModel.views.map((view) => (view.id === operation.view.id ? operation.view : view));
        if (!nextModel.views.some((view) => view.id === operation.view.id)) {
          nextModel.views.push(operation.view);
        }
        break;
      case 'remove_view':
        nextModel.views = nextModel.views.filter((view) => view.id !== operation.viewId);
        break;
      case 'replace_section':
        nextModel.sections = nextModel.sections.map((section) =>
          section.id === operation.section.id ? operation.section : section
        );
        if (!nextModel.sections.some((section) => section.id === operation.section.id)) {
          nextModel.sections.push(operation.section);
        }
        break;
      case 'remove_section':
        nextModel.sections = nextModel.sections.filter((section) => section.id !== operation.sectionId);
        nextModel.views = nextModel.views.map((view) => ({
          ...view,
          sectionIds: view.sectionIds.filter((sectionId) => sectionId !== operation.sectionId)
        }));
        break;
      case 'replace_actions':
        nextModel.actions = operation.actions;
        break;
      case 'set_selection':
        nextModel.state.collectionState[operation.collectionId] = {
          ...(nextModel.state.collectionState[operation.collectionId] ?? {
            selectedEntityIds: [],
            page: 1,
            filters: {}
          }),
          selectedEntityIds: [...operation.entityIds]
        };
        break;
      case 'append_notes':
        if (operation.target === 'entity' && operation.entityId) {
          nextModel.entities = nextModel.entities.map((entity) =>
            entity.id === operation.entityId
              ? {
                  ...entity,
                  notes: [...entity.notes, ...operation.notes]
                }
              : entity
          );
        } else {
          const existingNotes = Array.isArray(nextModel.metadata.notes)
            ? (nextModel.metadata.notes as unknown[]).filter((note): note is string => typeof note === 'string')
            : [];
          nextModel.metadata.notes = [...existingNotes, ...operation.notes];
        }
        break;
      case 'set_status':
        if (operation.target === 'recipe') {
          nextModel.status = operation.status as Recipe['status'];
        } else if (operation.target === 'entity' && operation.targetId) {
          nextModel.entities = nextModel.entities.map((entity) =>
            entity.id === operation.targetId ? { ...entity, status: operation.status } : entity
          );
        } else if (operation.target === 'section' && operation.targetId) {
          nextModel.sections = nextModel.sections.map((section) =>
            section.id === operation.targetId
              ? {
                  ...section,
                  status:
                    operation.status === 'loading' || operation.status === 'error' ? operation.status : 'ready',
                  description: operation.message ?? section.description
                }
              : section
          );
        } else if (operation.target === 'tab' && operation.targetId) {
          nextModel.tabs = nextModel.tabs.map((tab) =>
            tab.id === operation.targetId
              ? {
                  ...tab,
                  status:
                    operation.status === 'loading' || operation.status === 'error' ? operation.status : 'ready'
                }
              : tab
          );
        } else if (operation.target === 'action' && operation.targetId) {
          nextModel.state.actionState[operation.targetId] = {
            status:
              operation.status === 'running' || operation.status === 'completed' || operation.status === 'error'
                ? operation.status
                : 'idle',
            message: operation.message
          };
        }
        break;
      case 'set_action_state':
        nextModel.state.actionState[operation.actionId] = operation.state;
        break;
      default:
        break;
    }
  }

  nextModel.revision = Array.isArray(patchOrOperations)
    ? model.revision + 1
    : Math.max(model.revision, patchOrOperations.nextRevision);
  return RecipeModelSchema.parse(nextModel);
}

export function synthesizeRecipeModelPatch(previousModel: RecipeModel | null, nextModel: RecipeModel): RecipePatch {
  const operations: RecipePatchOperation[] = [];
  const previous = previousModel;

  const previousEntities = new Map(previous?.entities.map((entity) => [entity.id, entity] as const) ?? []);
  const nextEntities = new Map(nextModel.entities.map((entity) => [entity.id, entity] as const));
  const upsertEntities = nextModel.entities.filter((entity) => !stableEquals(previousEntities.get(entity.id) ?? null, entity));
  if (upsertEntities.length > 0) {
    operations.push({
      op: 'upsert_entities',
      entities: upsertEntities
    });
  }

  const removedEntityIds = [...previousEntities.keys()].filter((entityId) => !nextEntities.has(entityId));
  if (removedEntityIds.length > 0) {
    operations.push({
      op: 'remove_entities',
      entityIds: removedEntityIds
    });
  }

  const previousCollections = new Map(previous?.collections.map((collection) => [collection.id, collection] as const) ?? []);
  for (const collection of nextModel.collections) {
    const previousCollection = previousCollections.get(collection.id) ?? null;
    if (!previousCollection || !stableEquals(previousCollection, collection)) {
      operations.push({
        op: 'update_collection',
        collection
      });
    }
    if (previousCollection && !stableEquals(previousCollection.entityIds, collection.entityIds)) {
      operations.push({
        op: 'reorder_collection',
        collectionId: collection.id,
        entityIds: collection.entityIds
      });
    }
  }
  const removedCollectionIds = [...previousCollections.keys()].filter(
    (collectionId) => !nextModel.collections.some((collection) => collection.id === collectionId)
  );
  removedCollectionIds.forEach((collectionId) => {
    operations.push({
      op: 'remove_collection',
      collectionId
    });
  });

  const previousViews = new Map(previous?.views.map((view) => [view.id, view] as const) ?? []);
  for (const view of nextModel.views) {
    if (!previousViews.has(view.id) || !stableEquals(previousViews.get(view.id), view)) {
      operations.push({
        op: 'replace_view',
        view
      });
    }
  }
  [...previousViews.keys()]
    .filter((viewId) => !nextModel.views.some((view) => view.id === viewId))
    .forEach((viewId) => {
      operations.push({
        op: 'remove_view',
        viewId
      });
    });

  const previousSections = new Map(previous?.sections.map((section) => [section.id, section] as const) ?? []);
  for (const section of nextModel.sections) {
    if (!previousSections.has(section.id) || !stableEquals(previousSections.get(section.id), section)) {
      operations.push({
        op: 'replace_section',
        section
      });
    }
  }
  [...previousSections.keys()]
    .filter((sectionId) => !nextModel.sections.some((section) => section.id === sectionId))
    .forEach((sectionId) => {
      operations.push({
        op: 'remove_section',
        sectionId
      });
    });

  const previousTabs = new Map(previous?.tabs.map((tab) => [tab.id, tab] as const) ?? []);
  for (const tab of nextModel.tabs) {
    if (!previousTabs.has(tab.id)) {
      operations.push({
        op: 'create_tab',
        tab
      });
      continue;
    }
    if (!stableEquals(previousTabs.get(tab.id), tab)) {
      operations.push({
        op: 'update_tab',
        tab
      });
    }
  }
  [...previousTabs.keys()]
    .filter((tabId) => !nextModel.tabs.some((tab) => tab.id === tabId))
    .forEach((tabId) => {
      operations.push({
        op: 'remove_tab',
        tabId
      });
    });

  if (!stableEquals(previous?.actions ?? [], nextModel.actions)) {
    operations.push({
      op: 'replace_actions',
      actions: nextModel.actions
    });
  }

  if ((previous?.status ?? null) !== nextModel.status) {
    operations.push({
      op: 'set_status',
      target: 'recipe',
      status: nextModel.status,
      message: undefined
    });
  }

  return RecipePatchSchema.parse({
    kind: 'recipe_patch',
    schemaVersion: 'recipe_patch/v1',
    sdkVersion: nextModel.sdkVersion,
    baseRevision: previous?.revision ?? 0,
    nextRevision: nextModel.revision,
    summary:
      operations.length > 0
        ? `Applied ${operations.length} recipe graph update${operations.length === 1 ? '' : 's'}.`
        : 'Recipe graph was unchanged.',
    operations
  });
}

export function buildRecipeModel(input: BuildRecipeModelInput): {
  model: RecipeModel;
  patch: RecipePatch;
} {
  const actions = dedupeById(input.actionSpec?.actions ?? []);
  const normalizedData = input.normalizedData;
  const datasets = normalizedData?.datasets ?? [];
  const entities = dedupeById(datasets.flatMap((dataset) => dataset.items.map((item) => toRecipeEntity(dataset, item))));
  const collections = datasets.map((dataset) => toRecipeCollection(dataset, actions));
  const linksMarkdown = buildLinksMarkdown(
    dedupeLinks([...(input.summary?.links ?? []), ...(input.assistantContext?.links ?? []), ...(normalizedData?.links ?? [])])
  );
  const notesMarkdown = buildNotesMarkdown([...(normalizedData?.notes ?? []), ...(input.fallback?.datasetPreview ?? []).map((item) => item.title)]);

  const sections = buildOverviewSections({
    summary: input.summary,
    assistantContext: input.assistantContext,
    normalizedData,
    actions,
    fallback: input.fallback,
    linksMarkdown,
    notesMarkdown
  });
  const views: RecipeView[] = [
    {
      id: 'view-overview',
      label: 'Overview',
      sectionIds: sections.map((section) => section.id),
      layout: 'stack',
      metadata: {}
    }
  ];
  const tabs: RecipeDslTab[] = [
    {
      id: 'tab-overview',
      label: 'Overview',
      viewId: 'view-overview',
      status: 'ready',
      metadata: {}
    }
  ];

  for (const dataset of datasets.filter((dataset) => dataset.id !== normalizedData?.primaryDatasetId)) {
    const datasetSections = buildDatasetSections(dataset, actions);
    sections.push(...datasetSections);
    views.push({
      id: `view-${dataset.id}`,
      label: dataset.label,
      sectionIds: datasetSections.map((section) => section.id),
      layout: 'stack',
      metadata: {}
    });
    tabs.push({
      id: `tab-${dataset.id}`,
      label: dataset.label,
      viewId: `view-${dataset.id}`,
      status: 'ready',
      metadata: {}
    });
  }

  const nextRevision = (input.previousModel?.revision ?? 0) + 1;
  const nextModel = RecipeModelSchema.parse({
    kind: 'recipe_model',
    schemaVersion: 'recipe_model/v1',
    sdkVersion: 'recipe_sdk/v1',
    revision: nextRevision,
    title: input.summary?.title ?? input.recipe.title,
    subtitle: input.summary?.subtitle,
    description: input.recipe.description ?? input.assistantContext?.summary,
    status: input.recipe.status,
    entities,
    collections,
    views,
    sections,
    tabs,
    actions,
    state: {
      activeTabId: input.previousModel?.state.activeTabId ?? tabs[0]?.id ?? null,
      collectionState: nextCollectionState(normalizedData),
      formState: input.previousModel?.state.formState ?? {},
      actionState: input.previousModel?.state.actionState ?? {},
      localState: input.previousModel?.state.localState ?? {}
    },
    metadata: {
      source: 'local_bridge',
      primaryCollectionId: normalizedData?.primaryDatasetId ?? collections[0]?.id ?? null,
      entityCount: entities.length,
      collectionCount: collections.length,
      viewCount: views.length,
      sectionCount: sections.length,
      tabCount: tabs.length,
      summaryStatsCount: (input.summary?.stats ?? []).length,
      baselineReady: true,
      patchFriendly: true
    }
  });
  if (nextModel.state.activeTabId && !nextModel.tabs.some((tab) => tab.id === nextModel.state.activeTabId)) {
    nextModel.state.activeTabId = nextModel.tabs[0]?.id ?? null;
  }

  const patch = synthesizeRecipeModelPatch(input.previousModel ?? null, nextModel);
  const appliedModel =
    input.previousModel && patch.operations.length > 0 ? applyRecipePatchOperations(input.previousModel, patch) : nextModel;

  return {
    model: appliedModel,
    patch
  };
}

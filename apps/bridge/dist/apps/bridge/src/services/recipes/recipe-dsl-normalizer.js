import { LegacyRecipeDslSchema, RecipeAuthoringDslSchema, RecipeModelSchema } from '@hermes-recipes/protocol';
import { synthesizeRecipeModelPatch } from './recipe-model';
function createRepairSummary() {
    return {
        droppedKeys: [],
        aliasMappings: [],
        defaultedFields: [],
        normalizedSynonyms: []
    };
}
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function toRecord(value) {
    return isRecord(value) ? value : {};
}
function asString(value) {
    return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}
function asStringArray(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value
        .map((item) => asString(item))
        .filter((item) => Boolean(item));
}
function uniqueStrings(values) {
    return [...new Set(values)];
}
function slugify(value, fallback) {
    const normalized = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/gu, '-')
        .replace(/^-+|-+$/gu, '');
    return normalized || fallback;
}
function registerAlias(repairs, from, to) {
    repairs.aliasMappings.push(`${from} -> ${to}`);
}
function registerSynonym(repairs, from, to) {
    repairs.normalizedSynonyms.push(`${from} -> ${to}`);
}
function registerDefault(repairs, field) {
    repairs.defaultedFields.push(field);
}
function registerDroppedKey(repairs, path) {
    repairs.droppedKeys.push(path);
}
function mapDatasetDisplay(value) {
    if (!value) {
        return undefined;
    }
    switch (value) {
        case 'detail_panel':
            return 'detail';
        case 'table':
        case 'list':
        case 'cards':
        case 'detail':
        case 'markdown':
        case 'comparison':
        case 'timeline':
        case 'media':
            return value;
        default:
            return undefined;
    }
}
function mapSectionType(value) {
    if (!value) {
        return {
            type: null
        };
    }
    switch (value) {
        case 'summary':
        case 'comparison':
        case 'stats':
        case 'markdown':
        case 'media':
        case 'links':
        case 'notes':
        case 'actions':
        case 'callout':
        case 'timeline':
        case 'status':
            return {
                type: value
            };
        case 'table':
            return {
                type: 'dataset',
                displayHint: 'table'
            };
        case 'list':
            return {
                type: 'dataset',
                displayHint: 'list'
            };
        case 'cards':
        case 'grouped_collection':
            return {
                type: 'dataset',
                displayHint: 'cards'
            };
        case 'detail_panel':
        case 'detail':
            return {
                type: 'detail',
                displayHint: 'detail'
            };
        case 'markdown_block':
            return {
                type: 'markdown'
            };
        case 'stat_grid':
            return {
                type: 'stats'
            };
        case 'action_bar':
            return {
                type: 'actions'
            };
        case 'empty_state':
        case 'error_state':
        case 'loading_state':
        case 'skeleton':
            return {
                type: 'status',
                variant: value
            };
        default:
            return {
                type: null
            };
    }
}
function mapCollectionPreferredView(display) {
    switch (display) {
        case 'list':
            return 'list';
        case 'cards':
            return 'cards';
        case 'detail':
            return 'detail_panel';
        case 'markdown':
            return 'markdown';
        case 'comparison':
        case 'timeline':
        case 'media':
        case 'table':
        default:
            return 'table';
    }
}
function mapSectionKind(section, datasetDisplay) {
    switch (section.type) {
        case 'dataset':
            switch (datasetDisplay) {
                case 'list':
                    return 'list';
                case 'cards':
                    return 'cards';
                case 'detail':
                    return 'detail_panel';
                case 'markdown':
                    return 'markdown';
                case 'comparison':
                    return 'comparison';
                case 'timeline':
                    return 'timeline';
                case 'media':
                    return 'media';
                case 'table':
                default:
                    return 'table';
            }
        case 'detail':
            return 'detail_panel';
        case 'stats':
            return 'stats';
        case 'comparison':
            return 'comparison';
        case 'markdown':
        case 'links':
        case 'notes':
            return 'markdown';
        case 'media':
            return 'media';
        case 'actions':
            return 'actions';
        case 'callout':
        case 'status':
            return 'callout';
        case 'timeline':
            return 'timeline';
        case 'summary':
        default:
            return 'summary';
    }
}
function formatLinksMarkdown(links) {
    if (links.length === 0) {
        return null;
    }
    return links.map((link) => `- [${link.label}](${link.url})`).join('\n');
}
function formatNotesMarkdown(notes) {
    if (notes.length === 0) {
        return null;
    }
    return notes.map((note) => `- ${note}`).join('\n');
}
function coerceLinks(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    const links = [];
    for (const item of value) {
        if (!isRecord(item)) {
            continue;
        }
        const url = asString(item.url ?? item.href);
        const label = asString(item.label ?? item.text ?? item.title);
        const kindValue = asString(item.kind);
        if (!url || !label) {
            continue;
        }
        const kind = kindValue === 'website' ||
            kindValue === 'place' ||
            kindValue === 'booking' ||
            kindValue === 'menu' ||
            kindValue === 'map' ||
            kindValue === 'email' ||
            kindValue === 'other'
            ? kindValue
            : 'website';
        links.push({
            url,
            label,
            kind
        });
    }
    return links;
}
function coerceMedia(value) {
    const values = Array.isArray(value) ? value : value ? [value] : [];
    const media = [];
    for (const item of values) {
        if (!isRecord(item)) {
            continue;
        }
        const url = asString(item.url ?? item.imageUrl ?? item.href);
        if (!url) {
            continue;
        }
        media.push({
            url,
            alt: asString(item.alt ?? item.imageAlt ?? item.label)
        });
    }
    return media;
}
function coerceStats(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    const stats = [];
    value.forEach((item, index) => {
        if (!isRecord(item)) {
            return;
        }
        const label = asString(item.label);
        const statValue = asString(item.value) ?? (typeof item.value === 'number' ? String(item.value) : undefined);
        if (!label || !statValue) {
            return;
        }
        stats.push({
            id: asString(item.id) ?? `stat-${slugify(label, String(index + 1))}`,
            label,
            value: statValue,
            emphasis: item.emphasis === 'primary' || item.emphasis === 'status' || item.accent === 'primary'
                ? item.emphasis === 'status'
                    ? 'status'
                    : 'primary'
                : 'none',
            tone: item.tone === 'neutral' ||
                item.tone === 'info' ||
                item.tone === 'success' ||
                item.tone === 'warning' ||
                item.tone === 'danger'
                ? item.tone
                : item.tone === 'positive'
                    ? 'success'
                    : 'neutral'
        });
    });
    return stats;
}
function coerceActionReferences(value, repairs, path) {
    if (!Array.isArray(value)) {
        return [];
    }
    const actions = [];
    value.forEach((item, index) => {
        if (typeof item === 'string' && item.trim().length > 0) {
            registerAlias(repairs, `${path}[${index}]`, `${path}[${index}].kind/id`);
            actions.push({
                kind: 'existing_action',
                id: item.trim(),
                placement: 'toolbar',
                metadata: {}
            });
            return;
        }
        if (!isRecord(item)) {
            return;
        }
        const id = asString(item.id ?? item.actionId);
        if (!id) {
            return;
        }
        const kind = asString(item.kind ?? item.actionType);
        if (kind && kind !== 'existing_action') {
            registerSynonym(repairs, kind, 'existing_action');
        }
        const placement = asString(item.placement ?? item.location ?? item.slot);
        actions.push({
            kind: 'existing_action',
            id,
            label: asString(item.label ?? item.title),
            placement: placement === 'section' || placement === 'inline' ? placement : 'toolbar',
            datasetId: asString(item.datasetId ?? item.collectionId),
            metadata: toRecord(item.metadata)
        });
    });
    return actions;
}
function coerceDatasets(value, repairs) {
    if (!Array.isArray(value)) {
        return [];
    }
    const datasets = [];
    value.forEach((item, index) => {
        if (!isRecord(item)) {
            return;
        }
        const id = asString(item.id);
        if (!id) {
            return;
        }
        const display = mapDatasetDisplay(asString(item.display ?? item.preferredView ?? item.preferredPresentation ?? item.view));
        if (asString(item.preferredView ?? item.preferredPresentation ?? item.view) && display) {
            registerAlias(repairs, `datasets[${index}].preferredView`, `datasets[${index}].display`);
        }
        datasets.push({
            id,
            title: asString(item.title ?? item.label),
            summary: asString(item.summary ?? item.description),
            display,
            fields: uniqueStrings(asStringArray(item.fields ?? item.fieldKeys)),
            focusEntityId: asString(item.focusEntityId ?? item.detailEntityId) ?? null,
            notes: uniqueStrings(asStringArray(item.notes)),
            emptyState: isRecord(item.emptyState)
                ? {
                    title: asString(item.emptyState.title) ?? 'No items',
                    description: asString(item.emptyState.description) ?? 'Nothing is available for this dataset yet.'
                }
                : undefined,
            metadata: toRecord(item.metadata)
        });
    });
    return datasets;
}
function inferSectionType(item, index, repairs) {
    const explicitType = asString(item.type ?? item.kind ?? item.sectionType);
    const mapped = mapSectionType(explicitType);
    if (explicitType && mapped.type && explicitType !== mapped.type) {
        registerSynonym(repairs, `sections[${index}].${explicitType}`, mapped.type);
    }
    if (mapped.type) {
        return mapped;
    }
    const datasetId = asString(item.datasetId ?? item.collectionId);
    if (datasetId) {
        return {
            type: 'dataset'
        };
    }
    const actionIds = asStringArray(item.actionIds);
    if (actionIds.length > 0) {
        return {
            type: 'actions'
        };
    }
    if (Array.isArray(item.stats) && item.stats.length > 0) {
        return {
            type: 'stats'
        };
    }
    if (Array.isArray(item.links) && item.links.length > 0) {
        return {
            type: 'links'
        };
    }
    if (item.body || item.markdown || item.content || item.text) {
        return {
            type: 'markdown'
        };
    }
    return {
        type: 'summary'
    };
}
function coerceSections(source, repairs) {
    if (!Array.isArray(source)) {
        return [];
    }
    const sections = [];
    source.forEach((item, index) => {
        if (!isRecord(item)) {
            return;
        }
        const inferred = inferSectionType(item, index, repairs);
        const id = asString(item.id) ?? `section-${index + 1}`;
        const entityIds = uniqueStrings(asStringArray(item.entityIds).concat(asString(item.entityId) ? [asString(item.entityId)] : []));
        const section = {
            id,
            type: inferred.type ?? 'summary',
            title: asString(item.title),
            summary: asString(item.summary ?? item.description),
            datasetId: asString(item.datasetId ?? item.collectionId),
            body: asString(item.body ?? item.markdown ?? item.content ?? item.text),
            fields: uniqueStrings(asStringArray(item.fields ?? item.fieldKeys)),
            entityIds,
            actionIds: uniqueStrings(asStringArray(item.actionIds).concat(coerceActionReferences(item.actions, repairs, `sections[${index}].actions`).map((action) => action.id))),
            links: coerceLinks(item.links),
            media: coerceMedia(item.media ?? item.images ?? item.image),
            stats: coerceStats(item.stats),
            emptyState: isRecord(item.emptyState)
                ? {
                    title: asString(item.emptyState.title) ?? 'Nothing to show',
                    description: asString(item.emptyState.description) ?? 'No content is available for this section yet.'
                }
                : undefined,
            metadata: {
                ...toRecord(item.metadata),
                ...(inferred.displayHint ? { display: inferred.displayHint } : {}),
                ...(inferred.variant ? { statusVariant: inferred.variant } : {})
            }
        };
        sections.push(section);
    });
    return sections;
}
function coerceTabs(value, viewSource, fallbackSectionIds, repairs) {
    const views = Array.isArray(viewSource)
        ? viewSource
            .map((item) => (isRecord(item) ? item : null))
            .filter((item) => Boolean(item))
        : [];
    const viewById = new Map(views
        .map((view) => {
        const id = asString(view.id);
        if (!id) {
            return null;
        }
        return [
            id,
            {
                sectionIds: uniqueStrings(asStringArray(view.sectionIds)),
                layout: asString(view.layout)
            }
        ];
    })
        .filter((entry) => Boolean(entry)));
    const source = Array.isArray(value) ? value : Array.isArray(viewSource) ? viewSource : [];
    const tabs = [];
    source.forEach((item, index) => {
        if (!isRecord(item)) {
            return;
        }
        const id = asString(item.id) ?? `tab-${index + 1}`;
        const viewId = asString(item.viewId);
        const view = viewId ? viewById.get(viewId) : null;
        const sectionIds = uniqueStrings(asStringArray(item.sectionIds).concat(view?.sectionIds ?? fallbackSectionIds));
        if (viewId && !Array.isArray(item.sectionIds)) {
            registerAlias(repairs, `tabs[${index}].viewId`, `tabs[${index}].sectionIds`);
        }
        if (sectionIds.length === 0) {
            return;
        }
        tabs.push({
            id,
            label: asString(item.label ?? item.title) ?? `Tab ${index + 1}`,
            summary: asString(item.summary ?? item.description),
            sectionIds,
            layout: asString(item.layout ?? view?.layout) === 'grid' ||
                asString(item.layout ?? view?.layout) === 'split' ||
                asString(item.layout ?? view?.layout) === 'board' ||
                asString(item.layout ?? view?.layout) === 'tabbed'
                ? asString(item.layout ?? view?.layout)
                : 'stack',
            metadata: toRecord(item.metadata)
        });
    });
    return tabs;
}
function coerceSemanticHints(value, repairs) {
    const raw = toRecord(value);
    const primaryCollectionId = asString(raw.primaryCollectionId);
    if (primaryCollectionId) {
        registerAlias(repairs, 'semanticHints.primaryCollectionId', 'semanticHints.primaryDatasetId');
    }
    return {
        primaryDatasetId: asString(raw.primaryDatasetId) ?? primaryCollectionId,
        preferredLayout: raw.preferredLayout === 'stack' ||
            raw.preferredLayout === 'grid' ||
            raw.preferredLayout === 'split' ||
            raw.preferredLayout === 'board' ||
            raw.preferredLayout === 'tabbed'
            ? raw.preferredLayout
            : undefined,
        narrowPaneStrategy: raw.narrowPaneStrategy === 'tabs' || raw.narrowPaneStrategy === 'split' ? raw.narrowPaneStrategy : 'stack',
        notes: uniqueStrings(asStringArray(raw.notes))
    };
}
function coerceOperations(value, repairs) {
    if (!Array.isArray(value)) {
        return [];
    }
    const operations = [];
    value.forEach((item, index) => {
        if (!isRecord(item)) {
            return;
        }
        const originalOp = asString(item.op ?? item.kind);
        const op = (() => {
            switch (originalOp) {
                case 'set_tab':
                    registerSynonym(repairs, 'set_tab', 'set_active_tab');
                    return 'set_active_tab';
                case 'set_section':
                case 'upsert_section':
                    registerSynonym(repairs, originalOp, 'replace_section');
                    return 'replace_section';
                case 'set_notes':
                    registerSynonym(repairs, 'set_notes', 'append_notes');
                    return 'append_notes';
                case 'update_collection':
                    registerSynonym(repairs, 'update_collection', 'update_dataset');
                    return 'update_dataset';
                default:
                    return originalOp;
            }
        })();
        if (!op) {
            return;
        }
        if (op === 'set_active_tab') {
            const tabId = asString(item.tabId ?? item.id);
            if (tabId) {
                operations.push({
                    op,
                    tabId
                });
            }
            return;
        }
        if (op === 'append_notes') {
            const notes = uniqueStrings(asStringArray(item.notes ?? item.value));
            if (notes.length > 0) {
                operations.push({
                    op,
                    notes
                });
            }
            return;
        }
        if (op === 'set_selection') {
            const datasetId = asString(item.datasetId ?? item.collectionId);
            if (datasetId) {
                operations.push({
                    op,
                    datasetId,
                    entityIds: uniqueStrings(asStringArray(item.entityIds))
                });
            }
            return;
        }
        if (op === 'set_status') {
            const status = asString(item.status);
            if (status === 'idle' || status === 'active' || status === 'changed' || status === 'archived' || status === 'error') {
                operations.push({
                    op,
                    status,
                    message: asString(item.message)
                });
            }
            return;
        }
        if (op === 'set_action_state') {
            const actionId = asString(item.actionId ?? item.id);
            const state = toRecord(item.state);
            if (actionId) {
                operations.push({
                    op,
                    actionId,
                    state: {
                        status: state.status === 'running' || state.status === 'completed' || state.status === 'error'
                            ? state.status
                            : 'idle',
                        message: asString(state.message)
                    }
                });
            }
            return;
        }
        if (op === 'update_dataset') {
            const dataset = coerceDatasets([item.dataset ?? item.collection ?? item], repairs)[0];
            if (dataset) {
                operations.push({
                    op,
                    dataset
                });
            }
            return;
        }
        if (op === 'replace_section') {
            const section = coerceSections([item.section ?? item], repairs)[0];
            if (section) {
                operations.push({
                    op,
                    section
                });
            }
            return;
        }
        if (op === 'remove_section') {
            const sectionId = asString(item.sectionId ?? item.id);
            if (sectionId) {
                operations.push({
                    op,
                    sectionId
                });
            }
            return;
        }
        if (op === 'update_tab') {
            const tab = coerceTabs([item.tab ?? item], [], [], repairs)[0];
            if (tab) {
                operations.push({
                    op,
                    tab
                });
            }
            return;
        }
        registerDroppedKey(repairs, `operations[${index}]`);
    });
    return operations;
}
function convertLegacyRecipeDsl(raw, repairs) {
    const viewById = new Map(raw.views.map((view) => [view.id, view]));
    const sections = raw.sections.map((section) => {
        const mapped = mapSectionType(section.kind);
        if (mapped.type && mapped.type !== section.kind) {
            registerSynonym(repairs, section.kind, mapped.type);
        }
        return {
            id: section.id,
            type: mapped.type ?? 'summary',
            title: section.title,
            summary: section.description,
            datasetId: section.collectionId ?? undefined,
            body: section.body,
            fields: section.fieldKeys,
            entityIds: section.entityId ? [section.entityId] : [],
            actionIds: section.actionIds,
            links: [],
            media: [],
            stats: [],
            emptyState: section.emptyState,
            metadata: {
                ...section.metadata,
                ...(mapped.displayHint ? { display: mapped.displayHint } : {}),
                ...(mapped.variant ? { statusVariant: mapped.variant } : {})
            }
        };
    });
    const tabs = raw.tabs
        .map((tab) => {
        const view = viewById.get(tab.viewId);
        return {
            id: tab.id,
            label: tab.label,
            sectionIds: view?.sectionIds ?? sections.map((section) => section.id),
            layout: view?.layout ?? raw.semanticHints.preferredLayout ?? 'stack',
            metadata: {
                ...tab.metadata,
                legacyViewId: tab.viewId
            }
        };
    })
        .filter((tab) => tab.sectionIds.length > 0);
    const operations = [];
    for (const operation of raw.operations) {
        switch (operation.op) {
            case 'update_collection':
                operations.push({
                    op: 'update_dataset',
                    dataset: {
                        id: operation.collection.id,
                        title: operation.collection.label,
                        summary: undefined,
                        display: mapDatasetDisplay(operation.collection.preferredView),
                        fields: operation.collection.fieldKeys,
                        focusEntityId: operation.collection.detailEntityId,
                        notes: [],
                        emptyState: operation.collection.emptyState,
                        metadata: operation.collection.metadata
                    }
                });
                break;
            case 'replace_section': {
                const section = sections.find((candidate) => candidate.id === operation.section.id);
                if (section) {
                    operations.push({
                        op: 'replace_section',
                        section
                    });
                }
                break;
            }
            case 'remove_section':
                operations.push({
                    op: 'remove_section',
                    sectionId: operation.sectionId
                });
                break;
            case 'update_tab':
            case 'create_tab': {
                const view = viewById.get(operation.tab.viewId);
                operations.push({
                    op: 'update_tab',
                    tab: {
                        id: operation.tab.id,
                        label: operation.tab.label,
                        summary: undefined,
                        sectionIds: view?.sectionIds ?? sections.map((section) => section.id),
                        layout: view?.layout ?? 'stack',
                        metadata: operation.tab.metadata
                    }
                });
                break;
            }
            case 'set_selection':
                operations.push({
                    op: 'set_selection',
                    datasetId: operation.collectionId,
                    entityIds: operation.entityIds
                });
                break;
            case 'append_notes':
                operations.push({
                    op: 'append_notes',
                    notes: operation.notes
                });
                break;
            case 'set_status':
                if (operation.target === 'recipe') {
                    operations.push({
                        op: 'set_status',
                        status: operation.status === 'idle' ||
                            operation.status === 'active' ||
                            operation.status === 'changed' ||
                            operation.status === 'archived' ||
                            operation.status === 'error'
                            ? operation.status
                            : 'active',
                        message: operation.message
                    });
                }
                break;
            case 'set_action_state':
                operations.push({
                    op: 'set_action_state',
                    actionId: operation.actionId,
                    state: operation.state
                });
                break;
            default:
                break;
        }
    }
    return {
        kind: 'recipe_dsl',
        schemaVersion: 'recipe_dsl/v2',
        sdkVersion: raw.sdkVersion,
        title: raw.recipe.title,
        subtitle: raw.recipe.subtitle,
        summary: raw.summary,
        status: raw.recipe.status,
        tabs: tabs.length > 0
            ? tabs
            : [
                {
                    id: raw.recipe.primaryTabId ?? 'tab-overview',
                    label: 'Overview',
                    summary: undefined,
                    sectionIds: sections.map((section) => section.id),
                    layout: raw.semanticHints.preferredLayout ?? 'stack',
                    metadata: {}
                }
            ],
        datasets: raw.collections.map((collection) => ({
            id: collection.id,
            title: collection.label,
            summary: undefined,
            display: mapDatasetDisplay(collection.preferredView),
            fields: collection.fieldKeys,
            focusEntityId: collection.detailEntityId,
            notes: [],
            emptyState: collection.emptyState,
            metadata: collection.metadata
        })),
        sections,
        actions: raw.actions.map((action) => ({
            kind: 'existing_action',
            id: action.id,
            label: action.label,
            placement: 'toolbar',
            datasetId: action.visibility.datasetId,
            metadata: {
                legacyKind: action.kind
            }
        })),
        notes: raw.semanticHints.notes,
        operations,
        semanticHints: {
            primaryDatasetId: raw.semanticHints.primaryCollectionId,
            preferredLayout: raw.semanticHints.preferredLayout,
            narrowPaneStrategy: raw.semanticHints.narrowPaneStrategy === 'tabs' ? 'tabs' : raw.semanticHints.narrowPaneStrategy,
            notes: raw.semanticHints.notes
        },
        metadata: raw.metadata
    };
}
function buildCanonicalRecipeDsl(input, repairs, warnings, errors) {
    const legacyParse = LegacyRecipeDslSchema.safeParse(input.dsl);
    if (legacyParse.success) {
        warnings.push('Converted a legacy strict recipe DSL artifact into the v2 authoring DSL locally.');
        return convertLegacyRecipeDsl(legacyParse.data, repairs);
    }
    if (!isRecord(input.dsl)) {
        errors.push('Recipe DSL payload must be a JSON object.');
        return null;
    }
    const hasMeaningfulAuthoringSignal = Array.isArray(input.dsl.tabs) ||
        Array.isArray(input.dsl.sections) ||
        Array.isArray(input.dsl.datasets) ||
        Array.isArray(input.dsl.collections) ||
        Array.isArray(input.dsl.actions) ||
        Array.isArray(input.dsl.operations) ||
        Boolean(asString(input.dsl.summary)) ||
        Boolean(asString(input.dsl.description)) ||
        isRecord(input.dsl.recipe);
    if (!hasMeaningfulAuthoringSignal) {
        errors.push('Recipe DSL payload was empty or missing required authoring content.');
        return null;
    }
    const recipe = toRecord(input.dsl.recipe);
    const sectionsSource = Array.isArray(input.dsl.sections) && input.dsl.sections.length > 0
        ? input.dsl.sections
        : Array.isArray(input.dsl.views) &&
            input.dsl.views.some((item) => isRecord(item) && (item.kind || item.type || item.body || item.collectionId))
            ? input.dsl.views
            : [];
    if (sectionsSource === input.dsl.views && Array.isArray(input.dsl.views) && !Array.isArray(input.dsl.sections)) {
        registerAlias(repairs, 'views', 'sections');
    }
    const datasetsSource = Array.isArray(input.dsl.datasets)
        ? input.dsl.datasets
        : Array.isArray(input.dsl.collections)
            ? (registerAlias(repairs, 'collections', 'datasets'), input.dsl.collections)
            : [];
    const title = asString(input.dsl.title) ?? asString(recipe.title);
    const subtitle = asString(input.dsl.subtitle) ?? asString(recipe.subtitle);
    const summary = asString(input.dsl.summary) ??
        asString(input.dsl.description) ??
        asString(recipe.description) ??
        input.assistantSummary ??
        input.baseModel.description ??
        input.baseModel.title;
    if (!asString(input.dsl.summary)) {
        registerDefault(repairs, 'summary');
    }
    const datasets = coerceDatasets(datasetsSource, repairs);
    const sections = coerceSections(sectionsSource, repairs);
    const tabs = coerceTabs(input.dsl.tabs, input.dsl.views, sections.map((section) => section.id), repairs);
    const actions = coerceActionReferences(input.dsl.actions, repairs, 'actions');
    const notes = uniqueStrings(asStringArray(input.dsl.notes).concat(asStringArray(input.dsl.semanticHints && toRecord(input.dsl.semanticHints).notes)));
    const semanticHints = coerceSemanticHints(input.dsl.semanticHints, repairs);
    const operations = coerceOperations(input.dsl.operations, repairs);
    const draft = {
        kind: 'recipe_dsl',
        schemaVersion: 'recipe_dsl/v2',
        sdkVersion: 'recipe_sdk/v1',
        title: title ?? input.baseModel.title,
        subtitle,
        summary,
        status: asString(input.dsl.status) === 'idle' ||
            asString(input.dsl.status) === 'active' ||
            asString(input.dsl.status) === 'changed' ||
            asString(input.dsl.status) === 'archived' ||
            asString(input.dsl.status) === 'error'
            ? asString(input.dsl.status)
            : asString(recipe.status) === 'idle' ||
                asString(recipe.status) === 'active' ||
                asString(recipe.status) === 'changed' ||
                asString(recipe.status) === 'archived' ||
                asString(recipe.status) === 'error'
                ? asString(recipe.status)
                : undefined,
        tabs,
        datasets,
        sections,
        actions,
        notes,
        operations,
        semanticHints,
        metadata: {
            ...toRecord(input.dsl.metadata),
            ...toRecord(recipe.metadata)
        }
    };
    const defaultedSections = draft.sections.length === 0 ? createDefaultSections(draft, input.baseModel, repairs) : draft.sections;
    const defaultedTabs = draft.tabs.length === 0 ? createDefaultTabs(defaultedSections, repairs) : draft.tabs;
    const parsed = RecipeAuthoringDslSchema.safeParse({
        ...draft,
        sections: defaultedSections,
        tabs: defaultedTabs
    });
    if (!parsed.success) {
        errors.push(parsed.error.message);
        return null;
    }
    return parsed.data;
}
function createDefaultSections(dsl, baseModel, repairs) {
    const sections = [];
    sections.push({
        id: 'section-summary',
        type: 'summary',
        title: dsl.title ?? baseModel.title,
        summary: dsl.subtitle ?? undefined,
        body: dsl.summary,
        fields: [],
        entityIds: [],
        actionIds: [],
        links: [],
        media: [],
        stats: [],
        metadata: {}
    });
    registerDefault(repairs, 'sections');
    const candidateDatasetIds = uniqueStrings(dsl.datasets.map((dataset) => dataset.id).concat(dsl.semanticHints.primaryDatasetId ? [dsl.semanticHints.primaryDatasetId] : [], baseModel.collections[0]?.id ? [baseModel.collections[0].id] : []));
    candidateDatasetIds.slice(0, 2).forEach((datasetId, index) => {
        sections.push({
            id: index === 0 ? 'section-primary-dataset' : `section-dataset-${datasetId}`,
            type: 'dataset',
            title: dsl.datasets.find((dataset) => dataset.id === datasetId)?.title ?? datasetId,
            summary: dsl.datasets.find((dataset) => dataset.id === datasetId)?.summary,
            datasetId,
            fields: [],
            entityIds: [],
            actionIds: dsl.actions.filter((action) => !action.datasetId || action.datasetId === datasetId).map((action) => action.id),
            links: [],
            media: [],
            stats: [],
            metadata: {}
        });
    });
    if (dsl.notes.length > 0) {
        sections.push({
            id: 'section-notes',
            type: 'notes',
            title: 'Notes',
            summary: undefined,
            body: formatNotesMarkdown(dsl.notes) ?? undefined,
            fields: [],
            entityIds: [],
            actionIds: [],
            links: [],
            media: [],
            stats: [],
            metadata: {}
        });
    }
    if (dsl.actions.length > 0) {
        sections.push({
            id: 'section-actions',
            type: 'actions',
            title: 'Actions',
            summary: 'Bridge-managed actions.',
            fields: [],
            entityIds: [],
            actionIds: dsl.actions.map((action) => action.id),
            links: [],
            media: [],
            stats: [],
            metadata: {}
        });
    }
    return sections;
}
function createDefaultTabs(sections, repairs) {
    registerDefault(repairs, 'tabs');
    return [
        {
            id: 'tab-overview',
            label: 'Overview',
            summary: undefined,
            sectionIds: sections.map((section) => section.id),
            layout: 'stack',
            metadata: {}
        }
    ];
}
function applyAuthoringOperations(dsl) {
    const warnings = [];
    const nextDsl = structuredClone(dsl);
    const datasetById = new Map(nextDsl.datasets.map((dataset) => [dataset.id, dataset]));
    const sectionById = new Map(nextDsl.sections.map((section) => [section.id, section]));
    const tabById = new Map(nextDsl.tabs.map((tab) => [tab.id, tab]));
    const state = {
        activeTabId: null,
        collectionSelection: {},
        actionState: {},
        statusMessage: null
    };
    for (const operation of nextDsl.operations) {
        switch (operation.op) {
            case 'update_dataset':
                datasetById.set(operation.dataset.id, operation.dataset);
                break;
            case 'replace_section':
                sectionById.set(operation.section.id, operation.section);
                break;
            case 'remove_section':
                sectionById.delete(operation.sectionId);
                break;
            case 'update_tab':
                tabById.set(operation.tab.id, operation.tab);
                break;
            case 'set_active_tab':
                state.activeTabId = operation.tabId;
                break;
            case 'append_notes':
                nextDsl.notes = uniqueStrings(nextDsl.notes.concat(operation.notes));
                break;
            case 'set_selection':
                state.collectionSelection[operation.datasetId] = uniqueStrings(operation.entityIds);
                break;
            case 'set_status':
                nextDsl.status = operation.status;
                state.statusMessage = operation.message ?? null;
                break;
            case 'set_action_state':
                state.actionState[operation.actionId] = operation.state;
                break;
        }
    }
    nextDsl.datasets = [...datasetById.values()];
    nextDsl.sections = [...sectionById.values()];
    nextDsl.tabs = [...tabById.values()];
    return {
        dsl: nextDsl,
        state,
        warnings
    };
}
function filterCanonicalDslReferences(dsl, baseModel, repairs, warnings) {
    const validDatasetIds = new Set(baseModel.collections.map((collection) => collection.id));
    const validEntityIds = new Set(baseModel.entities.map((entity) => entity.id));
    const validActionIds = new Set(baseModel.actions.map((action) => action.id));
    const datasets = dsl.datasets
        .filter((dataset) => {
        if (validDatasetIds.has(dataset.id)) {
            return true;
        }
        warnings.push(`Dropped unknown dataset override ${dataset.id}.`);
        registerDroppedKey(repairs, `datasets.${dataset.id}`);
        return false;
    })
        .map((dataset) => {
        const collection = baseModel.collections.find((candidate) => candidate.id === dataset.id);
        const validFields = uniqueStrings(dataset.fields.filter((field) => collection?.fieldKeys.includes(field) ?? true));
        if (dataset.fields.length > 0 && validFields.length !== dataset.fields.length) {
            warnings.push(`Dropped unsupported dataset fields from ${dataset.id}.`);
        }
        return {
            ...dataset,
            fields: validFields,
            focusEntityId: dataset.focusEntityId && validEntityIds.has(dataset.focusEntityId) ? dataset.focusEntityId : null
        };
    });
    const datasetIds = new Set(datasets.map((dataset) => dataset.id).concat(baseModel.collections.map((collection) => collection.id)));
    const actions = dsl.actions.filter((action) => {
        if (!validActionIds.has(action.id)) {
            warnings.push(`Dropped unknown action reference ${action.id}.`);
            registerDroppedKey(repairs, `actions.${action.id}`);
            return false;
        }
        if (action.datasetId && !datasetIds.has(action.datasetId)) {
            warnings.push(`Dropped dataset binding ${action.datasetId} from action ${action.id}.`);
            return false;
        }
        return true;
    });
    const sections = dsl.sections.flatMap((section) => {
        const collection = section.datasetId ? baseModel.collections.find((candidate) => candidate.id === section.datasetId) : null;
        const requiresDataset = section.type === 'dataset' || section.type === 'comparison' || section.type === 'detail' || section.type === 'timeline';
        if (section.datasetId && !datasetIds.has(section.datasetId)) {
            if (requiresDataset) {
                warnings.push(`Dropped section ${section.id} because dataset ${section.datasetId} was unavailable.`);
                registerDroppedKey(repairs, `sections.${section.id}`);
                return [];
            }
            section = {
                ...section,
                datasetId: undefined
            };
        }
        const entityIds = section.entityIds.filter((entityId) => validEntityIds.has(entityId));
        if (entityIds.length !== section.entityIds.length) {
            warnings.push(`Dropped unavailable entity ids from section ${section.id}.`);
        }
        const actionIds = section.actionIds.filter((actionId) => validActionIds.has(actionId));
        if (actionIds.length !== section.actionIds.length) {
            warnings.push(`Dropped unavailable action ids from section ${section.id}.`);
        }
        const fieldKeys = collection?.fieldKeys?.length
            ? uniqueStrings(section.fields.filter((field) => collection.fieldKeys.includes(field)))
            : section.fields;
        if (fieldKeys.length !== section.fields.length) {
            warnings.push(`Dropped unsupported field keys from section ${section.id}.`);
        }
        return [
            {
                ...section,
                entityIds,
                actionIds,
                fields: fieldKeys
            }
        ];
    });
    const normalizedSections = sections.length > 0 ? sections : createDefaultSections(dsl, baseModel, repairs);
    const sectionIds = new Set(normalizedSections.map((section) => section.id));
    const tabs = dsl.tabs.flatMap((tab) => {
        const sectionIdsForTab = tab.sectionIds.filter((sectionId) => sectionIds.has(sectionId));
        if (sectionIdsForTab.length === 0) {
            warnings.push(`Dropped tab ${tab.id} because it no longer referenced any valid sections.`);
            registerDroppedKey(repairs, `tabs.${tab.id}`);
            return [];
        }
        return [
            {
                ...tab,
                sectionIds: sectionIdsForTab
            }
        ];
    });
    return {
        ...dsl,
        datasets,
        actions,
        sections: normalizedSections,
        tabs: tabs.length > 0 ? tabs : createDefaultTabs(normalizedSections, repairs),
        semanticHints: {
            ...dsl.semanticHints,
            primaryDatasetId: dsl.semanticHints.primaryDatasetId && datasetIds.has(dsl.semanticHints.primaryDatasetId)
                ? dsl.semanticHints.primaryDatasetId
                : datasets[0]?.id ?? baseModel.collections[0]?.id
        }
    };
}
function buildCollectionMarkdownNote(collection, dataset) {
    return dataset?.notes[0] ?? (typeof collection.metadata.summary === 'string' ? collection.metadata.summary : undefined);
}
function buildRecipeSectionBody(section) {
    if (section.body) {
        return section.body;
    }
    if (section.type === 'links') {
        return formatLinksMarkdown(section.links) ?? undefined;
    }
    if (section.type === 'notes') {
        const metadataNotes = Array.isArray(section.metadata.notes) ? asStringArray(section.metadata.notes) : [];
        const notes = uniqueStrings([section.summary, ...metadataNotes].filter((note) => Boolean(note)));
        return formatNotesMarkdown(notes) ?? undefined;
    }
    if (section.type === 'media') {
        const mediaMarkdown = section.media
            .map((image) => `![${image.alt ?? 'media'}](${image.url})`)
            .join('\n');
        return mediaMarkdown || undefined;
    }
    if (section.type === 'status' && section.summary) {
        return section.summary;
    }
    return undefined;
}
function materializeRecipeModel(dsl, baseModel, stateEffects) {
    const nextModel = structuredClone(baseModel);
    const collectionById = new Map(nextModel.collections.map((collection) => [collection.id, collection]));
    nextModel.title = dsl.title ?? nextModel.title;
    nextModel.subtitle = dsl.subtitle;
    nextModel.description = dsl.summary;
    nextModel.status = dsl.status ?? nextModel.status;
    nextModel.metadata = {
        ...nextModel.metadata,
        ...dsl.metadata,
        dslSummary: dsl.summary,
        dslNotes: dsl.notes,
        dslSemanticHints: dsl.semanticHints,
        source: 'hermes_recipe_dsl'
    };
    nextModel.collections = nextModel.collections.map((collection) => {
        const dataset = dsl.datasets.find((candidate) => candidate.id === collection.id);
        if (!dataset) {
            return collection;
        }
        return {
            ...collection,
            label: dataset.title ?? collection.label,
            preferredView: mapCollectionPreferredView(dataset.display),
            fieldKeys: dataset.fields.length > 0 ? dataset.fields : collection.fieldKeys,
            detailEntityId: dataset.focusEntityId && collection.entityIds.includes(dataset.focusEntityId) ? dataset.focusEntityId : collection.detailEntityId,
            emptyState: dataset.emptyState ?? collection.emptyState,
            metadata: {
                ...collection.metadata,
                ...dataset.metadata,
                summary: dataset.summary ?? buildCollectionMarkdownNote(collection, dataset),
                notes: dataset.notes
            }
        };
    });
    nextModel.sections = dsl.sections.map((section) => {
        const collection = section.datasetId ? collectionById.get(section.datasetId) : undefined;
        const dataset = section.datasetId ? dsl.datasets.find((candidate) => candidate.id === section.datasetId) : undefined;
        return {
            id: section.id,
            kind: mapSectionKind(section, dataset?.display ?? mapDatasetDisplay(asString(section.metadata.display))),
            title: section.title,
            description: section.summary,
            collectionId: section.datasetId ?? null,
            entityId: section.entityIds[0] ?? collection?.detailEntityId ?? null,
            actionIds: section.actionIds,
            fieldKeys: section.fields.length > 0 ? section.fields : collection?.fieldKeys ?? [],
            status: 'ready',
            body: buildRecipeSectionBody(section),
            emptyState: section.emptyState,
            metadata: {
                ...section.metadata,
                links: section.links,
                media: section.media,
                stats: section.stats,
                entityIds: section.entityIds
            }
        };
    });
    nextModel.views = dsl.tabs.map((tab) => ({
        id: `view-${tab.id}`,
        label: tab.label,
        sectionIds: tab.sectionIds,
        layout: tab.layout,
        metadata: tab.metadata
    }));
    nextModel.tabs = dsl.tabs.map((tab) => ({
        id: tab.id,
        label: tab.label,
        viewId: `view-${tab.id}`,
        status: 'ready',
        metadata: tab.metadata
    }));
    nextModel.state.activeTabId =
        stateEffects.activeTabId && nextModel.tabs.some((tab) => tab.id === stateEffects.activeTabId)
            ? stateEffects.activeTabId
            : nextModel.tabs[0]?.id ?? null;
    nextModel.state.collectionState = {
        ...nextModel.state.collectionState
    };
    for (const [datasetId, entityIds] of Object.entries(stateEffects.collectionSelection)) {
        nextModel.state.collectionState[datasetId] = {
            ...(nextModel.state.collectionState[datasetId] ?? {
                selectedEntityIds: [],
                page: 1,
                filters: {}
            }),
            selectedEntityIds: entityIds
        };
    }
    nextModel.state.actionState = {
        ...nextModel.state.actionState,
        ...stateEffects.actionState
    };
    if (stateEffects.statusMessage) {
        nextModel.state.localState.recipeStatusMessage = stateEffects.statusMessage;
    }
    nextModel.revision = Math.max(baseModel.revision + 1, nextModel.revision + 1);
    return nextModel;
}
export function normalizeRecipeDsl(input) {
    const warnings = [];
    const errors = [];
    const repairs = createRepairSummary();
    const canonicalDsl = buildCanonicalRecipeDsl(input, repairs, warnings, errors);
    if (!canonicalDsl) {
        return {
            dsl: null,
            model: null,
            patch: null,
            warnings,
            errors,
            repairs
        };
    }
    const operationResult = applyAuthoringOperations(canonicalDsl);
    warnings.push(...operationResult.warnings);
    const filteredDsl = filterCanonicalDslReferences(operationResult.dsl, input.baseModel, repairs, warnings);
    const parsedDsl = RecipeAuthoringDslSchema.safeParse(filteredDsl);
    if (!parsedDsl.success) {
        errors.push(parsedDsl.error.message);
        return {
            dsl: null,
            model: null,
            patch: null,
            warnings,
            errors,
            repairs
        };
    }
    const nextModel = materializeRecipeModel(parsedDsl.data, input.baseModel, operationResult.state);
    let parsedModel;
    try {
        parsedModel = RecipeModelSchema.parse(nextModel);
    }
    catch (error) {
        errors.push(error instanceof Error ? error.message : 'Recipe DSL normalization failed.');
        return {
            dsl: parsedDsl.data,
            model: null,
            patch: null,
            warnings,
            errors,
            repairs
        };
    }
    if (parsedModel.sections.length === 0 || parsedModel.views.length === 0 || parsedModel.tabs.length === 0) {
        errors.push('Recipe DSL normalization produced an empty section, view, or tab set.');
        return {
            dsl: parsedDsl.data,
            model: null,
            patch: null,
            warnings,
            errors,
            repairs
        };
    }
    return {
        dsl: parsedDsl.data,
        model: parsedModel,
        patch: synthesizeRecipeModelPatch(input.baseModel, parsedModel),
        warnings,
        errors,
        repairs
    };
}

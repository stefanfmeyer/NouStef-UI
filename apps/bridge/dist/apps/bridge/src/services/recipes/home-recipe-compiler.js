import { RecipeActionSpecSchema, RecipeAnalysisSchema, RecipeAnalysisDatasetSchema, RecipeFallbackStateSchema, RecipeIntentSchema, RecipeNormalizedDataSchema, RecipeRawDataSchema, RecipeSummarySchema, RecipeTestResultsSchema, RecipeTestSpecSchema, RecipeUiSpecSchema, RecipeUserPromptArtifactSchema } from '@hermes-recipes/protocol';
import { buildRecipeModel } from './recipe-model';
function truncate(value, length) {
    if (value.length <= length) {
        return value;
    }
    return `${value.slice(0, Math.max(0, length - 1)).trimEnd()}…`;
}
function humanizeKey(key) {
    return key
        .replace(/[._-]+/gu, ' ')
        .replace(/\s+/gu, ' ')
        .trim()
        .replace(/\b\w/gu, (character) => character.toUpperCase());
}
function normalizePrompt(prompt) {
    return prompt.replace(/\s+/gu, ' ').trim();
}
function sanitizeDatasetId(value) {
    const normalized = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/gu, '-')
        .replace(/^-+|-+$/gu, '');
    return normalized || 'dataset';
}
function createDatasetId(path, context) {
    const baseId = sanitizeDatasetId(path);
    if (!context.datasets.some((dataset) => dataset.id === baseId)) {
        return baseId;
    }
    let suffix = 2;
    while (context.datasets.some((dataset) => dataset.id === `${baseId}-${suffix}`)) {
        suffix += 1;
    }
    return `${baseId}-${suffix}`;
}
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function isPrimitiveValue(value) {
    return value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}
function isHttpUrl(value) {
    return /^https?:\/\/\S+$/iu.test(value.trim());
}
function isEmailValue(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value.trim()) || /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value.trim());
}
function isDateLikeValue(value) {
    const trimmed = value.trim();
    if (!trimmed) {
        return false;
    }
    if (/^\d{4}-\d{2}-\d{2}(?:[tT ][\d:.+-Zz]+)?$/u.test(trimmed)) {
        return true;
    }
    const parsed = Date.parse(trimmed);
    return Number.isFinite(parsed) && parsed > 0;
}
function toCellValue(key, value) {
    if (value === null || typeof value === 'number' || typeof value === 'boolean') {
        return value;
    }
    if (typeof value !== 'string') {
        return null;
    }
    const trimmed = value.trim();
    if (!trimmed) {
        return '';
    }
    if (isHttpUrl(trimmed)) {
        return {
            text: trimmed,
            href: trimmed,
            kind: 'link'
        };
    }
    if (isEmailValue(trimmed)) {
        const href = trimmed.startsWith('mailto:') ? trimmed : `mailto:${trimmed}`;
        return {
            text: trimmed.replace(/^mailto:/iu, ''),
            href,
            kind: 'email'
        };
    }
    if (/image|photo|logo|avatar|thumbnail/iu.test(key) && isHttpUrl(trimmed)) {
        return {
            imageUrl: trimmed,
            imageAlt: humanizeKey(key),
            text: humanizeKey(key),
            href: trimmed,
            kind: 'link'
        };
    }
    return trimmed;
}
function getCellText(value) {
    if (value === null) {
        return '';
    }
    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }
    if (typeof value === 'number' || typeof value === 'string') {
        return String(value).trim();
    }
    if (typeof value.text === 'string' && value.text.trim().length > 0) {
        return value.text.trim();
    }
    if (typeof value.imageAlt === 'string' && value.imageAlt.trim().length > 0) {
        return value.imageAlt.trim();
    }
    return '';
}
function extractLinksFromValues(values) {
    return Object.entries(values)
        .flatMap(([key, value]) => {
        if (typeof value === 'object' && value !== null && typeof value.href === 'string' && value.href.trim().length > 0) {
            return [
                {
                    label: humanizeKey(key),
                    url: value.href,
                    kind: value.kind === 'email' ? 'email' : 'website'
                }
            ];
        }
        return [];
    })
        .slice(0, 4);
}
function flattenScalarEntries(value, prefix = '', values = {}) {
    if (!isRecord(value)) {
        return values;
    }
    for (const [key, child] of Object.entries(value)) {
        const nextKey = prefix ? `${prefix}.${key}` : key;
        if (isPrimitiveValue(child)) {
            const cellValue = toCellValue(nextKey, child);
            if (cellValue !== null) {
                values[nextKey] = cellValue;
            }
            continue;
        }
        if (isRecord(child)) {
            flattenScalarEntries(child, nextKey, values);
        }
    }
    return values;
}
function pickPrimaryTextKey(values) {
    const preferredKeys = ['title', 'name', 'subject', 'label'];
    for (const key of preferredKeys) {
        if (key in values && getCellText(values[key]).length > 0) {
            return key;
        }
    }
    return Object.entries(values).find(([key, value]) => {
        const text = getCellText(value);
        return text.length > 0 && !isHttpUrl(text) && !isEmailValue(text) && !/^(id|parentId)$/iu.test(key);
    })?.[0];
}
function pickSubtitleKey(values, excluded) {
    const preferredKeys = ['subtitle', 'location', 'category', 'type', 'status'];
    for (const key of preferredKeys) {
        if (!excluded.includes(key) && key in values && getCellText(values[key]).length > 0) {
            return key;
        }
    }
    return Object.entries(values).find(([key, value]) => {
        const text = getCellText(value);
        return !excluded.includes(key) && text.length > 0 && !isHttpUrl(text) && !isEmailValue(text);
    })?.[0];
}
function pickDescriptionKey(values, excluded) {
    const preferredKeys = ['description', 'summary', 'details', 'note', 'notes'];
    for (const key of preferredKeys) {
        if (!excluded.includes(key) && key in values && getCellText(values[key]).length > 0) {
            return key;
        }
    }
    return undefined;
}
function inferFieldValueKind(key, values) {
    const nonEmptyValues = values.filter((value) => value !== undefined);
    if (nonEmptyValues.length === 0) {
        return 'mixed';
    }
    const allBooleans = nonEmptyValues.every((value) => typeof value === 'boolean');
    if (allBooleans) {
        return 'boolean';
    }
    const allNumbers = nonEmptyValues.every((value) => typeof value === 'number');
    if (allNumbers) {
        return 'number';
    }
    const texts = nonEmptyValues.map((value) => getCellText(value)).filter((value) => value.length > 0);
    if (texts.length === 0) {
        return 'null';
    }
    if (texts.every((value) => isHttpUrl(value))) {
        return 'link';
    }
    if (texts.every((value) => isEmailValue(value))) {
        return 'email';
    }
    if (/date|time|updated|created|published|sent/iu.test(key) || texts.every((value) => isDateLikeValue(value))) {
        return 'date';
    }
    return 'string';
}
function inferFieldRoles(key, values, totalCount) {
    const roles = [];
    const loweredKey = key.toLowerCase();
    const texts = values.map((value) => (value === undefined ? '' : getCellText(value))).filter((value) => value.length > 0);
    const distinctCount = new Set(texts).size;
    if (/^(title|name|subject|label)$/iu.test(key)) {
        roles.push('title');
    }
    if (/subtitle|location|category|type|status/iu.test(loweredKey)) {
        roles.push('subtitle');
    }
    if (/description|summary|details|note/iu.test(loweredKey)) {
        roles.push('description');
    }
    if (/price|amount|count|total|score|rating/iu.test(loweredKey)) {
        roles.push('metric');
    }
    if (/date|time|updated|created|published|sent/iu.test(loweredKey) || texts.every((value) => isDateLikeValue(value))) {
        roles.push('time', 'sort');
    }
    if (texts.every((value) => isHttpUrl(value))) {
        roles.push('link');
    }
    if (texts.every((value) => isEmailValue(value))) {
        roles.push('email');
    }
    if (distinctCount > 1 && distinctCount <= 6 && distinctCount < totalCount && texts.every((value) => value.length > 0)) {
        roles.push('group');
    }
    if (!roles.includes('sort') && distinctCount > 1) {
        roles.push('sort');
    }
    return [...new Set(roles)];
}
function recordValuesToAnalysisRecord(rawRecord, index, parentMetadata) {
    const flatValues = flattenScalarEntries(rawRecord);
    if (parentMetadata?.parentId) {
        flatValues.parentId = parentMetadata.parentId;
    }
    if (parentMetadata?.parentTitle) {
        flatValues.parentTitle = parentMetadata.parentTitle;
    }
    const titleKey = pickPrimaryTextKey(flatValues) ?? 'id';
    const subtitleKey = pickSubtitleKey(flatValues, [titleKey]);
    const descriptionKey = pickDescriptionKey(flatValues, [titleKey, subtitleKey ?? '']);
    const title = getCellText(flatValues[titleKey] ?? String(index + 1)) || `Item ${index + 1}`;
    const subtitle = subtitleKey ? getCellText(flatValues[subtitleKey]) || undefined : undefined;
    const description = descriptionKey ? getCellText(flatValues[descriptionKey]) || undefined : undefined;
    const badges = Object.entries(flatValues)
        .filter(([key, value]) => /status|tag|badge|type/iu.test(key) && getCellText(value).length > 0)
        .map(([, value]) => getCellText(value))
        .slice(0, 3);
    return {
        id: typeof rawRecord.id === 'string' && rawRecord.id.trim().length > 0
            ? rawRecord.id
            : `${sanitizeDatasetId(title)}-${index + 1}`,
        title,
        subtitle,
        description,
        badges,
        values: flatValues,
        links: extractLinksFromValues(flatValues),
        metadata: {}
    };
}
function buildAnalysisFields(records, path) {
    const fieldKeys = Array.from(new Set(records.flatMap((record) => Object.keys(record.values))).values());
    return fieldKeys.map((key) => {
        const values = records.map((record) => record.values[key]);
        const texts = values.map((value) => (value === undefined ? '' : getCellText(value))).filter((value) => value.length > 0);
        return {
            key,
            label: humanizeKey(key),
            path: `${path}.${key}`,
            valueKind: inferFieldValueKind(key, values),
            roles: inferFieldRoles(key, values, records.length),
            distinctCount: new Set(texts).size,
            nonEmptyCount: texts.length,
            examples: Array.from(new Set(texts)).slice(0, 3)
        };
    });
}
function collectNestedBuckets(records, rawRecords) {
    const buckets = new Map();
    rawRecords.forEach((rawRecord, index) => {
        const parentRecord = records[index];
        if (!parentRecord) {
            return;
        }
        for (const [key, value] of Object.entries(rawRecord)) {
            if (!Array.isArray(value) && !isRecord(value)) {
                continue;
            }
            const entries = buckets.get(key) ?? [];
            if (Array.isArray(value)) {
                for (const item of value) {
                    entries.push({
                        value: item,
                        parentId: parentRecord.id,
                        parentTitle: parentRecord.title
                    });
                }
            }
            else {
                entries.push({
                    value,
                    parentId: parentRecord.id,
                    parentTitle: parentRecord.title
                });
            }
            buckets.set(key, entries);
        }
    });
    return buckets;
}
function buildCollectionDataset(rawRecords, label, path, timestamp, context, parentDatasetId, parentFieldKey) {
    const datasetId = createDatasetId(path, context);
    const records = rawRecords.map((record, index) => recordValuesToAnalysisRecord(record, index));
    const fields = buildAnalysisFields(records, path);
    const itemCount = records.length;
    const candidateGroupKeys = fields
        .filter((field) => field.roles.includes('group'))
        .map((field) => field.key)
        .slice(0, 3);
    const candidateSortKeys = fields
        .filter((field) => field.roles.includes('sort') || field.roles.includes('time') || field.valueKind === 'number')
        .map((field) => field.key)
        .slice(0, 4);
    const detailFieldKeys = fields
        .filter((field) => !field.roles.includes('title'))
        .map((field) => field.key)
        .slice(0, 6);
    const timeFieldKey = fields.find((field) => field.roles.includes('time'))?.key;
    const defaultView = itemCount === 1 && detailFieldKeys.length > 0
        ? 'property_sheet'
        : timeFieldKey && itemCount <= 12
            ? 'timeline'
            : candidateGroupKeys.length > 0 && itemCount > 4
                ? 'grouped_collection'
                : 'collection';
    const dataset = {
        id: datasetId,
        label,
        path,
        kind: defaultView === 'timeline'
            ? 'timeline'
            : defaultView === 'grouped_collection'
                ? 'grouped_collection'
                : itemCount === 1
                    ? 'entity'
                    : 'collection',
        origin: 'array',
        itemCount,
        cardinality: itemCount === 0 ? 'zero' : itemCount === 1 ? 'one' : 'many',
        parentDatasetId,
        parentFieldKey,
        fields,
        records,
        notes: [],
        links: records.flatMap((record) => record.links).slice(0, 12),
        candidateGroupKeys,
        candidateSortKeys,
        detailFieldKeys,
        timeFieldKey,
        defaultView,
        pageSize: Math.max(1, Math.min(6, itemCount === 0 ? 1 : itemCount <= 3 ? itemCount : 6)),
        metadata: {
            derivedAt: timestamp
        }
    };
    context.datasets.push(RecipeAnalysisDatasetSchema.parse(dataset));
    const nestedBuckets = collectNestedBuckets(records, rawRecords);
    for (const [fieldKey, entries] of nestedBuckets.entries()) {
        const normalizedEntries = entries.map((entry) => {
            if (isRecord(entry.value)) {
                return {
                    ...entry.value,
                    parentId: entry.parentId,
                    parentTitle: entry.parentTitle
                };
            }
            return {
                value: entry.value,
                parentId: entry.parentId,
                parentTitle: entry.parentTitle
            };
        });
        analyzeValue(normalizedEntries, `${label} ${humanizeKey(fieldKey)}`, `${path}.${fieldKey}`, timestamp, context, datasetId, fieldKey);
    }
    return datasetId;
}
function buildEntityDataset(rawRecord, label, path, timestamp, context, parentDatasetId, parentFieldKey) {
    const datasetId = createDatasetId(path, context);
    const record = recordValuesToAnalysisRecord(rawRecord, 0);
    const fields = buildAnalysisFields([record], path);
    const dataset = {
        id: datasetId,
        label,
        path,
        kind: 'entity',
        origin: 'object',
        itemCount: 1,
        cardinality: 'one',
        parentDatasetId,
        parentFieldKey,
        fields,
        records: [record],
        notes: [],
        links: record.links,
        candidateGroupKeys: [],
        candidateSortKeys: fields.filter((field) => field.roles.includes('sort')).map((field) => field.key).slice(0, 4),
        detailFieldKeys: fields.map((field) => field.key).slice(0, 8),
        timeFieldKey: fields.find((field) => field.roles.includes('time'))?.key,
        defaultView: 'property_sheet',
        pageSize: 1,
        metadata: {
            derivedAt: timestamp
        }
    };
    context.datasets.push(RecipeAnalysisDatasetSchema.parse(dataset));
    for (const [fieldKey, value] of Object.entries(rawRecord)) {
        if (!Array.isArray(value) && !isRecord(value)) {
            continue;
        }
        analyzeValue(Array.isArray(value)
            ? value.map((entry) => isRecord(entry)
                ? {
                    ...entry,
                    parentId: record.id,
                    parentTitle: record.title
                }
                : {
                    value: entry,
                    parentId: record.id,
                    parentTitle: record.title
                })
            : {
                ...value,
                parentId: record.id,
                parentTitle: record.title
            }, `${label} ${humanizeKey(fieldKey)}`, `${path}.${fieldKey}`, timestamp, context, datasetId, fieldKey);
    }
    return datasetId;
}
function analyzeValue(value, label, path, timestamp, context, parentDatasetId, parentFieldKey) {
    if (Array.isArray(value)) {
        if (value.every((item) => isRecord(item))) {
            return buildCollectionDataset(value, label, path, timestamp, context, parentDatasetId, parentFieldKey);
        }
        const normalizedPrimitiveRecords = value.map((item) => isRecord(item)
            ? item
            : {
                value: item
            });
        return buildCollectionDataset(normalizedPrimitiveRecords, label, path, timestamp, context, parentDatasetId, parentFieldKey);
    }
    if (isRecord(value)) {
        const scalarEntries = Object.entries(value).filter(([, child]) => isPrimitiveValue(child));
        const complexEntries = Object.entries(value).filter(([, child]) => Array.isArray(child) || isRecord(child));
        if (scalarEntries.length === 0 && complexEntries.length > 0) {
            let firstDatasetId = null;
            complexEntries.forEach(([fieldKey, child], index) => {
                const childLabel = complexEntries.length === 1 ? label : `${label} ${humanizeKey(fieldKey)}`;
                const datasetId = analyzeValue(child, childLabel, `${path}.${fieldKey}`, timestamp, context, parentDatasetId, parentFieldKey);
                if (index === 0 && typeof datasetId === 'string') {
                    firstDatasetId = datasetId;
                }
            });
            return firstDatasetId;
        }
        return buildEntityDataset(value, label, path, timestamp, context, parentDatasetId, parentFieldKey);
    }
    return null;
}
function buildSummaryStats(datasets) {
    return datasets
        .filter((dataset) => !dataset.parentDatasetId)
        .slice(0, 4)
        .map((dataset, index) => ({
        id: `stat-${dataset.id}`,
        label: dataset.label,
        value: String(dataset.itemCount),
        emphasis: index === 0 ? 'primary' : 'none',
        tone: 'info'
    }));
}
function mapContentFormatToPresentation(value) {
    if (!value) {
        return undefined;
    }
    switch (value) {
        case 'table':
            return 'table';
        case 'markdown':
            return 'markdown';
        case 'card':
            return 'cards';
        default:
            return undefined;
    }
}
function resolvePrimaryPresentationHint(input) {
    return input.envelope.intentHints?.preferredPresentation ?? mapContentFormatToPresentation(input.intentHint?.preferredContentFormat);
}
export function analyzeRecipeData(rawData, assistantContext, options) {
    const context = {
        datasets: []
    };
    analyzeValue(rawData.payload, options.semanticHints?.primaryDatasetLabel ?? options.datasetLabel, 'root', options.timestamp, context);
    const primaryDatasetId = options.semanticHints?.primaryDatasetPath
        ? context.datasets.find((dataset) => dataset.path === options.semanticHints?.primaryDatasetPath)?.id
        : undefined;
    const summaryStats = buildSummaryStats(context.datasets);
    const notes = [...(options.semanticHints?.notes ?? []), assistantContext.summary].filter((value, index, values) => value.trim().length > 0 && values.indexOf(value) === index);
    return RecipeAnalysisSchema.parse({
        kind: 'analysis',
        schemaVersion: 'recipe_analysis/v1',
        primaryDatasetId: primaryDatasetId ??
            context.datasets.find((dataset) => !dataset.parentDatasetId && dataset.cardinality === 'many')?.id ??
            context.datasets.find((dataset) => !dataset.parentDatasetId)?.id,
        datasets: context.datasets,
        summaryStats,
        notes,
        links: [...rawData.links, ...assistantContext.links].slice(0, 12),
        metadata: {
            derivedAt: options.timestamp
        }
    });
}
function toLegacyPresentation(defaultView) {
    switch (defaultView) {
        case 'property_sheet':
            return 'detail';
        case 'timeline':
        case 'grouped_collection':
            return 'list';
        case 'markdown':
            return 'markdown';
        default:
            return 'cards';
    }
}
function toNormalizedField(field, record) {
    const value = record?.values[field.key] ?? field.examples[0] ?? '';
    return {
        key: field.key,
        label: field.label,
        value,
        presentation: field.valueKind === 'email'
            ? 'email'
            : field.valueKind === 'link'
                ? 'link'
                : /badge|status/iu.test(field.key)
                    ? 'badge'
                    : 'text',
        emphasis: field.roles.includes('metric') ? 'primary' : field.roles.includes('group') ? 'status' : 'none'
    };
}
function toNormalizedItem(record, fields) {
    return {
        id: record.id,
        title: record.title,
        subtitle: record.subtitle,
        description: record.description,
        badges: record.badges,
        fields: fields
            .filter((field) => !field.roles.includes('title'))
            .slice(0, 8)
            .map((field) => toNormalizedField(field, record)),
        links: record.links,
        metadata: record.metadata
    };
}
export function deriveNormalizedDataFromAnalysis(analysis, options = {}) {
    const datasets = analysis.datasets.map((dataset) => {
        const stats = dataset.itemCount > 0
            ? [
                {
                    id: `stat-${dataset.id}`,
                    label: 'Items',
                    value: String(dataset.itemCount),
                    emphasis: 'primary',
                    tone: 'info'
                }
            ]
            : [];
        const preferredPresentation = dataset.id === analysis.primaryDatasetId && options.primaryDatasetPreferredPresentation
            ? options.primaryDatasetPreferredPresentation
            : toLegacyPresentation(dataset.defaultView);
        return {
            id: dataset.id,
            label: dataset.label,
            kind: dataset.kind === 'entity' ? 'detail' : 'collection',
            preferredPresentation,
            items: dataset.records.map((record) => toNormalizedItem(record, dataset.fields)),
            fields: dataset.fields.slice(0, 8).map((field) => toNormalizedField(field, dataset.records[0])),
            stats,
            notes: dataset.notes,
            pageInfo: {
                pageSize: dataset.pageSize,
                totalItems: dataset.itemCount,
                hasMore: false
            },
            metadata: {
                path: dataset.path,
                parentDatasetId: dataset.parentDatasetId ?? null,
                parentFieldKey: dataset.parentFieldKey ?? null,
                defaultView: dataset.defaultView
            }
        };
    });
    return RecipeNormalizedDataSchema.parse({
        kind: 'normalized_data',
        schemaVersion: 'recipe_normalized_data/v1',
        primaryDatasetId: analysis.primaryDatasetId ?? datasets[0]?.id ?? 'primary',
        datasets,
        summaryStats: analysis.summaryStats,
        notes: analysis.notes,
        links: analysis.links,
        metadata: analysis.metadata
    });
}
export function deriveNormalizedDataFromRawData(rawData, options) {
    const analysis = analyzeRecipeData(rawData, {
        kind: 'assistant_context',
        schemaVersion: 'recipe_assistant_context/v1',
        summary: options.datasetLabel,
        links: [],
        citations: [],
        metadata: {}
    }, {
        datasetLabel: options.datasetLabel,
        timestamp: options.timestamp
    });
    return deriveNormalizedDataFromAnalysis(analysis);
}
function buildFallbackSummaryMarkdown(title, assistantContext, normalizedData) {
    const primaryDataset = normalizedData.datasets.find((dataset) => dataset.id === normalizedData.primaryDatasetId) ?? normalizedData.datasets[0];
    const bullets = (primaryDataset?.items ?? [])
        .slice(0, 5)
        .map((item) => {
        const firstField = item.fields[0];
        return firstField?.value ? `- ${item.title} (${getCellText(firstField.value)})` : `- ${item.title}`;
    })
        .join('\n');
    const parts = [`## ${title}`];
    if (assistantContext.summary) {
        parts.push(assistantContext.summary);
    }
    if (bullets) {
        parts.push(bullets);
    }
    return parts.join('\n\n').trim();
}
function extractPromptEntities(prompt) {
    const entities = [];
    const locationMatch = prompt.match(/\b(?:in|near|around)\s+([A-Za-z0-9 .'-]+(?:,\s*[A-Z]{2})?)/iu);
    if (locationMatch?.[1]) {
        entities.push({
            kind: 'location',
            value: locationMatch[1].trim()
        });
    }
    return entities;
}
function extractPromptFilters(prompt) {
    const filters = [];
    if (/\bweekend\b/iu.test(prompt)) {
        filters.push({
            key: 'timeframe',
            label: 'Timeframe',
            value: 'weekend'
        });
    }
    return filters;
}
function resolveIntentPresentation(analysis, normalizedData, contentFormat) {
    if (contentFormat === 'markdown') {
        return 'markdown';
    }
    const primaryDataset = analysis.datasets.find((dataset) => dataset.id === analysis.primaryDatasetId) ?? analysis.datasets[0];
    if (!primaryDataset) {
        return 'markdown';
    }
    switch (primaryDataset.defaultView) {
        case 'property_sheet':
            return 'detail';
        case 'timeline':
        case 'grouped_collection':
            return 'list';
        default:
            return normalizedData.datasets[0]?.preferredPresentation ?? 'cards';
    }
}
function buildRecipeIntent(input, analysis, normalizedData) {
    const normalizedPrompt = normalizePrompt(input.prompt);
    return RecipeIntentSchema.parse({
        kind: 'intent',
        schemaVersion: 'recipe_intent/v1',
        category: input.envelope.intentHints?.category ?? input.intentHint?.category ?? 'general',
        label: input.envelope.intentHints?.label ?? input.intentHint?.label ?? input.envelope.recipe.title,
        summary: input.envelope.intentHints?.summary ?? input.envelope.assistantContext.summary ?? truncate(normalizedPrompt, 120),
        preferredPresentation: resolveIntentPresentation(analysis, normalizedData, input.intentHint?.preferredContentFormat),
        query: input.prompt,
        entities: extractPromptEntities(input.prompt),
        filters: extractPromptFilters(input.prompt),
        allowOutboundRequests: input.envelope.intentHints?.allowOutboundRequests ??
            input.envelope.actionHints?.allowRefresh ??
            (input.requestMode !== 'chat' || input.intentHint?.category === 'places'),
        destructiveIntent: input.envelope.intentHints?.destructiveIntent ?? false,
        updateTarget: input.currentRecipe ? 'current_recipe' : 'new_recipe',
        metadata: {
            requestMode: input.requestMode,
            derivedLocally: true,
            contractVersion: input.envelope.schemaVersion
        }
    });
}
function buildSummary(title, subtitle, analysis, assistantContext, timestamp, category) {
    return RecipeSummarySchema.parse({
        kind: 'summary',
        schemaVersion: 'recipe_summary/v1',
        title,
        subtitle: subtitle ?? assistantContext.summary ?? undefined,
        statusLabel: 'Ready',
        badges: ['dynamic', 'home', category].filter((value, index, values) => values.indexOf(value) === index),
        stats: analysis.summaryStats,
        links: analysis.links.length > 0 ? analysis.links : assistantContext.links,
        lastBuiltAt: timestamp,
        note: 'Locally analyzed and compiled for the attached Hermes Home recipe.'
    });
}
function buildFallback(summary, assistantContext, normalizedData) {
    const primaryDataset = normalizedData.datasets.find((dataset) => dataset.id === normalizedData.primaryDatasetId) ?? normalizedData.datasets[0];
    return RecipeFallbackStateSchema.parse({
        kind: 'fallback',
        schemaVersion: 'recipe_fallback/v1',
        title: summary.title,
        message: 'The rich recipe is unavailable. Showing a safe summary preview instead.',
        summaryMarkdown: buildFallbackSummaryMarkdown(summary.title, assistantContext, normalizedData),
        datasetPreview: (primaryDataset?.items ?? []).slice(0, 5),
        canRetry: true
    });
}
function buildActionSpec(userPrompt, intent, normalizedData, assistantContext) {
    const primaryDataset = normalizedData.datasets.find((dataset) => dataset.id === normalizedData.primaryDatasetId) ?? normalizedData.datasets[0];
    const actions = [];
    if (intent.allowOutboundRequests) {
        actions.push({
            id: 'refresh-recipe',
            label: 'Refresh',
            kind: 'prompt',
            intent: 'primary',
            description: 'Refresh this recipe using the original scope and the latest available data.',
            visibility: {
                requiresSelection: 'none',
                whenBuildReady: true
            },
            prompt: {
                promptTemplate: `Refresh the recipe for "${userPrompt.originalPrompt}" and replace stale items with the latest relevant results.`,
                includeInputs: ['original_prompt', 'intent', 'recipe_summary', 'raw_data', 'normalized_data', 'assistant_context', 'page_state', 'filter_state'],
                allowedMutations: ['raw_data', 'normalized_data', 'ui_spec', 'action_spec', 'assistant_response'],
                outboundRequestsAllowed: true,
                expectedOutput: 'recipe_data_update',
                timeoutMs: 120_000,
                retryable: true
            },
            metadata: {}
        });
    }
    if ((primaryDataset?.items.length ?? 0) > 0) {
        actions.push({
            id: 'refine-selection',
            label: 'Refine selection',
            kind: 'prompt',
            intent: 'secondary',
            description: 'Focus the recipe around the selected item and update the attached results.',
            visibility: {
                requiresSelection: 'single',
                whenBuildReady: true,
                datasetId: primaryDataset?.id
            },
            prompt: {
                promptTemplate: `Refine the current recipe around the selected item from "${assistantContext.summary ?? userPrompt.originalPrompt}".`,
                includeInputs: ['original_prompt', 'intent', 'recipe_summary', 'raw_data', 'normalized_data', 'selected_items', 'assistant_context'],
                allowedMutations: ['raw_data', 'normalized_data', 'ui_spec', 'assistant_response', 'item_state'],
                outboundRequestsAllowed: intent.allowOutboundRequests,
                expectedOutput: 'recipe_data_update',
                timeoutMs: intent.allowOutboundRequests ? 120_000 : 60_000,
                retryable: true
            },
            metadata: {}
        });
    }
    actions.push({
        id: 'retry-build',
        label: 'Retry enrichment',
        kind: 'bridge',
        intent: 'secondary',
        description: 'Retry the latest richer recipe enrichment from persisted Home artifacts.',
        visibility: {
            requiresSelection: 'none',
            whenBuildReady: false
        },
        bridge: {
            handler: 'retry_build',
            payload: {}
        },
        metadata: {}
    });
    return RecipeActionSpecSchema.parse({
        kind: 'action_spec',
        schemaVersion: 'recipe_action_spec/v1',
        actions
    });
}
function datasetActionIds(actionSpec) {
    return {
        refresh: actionSpec.actions.some((action) => action.id === 'refresh-recipe') ? ['refresh-recipe'] : [],
        refine: actionSpec.actions.some((action) => action.id === 'refine-selection') ? ['refine-selection'] : []
    };
}
function buildDatasetMarkdown(dataset) {
    const lines = [`## ${dataset.label}`];
    for (const record of dataset.records.slice(0, Math.max(1, dataset.pageSize))) {
        const heading = record.subtitle ? `- **${record.title}** — ${record.subtitle}` : `- **${record.title}**`;
        lines.push(heading);
        if (record.description) {
            lines.push(`  - ${record.description}`);
        }
        for (const field of dataset.fields.slice(0, 4)) {
            const text = getCellText(record.values[field.key] ?? '');
            if (!text) {
                continue;
            }
            lines.push(`  - ${field.label}: ${text}`);
        }
    }
    return lines.join('\n');
}
function buildDatasetNodes(dataset, actionSpec, options = {}) {
    const actionIds = datasetActionIds(actionSpec);
    const fieldKeys = dataset.fields
        .filter((field) => !field.roles.includes('title'))
        .map((field) => field.key)
        .slice(0, 6);
    const detailFieldKeys = dataset.detailFieldKeys.length > 0 ? dataset.detailFieldKeys : fieldKeys;
    const nodes = [];
    const preferredPresentationHint = dataset.id === options.primaryDatasetId ? options.preferredPresentationHint : undefined;
    if (dataset.itemCount === 0) {
        nodes.push({
            id: `${dataset.id}-empty`,
            kind: 'empty_state',
            title: `No ${dataset.label.toLowerCase()} yet`,
            description: 'Try broadening the request or refreshing the recipe.'
        });
        return nodes;
    }
    const sharedEmptyState = {
        title: `No ${dataset.label.toLowerCase()} yet`,
        description: 'Try broadening the request or refreshing the recipe.'
    };
    const sharedLoadingState = {
        title: `Loading ${dataset.label.toLowerCase()}`,
        description: 'Compiling a compact recipe view.'
    };
    const sharedErrorState = {
        title: `${dataset.label} unavailable`,
        description: 'The dataset could not be rendered.'
    };
    if (preferredPresentationHint === 'markdown') {
        nodes.push({
            id: `${dataset.id}-markdown`,
            kind: 'markdown_block',
            title: dataset.label,
            markdown: buildDatasetMarkdown(dataset)
        });
        return nodes;
    }
    if (dataset.defaultView === 'property_sheet' || dataset.kind === 'entity') {
        const propertyNode = {
            id: `${dataset.id}-property-sheet`,
            kind: 'property_sheet',
            title: dataset.label,
            datasetId: dataset.id,
            source: dataset.cardinality === 'one' ? 'single' : 'first',
            fieldKeys: detailFieldKeys,
            actionIds: actionIds.refine,
            emptyState: sharedEmptyState,
            loadingState: sharedLoadingState,
            errorState: sharedErrorState
        };
        nodes.push(propertyNode);
        return nodes;
    }
    if (dataset.defaultView === 'timeline' && dataset.timeFieldKey) {
        const timelineNode = {
            id: `${dataset.id}-timeline`,
            kind: 'timeline',
            title: dataset.label,
            datasetId: dataset.id,
            timeFieldKey: dataset.timeFieldKey,
            titleFieldKey: dataset.fields.find((field) => field.roles.includes('title'))?.key,
            bodyFieldKeys: fieldKeys,
            actionIds: actionIds.refine,
            emptyState: sharedEmptyState,
            loadingState: sharedLoadingState,
            errorState: sharedErrorState
        };
        nodes.push({
            id: `${dataset.id}-actions`,
            kind: 'action_bar',
            actionIds: [...actionIds.refresh]
        });
        nodes.push(timelineNode);
        if (dataset.itemCount > dataset.pageSize) {
            nodes.push({
                id: `${dataset.id}-pager`,
                kind: 'paginator',
                datasetId: dataset.id,
                pageSize: dataset.pageSize
            });
        }
        return nodes;
    }
    if (dataset.defaultView === 'grouped_collection' && dataset.candidateGroupKeys[0]) {
        nodes.push({
            id: `${dataset.id}-filters`,
            kind: 'filter_bar',
            datasetId: dataset.id,
            fieldKeys: dataset.candidateGroupKeys.slice(0, 2),
            placeholder: `Filter ${dataset.label.toLowerCase()}`
        });
        nodes.push({
            id: `${dataset.id}-actions`,
            kind: 'action_bar',
            actionIds: [...actionIds.refresh]
        });
        nodes.push({
            id: `${dataset.id}-grouped`,
            kind: 'grouped_collection',
            title: dataset.label,
            datasetId: dataset.id,
            groupByFieldKey: dataset.candidateGroupKeys[0],
            display: 'list',
            pageSize: dataset.pageSize,
            fieldKeys,
            actionIds: actionIds.refine,
            emptyState: sharedEmptyState,
            loadingState: sharedLoadingState,
            errorState: sharedErrorState
        });
        if (dataset.itemCount > dataset.pageSize) {
            nodes.push({
                id: `${dataset.id}-pager`,
                kind: 'paginator',
                datasetId: dataset.id,
                pageSize: dataset.pageSize
            });
        }
        return nodes;
    }
    const collectionNode = {
        id: `${dataset.id}-collection`,
        kind: 'collection',
        title: dataset.label,
        datasetId: dataset.id,
        display: preferredPresentationHint === 'table'
            ? 'table'
            : preferredPresentationHint === 'list'
                ? 'list'
                : preferredPresentationHint === 'cards'
                    ? 'cards'
                    : dataset.itemCount <= 3
                        ? 'cards'
                        : 'table',
        pageSize: dataset.pageSize,
        selectable: dataset.itemCount > 0 ? 'single' : 'none',
        fieldKeys,
        actionIds: actionIds.refine,
        emptyState: sharedEmptyState,
        loadingState: sharedLoadingState,
        errorState: sharedErrorState
    };
    nodes.push({
        id: `${dataset.id}-filters`,
        kind: 'filter_bar',
        datasetId: dataset.id,
        fieldKeys: dataset.candidateGroupKeys.slice(0, 2),
        placeholder: `Search ${dataset.label.toLowerCase()}`
    });
    nodes.push({
        id: `${dataset.id}-actions`,
        kind: 'action_bar',
        actionIds: [...actionIds.refresh]
    });
    nodes.push(collectionNode);
    nodes.push({
        id: `${dataset.id}-detail`,
        kind: 'detail_sheet',
        title: `${dataset.label} detail`,
        datasetId: dataset.id,
        source: 'selected',
        fieldKeys: detailFieldKeys,
        actionIds: actionIds.refine,
        emptyState: {
            title: 'Nothing selected',
            description: 'Select an item to inspect it in more detail.'
        },
        loadingState: sharedLoadingState,
        errorState: sharedErrorState
    });
    if (dataset.itemCount > dataset.pageSize) {
        nodes.push({
            id: `${dataset.id}-pager`,
            kind: 'paginator',
            datasetId: dataset.id,
            pageSize: dataset.pageSize
        });
    }
    return nodes;
}
function buildUiSpec(summary, analysis, actionSpec, assistantContext, options = {}) {
    const topLevelDatasets = analysis.datasets.filter((dataset) => !dataset.parentDatasetId);
    const overviewNodes = [];
    if (summary.stats.length > 0) {
        overviewNodes.push({
            id: 'overview-stats',
            kind: 'stat_grid',
            statIds: summary.stats.map((stat) => stat.id)
        });
    }
    const primaryActions = actionSpec.actions.some((action) => action.id === 'refresh-recipe') ? ['refresh-recipe'] : [];
    if (primaryActions.length > 0) {
        overviewNodes.push({
            id: 'overview-actions',
            kind: 'action_bar',
            actionIds: primaryActions
        });
    }
    const nodes = [];
    if (overviewNodes.length > 0) {
        nodes.push({
            id: 'overview',
            kind: 'section_group',
            title: 'Overview',
            description: summary.note,
            children: overviewNodes
        });
    }
    if (topLevelDatasets.length === 0) {
        nodes.push({
            id: 'home-markdown',
            kind: 'markdown_block',
            title: 'Home',
            markdown: [assistantContext.responseLead, assistantContext.responseTail].filter(Boolean).join('\n\n') || assistantContext.summary
        });
    }
    else if (topLevelDatasets.length === 1) {
        const primaryDataset = topLevelDatasets[0];
        nodes.push({
            id: primaryDataset.id,
            kind: 'section_group',
            title: primaryDataset.label,
            children: buildDatasetNodes(primaryDataset, actionSpec, {
                preferredPresentationHint: options.preferredPresentationHint,
                primaryDatasetId: analysis.primaryDatasetId
            })
        });
        const childDatasets = analysis.datasets.filter((dataset) => dataset.parentDatasetId === primaryDataset.id);
        for (const childDataset of childDatasets) {
            nodes.push({
                id: childDataset.id,
                kind: 'section_group',
                title: childDataset.label,
                children: buildDatasetNodes(childDataset, actionSpec, {
                    preferredPresentationHint: options.preferredPresentationHint,
                    primaryDatasetId: analysis.primaryDatasetId
                })
            });
        }
    }
    else {
        nodes.push({
            id: 'recipe-tabs',
            kind: 'tab_group',
            defaultTabId: topLevelDatasets[0]?.id,
            tabs: topLevelDatasets.map((dataset) => ({
                id: dataset.id,
                label: dataset.label,
                children: buildDatasetNodes(dataset, actionSpec, {
                    preferredPresentationHint: options.preferredPresentationHint,
                    primaryDatasetId: analysis.primaryDatasetId
                })
            }))
        });
    }
    if (analysis.notes.length > 0 || assistantContext.responseTail?.trim()) {
        nodes.push({
            id: 'recipe-notes',
            kind: 'markdown_block',
            title: 'Notes',
            markdown: [...analysis.notes, assistantContext.responseTail?.trim()].filter(Boolean).join('\n\n')
        });
    }
    return RecipeUiSpecSchema.parse({
        kind: 'ui_spec',
        schemaVersion: 'recipe_ui/v2',
        compact: {
            defaultNodeId: topLevelDatasets[0]?.id ?? 'home-markdown',
            maxCollectionColumns: 1,
            stickyActionBar: true
        },
        header: {
            title: summary.title,
            subtitle: summary.subtitle,
            statusLabel: summary.statusLabel,
            badges: summary.badges,
            statIds: summary.stats.map((stat) => stat.id),
            primaryActionIds: primaryActions,
            secondaryActionIds: []
        },
        nodes
    });
}
function buildTestSpec(uiSpec, actionSpec) {
    const cases = [
        {
            id: 'schema-valid',
            kind: 'schema_valid',
            severity: 'critical',
            config: {}
        },
        {
            id: 'render-smoke',
            kind: 'render_smoke',
            severity: 'critical',
            config: {}
        },
        {
            id: 'compact-layout',
            kind: 'compact_layout',
            severity: 'critical',
            config: {}
        },
        {
            id: 'actions-resolve',
            kind: 'actions_resolve',
            severity: 'critical',
            config: {}
        },
        {
            id: 'destructive-confirmation',
            kind: 'destructive_requires_confirmation',
            severity: 'critical',
            config: {}
        },
        {
            id: 'links-well-formed',
            kind: 'links_well_formed',
            severity: 'critical',
            config: {}
        }
    ];
    const visitNodes = (nodes) => {
        for (const node of nodes) {
            if (node.kind === 'collection' ||
                node.kind === 'grouped_collection' ||
                node.kind === 'detail_sheet' ||
                node.kind === 'property_sheet' ||
                node.kind === 'timeline') {
                cases.push({
                    id: `empty-${node.id}`,
                    kind: 'empty_state_present',
                    severity: 'critical',
                    sectionId: node.id,
                    config: {}
                });
                cases.push({
                    id: `loading-${node.id}`,
                    kind: 'loading_state_present',
                    severity: 'critical',
                    sectionId: node.id,
                    config: {}
                });
            }
            if (node.kind === 'collection' || node.kind === 'grouped_collection') {
                cases.push({
                    id: `pagination-${node.id}`,
                    kind: 'pagination_valid',
                    severity: 'critical',
                    sectionId: node.id,
                    config: {}
                });
            }
            if (node.kind === 'section_group') {
                visitNodes(node.children);
            }
            if (node.kind === 'tab_group') {
                for (const tab of node.tabs) {
                    visitNodes(tab.children);
                }
            }
        }
    };
    visitNodes(uiSpec.nodes);
    if (!actionSpec.actions.some((action) => action.id === 'retry-build')) {
        cases.push({
            id: 'retry-build-action',
            kind: 'actions_resolve',
            severity: 'warning',
            actionId: 'retry-build',
            config: {}
        });
    }
    return RecipeTestSpecSchema.parse({
        kind: 'test_spec',
        schemaVersion: 'recipe_test_spec/v1',
        cases
    });
}
function validateLinkUrl(value, isEmailLink) {
    const trimmed = value.trim();
    if (!trimmed) {
        return false;
    }
    if (isEmailLink) {
        return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(trimmed) || isEmailValue(trimmed);
    }
    return isHttpUrl(trimmed);
}
function collectNodeActionIds(nodes, actionIds = new Set()) {
    for (const node of nodes) {
        if (node.kind === 'collection' ||
            node.kind === 'grouped_collection' ||
            node.kind === 'property_sheet' ||
            node.kind === 'detail_sheet' ||
            node.kind === 'timeline' ||
            node.kind === 'action_bar') {
            for (const actionId of node.actionIds) {
                actionIds.add(actionId);
            }
        }
        if (node.kind === 'section_group') {
            collectNodeActionIds(node.children, actionIds);
        }
        if (node.kind === 'tab_group') {
            for (const tab of node.tabs) {
                collectNodeActionIds(tab.children, actionIds);
            }
        }
    }
    return actionIds;
}
function findNodeById(nodes, nodeId) {
    for (const node of nodes) {
        if (node.id === nodeId) {
            return node;
        }
        if (node.kind === 'section_group') {
            const found = findNodeById(node.children, nodeId);
            if (found) {
                return found;
            }
        }
        if (node.kind === 'tab_group') {
            for (const tab of node.tabs) {
                const found = findNodeById(tab.children, nodeId);
                if (found) {
                    return found;
                }
            }
        }
    }
    return null;
}
function collectNodeIds(nodes, ids = new Set()) {
    for (const node of nodes) {
        ids.add(node.id);
        if (node.kind === 'section_group') {
            collectNodeIds(node.children, ids);
        }
        if (node.kind === 'tab_group') {
            for (const tab of node.tabs) {
                ids.add(tab.id);
                collectNodeIds(tab.children, ids);
            }
        }
    }
    return ids;
}
function collectAllNodes(nodes, output = []) {
    for (const node of nodes) {
        output.push(node);
        if (node.kind === 'section_group') {
            collectAllNodes(node.children, output);
        }
        if (node.kind === 'tab_group') {
            for (const tab of node.tabs) {
                collectAllNodes(tab.children, output);
            }
        }
    }
    return output;
}
export function runRecipeTestHarness(input) {
    const actionIds = new Set(input.actionSpec.actions.map((action) => action.id));
    const datasetById = new Map(input.normalizedData.datasets.map((dataset) => [dataset.id, dataset]));
    const results = input.testSpec.cases.map((testCase) => {
        let passed = true;
        let message = 'Check passed.';
        switch (testCase.kind) {
            case 'schema_valid': {
                try {
                    RecipeNormalizedDataSchema.parse(input.normalizedData);
                    RecipeUiSpecSchema.parse(input.uiSpec);
                    RecipeActionSpecSchema.parse(input.actionSpec);
                    RecipeTestSpecSchema.parse(input.testSpec);
                    message = 'The dynamic recipe schemas validated successfully.';
                }
                catch (error) {
                    passed = false;
                    message = error instanceof Error ? error.message : 'Schema validation failed.';
                }
                break;
            }
            case 'render_smoke': {
                if (input.uiSpec.schemaVersion === 'recipe_ui/v2') {
                    const nodeIds = collectNodeIds(input.uiSpec.nodes);
                    const allNodes = collectAllNodes(input.uiSpec.nodes);
                    passed = input.uiSpec.header.title.trim().length > 0 && allNodes.length > 0 && nodeIds.size === allNodes.length;
                    message = passed ? 'The dynamic recipe contains a renderable header and node tree.' : 'The dynamic recipe is missing a required header or node.';
                }
                else {
                    const uniqueSectionIds = new Set(input.uiSpec.sections.map((section) => section.id));
                    passed = input.uiSpec.header.title.trim().length > 0 && input.uiSpec.sections.length > 0 && uniqueSectionIds.size === input.uiSpec.sections.length;
                    message = passed ? 'The dynamic recipe contains a renderable header and section set.' : 'The dynamic recipe is missing a required header or section.';
                }
                break;
            }
            case 'compact_layout': {
                if (input.uiSpec.schemaVersion === 'recipe_ui/v2') {
                    const nodes = collectAllNodes(input.uiSpec.nodes);
                    passed =
                        input.uiSpec.compact.maxCollectionColumns <= 2 &&
                            nodes.every((node) => {
                                if (node.kind === 'collection' || node.kind === 'grouped_collection') {
                                    return node.pageSize <= 6;
                                }
                                return true;
                            });
                }
                else {
                    const collectionSections = input.uiSpec.sections.filter((section) => section.kind === 'collection');
                    passed =
                        input.uiSpec.compact.maxCardColumns <= 2 &&
                            collectionSections.every((section) => section.pageSize <= 6) &&
                            (input.uiSpec.layout !== 'wizard' || input.uiSpec.sections.every((section) => section.kind !== 'wizard' || section.steps.length <= 4));
                }
                message = passed
                    ? 'The dynamic recipe stays within the compact pane layout constraints.'
                    : 'The dynamic recipe exceeds the compact pane layout constraints.';
                break;
            }
            case 'pagination_valid': {
                if (input.uiSpec.schemaVersion === 'recipe_ui/v2') {
                    const node = testCase.sectionId ? findNodeById(input.uiSpec.nodes, testCase.sectionId) : null;
                    passed =
                        (node?.kind === 'collection' || node?.kind === 'grouped_collection') &&
                            node.pageSize > 0 &&
                            node.pageSize <= 6 &&
                            datasetById.has(node.datasetId);
                }
                else {
                    const section = input.uiSpec.sections.find((item) => item.id === testCase.sectionId);
                    passed =
                        section?.kind === 'collection' &&
                            section.pageSize > 0 &&
                            section.pageSize <= 6 &&
                            datasetById.has(section.datasetId) &&
                            (datasetById.get(section.datasetId)?.pageInfo?.pageSize ?? section.pageSize) > 0;
                }
                message = passed ? 'The collection pagination is valid for the compact pane.' : 'The collection pagination is invalid.';
                break;
            }
            case 'actions_resolve': {
                if (input.uiSpec.schemaVersion === 'recipe_ui/v2') {
                    const referencedActionIds = testCase.actionId
                        ? new Set([testCase.actionId])
                        : new Set([
                            ...input.uiSpec.header.primaryActionIds,
                            ...input.uiSpec.header.secondaryActionIds,
                            ...collectNodeActionIds(input.uiSpec.nodes)
                        ]);
                    passed = [...referencedActionIds].every((actionId) => actionIds.has(actionId));
                }
                else {
                    const referencedActionIds = testCase.actionId
                        ? new Set([testCase.actionId])
                        : new Set([
                            ...input.uiSpec.header.primaryActionIds,
                            ...input.uiSpec.header.secondaryActionIds,
                            ...input.uiSpec.sections.flatMap((section) => {
                                switch (section.kind) {
                                    case 'summary':
                                        return section.actionIds;
                                    case 'collection':
                                        return [...section.primaryActionIds, ...section.rowActionIds];
                                    case 'detail':
                                    case 'wizard':
                                        return 'actionIds' in section ? section.actionIds : [];
                                    case 'form':
                                        return [section.submitActionId, section.cancelActionId].filter((value) => Boolean(value));
                                    default:
                                        return [];
                                }
                            })
                        ]);
                    passed = [...referencedActionIds].every((actionId) => actionIds.has(actionId));
                }
                message = passed ? 'All referenced actions resolve to a supported handler.' : 'One or more referenced actions do not resolve.';
                break;
            }
            case 'destructive_requires_confirmation': {
                passed = input.actionSpec.actions.every((action) => action.kind !== 'destructive' || Boolean(action.confirmation));
                message = passed ? 'All destructive actions include explicit confirmation.' : 'A destructive action is missing confirmation.';
                break;
            }
            case 'empty_state_present': {
                if (input.uiSpec.schemaVersion === 'recipe_ui/v2') {
                    const node = testCase.sectionId ? findNodeById(input.uiSpec.nodes, testCase.sectionId) : null;
                    passed =
                        (node?.kind === 'collection' ||
                            node?.kind === 'grouped_collection' ||
                            node?.kind === 'property_sheet' ||
                            node?.kind === 'detail_sheet' ||
                            node?.kind === 'timeline') &&
                            node.emptyState.title.trim().length > 0 &&
                            node.emptyState.description.trim().length > 0;
                }
                else {
                    const section = input.uiSpec.sections.find((item) => item.id === testCase.sectionId);
                    passed =
                        (section?.kind === 'collection' || section?.kind === 'detail') &&
                            section.emptyState.title.trim().length > 0 &&
                            section.emptyState.description.trim().length > 0;
                }
                message = passed ? 'The section includes an empty state.' : 'The section is missing an empty state.';
                break;
            }
            case 'loading_state_present': {
                if (input.uiSpec.schemaVersion === 'recipe_ui/v2') {
                    const node = testCase.sectionId ? findNodeById(input.uiSpec.nodes, testCase.sectionId) : null;
                    passed =
                        (node?.kind === 'collection' ||
                            node?.kind === 'grouped_collection' ||
                            node?.kind === 'property_sheet' ||
                            node?.kind === 'detail_sheet' ||
                            node?.kind === 'timeline') &&
                            node.loadingState.title.trim().length > 0 &&
                            node.loadingState.description.trim().length > 0;
                }
                else {
                    const section = input.uiSpec.sections.find((item) => item.id === testCase.sectionId);
                    passed =
                        (section?.kind === 'collection' || section?.kind === 'detail') &&
                            section.loadingState.title.trim().length > 0 &&
                            section.loadingState.description.trim().length > 0;
                }
                message = passed ? 'The section includes a loading state.' : 'The section is missing a loading state.';
                break;
            }
            case 'links_well_formed': {
                const links = [
                    ...input.normalizedData.links,
                    ...input.normalizedData.datasets.flatMap((dataset) => dataset.items.flatMap((item) => item.links))
                ];
                passed = links.every((link) => validateLinkUrl(link.url, link.kind === 'email'));
                message = passed ? 'All captured links are well formed.' : 'One or more captured links are malformed.';
                break;
            }
            default:
                message = 'Unsupported test case.';
                break;
        }
        return {
            id: testCase.id,
            kind: testCase.kind,
            severity: testCase.severity,
            passed,
            message,
            checkedAt: input.checkedAt
        };
    });
    return RecipeTestResultsSchema.parse({
        kind: 'test_results',
        schemaVersion: 'recipe_test_results/v1',
        status: results.some((result) => !result.passed && result.severity === 'critical') ? 'failed' : 'passed',
        blockingFailureCount: results.filter((result) => !result.passed && result.severity === 'critical').length,
        results,
        checkedAt: input.checkedAt
    });
}
export function buildRecipeAppletBaseArtifacts(input) {
    const userPrompt = RecipeUserPromptArtifactSchema.parse({
        kind: 'user_prompt',
        schemaVersion: 'recipe_user_prompt/v1',
        originalPrompt: input.prompt,
        normalizedPrompt: normalizePrompt(input.prompt),
        requestMode: input.requestMode
    });
    const rawData = RecipeRawDataSchema.parse(input.envelope.rawData);
    const assistantContext = input.envelope.assistantContext;
    const analysis = analyzeRecipeData(rawData, assistantContext, {
        datasetLabel: input.envelope.recipe.title,
        timestamp: input.timestamp,
        semanticHints: input.envelope.semanticHints
    });
    const preferredPresentationHint = resolvePrimaryPresentationHint(input);
    const normalizedData = deriveNormalizedDataFromAnalysis(analysis, {
        primaryDatasetPreferredPresentation: preferredPresentationHint
    });
    const intent = buildRecipeIntent(input, analysis, normalizedData);
    const summary = buildSummary(input.envelope.recipe.title || input.currentRecipe?.title || 'Recipe', input.envelope.recipe.subtitle || input.envelope.recipe.description || input.currentRecipe?.description, analysis, assistantContext, input.timestamp, intent.category);
    const fallback = buildFallback(summary, assistantContext, normalizedData);
    const actionSpec = buildActionSpec(userPrompt, intent, normalizedData, assistantContext);
    const recipeModelArtifacts = buildRecipeModel({
        recipe: input.currentRecipe ?? {
            id: 'pending-recipe',
            title: input.envelope.recipe.title || 'Recipe',
            description: input.envelope.recipe.description,
            status: input.envelope.recipe.status ?? 'active',
            metadata: {
                changeVersion: 1,
                auditTags: [],
                homeRecipe: true
            }
        },
        summary,
        assistantContext,
        normalizedData,
        actionSpec,
        fallback,
        previousModel: input.currentRecipe?.dynamic?.recipeModel ?? null
    });
    return {
        userPrompt,
        intent,
        rawData,
        assistantContext,
        analysis,
        normalizedData,
        summary,
        fallback,
        actionSpec,
        recipeModel: recipeModelArtifacts.model,
        recipePatch: recipeModelArtifacts.patch
    };
}
export function buildDynamicRecipeArtifacts(input) {
    const baseArtifacts = buildRecipeAppletBaseArtifacts(input);
    const preferredPresentationHint = resolvePrimaryPresentationHint(input);
    const uiSpec = buildUiSpec(baseArtifacts.summary, baseArtifacts.analysis, baseArtifacts.actionSpec, baseArtifacts.assistantContext, {
        preferredPresentationHint
    });
    const testSpec = buildTestSpec(uiSpec, baseArtifacts.actionSpec);
    return {
        ...baseArtifacts,
        uiSpec,
        testSpec
    };
}

import type {
  RecipeActionDefinition,
  RecipeActionSpec,
  RecipeAppletCapability,
  RecipeAppletManifest,
  RecipeAppletSmallPaneStrategy,
  RecipeAssistantContext,
  RecipeIntent,
  RecipeNormalizedData,
  RecipeSummary,
  RecipeModel
} from '@hermes-recipes/protocol';
import { RecipeAppletManifestSchema } from '@hermes-recipes/protocol';
import type { RecipeAppletStaticValidationResult } from './recipe-applet-static-validation';

export interface RecipeAppletManifestSynthesisInput {
  recipe: {
    title: string;
    description?: string | null;
  };
  intent: Pick<RecipeIntent, 'category' | 'label' | 'summary'>;
  normalizedData: RecipeNormalizedData | null;
  summary: RecipeSummary | null;
  assistantContext: RecipeAssistantContext | null;
  actionSpec: RecipeActionSpec | null;
  recipeModel: RecipeModel | null;
  analysis: RecipeAppletStaticValidationResult;
}

export interface RecipeAppletManifestSynthesisResult {
  manifest: RecipeAppletManifest | null;
  errors: string[];
  warnings: string[];
}

function truncateText(value: string, maxLength: number) {
  const normalized = value.trim().replace(/\s+/gu, ' ');
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function uniqueById<T extends { id: string }>(items: T[]) {
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

function resolveDatasetId(datasetId: string, normalizedData: RecipeNormalizedData | null) {
  if (datasetId === 'primary') {
    return normalizedData?.primaryDatasetId ?? normalizedData?.datasets[0]?.id ?? null;
  }

  return datasetId;
}

function datasetExists(datasetId: string, normalizedData: RecipeNormalizedData | null) {
  const resolved = resolveDatasetId(datasetId, normalizedData);
  if (!resolved) {
    return false;
  }

  return normalizedData?.datasets.some((dataset) => dataset.id === resolved) ?? false;
}

function collectionExists(collectionId: string, recipeModel: RecipeModel | null, normalizedData: RecipeNormalizedData | null) {
  if (recipeModel?.collections.some((collection) => collection.id === collectionId)) {
    return true;
  }

  return datasetExists(collectionId, normalizedData);
}

function inferSmallPaneStrategy(analysis: RecipeAppletStaticValidationResult): RecipeAppletSmallPaneStrategy {
  if (analysis.features.usesTabs) {
    return 'tabbed';
  }

  if (
    analysis.usedComponents.some((component) =>
      ['Card', 'Callout', 'DetailPanel', 'Grid', 'List', 'Paginator', 'Table'].includes(component)
    ) ||
    analysis.datasetIds.length > 1
  ) {
    return 'sectioned';
  }

  return 'single_column';
}

function inferManifestSummary(input: RecipeAppletManifestSynthesisInput) {
  const source =
    input.summary?.subtitle ??
    input.assistantContext?.summary ??
    input.intent.summary ??
    `Interactive Home recipe applet for ${input.recipe.title}.`;

  return truncateText(source, 160);
}

function buildImageCapabilities(analysis: RecipeAppletStaticValidationResult): RecipeAppletCapability[] {
  if (!analysis.features.usesImages || analysis.imageUsages.length === 0) {
    return [];
  }

  const imageCapabilityIds = new Set<string>();
  const capabilities: RecipeAppletCapability[] = [];

  for (const imageUsage of analysis.imageUsages) {
    const capabilityId = imageUsage.kind === 'local' ? 'image-assets' : 'network-image';
    if (imageCapabilityIds.has(capabilityId)) {
      continue;
    }
    imageCapabilityIds.add(capabilityId);
    capabilities.push({
      id: capabilityId,
      kind: imageUsage.kind === 'local' ? 'image' : 'network_image',
      label: imageUsage.kind === 'local' ? 'Image assets' : 'Network image loading',
      description:
        imageUsage.kind === 'local'
          ? 'The recipe applet renders image nodes from local or bundled sources.'
          : 'The recipe applet renders image nodes that may require remote image loading.',
      requiresConfirmation: false,
      metadata: {
        source: imageUsage.source
      }
    });
  }

  return capabilities;
}

function buildCapabilityForAction(action: RecipeActionDefinition): RecipeAppletCapability | null {
  if (action.kind !== 'bridge' || !action.bridge) {
    return null;
  }

  if (action.bridge.handler !== 'applet_capability') {
    return null;
  }

  const capabilityId = action.bridge.capabilityId?.trim() ?? '';
  if (!capabilityId) {
    return null;
  }

  return {
    id: capabilityId,
    kind: 'approved_api',
    label: action.label,
    description: action.description?.trim() || `Approved bridge capability for ${action.label}.`,
    requiresConfirmation: Boolean(action.confirmation),
    metadata: {
      actionId: action.id,
      operation:
        typeof action.bridge.payload.operation === 'string' ? String(action.bridge.payload.operation) : undefined
    }
  };
}

export function synthesizeRecipeAppletManifest(
  input: RecipeAppletManifestSynthesisInput
): RecipeAppletManifestSynthesisResult {
  const errors = [...input.analysis.errors];
  const warnings = [...input.analysis.warnings];

  if (!input.analysis.ok) {
    return {
      manifest: null,
      errors,
      warnings
    };
  }

  const actionMap = new Map((input.actionSpec?.actions ?? []).map((action) => [action.id, action] as const));
  const capabilityActionMap = new Map(
    (input.actionSpec?.actions ?? [])
      .filter((action) => action.bridge?.capabilityId)
      .map((action) => [action.bridge?.capabilityId ?? '', action] as const)
  );
  const datasetIds = [...new Set(input.analysis.datasetIds)];
  const collectionIds = [...new Set(input.analysis.collectionIds.length > 0 ? input.analysis.collectionIds : datasetIds)];
  const tabIds = [...new Set(input.analysis.tabIds)];

  for (const datasetId of datasetIds) {
    if (!datasetExists(datasetId, input.normalizedData)) {
      errors.push(`Applet source references unknown dataset ${datasetId}.`);
    }
  }

  for (const collectionId of collectionIds) {
    if (!collectionExists(collectionId, input.recipeModel, input.normalizedData)) {
      errors.push(`Applet source references unknown collection ${collectionId}.`);
    }
  }

  if (input.analysis.features.usesTabs && tabIds.length === 0) {
    errors.push('Applet source uses Tabs but does not declare literal Tab ids.');
  }

  const manifestActions: RecipeActionDefinition[] = [];

  for (const usage of input.analysis.actionUsages) {
    const action =
      actionMap.get(usage.actionId) ?? (usage.helper === 'callApprovedApi' ? capabilityActionMap.get(usage.actionId) : undefined);
    if (!action) {
      errors.push(
        usage.helper === 'callApprovedApi'
          ? `Applet source references undeclared approved capability or action ${usage.actionId}.`
          : `Applet source references undeclared action ${usage.actionId}.`
      );
      continue;
    }

    if (usage.helper === 'callApprovedApi' && (action.kind !== 'bridge' || action.bridge?.handler !== 'applet_capability')) {
      errors.push(`callApprovedApi(${usage.actionId}) requires a bridge action backed by an approved applet capability.`);
    }

    if (usage.helper === 'openLink') {
      warnings.push(`openLink(${usage.actionId}) is not bridge-promotable today; prefer ordinary links unless a bridge capability is explicitly added.`);
    }

    manifestActions.push(action);
  }

  const requestedCapabilities = uniqueById([
    ...manifestActions.map((action) => buildCapabilityForAction(action)).filter((capability): capability is RecipeAppletCapability => Boolean(capability)),
    ...buildImageCapabilities(input.analysis)
  ]);
  const usedActionIds = [...new Set(manifestActions.map((action) => action.id))];

  if (errors.length > 0) {
    return {
      manifest: null,
      errors: [...new Set(errors)],
      warnings: [...new Set(warnings)]
    };
  }

  const manifest = RecipeAppletManifestSchema.parse({
    kind: 'applet_manifest',
    schemaVersion: 'recipe_applet_manifest/v1',
    title: truncateText(`${input.recipe.title} applet`, 96),
    summary: inferManifestSummary(input),
    description:
      input.recipe.description?.trim() ||
      truncateText(`Locally synthesized from the persisted Home recipe artifacts for ${input.recipe.title}.`, 160),
    requestedCapabilities,
    actions: uniqueById(manifestActions),
    declaredDatasets: datasetIds,
    declaredCollections: collectionIds,
    declaredTabs: tabIds,
    usesImages: input.analysis.features.usesImages,
    usesTabs: input.analysis.features.usesTabs,
    usesPagination: input.analysis.features.usesPagination,
    supportsPatching: input.analysis.features.usesPatching,
    smallPaneStrategy: inferSmallPaneStrategy(input.analysis),
    metadata: {
      synthesisMode: 'local_bridge',
      intentCategory: input.intent.category,
      intentLabel: input.intent.label,
      usedSdkExports: input.analysis.usedSdkExports,
      usedComponents: input.analysis.usedComponents,
      usedHooks: input.analysis.usedHooks,
      usedActionIds,
      usedPatchOperations: input.analysis.patchUsages.map((usage) => usage.op),
      usedCollectionIds: collectionIds,
      usedEntityIds: input.analysis.entityIds,
      usedTabIds: tabIds,
      sourceFeatures: input.analysis.features,
      nodeKinds: input.analysis.nodeKinds
    }
  });

  return {
    manifest,
    errors: [],
    warnings: [...new Set(warnings)]
  };
}

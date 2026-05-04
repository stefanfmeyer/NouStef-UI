import type {
  RecipeAppletManifest,
  RecipeAppletPlan,
  RecipeAppletSourceArtifact
} from '@noustef-ui/protocol';
import {
  RecipeAppletPlanSchema,
  RecipeAppletSourceArtifactSchema
} from '@noustef-ui/protocol';

export interface RecipeAppletSourceExtractionResult {
  artifact: RecipeAppletSourceArtifact | null;
  warnings: string[];
  errors: string[];
}

function normalizeCodePayload(responseText: string) {
  const trimmed = responseText.trim();
  if (!trimmed) {
    return '';
  }

  const fenceMatch = trimmed.match(/^```(?:[a-z0-9_-]+)?\s*\n?/iu);
  if (fenceMatch) {
    const withoutOpen = trimmed.slice(fenceMatch[0].length);
    const closingIndex = withoutOpen.lastIndexOf('\n```');
    return (closingIndex >= 0 ? withoutOpen.slice(0, closingIndex) : withoutOpen).trim();
  }

  const inlineFenceMatch = trimmed.match(/```(?:[a-z0-9_-]+)?\s*\n?/iu);
  if (inlineFenceMatch && inlineFenceMatch.index !== undefined) {
    const withoutPrefix = trimmed.slice(inlineFenceMatch.index + inlineFenceMatch[0].length);
    const closingIndex = withoutPrefix.lastIndexOf('\n```');
    return (closingIndex >= 0 ? withoutPrefix.slice(0, closingIndex) : withoutPrefix).trim();
  }

  return trimmed;
}

export function synthesizeRecipeAppletPlan(
  manifest: RecipeAppletManifest,
  options: {
    note?: string;
    nodeKinds?: string[];
  } = {}
): RecipeAppletPlan {
  return RecipeAppletPlanSchema.parse({
    kind: 'applet_plan',
    schemaVersion: 'recipe_applet_plan/v1',
    summary: manifest.summary,
    nodeKinds: options.nodeKinds ?? [],
    datasets: manifest.declaredDatasets,
    collections: manifest.declaredCollections,
    tabs: manifest.declaredTabs,
    actionIds: manifest.actions.map((action) => action.id),
    notes: options.note ? [options.note] : []
  });
}

export function extractRecipeAppletSource(responseText: string): RecipeAppletSourceExtractionResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  const normalizedSource = normalizeCodePayload(responseText);

  if (!normalizedSource.trim()) {
    return {
      artifact: null,
      warnings,
      errors: ['Hermes did not emit recipe applet source.']
    };
  }

  const artifactParsed = RecipeAppletSourceArtifactSchema.safeParse({
    kind: 'applet_source',
    schemaVersion: 'recipe_applet_source/v1',
    entrypoint: 'default',
    source: normalizedSource
  });

  if (!artifactParsed.success) {
    return {
      artifact: null,
      warnings,
      errors: [artifactParsed.error.message]
    };
  }

  return {
    artifact: artifactParsed.data,
    warnings,
    errors
  };
}

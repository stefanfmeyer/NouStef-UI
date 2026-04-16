import type {
  Recipe,
  RecipeAnalysis,
  RecipeAppletManifest,
  RecipeAppletNode,
  RecipeAppletRenderTree,
  RecipeAssistantContext,
  RecipeNormalizedData,
  RecipeSummary,
  RecipeModel
} from '@hermes-recipes/protocol';

export interface RecipeAppletRenderContext {
  recipe: Pick<Recipe, 'id' | 'title' | 'description' | 'status' | 'metadata'>;
  summary: RecipeSummary | null;
  analysis: RecipeAnalysis | null;
  normalizedData: RecipeNormalizedData | null;
  assistantContext: RecipeAssistantContext | null;
  recipeModel: RecipeModel | null;
}

export interface RecipeAppletDefinition {
  render: (context: RecipeAppletRenderContext) => RecipeAppletNode[];
}

export interface RecipeAppletGeneratedTestCaseContext {
  renderTree: RecipeAppletRenderTree;
  manifest: RecipeAppletManifest;
  context: RecipeAppletRenderContext;
}

export interface RecipeAppletGeneratedTestCase {
  name: string;
  run: (context: RecipeAppletGeneratedTestCaseContext) => void | Promise<void>;
}

export type RecipeAppletGeneratedTestsFactory = (
  context: RecipeAppletGeneratedTestCaseContext
) => RecipeAppletGeneratedTestCase[] | Promise<RecipeAppletGeneratedTestCase[]>;

import { RECIPE_TEMPLATE_FIXTURES } from './template-fixtures';
import { RECIPE_TEMPLATE_SPECS } from './template-specs';
import { RECIPE_TEMPLATE_IDS } from './types';
import type { RecipeTemplateCategoryId, RecipeTemplateDefinition, RecipeTemplateId } from './types';

export const RECIPE_TEMPLATE_REGISTRY: RecipeTemplateDefinition[] = RECIPE_TEMPLATE_IDS.map((id) => ({
  ...RECIPE_TEMPLATE_SPECS[id],
  preview: RECIPE_TEMPLATE_FIXTURES[id]
}));

export function getRecipeTemplateById(templateId: RecipeTemplateId) {
  return RECIPE_TEMPLATE_REGISTRY.find((template) => template.id === templateId) ?? null;
}

export function getRecipeTemplatesByCategory(categoryId: RecipeTemplateCategoryId) {
  return RECIPE_TEMPLATE_REGISTRY.filter((template) => template.category === categoryId);
}

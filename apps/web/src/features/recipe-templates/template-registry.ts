import { RECIPE_TEMPLATE_FIXTURES } from './template-fixtures';
import { RECIPE_TEMPLATE_SPECS } from './template-specs';
import { RECIPE_TEMPLATE_IDS } from './types';
import type { RecipeTemplateCategoryId, RecipeTemplateDefinition, RecipeTemplateId } from './types';

const ALL_RECIPE_TEMPLATE_DEFINITIONS: RecipeTemplateDefinition[] = RECIPE_TEMPLATE_IDS.map((id) => ({
  ...RECIPE_TEMPLATE_SPECS[id],
  preview: RECIPE_TEMPLATE_FIXTURES[id]
}));

export const RECIPE_TEMPLATE_REGISTRY: RecipeTemplateDefinition[] = ALL_RECIPE_TEMPLATE_DEFINITIONS.filter(
  (template) => !template.hiddenFromGallery
);

export function getRecipeTemplateById(templateId: RecipeTemplateId) {
  return (
    ALL_RECIPE_TEMPLATE_DEFINITIONS.find((template) => template.id === templateId) ?? null
  );
}

export function getRecipeTemplatesByCategory(categoryId: RecipeTemplateCategoryId) {
  return RECIPE_TEMPLATE_REGISTRY.filter((template) => template.category === categoryId);
}

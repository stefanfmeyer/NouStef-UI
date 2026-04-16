import { Box, Grid, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { RecipeTemplateDetailDrawer } from '../../features/recipe-templates/template-detail-drawer';
import { RecipeTemplateGallery } from '../../features/recipe-templates/template-gallery';
import { RecipeTemplatePreview } from '../../features/recipe-templates/template-preview';
import { getRecipeTemplateById, RECIPE_TEMPLATE_REGISTRY } from '../../features/recipe-templates/template-registry';
import type { RecipeTemplateGalleryCategory, RecipeTemplateId } from '../../features/recipe-templates/types';

export function RecipesPage({ activeProfileId }: { activeProfileId?: string | null }) {
  const [category, setCategory] = useState<RecipeTemplateGalleryCategory>('all');
  const [selectedTemplateId, setSelectedTemplateId] = useState<RecipeTemplateId>('price-comparison-grid');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visibleTemplates = useMemo(
    () => RECIPE_TEMPLATE_REGISTRY.filter((template) => category === 'all' || template.category === category),
    [category]
  );

  useEffect(() => {
    if (visibleTemplates.some((template) => template.id === selectedTemplateId)) {
      return;
    }

    if (visibleTemplates[0]) {
      setSelectedTemplateId(visibleTemplates[0].id);
    }
  }, [selectedTemplateId, visibleTemplates]);

  const selectedTemplate = getRecipeTemplateById(selectedTemplateId) ?? visibleTemplates[0] ?? RECIPE_TEMPLATE_REGISTRY[0];

  return (
    <VStack align="stretch" h="100%" minH={0} gap="4">
      <Grid
        templateColumns={{ base: '1fr', xl: 'minmax(0, 1.2fr) minmax(360px, 0.95fr)' }}
        gap="4"
        flex="1"
        minH={0}
        overflow="hidden"
      >
        <Box minH={0} overflowY={{ base: 'visible', xl: 'auto' }} pr={{ base: '0', xl: '1' }}>
          <RecipeTemplateGallery
            templates={visibleTemplates}
            activeCategory={category}
            selectedTemplateId={selectedTemplate.id}
            onCategoryChange={setCategory}
            onSelectTemplate={(templateId) => setSelectedTemplateId(templateId as RecipeTemplateId)}
            onInspectTemplate={(templateId) => {
              setSelectedTemplateId(templateId as RecipeTemplateId);
              setDrawerOpen(true);
            }}
          />
        </Box>

        <Box minH={0} overflowY={{ base: 'visible', xl: 'auto' }} pl={{ base: '0', xl: '1' }} data-testid="spaces-template-inspector">
          <Box rounded="8px" border="1px solid var(--border-subtle)" overflow="auto">
            <RecipeTemplatePreview preview={selectedTemplate.preview} />
          </Box>
        </Box>
      </Grid>

      <RecipeTemplateDetailDrawer template={selectedTemplate} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </VStack>
  );
}

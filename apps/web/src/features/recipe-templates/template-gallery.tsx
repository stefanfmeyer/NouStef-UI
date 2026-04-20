import { Box, Button, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { RECIPE_TEMPLATE_CATEGORIES } from './template-categories';
import { TemplateSurface } from './template-primitives';
import { resolveTemplateGalleryFilterButtonStyles } from './template-style-helpers';
import type { RecipeTemplateDefinition, RecipeTemplateGalleryCategory } from './types';

export function RecipeTemplateGallery({
  templates,
  activeCategory,
  selectedTemplateId,
  onCategoryChange,
  onSelectTemplate,
  onInspectTemplate
}: {
  templates: RecipeTemplateDefinition[];
  activeCategory: RecipeTemplateGalleryCategory;
  selectedTemplateId: string;
  onCategoryChange: (category: RecipeTemplateGalleryCategory) => void;
  onSelectTemplate: (templateId: string) => void;
  onInspectTemplate: (templateId: string) => void;
}) {
  const allButtonStyles = resolveTemplateGalleryFilterButtonStyles(activeCategory === 'all');

  return (
    <VStack align="stretch" gap="3" data-testid="spaces-template-gallery">
      <TemplateSurface>
        <VStack align="stretch" gap="4">
          <Flex justify="space-between" align="end" gap="4" wrap="wrap">
            <VStack align="start" gap="1">
              <Text fontSize="lg" fontWeight="750" color="var(--text-primary)">
                Spaces gallery
              </Text>
              <Text color="var(--text-secondary)">
                Curated templates for structured session workspaces.
              </Text>
            </VStack>
            <Text fontSize="sm" color="var(--text-muted)">
              {templates.length} templates
            </Text>
          </Flex>

          <Flex gap="2" wrap="wrap">
            <Button
              size="sm"
              rounded="8px"
              bg={allButtonStyles.bg}
              border="1px solid var(--border-subtle)"
              color={allButtonStyles.color}
              _dark={{
                color: allButtonStyles.darkColor
              }}
              onClick={() => onCategoryChange('all')}
            >
              All
            </Button>
            {RECIPE_TEMPLATE_CATEGORIES.map((category) => {
              const buttonStyles = resolveTemplateGalleryFilterButtonStyles(activeCategory === category.id);
              return (
                <Button
                  key={category.id}
                  size="sm"
                  rounded="8px"
                  bg={buttonStyles.bg}
                  border="1px solid var(--border-subtle)"
                  color={buttonStyles.color}
                  _dark={{
                    color: buttonStyles.darkColor
                  }}
                  onClick={() => onCategoryChange(category.id)}
                >
                  {category.label}
                </Button>
              );
            })}
          </Flex>
        </VStack>
      </TemplateSurface>

      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="3" alignItems="stretch">
        {templates.map((template) => {
          const selected = template.id === selectedTemplateId;

          return (
            <Box
              key={template.id}
              data-testid={`spaces-template-card-${template.id}`}
              cursor="pointer"
              onClick={() => onSelectTemplate(template.id)}
              _hover={{ bg: 'var(--surface-2)', transform: 'translateY(-1px)', transition: 'all 150ms ease', boxShadow: 'var(--shadow-sm)' }}
              rounded="8px"
              h="100%"
            >
              <TemplateSurface bg={selected ? 'rgba(37, 99, 235, 0.06)' : 'var(--surface-1)'} padding="3">
                <VStack align="stretch" gap="2.5">
                  <VStack align="start" gap="1.25" minW={0}>
                    <Text fontSize="10px" fontWeight="600" letterSpacing="0" textTransform="uppercase" color="var(--text-muted)">
                      {template.category}
                    </Text>
                    <Text fontSize="md" fontWeight="750" color="var(--text-primary)" lineHeight="1.2">
                      {template.name}
                    </Text>
                    <Text fontSize="sm" color="var(--text-secondary)" lineClamp={2}>
                      {template.purpose}
                    </Text>
                  </VStack>

                  <Flex justify="space-between" align="center" gap="2">
                    <Text fontSize="xs" color="var(--text-muted)">Workspace template</Text>
                    <Button
                      size="sm"
                      rounded="8px"
                      variant="ghost"
                      fontSize="xs"
                      color="var(--text-muted)"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTemplate(template.id);
                        onInspectTemplate(template.id);
                      }}
                    >
                      Read more
                    </Button>
                  </Flex>
                </VStack>
              </TemplateSurface>
            </Box>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
}

import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Input,
  Select,
  Separator,
  Skeleton,
  Table,
  Tabs,
  Text,
  Textarea,
  VStack,
  chakra
} from '@chakra-ui/react';
import type {
  Recipe,
  RecipeActionDefinition,
  RecipeCellValue,
  RecipeLink,
  RecipeCollection,
  RecipeEntity,
  RecipeModel,
  RecipeSection
} from '@hermes-recipes/protocol';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { safeMarkdownUrlTransform } from '../../lib/markdown-url-transform';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function humanizeFieldKey(value: string) {
  return value
    .replace(/[._-]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()
    .replace(/\b\w/gu, (character) => character.toUpperCase());
}

function getCellText(value: RecipeCellValue | unknown) {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).trim();
  }

  if (isRecord(value) && typeof value.text === 'string' && value.text.trim().length > 0) {
    return value.text.trim();
  }

  if (isRecord(value) && typeof value.imageAlt === 'string' && value.imageAlt.trim().length > 0) {
    return value.imageAlt.trim();
  }

  return '';
}

function getCellLink(value: RecipeCellValue | unknown): RecipeLink | null {
  if (!isRecord(value)) {
    return null;
  }

  const rawHref = typeof value.href === 'string' ? value.href.trim() : '';
  if (!rawHref) {
    return null;
  }

  return {
    label: getCellText(value) || rawHref.replace(/^mailto:/iu, ''),
    url: rawHref,
    kind: value.kind === 'email' ? 'email' : 'other'
  };
}

function actionButtonTone(action: RecipeActionDefinition) {
  if (action.intent === 'danger' || action.kind === 'destructive') {
    return {
      variant: 'outline' as const,
      colorPalette: 'red'
    };
  }

  if (action.intent === 'primary') {
    return {
      variant: 'solid' as const,
      colorPalette: 'blue'
    };
  }

  return {
    variant: 'outline' as const,
    colorPalette: 'gray'
  };
}

function BadgeChip({ label }: { label: string }) {
  return (
    <Box rounded="full" bg="blue.50" px="2.5" py="1" _dark={{ bg: 'whiteAlpha.120' }}>
      <Text fontSize="10px" fontWeight="500" color="blue.700" textTransform="uppercase" letterSpacing="0.08em" _dark={{ color: 'blue.200' }}>
        {label}
      </Text>
    </Box>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Box minW="120px" rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
      <Text fontSize="10px" fontWeight="600" color="var(--text-muted)" textTransform="uppercase" letterSpacing="0.08em">
        {label}
      </Text>
      <Text mt="1.5" fontSize="lg" fontWeight="600" color="var(--text-primary)">
        {value}
      </Text>
    </Box>
  );
}

function MarkdownBlock({ content }: { content: string }) {
  return (
    <Box color="var(--text-primary)">
      <ReactMarkdown
        skipHtml
        urlTransform={(url) => safeMarkdownUrlTransform(url) ?? ''}
        remarkPlugins={[remarkGfm]}
        components={{
          a(props) {
            const href = props.href ?? '#';
            return (
              <chakra.a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                color="blue.600"
                textDecoration="underline"
                textUnderlineOffset="3px"
                _dark={{ color: 'blue.200' }}
              >
                {props.children}
              </chakra.a>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}

function fieldValueFromEntity(entity: RecipeEntity, fieldKey: string) {
  return entity.fields.find((field) => field.key === fieldKey)?.value ?? '';
}

function itemSearchText(entity: RecipeEntity) {
  const fieldText = entity.fields.map((field) => getCellText(field.value)).filter(Boolean).join(' ');
  return `${entity.title} ${entity.subtitle ?? ''} ${entity.description ?? ''} ${fieldText}`.toLowerCase();
}

function renderValue(value: RecipeCellValue | unknown) {
  const link = getCellLink(value);
  if (link) {
    return (
      <chakra.a
        href={link.url}
        target={link.url.startsWith('mailto:') ? undefined : '_blank'}
        rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        color="blue.600"
        textDecoration="underline"
        textUnderlineOffset="3px"
        _dark={{ color: 'blue.200' }}
      >
        {link.label}
      </chakra.a>
    );
  }

  if (isRecord(value) && typeof value.imageUrl === 'string' && value.imageUrl.trim()) {
    return (
      <Button asChild size="xs" variant="outline" colorPalette="blue">
        <a href={value.imageUrl} target="_blank" rel="noopener noreferrer">
          {getCellText(value) || 'View image'}
        </a>
      </Button>
    );
  }

  return (
    <Text fontSize="sm" color="var(--text-primary)" textAlign="end">
      {getCellText(value) || '—'}
    </Text>
  );
}

export function RecipeDslRenderer({
  recipe,
  recipeModel,
  onExecuteAction
}: {
  recipe: Recipe;
  recipeModel: RecipeModel;
  onExecuteAction: (
    recipe: Recipe,
    actionId: string,
    input: {
      selectedItemIds?: string[];
      pageState?: Record<string, number>;
      filterState?: Record<string, string>;
      formValues?: Record<string, string | number | boolean | null>;
    }
  ) => Promise<void> | void;
}) {
  const [activeTabId, setActiveTabId] = useState<string | null>(recipeModel.state.activeTabId ?? recipeModel.tabs[0]?.id ?? null);
  const [selectionByCollection, setSelectionByCollection] = useState<Record<string, string[]>>(
    Object.fromEntries(
      Object.entries(recipeModel.state.collectionState).map(([collectionId, state]) => [collectionId, state.selectedEntityIds ?? []])
    )
  );
  const [pageState, setPageState] = useState<Record<string, number>>(
    Object.fromEntries(
      Object.entries(recipeModel.state.collectionState).map(([collectionId, state]) => [collectionId, state.page ?? 1])
    )
  );
  const [filterState, setFilterState] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.entries(recipeModel.state.collectionState).map(([collectionId, state]) => [collectionId, Object.values(state.filters ?? {})[0] ?? ''])
    )
  );
  const [formValues, setFormValues] = useState<Record<string, string | number | boolean | null>>(
    Object.assign({}, ...Object.values(recipeModel.state.formState))
  );
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const actionMap = useMemo(
    () => new Map(recipeModel.actions.map((action) => [action.id, action] as const)),
    [recipeModel.actions]
  );
  const entityMap = useMemo(
    () => new Map(recipeModel.entities.map((entity) => [entity.id, entity] as const)),
    [recipeModel.entities]
  );
  const sectionMap = useMemo(
    () => new Map(recipeModel.sections.map((section) => [section.id, section] as const)),
    [recipeModel.sections]
  );
  const viewMap = useMemo(
    () => new Map(recipeModel.views.map((view) => [view.id, view] as const)),
    [recipeModel.views]
  );

  const currentTab = recipeModel.tabs.find((tab) => tab.id === activeTabId) ?? recipeModel.tabs[0] ?? null;
  const currentView = currentTab ? viewMap.get(currentTab.viewId) ?? null : recipeModel.views[0] ?? null;

  function resolveActionCollectionId(action: RecipeActionDefinition, collectionId?: string) {
    return collectionId ?? action.visibility.datasetId ?? undefined;
  }

  function resolveActionSelectedItemIds(action: RecipeActionDefinition, collectionId?: string, explicitSelection?: string[]) {
    if (explicitSelection) {
      return explicitSelection;
    }

    const actionCollectionId = resolveActionCollectionId(action, collectionId);
    if (!actionCollectionId) {
      return [];
    }

    return selectionByCollection[actionCollectionId] ?? recipeModel.state.collectionState[actionCollectionId]?.selectedEntityIds ?? [];
  }

  function isActionSelectionReady(action: RecipeActionDefinition, collectionId?: string, explicitSelection?: string[]) {
    const selectedItemIds = resolveActionSelectedItemIds(action, collectionId, explicitSelection);
    if (action.visibility.requiresSelection === 'single') {
      return selectedItemIds.length === 1;
    }

    if (action.visibility.requiresSelection === 'one_or_more') {
      return selectedItemIds.length >= 1;
    }

    return true;
  }

  function resolveCollection(collectionId: string | null | undefined) {
    if (!collectionId) {
      return null;
    }

    return recipeModel.collections.find((collection) => collection.id === collectionId) ?? null;
  }

  function resolveEntity(entityId: string | null | undefined) {
    return entityId ? entityMap.get(entityId) ?? null : null;
  }

  function getCollectionEntities(collection: RecipeCollection) {
    const searchValue = (filterState[collection.id] ?? '').trim().toLowerCase();
    const allEntities = collection.entityIds.map((entityId) => resolveEntity(entityId)).filter((entity): entity is RecipeEntity => Boolean(entity));
    const filtered = searchValue ? allEntities.filter((entity) => itemSearchText(entity).includes(searchValue)) : allEntities;
    const totalPages = Math.max(1, Math.ceil(filtered.length / collection.pageSize));
    const currentPage = Math.min(pageState[collection.id] ?? 1, totalPages);
    const visible = filtered.slice((currentPage - 1) * collection.pageSize, currentPage * collection.pageSize);
    return {
      allEntities,
      filtered,
      visible,
      totalPages,
      currentPage,
      selectedIds: selectionByCollection[collection.id] ?? recipeModel.state.collectionState[collection.id]?.selectedEntityIds ?? []
    };
  }

  function setSelectedEntity(collection: RecipeCollection, entityId: string) {
    setSelectionByCollection((current) => {
      const existing = current[collection.id] ?? [];
      if (collection.selectionMode === 'single') {
        return {
          ...current,
          [collection.id]: [entityId]
        };
      }

      if (collection.selectionMode === 'multiple') {
        const nextSelection = existing.includes(entityId) ? existing.filter((value) => value !== entityId) : [...existing, entityId];
        return {
          ...current,
          [collection.id]: nextSelection
        };
      }

      return current;
    });
  }

  async function runAction(actionId: string, collectionId?: string, explicitSelection?: string[]) {
    const action = actionMap.get(actionId);
    if (!action) {
      return;
    }

    const selectedItemIds = resolveActionSelectedItemIds(action, collectionId, explicitSelection);

    if (action.kind === 'destructive' && action.confirmation) {
      const confirmed = window.confirm(`${action.confirmation.title}\n\n${action.confirmation.description}`);
      if (!confirmed) {
        return;
      }
    }

    setActionLoadingId(actionId);
    setActionError(null);
    try {
      await onExecuteAction(recipe, actionId, {
        selectedItemIds,
        pageState,
        filterState,
        formValues
      });
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Action failed.');
    } finally {
      setActionLoadingId(null);
    }
  }

  function renderActionButtons(actionIds: string[], collectionId?: string, explicitSelection?: string[]) {
    return actionIds.map((actionId) => {
      const action = actionMap.get(actionId);
      if (!action) {
        return null;
      }

      const tone = actionButtonTone(action);
      const actionCollectionId = resolveActionCollectionId(action, collectionId);
      const selectionReady = isActionSelectionReady(action, collectionId, explicitSelection);
      return (
        <Button
          key={action.id}
          size="xs"
          variant={tone.variant}
          colorPalette={tone.colorPalette}
          loading={actionLoadingId === action.id}
          disabled={!selectionReady}
          onClick={() => void runAction(action.id, actionCollectionId, explicitSelection)}
        >
          {action.label}
        </Button>
      );
    });
  }

  function renderCollectionSection(section: RecipeSection, collection: RecipeCollection, mode: 'table' | 'list' | 'cards' | 'media' | 'comparison' | 'board' | 'grouped_collection' = 'cards') {
    const state = getCollectionEntities(collection);
    const groupByFieldKey = typeof section.metadata.groupByFieldKey === 'string' ? section.metadata.groupByFieldKey : collection.fieldKeys[0] ?? null;
    const laneFieldKey = typeof section.metadata.laneFieldKey === 'string' ? section.metadata.laneFieldKey : groupByFieldKey;

    if (state.visible.length === 0) {
      return (
        <Box rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
          <Text fontSize="sm" fontWeight="500" color="var(--text-primary)">
            {section.emptyState?.title ?? collection.emptyState.title}
          </Text>
          <Text fontSize="sm" color="var(--text-secondary)">
            {section.emptyState?.description ?? collection.emptyState.description}
          </Text>
        </Box>
      );
    }

    if (mode === 'table') {
      return (
        <Table.ScrollArea borderWidth="1px" borderColor="var(--border-subtle)" rounded="8px" overflow="auto">
          <Table.Root size="sm" variant="line">
            <Table.Header bg="var(--surface-2)">
              <Table.Row>
                {collection.fieldKeys.map((fieldKey) => (
                  <Table.ColumnHeader key={fieldKey}>{humanizeFieldKey(fieldKey)}</Table.ColumnHeader>
                ))}
                {section.actionIds.length > 0 ? <Table.ColumnHeader>Actions</Table.ColumnHeader> : null}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {state.visible.map((entity) => (
                <Table.Row
                  key={entity.id}
                  cursor={collection.selectionMode === 'none' ? 'default' : 'pointer'}
                  bg={state.selectedIds.includes(entity.id) ? 'blue.50' : undefined}
                  _dark={state.selectedIds.includes(entity.id) ? { bg: 'whiteAlpha.120' } : undefined}
                  onClick={() => setSelectedEntity(collection, entity.id)}
                >
                  {collection.fieldKeys.map((fieldKey) => (
                    <Table.Cell key={fieldKey}>{renderValue(fieldValueFromEntity(entity, fieldKey))}</Table.Cell>
                  ))}
                  {section.actionIds.length > 0 ? (
                    <Table.Cell>
                      <HStack gap="2">{renderActionButtons(section.actionIds, collection.id, [entity.id])}</HStack>
                    </Table.Cell>
                  ) : null}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      );
    }

    if (mode === 'comparison') {
      return (
        <Grid templateColumns={{ base: '1fr', xl: `repeat(${Math.min(3, state.visible.length)}, minmax(0, 1fr))` }} gap="3">
          {state.visible.slice(0, 3).map((entity) => (
            <Box key={entity.id} rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3.5">
              <VStack align="stretch" gap="2.5">
                <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                  {entity.title}
                </Text>
                {entity.image?.url ? <Image src={entity.image.url} alt={entity.image.alt ?? entity.title} rounded="14px" maxH="140px" objectFit="cover" /> : null}
                {collection.fieldKeys.slice(0, 5).map((fieldKey) => (
                  <HStack key={`${entity.id}-${fieldKey}`} justify="recipe-between" align="start" gap="3">
                    <Text fontSize="xs" fontWeight="500" color="var(--text-muted)" textTransform="uppercase" letterSpacing="0.08em">
                      {humanizeFieldKey(fieldKey)}
                    </Text>
                    {renderValue(fieldValueFromEntity(entity, fieldKey))}
                  </HStack>
                ))}
                <HStack gap="2" wrap="wrap">{renderActionButtons(section.actionIds, collection.id, [entity.id])}</HStack>
              </VStack>
            </Box>
          ))}
        </Grid>
      );
    }

    if (mode === 'board' && laneFieldKey) {
      const grouped = new Map<string, RecipeEntity[]>();
      for (const entity of state.visible) {
        const lane = getCellText(fieldValueFromEntity(entity, laneFieldKey)) || 'Other';
        grouped.set(lane, [...(grouped.get(lane) ?? []), entity]);
      }
      return (
        <Grid templateColumns={{ base: '1fr', xl: `repeat(${Math.min(3, grouped.size)}, minmax(0, 1fr))` }} gap="3">
          {[...grouped.entries()].map(([lane, entities]) => (
            <VStack key={`${section.id}-${lane}`} align="stretch" gap="2">
              <Text fontSize="xs" fontWeight="600" color="var(--text-muted)" textTransform="uppercase" letterSpacing="0.1em">
                {lane}
              </Text>
              {entities.map((entity) => (
                <Box key={entity.id} rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
                  <VStack align="stretch" gap="2">
                    <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                      {entity.title}
                    </Text>
                    {entity.subtitle ? <Text fontSize="sm" color="var(--text-secondary)">{entity.subtitle}</Text> : null}
                    <HStack gap="2" wrap="wrap">{renderActionButtons(section.actionIds, collection.id, [entity.id])}</HStack>
                  </VStack>
                </Box>
              ))}
            </VStack>
          ))}
        </Grid>
      );
    }

    if (mode === 'grouped_collection' && groupByFieldKey) {
      const grouped = new Map<string, RecipeEntity[]>();
      for (const entity of state.visible) {
        const group = getCellText(fieldValueFromEntity(entity, groupByFieldKey)) || 'Other';
        grouped.set(group, [...(grouped.get(group) ?? []), entity]);
      }
      return (
        <VStack align="stretch" gap="3">
          {[...grouped.entries()].map(([group, entities]) => (
            <VStack key={`${section.id}-${group}`} align="stretch" gap="2">
              <Text fontSize="xs" fontWeight="600" color="var(--text-muted)" textTransform="uppercase" letterSpacing="0.1em">
                {group}
              </Text>
              {entities.map((entity) => (
                <Box key={entity.id} rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
                  <VStack align="stretch" gap="1.5">
                    <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                      {entity.title}
                    </Text>
                    {entity.subtitle ? <Text fontSize="sm" color="var(--text-secondary)">{entity.subtitle}</Text> : null}
                    <HStack gap="2" wrap="wrap">{renderActionButtons(section.actionIds, collection.id, [entity.id])}</HStack>
                  </VStack>
                </Box>
              ))}
            </VStack>
          ))}
        </VStack>
      );
    }

    return (
      <Grid templateColumns={{ base: '1fr', xl: mode === 'media' ? 'repeat(2, minmax(0, 1fr))' : '1fr' }} gap="3">
        {state.visible.map((entity) => (
          <Box
            key={entity.id}
            rounded="8px"
            border="1px solid var(--border-subtle)"
            bg={state.selectedIds.includes(entity.id) ? 'blue.50' : 'var(--surface-2)'}
            _dark={state.selectedIds.includes(entity.id) ? { bg: 'whiteAlpha.120' } : undefined}
            px="3.5"
            py="3.5"
            cursor={collection.selectionMode === 'none' ? 'default' : 'pointer'}
            onClick={() => setSelectedEntity(collection, entity.id)}
          >
            <VStack align="stretch" gap="2.5">
              {entity.image?.url && (mode === 'media' || mode === 'cards') ? (
                <Image src={entity.image.url} alt={entity.image.alt ?? entity.title} rounded="14px" maxH="140px" objectFit="cover" />
              ) : null}
              <VStack align="start" gap="0.5">
                <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                  {entity.title}
                </Text>
                {entity.subtitle ? <Text fontSize="sm" color="var(--text-secondary)">{entity.subtitle}</Text> : null}
              </VStack>
              {entity.badges.length > 0 ? (
                <HStack gap="1.5" wrap="wrap">
                  {entity.badges.map((badge) => (
                    <BadgeChip key={`${entity.id}-${badge}`} label={badge} />
                  ))}
                </HStack>
              ) : null}
              {mode !== 'list'
                ? collection.fieldKeys.slice(0, 4).map((fieldKey) => (
                    <HStack key={`${entity.id}-${fieldKey}`} justify="recipe-between" align="start" gap="3">
                      <Text fontSize="xs" fontWeight="500" color="var(--text-muted)" textTransform="uppercase" letterSpacing="0.08em">
                        {humanizeFieldKey(fieldKey)}
                      </Text>
                      {renderValue(fieldValueFromEntity(entity, fieldKey))}
                    </HStack>
                  ))
                : null}
              <HStack gap="2" wrap="wrap">{renderActionButtons(section.actionIds, collection.id, [entity.id])}</HStack>
            </VStack>
          </Box>
        ))}
      </Grid>
    );
  }

  function renderSection(section: RecipeSection): ReactNode {
    const collection = resolveCollection(section.collectionId);
    const selectedEntityId =
      collection?.id != null
        ? (selectionByCollection[collection.id] ?? [])[0] ??
          recipeModel.state.collectionState[collection.id]?.selectedEntityIds?.[0] ??
          collection.detailEntityId
        : section.entityId;
    const selectedEntity = resolveEntity(selectedEntityId);

    switch (section.kind) {
      case 'summary':
        return (
          <VStack key={section.id} align="stretch" gap="2.5">
            <Text fontSize="md" fontWeight="600" color="var(--text-primary)">
              {section.title ?? recipeModel.title}
            </Text>
            {section.description ? <Text fontSize="sm" color="var(--text-secondary)">{section.description}</Text> : null}
            {section.body ? <MarkdownBlock content={section.body} /> : null}
          </VStack>
        );
      case 'stats': {
        const stats = Array.isArray(section.metadata.stats) ? section.metadata.stats : [];
        return (
          <HStack key={section.id} gap="2" wrap="wrap">
            {stats.map((stat) =>
              isRecord(stat) && typeof stat.label === 'string' && typeof stat.value === 'string' ? (
                <StatCard key={`${section.id}-${stat.label}`} label={stat.label} value={stat.value} />
              ) : null
            )}
          </HStack>
        );
      }
      case 'table':
      case 'list':
      case 'cards':
      case 'grouped_collection':
      case 'comparison':
      case 'media':
      case 'board':
        if (!collection) {
          return null;
        }
        return (
          <VStack key={section.id} align="stretch" gap="3">
            <HStack justify="recipe-between" align="center" gap="3" wrap="wrap">
              <VStack align="start" gap="0.5">
                <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                  {section.title ?? collection.label}
                </Text>
                {section.description ? <Text fontSize="sm" color="var(--text-secondary)">{section.description}</Text> : null}
              </VStack>
              <HStack gap="2" wrap="wrap">
                {collection.filterKeys.length > 0 ? (
                  <Input
                    size="xs"
                    maxW="220px"
                    placeholder={`Search ${collection.label.toLowerCase()}`}
                    value={filterState[collection.id] ?? ''}
                    onChange={(event) => {
                      setFilterState((current) => ({
                        ...current,
                        [collection.id]: event.target.value
                      }));
                      setPageState((current) => ({
                        ...current,
                        [collection.id]: 1
                      }));
                    }}
                  />
                ) : null}
                {renderActionButtons(section.actionIds, collection.id)}
              </HStack>
            </HStack>
            {renderCollectionSection(
              section,
              collection,
              section.kind === 'grouped_collection'
                ? 'grouped_collection'
                : section.kind === 'comparison'
                  ? 'comparison'
                  : section.kind === 'media'
                    ? 'media'
                    : section.kind === 'board'
                      ? 'board'
                      : section.kind
            )}
          </VStack>
        );
      case 'detail_panel':
        return (
          <VStack key={section.id} align="stretch" gap="3">
            <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
              {section.title ?? 'Details'}
            </Text>
            {!selectedEntity ? (
              <Box rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
                <Text fontSize="sm" fontWeight="500" color="var(--text-primary)">
                  {section.emptyState?.title ?? 'Nothing selected'}
                </Text>
                <Text fontSize="sm" color="var(--text-secondary)">
                  {section.emptyState?.description ?? 'Choose an item to inspect its details.'}
                </Text>
              </Box>
            ) : (
              <Box rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3.5">
                <VStack align="stretch" gap="2.5">
                  <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                    {selectedEntity.title}
                  </Text>
                  {selectedEntity.description ? <Text fontSize="sm" color="var(--text-secondary)">{selectedEntity.description}</Text> : null}
                  {section.fieldKeys.map((fieldKey) => (
                    <HStack key={`${selectedEntity.id}-${fieldKey}`} justify="recipe-between" align="start" gap="3">
                      <Text fontSize="xs" fontWeight="500" color="var(--text-muted)" textTransform="uppercase" letterSpacing="0.08em">
                        {humanizeFieldKey(fieldKey)}
                      </Text>
                      {renderValue(fieldValueFromEntity(selectedEntity, fieldKey))}
                    </HStack>
                  ))}
                  <HStack gap="2" wrap="wrap">{renderActionButtons(section.actionIds, collection?.id, [selectedEntity.id])}</HStack>
                </VStack>
              </Box>
            )}
          </VStack>
        );
      case 'timeline': {
        if (!collection) {
          return null;
        }
        const timeFieldKey = typeof section.metadata.timeFieldKey === 'string' ? section.metadata.timeFieldKey : collection.fieldKeys[0] ?? '';
        const sorted = [...getCollectionEntities(collection).visible].sort(
          (left, right) => Date.parse(getCellText(fieldValueFromEntity(right, timeFieldKey))) - Date.parse(getCellText(fieldValueFromEntity(left, timeFieldKey)))
        );
        return (
          <VStack key={section.id} align="stretch" gap="3">
            <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
              {section.title ?? 'Timeline'}
            </Text>
            {sorted.map((entity) => (
              <HStack key={entity.id} align="start" gap="3">
                <Box mt="1.5" width="8px" height="8px" rounded="full" bg="blue.500" flexShrink={0} />
                <VStack align="stretch" gap="1.5">
                  <Text fontSize="xs" fontWeight="500" color="var(--text-muted)">
                    {getCellText(fieldValueFromEntity(entity, timeFieldKey)) || 'Unknown time'}
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                    {entity.title}
                  </Text>
                  {entity.description ? <Text fontSize="sm" color="var(--text-secondary)">{entity.description}</Text> : null}
                  <HStack gap="2" wrap="wrap">{renderActionButtons(section.actionIds, collection.id, [entity.id])}</HStack>
                </VStack>
              </HStack>
            ))}
          </VStack>
        );
      }
      case 'markdown':
        return (
          <VStack key={section.id} align="stretch" gap="2">
            {section.title ? <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">{section.title}</Text> : null}
            <MarkdownBlock content={section.body ?? ''} />
          </VStack>
        );
      case 'callout':
      case 'empty_state':
      case 'error_state':
      case 'loading_state':
        return (
          <Box key={section.id} rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
            <VStack align="stretch" gap="2">
              <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                {section.title ?? humanizeFieldKey(section.kind)}
              </Text>
              {section.description ? <Text fontSize="sm" color="var(--text-secondary)">{section.description}</Text> : null}
              {section.body ? <MarkdownBlock content={section.body} /> : null}
              <HStack gap="2" wrap="wrap">{renderActionButtons(section.actionIds, section.collectionId ?? undefined)}</HStack>
            </VStack>
          </Box>
        );
      case 'actions':
        return (
          <HStack key={section.id} gap="2" wrap="wrap">
            {renderActionButtons(section.actionIds, section.collectionId ?? undefined)}
          </HStack>
        );
      case 'form': {
        const rawFields = Array.isArray(section.metadata.fields) ? section.metadata.fields : [];
        return (
          <VStack key={section.id} align="stretch" gap="3">
            <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
              {section.title ?? 'Form'}
            </Text>
            {section.description ? <Text fontSize="sm" color="var(--text-secondary)">{section.description}</Text> : null}
            {rawFields.map((rawField) => {
              if (!isRecord(rawField) || typeof rawField.key !== 'string' || typeof rawField.label !== 'string') {
                return null;
              }

              const fieldKey = rawField.key;
              const fieldLabel = rawField.label;
              const currentValue = formValues[fieldKey] ?? '';
              const placeholder = typeof rawField.placeholder === 'string' ? rawField.placeholder : undefined;
              const inputType = rawField.input === 'textarea' || rawField.input === 'select' ? rawField.input : 'text';

              if (inputType === 'textarea') {
                return (
                  <Textarea
                    key={fieldKey}
                    size="sm"
                    placeholder={placeholder}
                    value={String(currentValue)}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        [fieldKey]: event.target.value
                      }))
                    }
                  />
                );
              }

              if (inputType === 'select') {
                const options = Array.isArray(rawField.options) ? rawField.options : [];
                return (
                  <Select.Root
                    key={fieldKey}
                    collection={undefined as never}
                    value={[String(currentValue)]}
                    onValueChange={(details) =>
                      setFormValues((current) => ({
                        ...current,
                        [fieldKey]: details.value[0] ?? ''
                      }))
                    }
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder={placeholder ?? fieldLabel} />
                      </Select.Trigger>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content>
                        {options.map((option) =>
                          isRecord(option) && typeof option.value === 'string' && typeof option.label === 'string' ? (
                            <Select.Item key={option.value} item={{ value: option.value, label: option.label }}>
                              {option.label}
                            </Select.Item>
                          ) : null
                        )}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                );
              }

              return (
                <Input
                  key={fieldKey}
                  size="sm"
                  placeholder={placeholder}
                  value={String(currentValue)}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      [fieldKey]: event.target.value
                    }))
                  }
                />
              );
            })}
            <HStack gap="2" wrap="wrap">{renderActionButtons(section.actionIds, section.collectionId ?? undefined)}</HStack>
          </VStack>
        );
      }
      case 'split': {
        const sectionIds = Array.isArray(section.metadata.sectionIds)
          ? section.metadata.sectionIds.filter((value): value is string => typeof value === 'string')
          : [section.metadata.leftSectionId, section.metadata.rightSectionId].filter((value): value is string => typeof value === 'string');
        return (
          <Grid key={section.id} templateColumns={{ base: '1fr', xl: 'repeat(2, minmax(0, 1fr))' }} gap="4">
            {sectionIds.map((sectionId) => {
              const childSection = sectionMap.get(sectionId);
              return childSection ? <Box key={sectionId}>{renderSection(childSection)}</Box> : null;
            })}
          </Grid>
        );
      }
      case 'skeleton': {
        const lines = typeof section.metadata.lines === 'number' ? Math.max(1, Math.min(6, section.metadata.lines)) : 3;
        return (
          <VStack key={section.id} align="stretch" gap="2">
            {section.title ? <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">{section.title}</Text> : null}
            {Array.from({ length: lines }).map((_, index) => (
              <Skeleton key={`${section.id}-${index}`} height="14px" rounded="md" />
            ))}
          </VStack>
        );
      }
      default:
        return null;
    }
  }

  const viewSections = currentView?.sectionIds.map((sectionId) => sectionMap.get(sectionId)).filter((section): section is RecipeSection => Boolean(section)) ?? [];

  return (
    <VStack align="stretch" gap="4" h="100%" minH={0} data-testid="workspace-dsl-ready">
      <Box rounded="10px" border="1px solid var(--border-subtle)" bg="var(--surface-1)" px="4" py="3.5">
        <VStack align="stretch" gap="3">
          <HStack justify="recipe-between" align="start" gap="3">
            <VStack align="start" gap="1">
              <Text fontSize="md" fontWeight="600" color="var(--text-primary)">
                {recipeModel.title}
              </Text>
              {recipeModel.subtitle ? <Text fontSize="sm" color="var(--text-secondary)">{recipeModel.subtitle}</Text> : null}
            </VStack>
            {recipeModel.actions.length > 0 ? (
              <HStack gap="2" wrap="wrap">
                {renderActionButtons(recipeModel.actions.slice(0, 3).map((action) => action.id))}
              </HStack>
            ) : null}
          </HStack>
          {actionError ? <Text fontSize="sm" color="red.500">{actionError}</Text> : null}
        </VStack>
      </Box>

      {recipeModel.tabs.length > 0 ? (
        <Tabs.Root
          value={currentTab?.id ?? recipeModel.tabs[0]?.id}
          onValueChange={(details) => setActiveTabId(details.value)}
          variant="plain"
          fitted={false}
        >
          <Tabs.List rounded="999px" bg="var(--surface-2)" p="1" minW="max-content">
            {recipeModel.tabs.map((tab) => (
              <Tabs.Trigger key={tab.id} value={tab.id}>
                {tab.label}
              </Tabs.Trigger>
            ))}
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.ContentGroup pt="3">
            {recipeModel.tabs.map((tab) => {
              const view = viewMap.get(tab.viewId);
              const sections = view?.sectionIds.map((sectionId) => sectionMap.get(sectionId)).filter((section): section is RecipeSection => Boolean(section)) ?? [];
              return (
                <Tabs.Content key={tab.id} value={tab.id}>
                  <VStack align="stretch" gap="4">
                    {sections.map((section) => renderSection(section))}
                    {sections.length === 0 ? (
                      <Box rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
                        <Text fontSize="sm" color="var(--text-secondary)">
                          No sections are available for this tab yet.
                        </Text>
                      </Box>
                    ) : null}
                  </VStack>
                </Tabs.Content>
              );
            })}
          </Tabs.ContentGroup>
        </Tabs.Root>
      ) : (
        <VStack align="stretch" gap="4">
          {viewSections.map((section) => renderSection(section))}
        </VStack>
      )}

      {currentView && resolveCollection(currentView.metadata.primaryCollectionId as string | undefined) ? (
        <Separator borderColor="var(--border-subtle)" />
      ) : null}
    </VStack>
  );
}

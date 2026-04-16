import { Badge, Box, Button, Checkbox, Flex, HStack, Input, Separator, Skeleton, Spinner, Table, Text, Textarea, VStack } from '@chakra-ui/react';
import type {
  Recipe,
  RecipeActionDefinition,
  RecipeActionSpec,
  RecipeTemplateActionReference,
  RecipeTemplateSectionProgress,
  RecipeTemplateField,
  RecipeTemplateSection,
  RecipeTemplateState
} from '@hermes-recipes/protocol';
import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { TemplateActionButton, TemplateChipPill, TemplateSectionHeader, TemplateSurface } from '../../features/recipe-templates/template-primitives';
import { templateToneStyles } from '../../features/recipe-templates/template-style-helpers';

function actionToneFromDefinition(action: RecipeActionDefinition): 'neutral' | 'accent' | 'danger' {
  if (action.intent === 'primary') {
    return 'accent';
  }

  if (action.intent === 'danger' || action.kind === 'destructive') {
    return 'danger';
  }

  return 'neutral';
}

function fieldHasContent(field: RecipeTemplateField) {
  return Boolean(field.value || field.chips.length > 0 || field.bullets.length > 0 || field.links.length > 0);
}

function renderFieldBody(field: RecipeTemplateField, options?: { showCopyButtons?: boolean }) {
  return (
    <VStack align="stretch" gap="2">
      {field.value ? (
        <Text fontSize="sm" color="var(--text-secondary)">
          {field.value}
        </Text>
      ) : null}
      {field.chips.length > 0 ? (
        <Flex gap="2" wrap="wrap">
          {field.chips.map((chip) => (
            <TemplateChipPill key={`${field.label}-${chip.label}`} chip={chip} />
          ))}
        </Flex>
      ) : null}
      {field.bullets.length > 0 ? (
        <VStack align="stretch" gap="1.5">
          {field.bullets.map((bullet) => (
            <HStack key={bullet} align="start" gap="2">
              <Box mt="1.5" w="1.5" h="1.5" rounded="full" bg="var(--accent)" flexShrink={0} />
              <Text fontSize="sm" color="var(--text-secondary)">
                {bullet}
              </Text>
            </HStack>
          ))}
        </VStack>
      ) : null}
      {field.links.length > 0 ? (
        <VStack align="stretch" gap="1.5">
          {field.links.map((link) => (
            <HStack key={link.href} gap="1.5" align="center">
              <Text fontSize="sm" color="var(--text-secondary)">
                {link.label}:&nbsp;
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  {link.href}
                </a>
              </Text>
              {options?.showCopyButtons ? (
                <Button
                  size="xs"
                  variant="ghost"
                  rounded="6px"
                  px="1.5"
                  minW="auto"
                  h="auto"
                  py="1"
                  color="var(--text-muted)"
                  _hover={{ color: 'var(--text-primary)', bg: 'var(--surface-2)' }}
                  aria-label={`Copy ${link.label}`}
                  onClick={() => void navigator.clipboard.writeText(link.href)}
                >
                  <Text fontSize="xs" lineHeight="1">
                    &#x2398;
                  </Text>
                </Button>
              ) : null}
            </HStack>
          ))}
        </VStack>
      ) : null}
    </VStack>
  );
}

function findInitialActiveTabs(sections: RecipeTemplateSection[], sink: Record<string, string> = {}) {
  for (const section of sections) {
    if (section.kind === 'tabs') {
      sink[section.slotId] = section.activeTabId;
      Object.values(section.panes).forEach((pane) => findInitialActiveTabs(pane, sink));
    }

    if (section.kind === 'split') {
      findInitialActiveTabs(section.left, sink);
      findInitialActiveTabs(section.right, sink);
    }
  }

  return sink;
}

function resolveSectionProgress(section: RecipeTemplateSection, templatePhase?: string): RecipeTemplateSectionProgress {
  if (templatePhase === 'ready') {
    return { hydrationState: 'ready', repairState: 'idle', contentState: 'hydrated' };
  }
  const progress = (section as { progress?: RecipeTemplateSectionProgress }).progress;
  return (
    progress ?? {
      hydrationState: 'ready',
      repairState: 'idle',
      contentState: 'hydrated'
    }
  );
}

function sectionHasRenderableContent(section: RecipeTemplateSection): boolean {
  switch (section.kind) {
    case 'hero':
      return Boolean(section.summary || section.chips.length > 0 || section.actions.length > 0);
    case 'filter-strip':
      return section.filters.length > 0 || Boolean(section.sortLabel);
    case 'action-bar':
      return section.actions.length > 0;
    case 'stats':
      return section.items.length > 0;
    case 'comparison-table':
      return section.columns.length > 0 || section.rows.length > 0 || section.footerChips.length > 0 || Boolean(section.footnote);
    case 'grouped-list':
      return section.groups.some((group) => group.items.length > 0);
    case 'card-grid':
      return section.cards.length > 0;
    case 'detail-panel':
      return Boolean(section.summary || section.fields.length > 0 || section.chips.length > 0 || section.note || section.actions.length > 0);
    case 'timeline':
      return section.items.length > 0;
    case 'notes':
      return section.lines.length > 0;
    case 'activity-log':
      return section.entries.length > 0;
    case 'kanban':
      return section.columns.some((column) => column.cards.length > 0);
    case 'confirmation':
      return Boolean(section.message);
    case 'checklist':
      return section.steps.length > 0;
    case 'split':
      return [...section.left, ...section.right].some((nested) => sectionHasRenderableContent(nested));
    case 'tabs':
      return Object.values(section.panes).some((pane) => pane.some((nested) => sectionHasRenderableContent(nested)));
    default:
      return false;
  }
}

function shouldRenderGhostSection(section: RecipeTemplateSection, templatePhase?: string) {
  const progress = resolveSectionProgress(section, templatePhase);
  return !sectionHasRenderableContent(section) && (progress.hydrationState !== 'ready' || progress.repairState !== 'idle');
}

function ghostBar(width: string) {
  return <Skeleton h="3" w={width} rounded="full" />;
}

function renderGhostSectionBody(section: RecipeTemplateSection) {
  switch (section.kind) {
    case 'comparison-table':
      return (
        <VStack align="stretch" gap="3">
          {ghostBar('48%')}
          <Box rounded="8px" border="1px dashed var(--border-subtle)" px="3.5" py="3">
            <VStack align="stretch" gap="2">
              {ghostBar('100%')}
              {ghostBar('84%')}
              {ghostBar('92%')}
            </VStack>
          </Box>
        </VStack>
      );
    case 'stats':
      return (
        <Flex gap="3" wrap="wrap">
          {Array.from({ length: 3 }).map((_, index) => (
            <Box key={`ghost-stat-${index}`} minW="138px" rounded="8px" border="1px dashed var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
              {ghostBar('42%')}
              <Box mt="3">{ghostBar('68%')}</Box>
            </Box>
          ))}
        </Flex>
      );
    case 'card-grid':
      return (
        <Flex gap="3.5" wrap="wrap">
          {Array.from({ length: 2 }).map((_, index) => (
            <Box key={`ghost-card-${index}`} flex={{ base: '1 1 100%', md: '1 1 calc(50% - 14px)' }} minW="260px" rounded="8px" border="1px dashed var(--border-subtle)" bg="var(--surface-2)" px="4" py="3.5">
              <VStack align="stretch" gap="2.5">
                {ghostBar('56%')}
                {ghostBar('84%')}
                {ghostBar('72%')}
              </VStack>
            </Box>
          ))}
        </Flex>
      );
    case 'grouped-list':
      return (
        <VStack align="stretch" gap="3">
          {Array.from({ length: 2 }).map((_, groupIndex) => (
            <Box key={`ghost-group-${groupIndex}`} rounded="8px" border="1px dashed var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
              <VStack align="stretch" gap="2">
                {ghostBar('36%')}
                {ghostBar('88%')}
                {ghostBar('70%')}
              </VStack>
            </Box>
          ))}
        </VStack>
      );
    case 'detail-panel':
      return (
        <VStack align="stretch" gap="3">
          {ghostBar('38%')}
          {ghostBar('92%')}
          {ghostBar('78%')}
        </VStack>
      );
    case 'timeline':
      return (
        <VStack align="stretch" gap="3">
          {Array.from({ length: 3 }).map((_, index) => (
            <HStack key={`ghost-time-${index}`} align="start" gap="3">
              <Box mt="1" w="2.5" h="2.5" rounded="full" bg="rgba(37, 99, 235, 0.28)" />
              <VStack align="stretch" gap="2" flex="1">
                {ghostBar('42%')}
                {ghostBar('86%')}
              </VStack>
            </HStack>
          ))}
        </VStack>
      );
    case 'notes':
    case 'activity-log':
      return (
        <VStack align="stretch" gap="2">
          {ghostBar('96%')}
          {ghostBar('88%')}
          {ghostBar('72%')}
        </VStack>
      );
    case 'kanban':
      return (
        <Flex gap="3.5" overflowX="auto" pb="1">
          {Array.from({ length: 2 }).map((_, index) => (
            <Box key={`ghost-kanban-${index}`} minW={{ base: '100%', md: '240px' }} rounded="8px" border="1px dashed var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3.5">
              <VStack align="stretch" gap="2.5">
                {ghostBar('48%')}
                {ghostBar('84%')}
                {ghostBar('72%')}
              </VStack>
            </Box>
          ))}
        </Flex>
      );
    case 'action-bar':
      return (
        <Flex gap="2" wrap="wrap">
          {Array.from({ length: 2 }).map((_, index) => (
            <Box key={`ghost-action-${index}`} h="8" w={index === 0 ? '132px' : '116px'} rounded="14px" bg="rgba(148, 163, 184, 0.18)" />
          ))}
        </Flex>
      );
    case 'checklist':
      return (
        <VStack align="stretch" gap="3">
          {Array.from({ length: 3 }).map((_, index) => (
            <HStack key={`ghost-checklist-${index}`} gap="3" align="start">
              <Box mt="1" w="4" h="4" rounded="4px" border="1px dashed var(--border-subtle)" flexShrink={0} />
              <VStack align="stretch" gap="2" flex="1">
                {ghostBar(`${70 + index * 8}%`)}
                {ghostBar('50%')}
              </VStack>
            </HStack>
          ))}
        </VStack>
      );
    case 'confirmation':
      return (
        <VStack align="stretch" gap="3">
          {ghostBar('68%')}
          {ghostBar('92%')}
          <Flex gap="2">
            <Box h="8" w="132px" rounded="14px" bg="rgba(148, 163, 184, 0.18)" />
            <Box h="8" w="104px" rounded="14px" bg="rgba(148, 163, 184, 0.18)" />
          </Flex>
        </VStack>
      );
    default:
      return (
        <VStack align="stretch" gap="2">
          {ghostBar('84%')}
          {ghostBar('72%')}
        </VStack>
      );
  }
}

function actionInputMeta(actionId: string) {
  switch (actionId) {
    case 'append-template-note':
      return {
        placeholder: 'Add note',
        inputType: 'textarea' as const,
        fieldName: 'note'
      };
    case 'add-event-guest':
      return {
        placeholder: 'Guest name',
        inputType: 'input' as const,
        fieldName: 'guestName'
      };
    default:
      return null;
  }
}

function ChecklistSectionRenderer({
  section,
  ghost,
  renderGhostSectionBody,
  renderActionRefs
}: {
  section: Extract<RecipeTemplateSection, { kind: 'checklist' }>;
  ghost: boolean;
  renderGhostSectionBody: (section: RecipeTemplateSection) => ReactNode;
  renderActionRefs: (refs: RecipeTemplateActionReference[], options: { contextKey: string }) => ReactNode;
}) {
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  return (
    <TemplateSurface>
      <VStack align="stretch" gap="4">
        <TemplateSectionHeader title={section.title} />
        {ghost ? (
          renderGhostSectionBody(section)
        ) : (
          <>
            {section.prerequisites.length > 0 ? (
              <VStack align="stretch" gap="2">
                <Text fontSize="xs" fontWeight="500" textTransform="uppercase" letterSpacing="0.08em" color="var(--text-muted)">
                  Prerequisites
                </Text>
                <VStack align="stretch" gap="1.5">
                  {section.prerequisites.map((prereq) => (
                    <HStack key={prereq} align="start" gap="2">
                      <Box mt="1.5" w="1.5" h="1.5" rounded="full" bg="var(--accent)" flexShrink={0} />
                      <Text fontSize="sm" color="var(--text-secondary)">
                        {prereq}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            ) : null}
            <VStack align="stretch" gap="2.5">
              {section.steps.map((step, index) => {
                const isChecked = checkedSteps[step.id] ?? step.checked ?? false;
                return (
                  <HStack
                    key={step.id}
                    align="start"
                    gap="3"
                    rounded="8px"
                    border="1px solid var(--border-subtle)"
                    bg="var(--surface-2)"
                    px="3.5"
                    py="3"
                  >
                    <Box pt="0.5">
                      <Checkbox.Root
                        checked={isChecked}
                        onCheckedChange={(event) =>
                          setCheckedSteps((current) => ({
                            ...current,
                            [step.id]: !!event.checked
                          }))
                        }
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                      </Checkbox.Root>
                    </Box>
                    <VStack align="start" gap="0.5" minW={0}>
                      <Text
                        fontWeight="600"
                        color={isChecked ? 'var(--text-muted)' : 'var(--text-primary)'}
                        textDecoration={isChecked ? 'line-through' : undefined}
                        opacity={isChecked ? 0.6 : 1}
                      >
                        <Text as="span" fontWeight="700" color={isChecked ? 'var(--text-muted)' : 'var(--accent)'} mr="2">
                          {index + 1}.
                        </Text>
                        {step.label}
                      </Text>
                      {step.detail ? (
                        <Text
                          fontSize="sm"
                          color="var(--text-secondary)"
                          textDecoration={isChecked ? 'line-through' : undefined}
                          opacity={isChecked ? 0.5 : 1}
                        >
                          {step.detail}
                        </Text>
                      ) : null}
                    </VStack>
                  </HStack>
                );
              })}
            </VStack>
          </>
        )}
        {!ghost && section.actions.length > 0 ? renderActionRefs(section.actions, { contextKey: section.slotId }) : null}
      </VStack>
    </TemplateSurface>
  );
}

function CollapsibleNotesSection({
  section,
  ghost,
  renderGhostSectionBody
}: {
  section: Extract<RecipeTemplateSection, { kind: 'notes' }>;
  ghost: boolean;
  renderGhostSectionBody: (section: RecipeTemplateSection) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <TemplateSurface>
      <VStack align="stretch" gap={open ? '4' : '0'}>
        <HStack
          justify="recipe-between"
          align="center"
          cursor="pointer"
          onClick={() => setOpen((prev) => !prev)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setOpen((prev) => !prev);
            }
          }}
        >
          <TemplateSectionHeader title="Response notes" />
          <Text fontSize="xs" color="var(--text-muted)" flexShrink={0}>
            {open ? 'Collapse' : `${section.lines.length} note${section.lines.length === 1 ? '' : 's'}`}
          </Text>
        </HStack>
        {open ? (
          ghost ? (
            renderGhostSectionBody(section)
          ) : (
            <>
              <VStack align="stretch" gap="2">
                {section.lines.map((line, index) => (
                  <Box key={`${section.slotId}-line-${index}`} rounded="6px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
                    <Text fontSize="sm" color="var(--text-secondary)">
                      {line}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </>
          )
        ) : null}
      </VStack>
    </TemplateSurface>
  );
}

export function RecipeTemplateRenderer({
  recipe: _space,
  templateState,
  actionSpec,
  actionLoadingId,
  actionError,
  onRunAction
}: {
  recipe: Recipe;
  templateState: RecipeTemplateState;
  actionSpec: RecipeActionSpec | null | undefined;
  actionLoadingId: string | null;
  actionError: string | null;
  onRunAction: (
    actionId: string,
    input: {
      selectedItemIds?: string[];
      formValues?: Record<string, string | number | boolean | null>;
    }
  ) => Promise<void> | void;
}) {
  const actionMap = useMemo(() => new Map((actionSpec?.actions ?? []).map((action) => [action.id, action] as const)), [actionSpec]);
  const [activeTabsBySlot, setActiveTabsBySlot] = useState<Record<string, string>>(() => findInitialActiveTabs(templateState.sections));
  const [draftValues, setDraftValues] = useState<Record<string, string>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const toggleFilter = useCallback((label: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }, []);

  async function executeAction(
    actionId: string,
    options: {
      selectedItemIds?: string[];
      formValues?: Record<string, string | number | boolean | null>;
      clearDraftKey?: string;
    } = {}
  ) {
    await onRunAction(actionId, {
      selectedItemIds: options.selectedItemIds,
      formValues: options.formValues
    });

    if (options.clearDraftKey) {
      setDraftValues((current) => ({
        ...current,
        [options.clearDraftKey ?? '']: ''
      }));
    }
  }

  function renderSectionFrame(section: RecipeTemplateSection, content: ReactNode) {
    const progress = resolveSectionProgress(section, templateState.status?.phase);
    const isRepairing = progress.repairState === 'repairing';
    const isFailed = progress.hydrationState === 'failed' || progress.repairState === 'failed';
    const isPending = progress.hydrationState === 'pending';
    const isHydrating = progress.hydrationState === 'hydrating';
    const badgeLabel = isRepairing ? 'Repairing' : isFailed ? 'Failed' : isHydrating ? 'Hydrating' : isPending ? 'Pending' : null;
    const borderColor = isRepairing
      ? 'orange.300'
      : isFailed
        ? 'red.300'
        : isHydrating
          ? 'blue.300'
          : isPending
            ? 'var(--border-subtle)'
            : 'transparent';
    const background = isRepairing
      ? 'rgba(249, 115, 22, 0.06)'
      : isFailed
        ? 'rgba(239, 68, 68, 0.05)'
        : isHydrating
          ? 'rgba(37, 99, 235, 0.04)'
          : 'transparent';
    const boxShadow = isRepairing ? '0 0 0 1px rgba(249, 115, 22, 0.24), 0 0 28px rgba(249, 115, 22, 0.14)' : 'none';

    return (
      <Box
        key={section.slotId}
        position="relative"
        data-testid={`recipe-template-section-${section.slotId}`}
        data-hydration-state={progress.hydrationState}
        data-repair-state={progress.repairState}
        data-content-state={progress.contentState}
      >
        {badgeLabel ? (
          <Box
            position="absolute"
            top="3"
            right="3"
            zIndex={1}
            rounded="full"
            px="2.5"
            py="1"
            border="1px solid"
            borderColor={isRepairing ? 'orange.300' : isFailed ? 'red.300' : 'blue.300'}
            bg={isRepairing ? 'orange.50' : isFailed ? 'red.50' : 'blue.50'}
            _dark={{
              borderColor: isRepairing ? 'orange.300' : isFailed ? 'red.300' : 'blue.300',
              bg: isRepairing ? 'rgba(249, 115, 22, 0.16)' : isFailed ? 'rgba(239, 68, 68, 0.16)' : 'rgba(37, 99, 235, 0.16)'
            }}
          >
            <HStack gap="1.5" align="center">
              {!isFailed ? (
                <Spinner
                  size="xs"
                  color={isRepairing ? 'orange.500' : 'blue.500'}
                  borderWidth="2px"
                  css={{ width: '10px', height: '10px' }}
                />
              ) : null}
              <Text
                fontSize="10px"
                fontWeight="600"
                letterSpacing="0.1em"
                textTransform="uppercase"
                color={isRepairing ? 'orange.700' : isFailed ? 'red.700' : 'blue.700'}
                _dark={{ color: isRepairing ? 'orange.100' : isFailed ? 'red.100' : 'blue.100' }}
              >
                {badgeLabel}
              </Text>
            </HStack>
          </Box>
        ) : null}
        <Box rounded="12px" border="2px solid" borderColor={borderColor} bg={background} boxShadow={boxShadow} p="1">
          {content}
        </Box>
        {progress.errorMessage ? (
          <Box mt="2" rounded="6px" border="1px solid" borderColor={isFailed ? 'red.200' : 'orange.200'} bg={isFailed ? 'red.50' : 'orange.50'} px="3" py="2" _dark={{ bg: isFailed ? 'rgba(239, 68, 68, 0.12)' : 'rgba(249, 115, 22, 0.12)', borderColor: isFailed ? 'rgba(248, 113, 113, 0.24)' : 'rgba(251, 146, 60, 0.24)' }}>
            <Text fontSize="xs" fontWeight="500" color={isFailed ? 'red.700' : 'orange.700'} _dark={{ color: isFailed ? 'red.100' : 'orange.100' }}>
              {progress.errorMessage}
            </Text>
          </Box>
        ) : null}
      </Box>
    );
  }

  function renderActionRefs(
    actionRefs: RecipeTemplateActionReference[],
    options: {
      contextKey: string;
      fallbackSelectedItemIds?: string[];
      compact?: boolean;
    }
  ) {
    if (actionRefs.length === 0) {
      return null;
    }

    return (
      <Flex gap="2" wrap="wrap">
        {actionRefs.map((actionRef, index) => {
          if (actionRef.kind === 'link') {
            return (
              <TemplateActionButton
                key={`${options.contextKey}-link-${index}`}
                action={{ label: actionRef.label, tone: 'neutral' }}
                compact={options.compact}
                href={actionRef.href}
                openInNewTab={actionRef.openInNewTab}
              />
            );
          }

          const action = actionMap.get(actionRef.actionId);
          if (!action) {
            return null;
          }

          const selectedItemIds =
            actionRef.selectedItemIds.length > 0 ? actionRef.selectedItemIds : (options.fallbackSelectedItemIds ?? []);
          const inputMeta = actionInputMeta(action.id);
          if (inputMeta) {
            const draftKey = `${options.contextKey}:${action.id}`;
            const draftValue = draftValues[draftKey] ?? '';
            const button = (
              <TemplateActionButton
                key={`${options.contextKey}-${action.id}`}
                action={{ label: action.label, tone: actionToneFromDefinition(action) }}
                compact={options.compact}
                loading={actionLoadingId === action.id}
                onClick={() =>
                  void executeAction(action.id, {
                    selectedItemIds,
                    formValues: {
                      [inputMeta.fieldName]: draftValue.trim()
                    },
                    clearDraftKey: draftKey
                  })
                }
              />
            );

            return (
              <HStack key={`${options.contextKey}-input-${action.id}`} align={inputMeta.inputType === 'textarea' ? 'end' : 'center'} gap="2">
                {inputMeta.inputType === 'textarea' ? (
                  <Textarea
                    value={draftValue}
                    onChange={(event) =>
                      setDraftValues((current) => ({
                        ...current,
                        [draftKey]: event.target.value
                      }))
                    }
                    placeholder={inputMeta.placeholder}
                    minH="70px"
                    maxW="320px"
                    rounded="6px"
                    resize="vertical"
                    bg="var(--surface-2)"
                    border="1px solid var(--border-subtle)"
                  />
                ) : (
                  <Input
                    value={draftValue}
                    onChange={(event) =>
                      setDraftValues((current) => ({
                        ...current,
                        [draftKey]: event.target.value
                      }))
                    }
                    placeholder={inputMeta.placeholder}
                    maxW="220px"
                    rounded="14px"
                    bg="var(--surface-2)"
                    border="1px solid var(--border-subtle)"
                  />
                )}
                {button}
              </HStack>
            );
          }

          return (
            <TemplateActionButton
              key={`${options.contextKey}-${action.id}-${index}`}
              action={{ label: action.label, tone: actionToneFromDefinition(action) }}
              compact={options.compact}
              loading={actionLoadingId === action.id}
              onClick={() =>
                void executeAction(action.id, {
                  selectedItemIds
                })
              }
            />
          );
        })}
      </Flex>
    );
  }

  function renderSection(section: RecipeTemplateSection): ReactNode {
    const templatePhase = templateState.status?.phase;
    const ghost = shouldRenderGhostSection(section, templatePhase);
    const wrap = (content: ReactNode) => renderSectionFrame(section, content);

    switch (section.kind) {
      case 'filter-strip':
        return wrap(
          <TemplateSurface key={section.slotId} bg="var(--surface-1)">
            <VStack align="stretch" gap="3">
              <Flex justify="recipe-between" align="center" gap="3" wrap="wrap">
                <Text fontSize="sm" fontWeight="500" color="var(--text-secondary)">
                  {section.title ?? 'Filters'}
                </Text>
                {section.sortLabel ? (
                  <Text fontSize="sm" color="var(--text-muted)">
                    {section.sortLabel}
                  </Text>
                ) : null}
              </Flex>
              {ghost ? (
                renderGhostSectionBody(section)
              ) : (
                <Flex gap="2" wrap="wrap">
                  {section.filters.map((filter) => {
                    const isActive = activeFilters.has(filter.label);
                    return (
                      <Badge
                        key={`${section.slotId}-${filter.label}`}
                        rounded="999px"
                        px="2.5"
                        py="1"
                        fontSize="11px"
                        fontWeight="700"
                        border="1px solid var(--border-subtle)"
                        bg={isActive ? 'var(--surface-accent)' : 'transparent'}
                        color="var(--text-primary)"
                        cursor="pointer"
                        onClick={() => toggleFilter(filter.label)}
                        _hover={{ bg: isActive ? 'var(--surface-accent)' : 'var(--surface-2)' }}
                      >
                        {filter.label}
                      </Badge>
                    );
                  })}
                </Flex>
              )}
            </VStack>
          </TemplateSurface>
        );
      case 'action-bar':
        return wrap(
          <TemplateSurface key={section.slotId}>
            <VStack align="stretch" gap="3">
              {section.title ? (
                <Text fontSize="sm" fontWeight="500" color="var(--text-secondary)">
                  {section.title}
                </Text>
              ) : null}
              {ghost ? renderGhostSectionBody(section) : renderActionRefs(section.actions, { contextKey: section.slotId })}
            </VStack>
          </TemplateSurface>
        );
      case 'stats':
        return wrap(
          <TemplateSurface key={section.slotId} bg="var(--surface-2)">
            <VStack align="stretch" gap="3">
              {section.title ? (
                <Text fontSize="sm" fontWeight="500" color="var(--text-secondary)">
                  {section.title}
                </Text>
              ) : null}
              {ghost ? (
                renderGhostSectionBody(section)
              ) : (
                <Flex gap="3" wrap="wrap">
                  {section.items.map((item) => {
                    const tone = templateToneStyles(item.tone);
                    return (
                      <Box
                        key={`${section.slotId}-${item.label}`}
                        minW="138px"
                        rounded="8px"
                        border="1px solid"
                        borderColor={tone.border}
                        bg={tone.bg}
                        px="3.5"
                        py="3"
                        _dark={{
                          borderColor: tone.darkBorder,
                          bg: tone.darkBg
                        }}
                      >
                        <Text fontSize="xs" fontWeight="500" color="var(--text-muted)" textTransform="uppercase" letterSpacing="0.08em">
                          {item.label}
                        </Text>
                        <Text mt="1.5" fontSize="xl" fontWeight="700" color="var(--text-primary)">
                          {item.value}
                        </Text>
                        {item.helper ? (
                          <Text mt="1" fontSize="sm" color="var(--text-secondary)">
                            {item.helper}
                          </Text>
                        ) : null}
                      </Box>
                    );
                  })}
                </Flex>
              )}
            </VStack>
          </TemplateSurface>
        );
      case 'checklist':
        return wrap(
          <ChecklistSectionRenderer
            key={section.slotId}
            section={section}
            ghost={ghost}
            renderGhostSectionBody={renderGhostSectionBody}
            renderActionRefs={renderActionRefs}
          />
        );
      case 'comparison-table': {
        const useVerticalLayout = section.columns.length > section.rows.length;
        return wrap(
          <TemplateSurface key={section.slotId}>
            <VStack align="stretch" gap="4">
              <TemplateSectionHeader title={section.title} />
              {ghost ? (
                renderGhostSectionBody(section)
              ) : (
                <>
                  {useVerticalLayout ? (
                    <Table.ScrollArea borderWidth="1px" borderColor="var(--border-subtle)" rounded="8px">
                      <Table.Root size="sm" variant="outline" css={{ tableLayout: 'fixed', width: '100%' }}>
                        <Table.Header>
                          <Table.Row>
                            <Table.ColumnHeader>Criteria</Table.ColumnHeader>
                            {section.rows.map((row) => (
                              <Table.ColumnHeader key={row.id}>
                                {row.label}
                              </Table.ColumnHeader>
                            ))}
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {section.columns.map((column, colIndex) => (
                            <Table.Row key={column.id}>
                              <Table.Cell>
                                <Text fontWeight="600" color="var(--text-muted)" fontSize="xs" textTransform="uppercase" letterSpacing="0.06em">
                                  {column.label}
                                </Text>
                              </Table.Cell>
                              {section.rows.map((row) => {
                                const cell = row.cells[colIndex];
                                if (!cell) return <Table.Cell key={row.id} />;
                                const tone = templateToneStyles(cell.tone);
                                return (
                                  <Table.Cell key={row.id} css={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                    <Text fontWeight={cell.emphasis ? '800' : '600'} color={cell.tone ? tone.color : 'var(--text-primary)'} _dark={cell.tone ? { color: tone.darkColor } : undefined}>
                                      {cell.value}
                                    </Text>
                                    {cell.subvalue ? (
                                      <Text fontSize="xs" color="var(--text-muted)">
                                        {cell.subvalue}
                                      </Text>
                                    ) : null}
                                  </Table.Cell>
                                );
                              })}
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Root>
                    </Table.ScrollArea>
                  ) : (
                    <Table.ScrollArea borderWidth="1px" borderColor="var(--border-subtle)" rounded="8px">
                      <Table.Root size="sm" variant="outline">
                        <Table.Header>
                          <Table.Row>
                            <Table.ColumnHeader>Item</Table.ColumnHeader>
                            {section.columns.map((column) => (
                              <Table.ColumnHeader key={column.id} textAlign={column.align ?? 'start'}>
                                {column.label}
                              </Table.ColumnHeader>
                            ))}
                            <Table.ColumnHeader />
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {section.rows.map((row) => (
                            <Table.Row
                              key={row.id}
                              cursor="pointer"
                              bg={selectedItemId === row.id ? 'var(--surface-accent)' : undefined}
                              _hover={{ bg: selectedItemId === row.id ? 'var(--surface-accent)' : 'var(--surface-2)' }}
                              onClick={() => setSelectedItemId((prev) => (prev === row.id ? null : row.id))}
                            >
                              <Table.Cell>
                                <Text fontWeight="700" color="var(--text-primary)">
                                  {row.label}
                                </Text>
                              </Table.Cell>
                              {row.cells.map((cell, index) => {
                                const tone = templateToneStyles(cell.tone);
                                return (
                                  <Table.Cell key={`${row.id}-${section.columns[index]?.id ?? index}`} textAlign={section.columns[index]?.align ?? 'start'}>
                                    <Text fontWeight={cell.emphasis ? '800' : '600'} color={cell.tone ? tone.color : 'var(--text-primary)'} _dark={cell.tone ? { color: tone.darkColor } : undefined}>
                                      {cell.value}
                                    </Text>
                                    {cell.subvalue ? (
                                      <Text fontSize="xs" color="var(--text-muted)">
                                        {cell.subvalue}
                                      </Text>
                                    ) : null}
                                  </Table.Cell>
                                );
                              })}
                              <Table.Cell textAlign="end">
                                {renderActionRefs(row.actions, {
                                  contextKey: `${section.slotId}:${row.id}`,
                                  fallbackSelectedItemIds: [row.id],
                                  compact: true
                                })}
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Root>
                    </Table.ScrollArea>
                  )}
                  {section.footerChips.length > 0 ? (
                    <Flex gap="2" wrap="wrap">
                      {section.footerChips.map((chip) => (
                        <TemplateChipPill key={`${section.slotId}-${chip.label}`} chip={chip} />
                      ))}
                    </Flex>
                  ) : null}
                  {section.footnote ? (
                    <Text fontSize="sm" color="var(--text-muted)">
                      {section.footnote}
                    </Text>
                  ) : null}
                </>
              )}
            </VStack>
          </TemplateSurface>
        );
      }
      case 'grouped-list':
        return wrap(
          <TemplateSurface key={section.slotId}>
            <VStack align="stretch" gap="4">
              <TemplateSectionHeader title={section.title} />
              {ghost ? (
                renderGhostSectionBody(section)
              ) : (
                <>
                  {section.groups.map((group, groupIndex) => {
                    const tone = templateToneStyles(group.tone);
                    return (
                      <VStack key={group.id} align="stretch" gap="2.5">
                        <HStack align="center" gap="2">
                          <Box w="2" h="2" rounded="full" bg={tone.color} _dark={{ bg: tone.darkColor }} />
                          <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                            {group.label}
                          </Text>
                        </HStack>
                        <VStack align="stretch" gap="2">
                          {group.items.map((item) => {
                            const itemKey = item.id ?? item.title;
                            const isSelected = selectedItemId === itemKey;
                            return (
                              <Box
                                key={`${group.id}-${itemKey}`}
                                rounded="8px"
                                border="1px solid var(--border-subtle)"
                                bg={isSelected ? 'var(--surface-accent)' : 'var(--surface-2)'}
                                px="3.5"
                                py="3"
                                cursor="pointer"
                                _hover={{ bg: isSelected ? 'var(--surface-accent)' : 'var(--surface-2)' }}
                                onClick={() => setSelectedItemId((prev) => (prev === itemKey ? null : itemKey))}
                              >
                                <Flex justify="recipe-between" align="start" gap="3">
                                  <VStack align="start" gap="1" minW={0}>
                                    <Text fontWeight="700" color="var(--text-primary)">
                                      {item.title}
                                    </Text>
                                    {item.subtitle ? (
                                      <Text fontSize="sm" color="var(--text-secondary)">
                                        {item.subtitle}
                                      </Text>
                                    ) : null}
                                    {item.meta ? (
                                      <Text fontSize="sm" color="var(--text-muted)">
                                        {item.meta}
                                      </Text>
                                    ) : null}
                                  </VStack>
                                </Flex>
                                {item.chips.length > 0 ? (
                                  <Flex mt="2.5" gap="2" wrap="wrap">
                                    {item.chips.map((chip) => (
                                      <TemplateChipPill key={`${item.id ?? item.title}-${chip.label}`} chip={chip} />
                                    ))}
                                  </Flex>
                                ) : null}
                                {item.actions.length > 0 ? (
                                  <Box mt="2.5">
                                    {renderActionRefs(item.actions, {
                                      contextKey: `${section.slotId}:${item.id ?? item.title}`,
                                      fallbackSelectedItemIds: item.id ? [item.id] : undefined,
                                      compact: true
                                    })}
                                  </Box>
                                ) : null}
                              </Box>
                            );
                          })}
                        </VStack>
                        {groupIndex < section.groups.length - 1 ? <Separator borderColor="var(--border-subtle)" /> : null}
                      </VStack>
                    );
                  })}
                </>
              )}
            </VStack>
          </TemplateSurface>
        );
      case 'card-grid':
        return wrap(
          <TemplateSurface key={section.slotId}>
            <VStack align="stretch" gap="4">
              <TemplateSectionHeader title={section.title} />
              {ghost ? (
                renderGhostSectionBody(section)
              ) : (
                <Flex gap="3.5" wrap="wrap">
                  {section.cards.map((card) => (
                    <Box key={card.id ?? card.title} flex={{ base: '1 1 100%', md: `1 1 calc(${100 / (section.columns ?? 2)}% - 14px)` }} minW="260px" rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-1)" overflow="hidden">
                      <Box
                        px="4"
                        py="3.5"
                        bg="var(--surface-1)"
                        borderBottom="1px solid var(--border-subtle)"
                      >
                        <Text fontSize="11px" fontWeight="600" letterSpacing="0.12em" textTransform="uppercase" color="var(--text-muted)">
                          {card.imageLabel ?? 'Preview state'}
                        </Text>
                        <Text mt="1.5" fontWeight="600" color="var(--text-primary)">
                          {card.title}
                        </Text>
                        {card.subtitle ? (
                          <Text mt="1" fontSize="sm" color="var(--text-secondary)">
                            {card.subtitle}
                          </Text>
                        ) : null}
                      </Box>
                      <VStack align="stretch" gap="3" px="4" py="3.5">
                        {card.price ? (
                          <Text fontSize="lg" fontWeight="700" color="var(--text-primary)">
                            {card.price}
                          </Text>
                        ) : null}
                        {card.chips.length > 0 ? (
                          <Flex gap="2" wrap="wrap">
                            {card.chips.map((chip) => (
                              <TemplateChipPill key={`${card.id ?? card.title}-${chip.label}`} chip={chip} />
                            ))}
                          </Flex>
                        ) : null}
                        {card.bullets.length > 0 ? (
                          <VStack align="stretch" gap="1.5">
                            {card.bullets.map((bullet) => (
                              <HStack key={bullet} align="start" gap="2">
                                <Box mt="1.5" w="1.5" h="1.5" rounded="full" bg="var(--accent)" flexShrink={0} />
                                <Text fontSize="sm" color="var(--text-secondary)">
                                  {bullet}
                                </Text>
                              </HStack>
                            ))}
                          </VStack>
                        ) : null}
                        {card.footer ? (
                          <Text fontSize="xs" color="var(--text-muted)">
                            {card.footer}
                          </Text>
                        ) : null}
                        {card.actions.length > 0 ? (
                          renderActionRefs(card.actions, {
                            contextKey: `${section.slotId}:${card.id ?? card.title}`,
                            fallbackSelectedItemIds: card.id ? [card.id] : undefined
                          })
                        ) : null}
                      </VStack>
                    </Box>
                  ))}
                </Flex>
              )}
            </VStack>
          </TemplateSurface>
        );
      case 'detail-panel': {
        const primaryFields = section.fields.filter((field) => !field.fullWidth && fieldHasContent(field));
        const fullWidthFields = section.fields.filter((field) => field.fullWidth && fieldHasContent(field));

        return wrap(
          <TemplateSurface key={section.slotId}>
            <VStack align="stretch" gap="4">
              <TemplateSectionHeader title={section.title} eyebrow={section.eyebrow} summary={section.summary} />
              {ghost ? (
                renderGhostSectionBody(section)
              ) : !selectedItemId ? (
                <Box rounded="8px" border="1px dashed var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="5" textAlign="center">
                  <Text fontSize="sm" color="var(--text-muted)">
                    Select an item to see details
                  </Text>
                </Box>
              ) : (
                <>
                  {section.chips.length > 0 ? (
                    <Flex gap="2" wrap="wrap">
                      {section.chips.map((chip) => (
                        <TemplateChipPill key={`${section.slotId}-${chip.label}`} chip={chip} />
                      ))}
                    </Flex>
                  ) : null}
                  {primaryFields.length > 0 ? (
                    <Flex gap="3" wrap="wrap">
                      {primaryFields.map((field) => (
                        <Box key={`${section.slotId}-${field.label}`} flex={{ base: '1 1 100%', md: '1 1 calc(50% - 12px)' }} rounded="6px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
                          <Text fontSize="xs" fontWeight="500" textTransform="uppercase" letterSpacing="0.08em" color="var(--text-muted)">
                            {field.label}
                          </Text>
                          <Box mt="1.5">{renderFieldBody(field, { showCopyButtons: true })}</Box>
                        </Box>
                      ))}
                    </Flex>
                  ) : null}
                  {fullWidthFields.map((field) => (
                    <Box key={`${section.slotId}-${field.label}`} rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3.5">
                      <Text fontSize="xs" fontWeight="500" textTransform="uppercase" letterSpacing="0.08em" color="var(--text-muted)">
                        {field.label}
                      </Text>
                      <Box mt="1.5">{renderFieldBody(field, { showCopyButtons: true })}</Box>
                    </Box>
                  ))}
                  {section.actions.length > 0 ? renderActionRefs(section.actions, { contextKey: section.slotId }) : null}
                  {section.note ? (
                    <Box rounded="8px" border="1px dashed var(--border-subtle)" bg="rgba(148, 163, 184, 0.05)" px="3.5" py="3">
                      {section.noteTitle ? (
                        <Text fontSize="xs" fontWeight="500" textTransform="uppercase" letterSpacing="0.08em" color="var(--text-muted)">
                          {section.noteTitle}
                        </Text>
                      ) : null}
                      <Text mt={section.noteTitle ? '1.5' : '0'} fontSize="sm" color="var(--text-secondary)">
                        {section.note}
                      </Text>
                    </Box>
                  ) : null}
                </>
              )}
            </VStack>
          </TemplateSurface>
        );
      }
      case 'timeline':
        return wrap(
          <TemplateSurface key={section.slotId}>
            <VStack align="stretch" gap="4">
              <TemplateSectionHeader title={section.title} />
              {ghost ? (
                renderGhostSectionBody(section)
              ) : (
                <VStack align="stretch" gap="3">
                  {section.items.map((item) => (
                    <HStack key={item.id ?? `${section.slotId}-${item.time}-${item.title}`} align="start" gap="3">
                      <VStack align="center" gap="0" pt="1">
                        <Box w="2.5" h="2.5" rounded="full" bg="var(--accent)" />
                        <Box w="1px" flex="1" minH="16px" bg="var(--border-subtle)" />
                      </VStack>
                      <Box flex="1" rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
                        <Flex justify="recipe-between" align="center" gap="3" wrap="wrap">
                          <Text fontWeight="700" color="var(--text-primary)">
                            {item.title}
                          </Text>
                          <Text fontSize="sm" color="var(--text-muted)">
                            {item.time}
                          </Text>
                        </Flex>
                        {item.summary ? (
                          <Text mt="1.5" fontSize="sm" color="var(--text-secondary)">
                            {item.summary}
                          </Text>
                        ) : null}
                        {item.chips.length > 0 ? (
                          <Flex mt="2.5" gap="2" wrap="wrap">
                            {item.chips.map((chip) => (
                              <TemplateChipPill key={`${item.id ?? item.title}-${chip.label}`} chip={chip} />
                            ))}
                          </Flex>
                        ) : null}
                        {item.actions.length > 0 ? (
                          <Box mt="2.5">
                            {renderActionRefs(item.actions, {
                              contextKey: `${section.slotId}:${item.id ?? item.title}`,
                              fallbackSelectedItemIds: item.id ? [item.id] : undefined,
                              compact: true
                            })}
                          </Box>
                        ) : null}
                      </Box>
                    </HStack>
                  ))}
                </VStack>
              )}
            </VStack>
          </TemplateSurface>
        );
      case 'notes':
        return wrap(
          <CollapsibleNotesSection key={section.slotId} section={section} ghost={ghost} renderGhostSectionBody={renderGhostSectionBody} />
        );
      case 'activity-log':
        return wrap(
          <TemplateSurface key={section.slotId}>
            <VStack align="stretch" gap="4">
              <TemplateSectionHeader title={section.title} />
              {ghost ? (
                renderGhostSectionBody(section)
              ) : (
                <VStack align="stretch" gap="2.5">
                  {section.entries.map((entry) => {
                    const tone = templateToneStyles(entry.tone);
                    return (
                      <Box key={`${section.slotId}-${entry.id ?? entry.label}`} rounded="6px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3.5" py="3">
                        <Flex justify="recipe-between" align="center" gap="3">
                          <Text fontWeight="700" color={entry.tone ? tone.color : 'var(--text-primary)'} _dark={entry.tone ? { color: tone.darkColor } : undefined}>
                            {entry.label}
                          </Text>
                          {entry.timestamp ? (
                            <Text fontSize="xs" color="var(--text-muted)">
                              {entry.timestamp}
                            </Text>
                          ) : null}
                        </Flex>
                        <Text mt="1.5" fontSize="sm" color="var(--text-secondary)">
                          {entry.detail}
                        </Text>
                      </Box>
                    );
                  })}
                </VStack>
              )}
            </VStack>
          </TemplateSurface>
        );
      case 'kanban':
        return wrap(
          <TemplateSurface key={section.slotId}>
            <VStack align="stretch" gap="4">
              <TemplateSectionHeader title={section.title} />
              {ghost ? (
                renderGhostSectionBody(section)
              ) : (
                <Flex gap="3.5" overflowX="auto" pb="1">
                  {section.columns.map((column) => {
                    const tone = templateToneStyles(column.tone);
                    return (
                      <Box key={column.id ?? column.label} minW={{ base: '100%', md: '240px' }} maxW={{ base: '100%', md: '240px' }} rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)">
                        <VStack align="stretch" gap="3" px="3.5" py="3.5">
                          <HStack justify="recipe-between" align="center">
                            <Text fontWeight="600" color="var(--text-primary)">
                              {column.label}
                            </Text>
                            <Box
                              rounded="full"
                              px="2.5"
                              py="1"
                              border="1px solid"
                              borderColor={tone.border}
                              bg={tone.bg}
                              color={tone.color}
                              _dark={{
                                borderColor: tone.darkBorder,
                                bg: tone.darkBg,
                                color: tone.darkColor
                              }}
                            >
                              <Text fontSize="xs" fontWeight="500">
                                {column.cards.length}
                              </Text>
                            </Box>
                          </HStack>
                          <VStack align="stretch" gap="2.5">
                            {column.cards.map((card) => (
                              <Box key={card.id ?? card.title} rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-1)" px="3" py="3">
                                <Text fontWeight="700" color="var(--text-primary)">
                                  {card.title}
                                </Text>
                                {card.subtitle ? (
                                  <Text mt="1" fontSize="sm" color="var(--text-secondary)">
                                    {card.subtitle}
                                  </Text>
                                ) : null}
                                {card.chips.length > 0 ? (
                                  <Flex mt="2.5" gap="2" wrap="wrap">
                                    {card.chips.map((chip) => (
                                      <TemplateChipPill key={`${card.id ?? card.title}-${chip.label}`} chip={chip} />
                                    ))}
                                  </Flex>
                                ) : null}
                                {card.footer ? (
                                  <Text mt="2.5" fontSize="xs" color="var(--text-muted)">
                                    {card.footer}
                                  </Text>
                                ) : null}
                                {card.actions.length > 0 ? (
                                  <Box mt="2.5">
                                    {renderActionRefs(card.actions, {
                                      contextKey: `${section.slotId}:${card.id ?? card.title}`,
                                      fallbackSelectedItemIds: card.id ? [card.id] : undefined,
                                      compact: true
                                    })}
                                  </Box>
                                ) : null}
                              </Box>
                            ))}
                          </VStack>
                        </VStack>
                      </Box>
                    );
                  })}
                </Flex>
              )}
            </VStack>
          </TemplateSurface>
        );
      case 'confirmation':
        return wrap(
          <TemplateSurface key={section.slotId} bg={templateToneStyles(section.tone).bg}>
            <VStack align="stretch" gap="4">
              <Text fontSize="lg" fontWeight="600" color="var(--text-primary)">
                {section.title}
              </Text>
              {ghost ? (
                renderGhostSectionBody(section)
              ) : (
                <>
                  <Text fontSize="sm" color="var(--text-secondary)">
                    {section.message}
                  </Text>
                  <Flex gap="2" wrap="wrap">
                    {renderActionRefs([section.confirmAction], { contextKey: `${section.slotId}:confirm` })}
                    {section.secondaryAction ? renderActionRefs([section.secondaryAction], { contextKey: `${section.slotId}:secondary` }) : null}
                  </Flex>
                </>
              )}
            </VStack>
          </TemplateSurface>
        );
      case 'split':
        return wrap(
          <Flex
            key={section.slotId}
            gap="4"
            direction={{
              base: 'column',
              xl: section.ratio === 'detail-list' ? 'row-reverse' : 'row'
            }}
            align="stretch"
          >
            <Box flex={section.ratio === 'balanced' ? '1' : '1.15'} minW={0}>
              <VStack align="stretch" gap="4">
                {section.left.map((child) => renderSection(child))}
              </VStack>
            </Box>
            <Box flex={section.ratio === 'balanced' ? '1' : '0.9'} minW={0}>
              <VStack align="stretch" gap="4">
                {section.right.map((child) => renderSection(child))}
              </VStack>
            </Box>
          </Flex>
        );
      case 'tabs': {
        const activeTabId = activeTabsBySlot[section.slotId] ?? section.activeTabId;
        const activePane = section.panes[activeTabId] ?? [];

        return wrap(
          <TemplateSurface key={section.slotId}>
            <VStack align="stretch" gap="4">
              {section.title ? <TemplateSectionHeader title={section.title} /> : null}
              <Flex gap="2" wrap="wrap">
                {section.tabs.map((tab) => {
                  const active = tab.id === activeTabId;
                  return (
                    <Button
                      key={tab.id}
                      type="button"
                      size="sm"
                      rounded="full"
                      border="1px solid var(--border-subtle)"
                      bg={active ? 'var(--surface-accent)' : 'var(--surface-2)'}
                      px="3.5"
                      py="2"
                      h="auto"
                      textAlign="left"
                      fontWeight="700"
                      onClick={() =>
                        setActiveTabsBySlot((current) => ({
                          ...current,
                          [section.slotId]: tab.id
                        }))
                      }
                    >
                      <HStack gap="2">
                        <Text fontSize="sm" fontWeight="500" color="var(--text-primary)">
                          {tab.label}
                        </Text>
                        {tab.badge ? (
                          <Text fontSize="xs" color="var(--text-muted)">
                            {tab.badge}
                          </Text>
                          ) : null}
                      </HStack>
                    </Button>
                  );
                })}
              </Flex>
              {ghost ? <Box>{renderGhostSectionBody(section)}</Box> : <VStack align="stretch" gap="4">{activePane.map((child) => renderSection(child))}</VStack>}
            </VStack>
          </TemplateSurface>
        );
      }
      default:
        return null;
    }
  }

  return (
    <VStack align="stretch" gap="4" data-testid="recipe-template-renderer">
      {actionError ? (
        <Box rounded="8px" border="1px solid" borderColor="red.200" bg="red.50" px="3.5" py="3" _dark={{ bg: 'rgba(239, 68, 68, 0.12)', borderColor: 'rgba(248, 113, 113, 0.24)' }}>
          <Text fontSize="sm" color="red.700" _dark={{ color: 'red.100' }}>
            {actionError}
          </Text>
        </Box>
      ) : null}
      {templateState.sections.map((section) => renderSection(section))}
    </VStack>
  );
}

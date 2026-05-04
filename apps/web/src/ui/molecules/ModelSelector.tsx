import { useRef, useState } from 'react';
import { Box, Button, CloseButton, Drawer, Field, HStack, NativeSelect, Portal, Spinner, Text, VStack, chakra, useBreakpointValue } from '@chakra-ui/react';
import type { ModelProviderResponse } from '@noustef-ui/protocol';
import { getProviderModelOptions, isProviderSupported } from '../../lib/provider-models';
import { useProviderModels } from '../../hooks/use-provider-models';
import { testModelConfig } from '../../lib/api';
import { toaster } from '../toaster-store';
import { SearchableSelect } from './SearchableSelect';

function ChevronDown() {
  const Svg = chakra('svg');
  return (
    <Svg viewBox="0 0 16 16" boxSize="3" fill="none" aria-hidden="true" color="currentColor" flexShrink={0} opacity={0.5}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function RobotIcon() {
  const Svg = chakra('svg');
  return (
    <Svg viewBox="0 0 16 16" boxSize="4" fill="none" aria-hidden="true" color="currentColor" flexShrink={0}>
      <rect x="2" y="6" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5.5" cy="10" r="1" fill="currentColor" />
      <circle cx="10.5" cy="10" r="1" fill="currentColor" />
      <path d="M8 6V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 3h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}


export function ProviderModelSelector({
  modelProviderResponse,
  onUpdateRuntimeModelConfig,
  onChooseProvider
}: {
  modelProviderResponse: ModelProviderResponse | null;
  onUpdateRuntimeModelConfig: (
    config: Partial<Pick<ModelProviderResponse['config'], 'defaultModel' | 'provider' | 'baseUrl' | 'apiMode' | 'maxTurns' | 'reasoningEffort'>>,
    options?: { scope?: 'page' | 'drawer' }
  ) => Promise<unknown> | void;
  onChooseProvider: () => void;
}) {
  // Hooks MUST run unconditionally on every render — keep them at the very top before any
  // early returns. Derive everything else from the (possibly-null) response below.
  const [saving, setSaving] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Token to ignore stale verification results when the user picks model B before A finishes
  const verifyToken = useRef(0);
  const config = modelProviderResponse?.config ?? null;
  const providers = modelProviderResponse?.providers ?? [];
  const connectedProviders = providers.filter((p) => p.status === 'connected');
  // The Hermes config may report `provider: 'auto'` (credential-pool routing) which doesn't
  // match any provider object. Fall back to the first connected provider so model discovery
  // can target a real backend instead of failing with "Coming soon".
  const explicitActiveProvider = config ? providers.find((p) => p.id === config.provider) ?? null : null;
  const effectiveActiveProvider = explicitActiveProvider ?? connectedProviders[0] ?? null;
  const supported = effectiveActiveProvider ? isProviderSupported(effectiveActiveProvider.id) : false;
  const liveModels = useProviderModels(
    supported && config ? config.profileId : null,
    supported && effectiveActiveProvider ? effectiveActiveProvider.id : null
  );
  // JS-level breakpoint so tests can mock matchMedia and get the desktop layout
  const isDesktop = useBreakpointValue({ base: false, lg: true }) ?? false;

  if (!modelProviderResponse || !config) return null;

  if (connectedProviders.length === 0) {
    return (
      <Button
        variant="ghost"
        h="7"
        px="2.5"
        rounded="var(--radius-control)"
        bg="var(--surface-2)"
        _hover={{ bg: 'var(--surface-3)' }}
        flexShrink={0}
        onClick={onChooseProvider}
        aria-label="Choose a provider"
      >
        <HStack gap="1.5" align="center">
          <Text fontSize="12px" fontWeight="500" color="var(--text-muted)" lineHeight="1">
            Choose a provider
          </Text>
          <ChevronDown />
        </HStack>
      </Button>
    );
  }

  async function saveChange(updates: Parameters<typeof onUpdateRuntimeModelConfig>[0]) {
    setSaving(true);
    try {
      await onUpdateRuntimeModelConfig(updates, { scope: 'page' });
    } catch {
      /* errors surface via toast in the controller */
    } finally {
      setSaving(false);
    }
  }

  // Merge live models (canonical when present) with the static fallback.
  const modelOptions = liveModels.models.length > 0
    ? liveModels.models
    : getProviderModelOptions(effectiveActiveProvider);
  const hasModelOptions = modelOptions.length > 0;
  const currentModel = config.defaultModel !== 'unknown' ? config.defaultModel : '';
  const currentModelInList = !!currentModel && modelOptions.some((m) => m.value === currentModel);
  // Effective provider id used for both the dropdown's selected value and persisted writes.
  // When Hermes is in 'auto' mode this is the inferred backing provider, not literal 'auto'.
  const dropdownProviderValue = effectiveActiveProvider?.id ?? config.provider;

  // Metadata for the currently selected model — used to show reasoning effort in the mobile drawer
  const selectedModelMeta = effectiveActiveProvider?.models.find((m) => m.id === config.defaultModel) ?? null;
  const supportsReasoning = selectedModelMeta?.supportsReasoningEffort ?? false;
  const reasoningOptions = selectedModelMeta?.reasoningEffortOptions ?? [];

  async function handleMobileModelChange(next: string) {
    if (!config || !next || next === currentModel) return;
    if (!config.profileId) return;
    const myToken = ++verifyToken.current;
    setVerifying(true);
    try {
      const result = await testModelConfig(config.profileId, next, dropdownProviderValue);
      if (myToken !== verifyToken.current) return;
      if (!result.ok) {
        toaster.error({
          title: `Can't switch to that model`,
          description: result.message || 'The provider rejected the model.',
          closable: true
        });
        return;
      }
      await saveChange({ defaultModel: next, provider: dropdownProviderValue });
    } catch (err) {
      if (myToken !== verifyToken.current) return;
      toaster.error({
        title: `Can't switch to that model`,
        description: err instanceof Error ? err.message : 'Verification failed.',
        closable: true
      });
    } finally {
      if (myToken === verifyToken.current) setVerifying(false);
    }
  }

  return (
    <>
      {/* Desktop: inline provider / model selectors */}
      {isDesktop && <HStack gap="0" align="center" flexShrink={0}>
        {(saving || verifying || liveModels.loading) ? (
          <Box mr="1.5" display="flex" alignItems="center" title={verifying ? 'Verifying model…' : undefined}>
            <Spinner size="xs" color="var(--text-muted)" />
          </Box>
        ) : null}

        {/* Provider selector — searchable to match the model picker */}
        <SearchableSelect
          value={dropdownProviderValue}
          options={connectedProviders.map((p) => ({ value: p.id, label: p.displayName }))}
          onChange={async (next) => {
            if (next !== dropdownProviderValue) await saveChange({ provider: next });
          }}
          placeholder="Choose a provider"
          searchPlaceholder="Search providers…"
          emptyLabel="No providers match"
          ariaLabel="Active provider"
          size="compact"
          triggerMinW="120px"
          triggerMaxW="160px"
          popoverWidth="280px"
          popoverAnchor="start"
        />

        <Text fontSize="11px" color="var(--text-muted)" px="1" flexShrink={0} userSelect="none">/</Text>

        {/* Model selector — verifies the model with a real round-trip BEFORE committing */}
        {hasModelOptions ? (
          <SearchableSelect
            value={currentModelInList ? currentModel : ''}
            options={modelOptions}
            onChange={async (next) => {
              if (!next || next === currentModel) return;
              if (!config.profileId) return;
              const myToken = ++verifyToken.current;
              setVerifying(true);
              try {
                const result = await testModelConfig(config.profileId, next, dropdownProviderValue);
                if (myToken !== verifyToken.current) return; // user picked something else meanwhile
                if (!result.ok) {
                  toaster.error({
                    title: `Can't switch to that model`,
                    description: result.message || 'The provider rejected the model.',
                    closable: true
                  });
                  return; // don't commit
                }
                await saveChange({ defaultModel: next, provider: dropdownProviderValue });
              } catch (err) {
                if (myToken !== verifyToken.current) return;
                toaster.error({
                  title: `Can't switch to that model`,
                  description: err instanceof Error ? err.message : 'Verification failed.',
                  closable: true
                });
              } finally {
                if (myToken === verifyToken.current) setVerifying(false);
              }
            }}
            placeholder="Choose a model"
            searchPlaceholder="Search models…"
            emptyLabel="No models match"
            ariaLabel="Active model"
            size="compact"
            triggerMaxW="220px"
            triggerMinW="140px"
            popoverWidth="380px"
            popoverAnchor="end"
          />
        ) : supported ? (
          // Edge case: supported provider but neither live nor static returned anything.
          // Common cause: bridge needs restart, or the provider's /v1/models is unreachable.
          <Button
            variant="ghost"
            h="7"
            px="2.5"
            rounded="var(--radius-control)"
            bg="var(--surface-2)"
            _hover={{ bg: 'var(--surface-3)' }}
            flexShrink={0}
            onClick={onChooseProvider}
            aria-label="Choose a model"
            title={liveModels.error ?? 'Open Settings to choose a model'}
          >
            <HStack gap="1.5" align="center">
              <Text fontSize="12px" fontWeight="500" color="var(--text-secondary)" lineHeight="1">
                Choose a model
              </Text>
              <ChevronDown />
            </HStack>
          </Button>
        ) : (
          // Active provider isn't in the discovery-supported set — should be unreachable since
          // unsupported providers can't be connected, but guard anyway.
          <Button
            variant="ghost"
            h="7"
            px="2.5"
            rounded="var(--radius-control)"
            bg="var(--surface-2)"
            _hover={{ bg: 'var(--surface-3)' }}
            flexShrink={0}
            onClick={onChooseProvider}
            aria-label="Provider not supported"
            title="This provider doesn't support automatic model discovery."
          >
            <HStack gap="1.5" align="center">
              <Text fontSize="12px" fontWeight="500" color="var(--text-muted)" lineHeight="1">
                Coming soon
              </Text>
              <ChevronDown />
            </HStack>
          </Button>
        )}
      </HStack>}

      {/* Mobile: robot icon opens model settings drawer */}
      {!isDesktop && <Button
        display="flex"
        variant="ghost"
        w="7" h="7" minW="0" px="0" rounded="6px"
        color="var(--text-muted)"
        _hover={{ bg: 'var(--surface-hover)', color: 'var(--text-primary)' }}
        aria-label="Model settings"
        onClick={() => setMobileOpen(true)}
        flexShrink={0}
      >
        {(saving || verifying || liveModels.loading) ? (
          <Spinner size="xs" color="var(--text-muted)" />
        ) : (
          <RobotIcon />
        )}
      </Button>}

      {!isDesktop && <Drawer.Root
        lazyMount
        unmountOnExit
        open={mobileOpen}
        onOpenChange={(e) => setMobileOpen(e.open)}
        placement="start"
      >
        <Portal>
          <Drawer.Backdrop backdropFilter="auto" backdropBlur="sm" bg="blackAlpha.500" />
          <Drawer.Positioner display={{ base: 'block', lg: 'none' }}>
            <Drawer.Content
              maxW="280px"
              h="100dvh"
              bg="var(--surface-1)"
              borderLeft="1px solid var(--border-subtle)"
            >
              <Drawer.Header px="4" pt="4" pb="3" borderBottom="1px solid var(--border-subtle)">
                <HStack justify="space-between" align="center">
                  <Text fontWeight="600" fontSize="14px" color="var(--text-primary)">Model settings</Text>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" color="var(--text-muted)" />
                  </Drawer.CloseTrigger>
                </HStack>
              </Drawer.Header>
              <Drawer.Body px="4" py="4" overflow="auto">
                <VStack gap="4" align="stretch">

                  <Field.Root>
                    <Field.Label fontSize="12px" color="var(--text-secondary)" fontWeight="500" mb="1">Provider</Field.Label>
                    <NativeSelect.Root size="sm" variant="subtle">
                      <NativeSelect.Field
                        value={dropdownProviderValue}
                        bg="var(--surface-2)"
                        borderColor="var(--border-subtle)"
                        onChange={async (e) => {
                          const next = e.currentTarget.value;
                          if (next !== dropdownProviderValue) await saveChange({ provider: next });
                        }}
                      >
                        {connectedProviders.map((p) => (
                          <option key={p.id} value={p.id}>{p.displayName}</option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                  {hasModelOptions ? (
                    <Field.Root>
                      <Field.Label fontSize="12px" color="var(--text-secondary)" fontWeight="500" mb="1">Model</Field.Label>
                      <NativeSelect.Root size="sm" variant="subtle">
                        <NativeSelect.Field
                          value={currentModelInList ? currentModel : ''}
                          bg="var(--surface-2)"
                          borderColor="var(--border-subtle)"
                          onChange={(e) => { void handleMobileModelChange(e.currentTarget.value); }}
                        >
                          {!currentModelInList && <option value="">Choose a model</option>}
                          {modelOptions.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Field.Root>
                  ) : null}

                  {supportsReasoning && reasoningOptions.length > 0 ? (
                    <Field.Root>
                      <Field.Label fontSize="12px" color="var(--text-secondary)" fontWeight="500" mb="1">Reasoning effort</Field.Label>
                      <NativeSelect.Root size="sm" variant="subtle">
                        <NativeSelect.Field
                          value={config.reasoningEffort ?? ''}
                          bg="var(--surface-2)"
                          borderColor="var(--border-subtle)"
                          onChange={async (e) => {
                            await saveChange({ reasoningEffort: e.currentTarget.value || undefined });
                          }}
                        >
                          <option value="">default</option>
                          {reasoningOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Field.Root>
                  ) : null}

                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>}
    </>
  );
}

/** @deprecated Use ProviderModelSelector */
export function ModelSelector({
  modelProviderResponse,
  activeModelId,
  onChooseModel
}: {
  modelProviderResponse: ModelProviderResponse | null;
  activeModelId: string | null;
  onChooseModel?: () => void;
}) {
  if (!modelProviderResponse) return null;
  const model = activeModelId ? (activeModelId.split('/').pop() ?? activeModelId) : null;
  return (
    <Button variant="ghost" h="7" px="2.5" rounded="var(--radius-control)" bg="var(--surface-2)"
      _hover={{ bg: 'var(--surface-3)' }} flexShrink={0} onClick={onChooseModel}
      aria-label={model ? `Active model: ${activeModelId}` : 'Choose a model'} title={activeModelId ?? undefined}>
      <HStack gap="1.5" align="center">
        <Text fontSize="12px" fontWeight="500" color={model ? 'var(--text-secondary)' : 'var(--text-muted)'} lineHeight="1">
          {model ?? 'Choose a model'}
        </Text>
        <ChevronDown />
      </HStack>
    </Button>
  );
}

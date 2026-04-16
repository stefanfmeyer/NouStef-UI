import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Badge, Box, Button, Checkbox, Drawer, Field, Grid, HStack, Input, NativeSelect, ScrollArea, Spinner, Table, Tabs, Text, VStack } from '@chakra-ui/react';
import { useHermesTheme } from '@hermes-recipes/ui';
import type {
  AccessAuditSummary,
  AppSettings,
  AuditEventsResponse,
  ModelProviderResponse,
  TelemetryResponse
} from '@hermes-recipes/protocol';
import { EmptyStateCard } from '../molecules/EmptyStateCard';
import { ErrorBanner } from '../molecules/ErrorBanner';

type SettingsTabValue = 'general' | 'model' | 'unrestricted' | 'access_audit' | 'telemetry';

export function SettingsPage({
  settings,
  accessAudit,
  accessAuditEventsResponse,
  accessAuditEventsLoading,
  accessAuditEventsError,
  accessAuditEventsPage,
  onAccessAuditEventsPageChange,
  telemetryResponse,
  telemetryLoading,
  telemetryError,
  telemetryPage,
  onTelemetryPageChange,
  saving,
  error,
  modelProviderResponse,
  modelProviderLoading,
  modelProviderError,
  providerDrawerLoading,
  providerDrawerError,
  runtimeConfigGate,
  inspectedProvider,
  onSave,
  onUpdateRuntimeModelConfig,
  onConnectProvider,
  onBeginProviderAuth,
  onPollProviderAuth,
  onRefreshProviders,
  onInspectProvider
}: {
  settings: AppSettings | null;
  accessAudit: AccessAuditSummary | null;
  accessAuditEventsResponse: AuditEventsResponse | null;
  accessAuditEventsLoading: boolean;
  accessAuditEventsError: string | null;
  accessAuditEventsPage: number;
  onAccessAuditEventsPageChange: (page: number) => void;
  telemetryResponse: TelemetryResponse | null;
  telemetryLoading: boolean;
  telemetryError: string | null;
  telemetryPage: number;
  onTelemetryPageChange: (page: number) => void;
  saving: boolean;
  error: string | null;
  modelProviderResponse: ModelProviderResponse | null;
  modelProviderLoading: boolean;
  modelProviderError: string | null;
  providerDrawerLoading: boolean;
  providerDrawerError: string | null;
  runtimeConfigGate: {
    status: 'checking' | 'ready' | 'blocked';
    code: string;
    message: string;
    providerId: string | null;
    modelId: string | null;
  };
  inspectedProvider: ModelProviderResponse['providers'][number] | null;
  onSave: (settings: Partial<AppSettings>) => Promise<void> | void;
  onUpdateRuntimeModelConfig: (
    nextConfig: Partial<Pick<ModelProviderResponse['config'], 'defaultModel' | 'provider' | 'baseUrl' | 'apiMode' | 'maxTurns' | 'reasoningEffort'>>,
    options?: {
      scope?: 'page' | 'drawer';
    }
  ) => Promise<unknown> | void;
  onConnectProvider: (
    provider: string,
    apiKey: string,
    label?: string,
    options?: { scope?: 'page' | 'drawer'; baseUrl?: string; apiMode?: string }
  ) => Promise<unknown> | void;
  onBeginProviderAuth: (providerId: string, options?: { scope?: 'page' | 'drawer' }) => Promise<unknown> | void;
  onPollProviderAuth: (
    providerId: string,
    authSessionId?: string | null,
    options?: { scope?: 'page' | 'drawer' }
  ) => Promise<unknown> | void;
  onRefreshProviders: () => Promise<void> | void;
  onInspectProvider: (providerId: string) => Promise<unknown> | void;
}) {
  const [currentTab, setCurrentTab] = useState<SettingsTabValue>('general');
  const { themeMode: activeThemeMode, setThemeMode: setActiveThemeMode } = useHermesTheme();
  const [themeMode, setThemeMode] = useState<AppSettings['themeMode']>('dark');
  const [themeDirty, setThemeDirty] = useState(false);
  const [sessionsPageSize, setSessionsPageSize] = useState('50');
  const [chatTimeoutMs, setChatTimeoutMs] = useState('180000');
  const [discoveryTimeoutMs, setDiscoveryTimeoutMs] = useState('240000');
  const [nearbySearchTimeoutMs, setNearbySearchTimeoutMs] = useState('300000');
  const [recipeOperationTimeoutMs, setRecipeOperationTimeoutMs] = useState('180000');
  const [unrestrictedTimeoutMs, setUnrestrictedTimeoutMs] = useState('1800000');
  const [restrictedChatMaxTurns, setRestrictedChatMaxTurns] = useState('8');
  const [unrestrictedAccessEnabled, setUnrestrictedAccessEnabled] = useState(false);

  const [defaultModel, setDefaultModel] = useState('');
  const [provider, setProvider] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [apiMode, setApiMode] = useState('');
  const [maxTurns, setMaxTurns] = useState('150');
  const [reasoningEffort, setReasoningEffort] = useState('');
  const [providerDrawerOpen, setProviderDrawerOpen] = useState(false);
  const [drawerProviderId, setDrawerProviderId] = useState<string | null>(null);

  const [providerLabel, setProviderLabel] = useState('');
  const [apiKey, setApiKey] = useState('');
  const providerDrawerFinalFocusRef = useRef<HTMLElement | null>(null);
  const showModelProviderErrorBanner = Boolean(modelProviderError && runtimeConfigGate.status === 'blocked');
  const runtimeConfigBlockedTitle =
    runtimeConfigGate.code === 'runtime_state_unavailable' ? 'Runtime configuration unavailable' : 'Runtime configuration required';

  useEffect(() => {
    if (!settings) {
      return;
    }

    if (!themeDirty || settings.themeMode === themeMode) {
      setThemeMode(settings.themeMode);
    }
    if (settings.themeMode === themeMode) {
      setThemeDirty(false);
    }
    setSessionsPageSize(String(settings.sessionsPageSize));
    setChatTimeoutMs(String(settings.chatTimeoutMs));
    setDiscoveryTimeoutMs(String(settings.discoveryTimeoutMs));
    setNearbySearchTimeoutMs(String(settings.nearbySearchTimeoutMs));
    setRecipeOperationTimeoutMs(String(settings.recipeOperationTimeoutMs));
    setUnrestrictedTimeoutMs(String(settings.unrestrictedTimeoutMs));
    setRestrictedChatMaxTurns(String(settings.restrictedChatMaxTurns));
    setUnrestrictedAccessEnabled(settings.unrestrictedAccessEnabled);
  }, [
    settings,
    themeDirty,
    themeMode
  ]);

  useEffect(() => {
    if (activeThemeMode === themeMode) {
      return;
    }

    setThemeMode(activeThemeMode);
  }, [activeThemeMode, themeMode]);

  useEffect(() => {
    if (!modelProviderResponse) {
      return;
    }

    setDefaultModel(modelProviderResponse.config.defaultModel);
    setProvider(modelProviderResponse.config.provider);
    setBaseUrl(modelProviderResponse.config.baseUrl ?? '');
    setApiMode(modelProviderResponse.config.apiMode ?? '');
    setMaxTurns(String(modelProviderResponse.config.maxTurns));
    setReasoningEffort(modelProviderResponse.config.reasoningEffort ?? '');
  }, [modelProviderResponse]);

  const selectedProvider = useMemo(
    () => modelProviderResponse?.providers.find((item) => item.id === provider) ?? modelProviderResponse?.providers[0] ?? null,
    [modelProviderResponse?.providers, provider]
  );
  const drawerProvider = useMemo(() => {
    if (!drawerProviderId) {
      return null;
    }

    return (
      modelProviderResponse?.providers.find((item) => item.id === drawerProviderId) ??
      (inspectedProvider?.id === drawerProviderId ? inspectedProvider : null)
    );
  }, [drawerProviderId, inspectedProvider, modelProviderResponse?.providers]);
  const drawerProviderDetails = drawerProvider ?? selectedProvider;
  const selectedProviderConfigurationFields = selectedProvider?.configurationFields ?? [];
  const providerConfigurationFields = drawerProviderDetails?.configurationFields ?? [];
  const selectedProviderModelField = selectedProviderConfigurationFields.find((field) => field.key === 'defaultModel') ?? null;
  const drawerProviderModelField = providerConfigurationFields.find((field) => field.key === 'defaultModel') ?? null;
  const selectedModel = useMemo(
    () => selectedProvider?.models.find((item) => item.id === defaultModel) ?? null,
    [defaultModel, selectedProvider?.models]
  );
  const shouldShowReasoningEffort = Boolean(selectedModel?.supportsReasoningEffort);
  const providerConfigCanSave = providerConfigurationFields.some((field) => !field.secret && ['defaultModel', 'baseUrl', 'apiMode'].includes(field.key));
  const providerConfigBlocked =
    drawerProviderModelField?.input === 'select' &&
    drawerProviderModelField.disabled &&
    drawerProviderModelField.options.length === 0;
  const providerConfigHasMissingRequiredValue = providerConfigurationFields.some(
    (field) =>
      !field.disabled &&
      !field.secret &&
      field.required &&
      getConfigurationFieldValue(field.key, field.value ?? '').trim().length === 0
  );
  const selectedProviderConfigBlocked =
    selectedProviderModelField?.input === 'select' &&
    selectedProviderModelField.disabled &&
    selectedProviderModelField.options.length === 0;
  const providerDrawerAuthPending = Boolean(
    drawerProviderDetails?.authSession && ['pending', 'verifying'].includes(drawerProviderDetails.authSession.status)
  );
  const drawerProviderAuthSession = drawerProviderDetails?.authSession ?? null;
  const shouldShowBeginAuth =
    Boolean(drawerProviderDetails?.supportsOAuth) &&
    drawerProviderDetails?.state === 'needs_oauth';
  const shouldShowConnectProvider =
    Boolean(drawerProviderDetails?.supportsApiKey) &&
    ['unconfigured', 'needs_api_key', 'invalid_credentials', 'config_error'].includes(drawerProviderDetails?.state ?? '');

  function getConfigurationFieldValue(fieldKey: string, fallback = '') {
    switch (fieldKey) {
      case 'label':
        return providerLabel;
      case 'apiKey':
        return apiKey;
      case 'baseUrl':
        return baseUrl;
      case 'apiMode':
        return apiMode;
      case 'defaultModel':
        return defaultModel;
      default:
        return fallback;
    }
  }

  useEffect(() => {
    if (!drawerProviderDetails) {
      return;
    }

    const defaultModelField = drawerProviderDetails.configurationFields.find((field) => field.key === 'defaultModel');
    const baseUrlField = drawerProviderDetails.configurationFields.find((field) => field.key === 'baseUrl');
    const apiModeField = drawerProviderDetails.configurationFields.find((field) => field.key === 'apiMode');

    setDefaultModel(defaultModelField?.value ?? '');
    setBaseUrl(baseUrlField?.value ?? '');
    setApiMode(apiModeField?.value ?? '');
    setProviderLabel('');
    setApiKey('');
  }, [drawerProviderDetails]);

  function setConfigurationFieldValue(fieldKey: string, value: string) {
    switch (fieldKey) {
      case 'label':
        setProviderLabel(value);
        break;
      case 'apiKey':
        setApiKey(value);
        break;
      case 'baseUrl':
        setBaseUrl(value);
        break;
      case 'apiMode':
        setApiMode(value);
        break;
      case 'defaultModel':
        setDefaultModel(value);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (shouldShowReasoningEffort) {
      return;
    }

    setReasoningEffort('');
  }, [shouldShowReasoningEffort]);

  function openProviderDrawer(providerId: string) {
    providerDrawerFinalFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setProvider(providerId);
    setDrawerProviderId(providerId);
    setProviderDrawerOpen(true);
    void Promise.resolve(onInspectProvider(providerId)).catch(() => undefined);
  }

  useEffect(() => {
    if (
      !providerDrawerOpen ||
      !drawerProviderId ||
      providerDrawerLoading ||
      !drawerProviderDetails ||
      !providerDrawerAuthPending ||
      !drawerProviderAuthSession
    ) {
      return;
    }

    const pollIntervalMs = Math.max(1_000, drawerProviderAuthSession.pollAfterMs ?? 5_000);

    const interval = globalThis.setInterval(() => {
      void Promise.resolve(
        onPollProviderAuth(drawerProviderId, drawerProviderAuthSession.id, {
          scope: 'drawer'
        })
      ).catch(() => undefined);
    }, pollIntervalMs);

    return () => {
      globalThis.clearInterval(interval);
    };
  }, [
    drawerProviderAuthSession,
    providerDrawerAuthPending,
    drawerProviderDetails,
    drawerProviderId,
    onPollProviderAuth,
    providerDrawerLoading,
    providerDrawerOpen
  ]);

  async function persistSettings() {
    const previousThemeMode = settings?.themeMode ?? activeThemeMode;

    try {
      await onSave({
        themeMode,
        sessionsPageSize: Number.parseInt(sessionsPageSize, 10),
        chatTimeoutMs: Number.parseInt(chatTimeoutMs, 10),
        discoveryTimeoutMs: Number.parseInt(discoveryTimeoutMs, 10),
        nearbySearchTimeoutMs: Number.parseInt(nearbySearchTimeoutMs, 10),
        recipeOperationTimeoutMs: Number.parseInt(recipeOperationTimeoutMs, 10),
        unrestrictedTimeoutMs: Number.parseInt(unrestrictedTimeoutMs, 10),
        restrictedChatMaxTurns: Number.parseInt(restrictedChatMaxTurns, 10),
        unrestrictedAccessEnabled
      });
      setThemeDirty(false);
    } catch {
      if (themeMode !== previousThemeMode) {
        setActiveThemeMode(previousThemeMode);
        setThemeMode(previousThemeMode);
        setThemeDirty(false);
      }
    }
  }

  if (!settings) {
    return (
      <Box rounded="10px" border="1px solid var(--border-subtle)" bg="var(--surface-1)" px="5" py="5">
        <EmptyStateCard title="Loading settings" detail="Reading persisted bridge and browser preferences." />
      </Box>
    );
  }

  return (
    <Tabs.Root
      value={currentTab}
      onValueChange={(event) => setCurrentTab(event.value as SettingsTabValue)}
      h="100%"
      minH={0}
      display="flex"
      flexDirection="column"
      variant="plain"
      lazyMount
      css={{
        '--tabs-indicator-bg': 'var(--surface-2)',
        '--tabs-indicator-shadow': 'none',
        '--tabs-trigger-radius': '999px'
      }}
    >
      <Box overflowX="auto" pb="1">
        <Tabs.List rounded="999px" bg="var(--surface-1)" p="1" minW="max-content">
          <Tabs.Trigger value="general">General settings</Tabs.Trigger>
          <Tabs.Trigger value="model">Model / Provider</Tabs.Trigger>
          <Tabs.Trigger value="unrestricted">Unrestricted Access</Tabs.Trigger>
          <Tabs.Trigger value="access_audit">Access audit</Tabs.Trigger>
          <Tabs.Trigger value="telemetry">Troubleshooting telemetry</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
      </Box>

      <VStack align="stretch" gap="4" pt="4">
        {error ? <ErrorBanner title="Settings save failed" detail={error} /> : null}
        {showModelProviderErrorBanner && modelProviderError ? (
          <ErrorBanner title="Runtime configuration unavailable" detail={modelProviderError} />
        ) : null}
      </VStack>

      <Tabs.ContentGroup flex="1" minH={0}>
        <SettingsTabPanel value="general">
          <SectionCard
            title="Local preferences"
            description="Bridge-backed browser settings that persist across restarts."
            action={
              <Button
                rounded="6px"
                bg="var(--accent)"
                color="white"
                _hover={{ bg: 'var(--accent-strong)' }}
                loading={saving}
                onClick={() => {
                  void persistSettings();
                }}
              >
                Save preferences
              </Button>
            }
          >
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }} gap="4">
              <Field.Root>
                <Field.Label color="var(--text-secondary)">Theme mode</Field.Label>
                <NativeSelect.Root size="sm" variant="subtle" bg="var(--surface-2)">
                  <NativeSelect.Field
                    value={themeMode}
                    onChange={(event) => {
                      const nextThemeMode = event.currentTarget.value as AppSettings['themeMode'];
                      setThemeDirty(true);
                      setThemeMode(nextThemeMode);
                      setActiveThemeMode(nextThemeMode);
                    }}
                  >
                    <option value="dark">dark</option>
                    <option value="light">light</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>

              <Field.Root>
                <Field.Label color="var(--text-secondary)">Sessions page size</Field.Label>
                <NativeSelect.Root size="sm" variant="subtle" bg="var(--surface-2)">
                  <NativeSelect.Field value={sessionsPageSize} onChange={(event) => setSessionsPageSize(event.currentTarget.value)}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>

              <Field.Root disabled={unrestrictedAccessEnabled}>
                <Field.Label color="var(--text-secondary)">Restricted max turns</Field.Label>
                <NativeSelect.Root size="sm" variant="subtle" bg="var(--surface-2)">
                  <NativeSelect.Field value={restrictedChatMaxTurns} onChange={(event) => setRestrictedChatMaxTurns(event.currentTarget.value)}>
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="32">32</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <Field.HelperText color="var(--text-muted)">
                  {unrestrictedAccessEnabled
                    ? 'Ignored while Unrestricted Access is enabled.'
                    : 'Used only while restricted mode stays enabled.'}
                </Field.HelperText>
              </Field.Root>

              <Field.Root>
                <Field.Label color="var(--text-secondary)">Normal chat timeout (ms)</Field.Label>
                <Input
                  type="number"
                  value={chatTimeoutMs}
                  onChange={(event) => setChatTimeoutMs(event.currentTarget.value)}
                  bg="var(--surface-2)"
                  borderColor="var(--border-subtle)"
                />
                <Field.HelperText color="var(--text-muted)">Default timeout for regular chat requests. Max 900000.</Field.HelperText>
              </Field.Root>

              <Field.Root>
                <Field.Label color="var(--text-secondary)">Search / discovery timeout (ms)</Field.Label>
                <Input
                  type="number"
                  value={discoveryTimeoutMs}
                  onChange={(event) => setDiscoveryTimeoutMs(event.currentTarget.value)}
                  bg="var(--surface-2)"
                  borderColor="var(--border-subtle)"
                />
                <Field.HelperText color="var(--text-muted)">Used for broad search, lookup, research, and recommendation requests. Max 1800000.</Field.HelperText>
              </Field.Root>

              <Field.Root>
                <Field.Label color="var(--text-secondary)">Nearby / local-search timeout (ms)</Field.Label>
                <Input
                  type="number"
                  value={nearbySearchTimeoutMs}
                  onChange={(event) => setNearbySearchTimeoutMs(event.currentTarget.value)}
                  bg="var(--surface-2)"
                  borderColor="var(--border-subtle)"
                />
                <Field.HelperText color="var(--text-muted)">Used for nearby places, restaurants, and local-discovery intents. Max 1800000.</Field.HelperText>
              </Field.Root>

              <Field.Root>
                <Field.Label color="var(--text-secondary)">Recipe timeout (ms)</Field.Label>
                <Input
                  type="number"
                  value={recipeOperationTimeoutMs}
                  onChange={(event) => setRecipeOperationTimeoutMs(event.currentTarget.value)}
                  bg="var(--surface-2)"
                  borderColor="var(--border-subtle)"
                />
                <Field.HelperText color="var(--text-muted)">Used for Hermes-driven recipe creation and structured workspace updates. Max 900000.</Field.HelperText>
              </Field.Root>
            </Grid>
          </SectionCard>
        </SettingsTabPanel>

        <SettingsTabPanel value="model">
          <VStack align="stretch" gap="4">
            {runtimeConfigGate.status === 'blocked' && !showModelProviderErrorBanner ? (
              <ErrorBanner title={runtimeConfigBlockedTitle} detail={runtimeConfigGate.message} />
            ) : runtimeConfigGate.status === 'checking' ? (
              <Box rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-1)" px="4" py="3">
                <HStack align="start" gap="3">
                  <Spinner size="sm" color="blue.500" mt="1" />
                  <VStack align="stretch" gap="1">
                    <Text fontWeight="700" color="var(--text-primary)">
                      Checking runtime configuration
                    </Text>
                    <Text color="var(--text-secondary)">{runtimeConfigGate.message}</Text>
                  </VStack>
                </HStack>
              </Box>
            ) : null}

            <SectionCard
              title="Model and provider routing"
              description="Profile-scoped runtime options discovered from Hermes and the local bridge."
              action={
                <HStack gap="2" wrap="wrap">
                  <Button variant="outline" onClick={() => void onRefreshProviders()} loading={modelProviderLoading}>
                    Refresh
                  </Button>
                  <Button variant="outline" onClick={() => (selectedProvider ? openProviderDrawer(selectedProvider.id) : undefined)} disabled={!selectedProvider}>
                    Configure provider
                  </Button>
                  <Button
                    rounded="6px"
                    bg="var(--accent)"
                    color="white"
                    _hover={{ bg: 'var(--accent-strong)' }}
                    loading={modelProviderLoading}
                    disabled={!modelProviderResponse || selectedProvider?.disabled || selectedProviderConfigBlocked}
                    onClick={() => {
                      void Promise.resolve(
                        onUpdateRuntimeModelConfig({
                          defaultModel,
                          provider,
                          baseUrl: baseUrl.trim().length > 0 ? baseUrl : undefined,
                          apiMode: apiMode.trim().length > 0 ? apiMode : undefined,
                          maxTurns: Number.parseInt(maxTurns, 10),
                          reasoningEffort: reasoningEffort.trim().length > 0 ? reasoningEffort : undefined
                        })
                      ).catch(() => undefined);
                    }}
                  >
                    Save runtime config
                  </Button>
                </HStack>
              }
            >
              {!modelProviderResponse ? (
                <EmptyStateCard title="Loading runtime config" detail="Reading model/provider state from Hermes." />
              ) : (
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }} gap="4">
                  <Field.Root>
                    <Field.Label color="var(--text-secondary)">Provider</Field.Label>
                    <NativeSelect.Root size="sm" variant="subtle" bg="var(--surface-2)">
                      <NativeSelect.Field
                        value={provider}
                        onChange={(event) => {
                          const nextProviderId = event.currentTarget.value;
                          setProvider(nextProviderId);
                        }}
                      >
                        {modelProviderResponse.providers.map((item) => (
                          <option key={item.id} value={item.id} disabled={item.disabled}>
                            {item.displayName}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    {selectedProvider?.disabledReason ? <Field.HelperText color="var(--text-muted)">{selectedProvider.disabledReason}</Field.HelperText> : null}
                    {selectedProvider?.stateMessage ? <Field.HelperText color="var(--text-muted)">{selectedProvider.stateMessage}</Field.HelperText> : null}
                  </Field.Root>

                  <Field.Root disabled={selectedProvider?.disabled}>
                    <Field.Label color="var(--text-secondary)">Default model</Field.Label>
                    {selectedProviderModelField?.input === 'select' ? (
                      <NativeSelect.Root size="sm" variant="subtle" bg="var(--surface-2)" disabled={selectedProviderModelField.disabled}>
                        <NativeSelect.Field
                          value={selectedProviderModelField.options.length === 0 ? '' : defaultModel}
                          onChange={(event) => setDefaultModel(event.currentTarget.value)}
                        >
                          {selectedProviderModelField.options.length === 0 ? (
                            <option value="">
                              Model discovery unavailable
                            </option>
                          ) : null}
                          {selectedProviderModelField.options.map((item) => (
                            <option key={item.value} value={item.value} disabled={item.disabled}>
                              {item.label}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    ) : (
                      <Box rounded="14px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3" py="2.5">
                        <Text fontSize="sm" color="var(--text-secondary)">
                          Model discovery is unavailable for this provider right now. Manual model entry is blocked until Hermes exposes discovered model choices.
                        </Text>
                      </Box>
                    )}
                    {selectedProviderModelField?.description ? (
                      <Field.HelperText color="var(--text-muted)">
                        {selectedProviderModelField.description}
                      </Field.HelperText>
                    ) : null}
                    {selectedProviderModelField?.disabledReason ? (
                      <Field.HelperText color="var(--text-muted)">{selectedProviderModelField.disabledReason}</Field.HelperText>
                    ) : null}
                    {selectedProvider?.disabledReason ? <Field.HelperText color="var(--text-muted)">{selectedProvider.disabledReason}</Field.HelperText> : null}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label color="var(--text-secondary)">Max turns</Field.Label>
                    <Input type="number" value={maxTurns} onChange={(event) => setMaxTurns(event.currentTarget.value)} bg="var(--surface-2)" borderColor="var(--border-subtle)" />
                  </Field.Root>

                  {shouldShowReasoningEffort ? (
                    <Field.Root>
                      <Field.Label color="var(--text-secondary)">Reasoning effort</Field.Label>
                      <NativeSelect.Root size="sm" variant="subtle" bg="var(--surface-2)">
                        <NativeSelect.Field value={reasoningEffort} onChange={(event) => setReasoningEffort(event.currentTarget.value)}>
                          <option value="">default</option>
                          {(selectedModel?.reasoningEffortOptions ?? []).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Field.Root>
                  ) : null}
                </Grid>
              )}
            </SectionCard>

            <SectionCard title="Provider connections" description="Discovered provider capabilities and local connection status.">
              {!modelProviderResponse ? (
                <EmptyStateCard title="Loading providers" detail="Reading provider credentials and Hermes auth state." />
              ) : (
                <VStack align="stretch" gap="3">
                  <Table.ScrollArea data-testid="provider-table-scroll" borderWidth="1px" borderColor="var(--border-subtle)" rounded="8px">
                    <Table.Root size="sm" variant="outline" minW="760px">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Provider</Table.ColumnHeader>
                          <Table.ColumnHeader>Status</Table.ColumnHeader>
                          <Table.ColumnHeader>Auth</Table.ColumnHeader>
                          <Table.ColumnHeader>Credential</Table.ColumnHeader>
                          <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {modelProviderResponse.providers.map((item) => (
                          <Table.Row key={item.id}>
                            <Table.Cell>
                              <Text fontWeight="700" color="var(--text-primary)">
                                {item.displayName}
                              </Text>
                              <Text fontSize="sm" color="var(--text-secondary)">
                                {item.description ?? item.notes ?? item.source}
                              </Text>
                            </Table.Cell>
                            <Table.Cell>
                              <Badge
                                colorPalette={
                                  item.status === 'connected'
                                    ? 'green'
                                    : item.status === 'error'
                                      ? 'red'
                                      : item.status === 'missing'
                                        ? 'yellow'
                                        : item.disabled
                                          ? 'gray'
                                          : 'gray'
                                }
                              >
                                {item.status}
                              </Badge>
                            </Table.Cell>
                            <Table.Cell color="var(--text-secondary)">{item.authKind}</Table.Cell>
                            <Table.Cell color="var(--text-secondary)">{item.maskedCredential ?? item.credentialLabel ?? 'Not connected'}</Table.Cell>
                            <Table.Cell textAlign="end">
                              <Button variant="ghost" size="sm" onClick={() => openProviderDrawer(item.id)}>
                                Configure
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Table.ScrollArea>
                </VStack>
              )}
            </SectionCard>
          </VStack>

          <Drawer.Root
            lazyMount
            unmountOnExit
            open={providerDrawerOpen}
            onOpenChange={(event) => {
              setProviderDrawerOpen(event.open);
              if (!event.open) {
                setDrawerProviderId(null);
              }
            }}
            size={{ base: 'full', md: 'md' }}
            finalFocusEl={() =>
              providerDrawerFinalFocusRef.current && providerDrawerFinalFocusRef.current.isConnected
                ? providerDrawerFinalFocusRef.current
                : document.body
            }
          >
            <Drawer.Backdrop backdropFilter="auto" backdropBlur="sm" bg="blackAlpha.500" />
            <Drawer.Positioner>
              <Drawer.Content bg="var(--surface-1)" borderLeft="1px solid var(--border-subtle)" data-testid="provider-config-drawer">
                <Drawer.Header>
                  <Drawer.Title color="var(--text-primary)">
                    {drawerProviderDetails?.displayName ?? (drawerProviderId ? 'Loading provider settings' : 'Provider settings')}
                  </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  {!drawerProviderId ? (
                    <EmptyStateCard title="No provider selected" detail="Choose a provider first to view its runtime configuration." />
                  ) : (
                    <VStack align="stretch" gap="5">
                      {providerDrawerError && !drawerProviderDetails ? (
                        <ErrorBanner title="Provider inspection failed" detail={providerDrawerError} />
                      ) : null}
                      {providerDrawerLoading ? (
                        <EmptyStateCard title="Loading provider settings" detail="Reading runtime configuration for the selected provider." />
                      ) : null}
                      {!drawerProviderDetails ? (
                        <EmptyStateCard title="Provider unavailable" detail="The selected provider is not available in the latest runtime metadata." />
                      ) : null}
                      {drawerProviderDetails ? (
                        <>
                          <VStack align="start" gap="2">
                            <Badge
                              colorPalette={
                                drawerProviderDetails.status === 'connected'
                                  ? 'green'
                                  : drawerProviderDetails.status === 'error'
                                    ? 'red'
                                    : drawerProviderDetails.status === 'missing'
                                      ? 'yellow'
                                      : drawerProviderDetails.disabled
                                        ? 'gray'
                                        : 'gray'
                              }
                            >
                              {drawerProviderDetails.status}
                            </Badge>
                            <Badge colorPalette={drawerProviderDetails.ready ? 'green' : 'orange'}>
                              {drawerProviderDetails.state.replace(/_/g, ' ')}
                            </Badge>
                            <Text color="var(--text-secondary)">
                              {drawerProviderDetails.description ?? drawerProviderDetails.notes ?? 'No extra provider guidance is available.'}
                            </Text>
                            <Text color="var(--text-secondary)">{drawerProviderDetails.stateMessage}</Text>
                            {drawerProviderDetails.disabledReason ? <Text color="var(--text-muted)">{drawerProviderDetails.disabledReason}</Text> : null}
                            {drawerProviderDetails.validation ? (
                              <Text color={drawerProviderDetails.validation.status === 'error' ? 'red.300' : 'var(--text-muted)'}>
                                {drawerProviderDetails.validation.message}
                              </Text>
                            ) : null}
                            {drawerProviderAuthSession ? (
                              <Text color="var(--text-secondary)">{drawerProviderAuthSession.message}</Text>
                            ) : null}
                            {providerDrawerLoading ? <Text color="var(--text-muted)">Refreshing provider details…</Text> : null}
                          </VStack>

                          <Box rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="4" py="3">
                            <VStack align="stretch" gap="3">
                              <Text fontWeight="700" color="var(--text-primary)">
                                Guided setup
                              </Text>
                              <VStack align="stretch" gap="2">
                                {drawerProviderDetails.setupSteps.map((step) => (
                                  <Box key={step.id} rounded="6px" bg="var(--surface-1)" px="3" py="2.5">
                                    <HStack justify="recipe-between" align="start" gap="3" wrap="wrap">
                                      <VStack align="stretch" gap="1" minW={0}>
                                        <HStack gap="2" wrap="wrap">
                                          <Badge
                                            colorPalette={
                                              step.status === 'completed'
                                                ? 'green'
                                                : step.status === 'action_required'
                                                  ? 'orange'
                                                  : step.status === 'blocked'
                                                    ? 'yellow'
                                                  : step.status === 'disabled'
                                                    ? 'gray'
                                                    : 'blue'
                                            }
                                          >
                                            {step.status.replace('_', ' ')}
                                          </Badge>
                                          <Text fontWeight="700" color="var(--text-primary)">
                                            {step.title}
                                          </Text>
                                        </HStack>
                                        <Text fontSize="sm" color="var(--text-secondary)">
                                          {step.description}
                                        </Text>
                                        {step.command ? (
                                          <Text fontSize="xs" color="var(--text-muted)">
                                            {step.command}
                                          </Text>
                                        ) : null}
                                      </VStack>
                                      {step.actionUrl && step.actionLabel ? (
                                        <Button asChild size="xs" variant="outline" flexShrink={0}>
                                          <a href={step.actionUrl} target="_blank" rel="noreferrer">
                                            {step.actionLabel}
                                          </a>
                                        </Button>
                                      ) : null}
                                    </HStack>
                                  </Box>
                                ))}
                              </VStack>
                            </VStack>
                          </Box>

                          {providerConfigurationFields.length > 0 ? (
                            <VStack align="stretch" gap="4">
                              {providerConfigurationFields.map((field) => (
                                <Field.Root key={field.key} disabled={field.disabled}>
                                  <Field.Label color="var(--text-secondary)">{field.label}</Field.Label>
                                  {field.input === 'select' ? (
                                    <NativeSelect.Root size="sm" variant="subtle" bg="var(--surface-2)" disabled={field.disabled}>
                                      <NativeSelect.Field
                                        value={field.options.length === 0 ? '' : getConfigurationFieldValue(field.key, field.value ?? '')}
                                        onChange={(event) => setConfigurationFieldValue(field.key, event.currentTarget.value)}
                                      >
                                        {field.options.length === 0 ? (
                                          <option value="">
                                            {field.placeholder ?? 'Not available'}
                                          </option>
                                        ) : null}
                                        {field.options.map((option) => (
                                          <option key={option.value} value={option.value} disabled={option.disabled}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </NativeSelect.Field>
                                      <NativeSelect.Indicator />
                                    </NativeSelect.Root>
                                  ) : field.key === 'defaultModel' ? (
                                    <Box rounded="14px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3" py="2.5">
                                      <Text fontSize="sm" color="var(--text-secondary)">
                                        Manual model entry is disabled. Refresh provider discovery and choose from the discovered model list.
                                      </Text>
                                    </Box>
                                  ) : field.secret ? (
                                    <Input
                                      type="password"
                                      value={getConfigurationFieldValue(field.key)}
                                      onChange={(event) => setConfigurationFieldValue(field.key, event.currentTarget.value)}
                                      bg="var(--surface-2)"
                                      borderColor="var(--border-subtle)"
                                      placeholder={field.placeholder}
                                    />
                                  ) : (
                                    <Input
                                      value={getConfigurationFieldValue(field.key, field.value ?? '')}
                                      onChange={(event) => setConfigurationFieldValue(field.key, event.currentTarget.value)}
                                      bg="var(--surface-2)"
                                      borderColor="var(--border-subtle)"
                                      placeholder={field.placeholder}
                                    />
                                  )}
                                  {field.description ? <Field.HelperText color="var(--text-muted)">{field.description}</Field.HelperText> : null}
                                  {field.disabledReason ? <Field.HelperText color="var(--text-muted)">{field.disabledReason}</Field.HelperText> : null}
                                </Field.Root>
                              ))}
                            </VStack>
                          ) : (
                            <Text color="var(--text-secondary)">This provider does not expose additional local bridge configuration fields.</Text>
                          )}
                        </>
                      ) : null}
                    </VStack>
                  )}
                </Drawer.Body>
                <Drawer.Footer>
                  <VStack align="stretch" gap="3" w="full">
                    {providerDrawerError ? (
                      <ErrorBanner title="Provider action failed" detail={providerDrawerError} />
                    ) : null}
                    <HStack justify="flex-end" gap="2" wrap="wrap">
                      <Button
                        variant="outline"
                        loading={providerDrawerLoading}
                        disabled={!drawerProviderId}
                        onClick={() => {
                          if (!drawerProviderId) {
                            return;
                          }

                          const refreshAction =
                            providerDrawerAuthPending && drawerProviderAuthSession
                              ? onPollProviderAuth(drawerProviderId, drawerProviderAuthSession.id, {
                                  scope: 'drawer'
                                })
                              : onInspectProvider(drawerProviderId);

                          void Promise.resolve(refreshAction).catch(() => undefined);
                        }}
                      >
                        Refresh status
                      </Button>
                      <Button variant="outline" onClick={() => setProviderDrawerOpen(false)}>
                        Close
                      </Button>
                      {shouldShowBeginAuth ? (
                        <Button
                          bg="var(--accent)"
                          color="white"
                          _hover={{ bg: 'var(--accent-strong)' }}
                          loading={providerDrawerLoading}
                          disabled={!drawerProviderDetails || providerDrawerLoading}
                          onClick={() =>
                            void (async () => {
                              if (!drawerProviderDetails) {
                                return;
                              }

                              await onBeginProviderAuth(drawerProviderDetails.id, {
                                scope: 'drawer'
                              });
                            })().catch(() => undefined)
                          }
                        >
                          Start provider auth
                        </Button>
                      ) : null}
                      {shouldShowConnectProvider ? (
                        <Button
                          bg="var(--accent)"
                          color="white"
                          _hover={{ bg: 'var(--accent-strong)' }}
                          loading={providerDrawerLoading}
                          disabled={apiKey.trim().length === 0 || providerDrawerLoading}
                          onClick={() =>
                            void (async () => {
                              if (!drawerProviderDetails) {
                                return;
                              }

                              try {
                                await onConnectProvider(drawerProviderDetails.id, apiKey.trim(), providerLabel.trim() || undefined, {
                                  scope: 'drawer',
                                  baseUrl: baseUrl.trim().length > 0 ? baseUrl.trim() : undefined,
                                  apiMode: apiMode.trim().length > 0 ? apiMode.trim() : undefined
                                });
                                setApiKey('');
                                setProviderLabel('');
                              } catch {
                                // Keep the drawer open so the user can correct the local provider configuration.
                              }
                            })()
                          }
                        >
                          Connect provider
                        </Button>
                      ) : providerConfigCanSave ? (
                        <Button
                          bg="var(--accent)"
                          color="white"
                          _hover={{ bg: 'var(--accent-strong)' }}
                          loading={providerDrawerLoading}
                          disabled={
                            !drawerProviderDetails ||
                            drawerProviderDetails.disabled ||
                            providerConfigHasMissingRequiredValue ||
                            providerConfigBlocked ||
                            providerDrawerLoading
                          }
                          onClick={() =>
                            void (async () => {
                              if (!drawerProviderDetails) {
                                return;
                              }

                              try {
                                await onUpdateRuntimeModelConfig(
                                  {
                                    provider: drawerProviderDetails.id,
                                    baseUrl: baseUrl.trim().length > 0 ? baseUrl : undefined,
                                    apiMode: apiMode.trim().length > 0 ? apiMode : undefined,
                                    defaultModel
                                  },
                                  {
                                    scope: 'drawer'
                                  }
                                );
                                setProviderDrawerOpen(false);
                              } catch {
                                // Keep the drawer open so the user can correct the local provider configuration.
                              }
                            })()
                          }
                        >
                          Save provider config
                        </Button>
                      ) : null}
                    </HStack>
                  </VStack>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Positioner>
          </Drawer.Root>
        </SettingsTabPanel>

        <SettingsTabPanel value="unrestricted">
          <SectionCard
            title="Unrestricted Access"
            description="Use the Hermes runtime without the bridge turn limiter or reviewed restrictions."
            action={
              <Button
                rounded="6px"
                bg="var(--accent)"
                color="white"
                _hover={{ bg: 'var(--accent-strong)' }}
                loading={saving}
                onClick={() => {
                  void persistSettings();
                }}
              >
                Save access settings
              </Button>
            }
          >
            <Box data-testid="settings-danger-zone" rounded="8px" border="1px solid rgba(177, 86, 47, 0.28)" bg="rgba(177, 86, 47, 0.08)" px="4" py="4">
              <HStack align="start" gap="3">
                <WarningBadge />
                <VStack align="stretch" gap="3">
                  <Text fontWeight="700" color="var(--text-primary)">
                    High-risk mode
                  </Text>
                  <Text color="var(--text-secondary)">
                    When enabled, Hermes can run with full autonomy through the local bridge. Restrictive turn limits are ignored, and actions may proceed without the reviewed bridge path.
                  </Text>
                  <Checkbox.Root checked={unrestrictedAccessEnabled} onCheckedChange={(event) => setUnrestrictedAccessEnabled(!!event.checked)}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>I understand the risk and want unrestricted runtime access.</Checkbox.Label>
                  </Checkbox.Root>
                  <Field.Root>
                    <Field.Label color="var(--text-secondary)">Unrestricted timeout (ms)</Field.Label>
                    <Input
                      type="number"
                      value={unrestrictedTimeoutMs}
                      onChange={(event) => setUnrestrictedTimeoutMs(event.currentTarget.value)}
                      bg="var(--surface-2)"
                      borderColor="var(--border-subtle)"
                    />
                    <Field.HelperText color="var(--text-muted)">
                      Maximum bridge timeout used only while Unrestricted Access is enabled. Max 7200000.
                    </Field.HelperText>
                  </Field.Root>
                </VStack>
              </HStack>
            </Box>
          </SectionCard>
        </SettingsTabPanel>

        <SettingsTabPanel value="access_audit">
          <VStack align="stretch" gap="4">
            <SectionCard title="Access audit" description="Recent local audit trail for unrestricted access state changes and usage.">
              <VStack align="stretch" gap="3">
                <HStack justify="recipe-between" wrap="wrap" gap="3">
                  <Text color="var(--text-secondary)">
                    Last enabled: {accessAudit?.unrestrictedAccessLastEnabledAt ? new Date(accessAudit.unrestrictedAccessLastEnabledAt).toLocaleString() : 'Never'}
                  </Text>
                  <Text color="var(--text-secondary)">
                    Last used: {accessAudit?.unrestrictedAccessLastUsedAt ? new Date(accessAudit.unrestrictedAccessLastUsedAt).toLocaleString() : 'Never'}
                  </Text>
                </HStack>
                {accessAuditEventsError ? <ErrorBanner title="Access audit load failed" detail={accessAuditEventsError} /> : null}
                {!accessAuditEventsResponse || accessAuditEventsResponse.items.length === 0 ? (
                  <Text color="var(--text-secondary)">
                    {accessAuditEventsLoading
                      ? 'Loading unrestricted-access audit activity…'
                      : 'No unrestricted-access audit activity has been recorded yet.'}
                  </Text>
                ) : (
                  <VStack align="stretch" gap="3">
                    <ScrollArea.Root maxH="420px" variant="hover">
                      <ScrollArea.Viewport data-testid="access-audit-scroll">
                        <VStack align="stretch" gap="2" pr="1">
                          {accessAuditEventsResponse.items.map((event) => (
                            <Box key={event.id} data-testid="access-audit-row" data-density="compact" rounded="6px" bg="var(--surface-2)" px="3.5" py="2.5">
                              <HStack justify="recipe-between" align="start" gap="3" wrap="wrap">
                                <VStack align="stretch" gap="1" minW={0}>
                                  <Text fontSize="sm" fontWeight="500" color="var(--text-primary)">
                                    {event.message}
                                  </Text>
                                  <Text fontSize="xs" color="var(--text-muted)">
                                    {event.type}
                                    {event.sessionId ? ` · Session ${event.sessionId}` : ''}
                                  </Text>
                                </VStack>
                                <Text fontSize="xs" color="var(--text-muted)" flexShrink={0}>
                                  {new Date(event.createdAt).toLocaleString()}
                                </Text>
                              </HStack>
                            </Box>
                          ))}
                        </VStack>
                      </ScrollArea.Viewport>
                      <ScrollArea.Scrollbar />
                    </ScrollArea.Root>
                    <PaginationFooter
                      page={accessAuditEventsPage}
                      pageSize={accessAuditEventsResponse.pageSize}
                      total={accessAuditEventsResponse.total}
                      itemLabel="audit entries"
                      onPageChange={onAccessAuditEventsPageChange}
                    />
                  </VStack>
                )}
              </VStack>
            </SectionCard>
          </VStack>
        </SettingsTabPanel>

        <SettingsTabPanel value="telemetry">
          <VStack align="stretch" gap="4">
            <SectionCard title="Troubleshooting telemetry" description="Structured bridge/runtime warnings and errors persisted locally for later diagnosis.">
              {telemetryError ? <ErrorBanner title="Telemetry load failed" detail={telemetryError} /> : null}
              {!telemetryResponse || telemetryResponse.items.length === 0 ? (
                <Text color="var(--text-secondary)">
                  {telemetryLoading
                    ? 'Loading troubleshooting telemetry…'
                    : 'No troubleshooting telemetry has been recorded for the active profile yet.'}
                </Text>
              ) : (
                <VStack align="stretch" gap="3">
                  <ScrollArea.Root maxH="420px" variant="hover">
                    <ScrollArea.Viewport data-testid="telemetry-scroll">
                      <VStack align="stretch" gap="2" pr="1">
                        {telemetryResponse.items.map((event) => (
                          <Box key={event.id} data-testid="telemetry-row" data-density="compact" rounded="6px" bg="var(--surface-2)" px="3.5" py="2.5">
                            <HStack justify="recipe-between" align="start" gap="3" wrap="wrap">
                              <VStack align="stretch" gap="1" minW={0}>
                                <HStack gap="2" wrap="wrap">
                                  <Badge colorPalette={event.severity === 'error' ? 'red' : event.severity === 'warning' ? 'yellow' : 'gray'}>
                                    {event.severity}
                                  </Badge>
                                  <Badge colorPalette="gray">{event.category}</Badge>
                                  <Text fontSize="xs" color="var(--text-muted)">
                                    {event.code}
                                  </Text>
                                </HStack>
                                <Text fontSize="sm" fontWeight="500" color="var(--text-primary)">
                                  {event.message}
                                </Text>
                                {event.detail ? (
                                  <Text fontSize="xs" color="var(--text-secondary)">
                                    {event.detail}
                                  </Text>
                                ) : null}
                                {(event.requestId || event.sessionId) ? (
                                  <Text fontSize="xs" color="var(--text-muted)">
                                    {event.requestId ? `Request ${event.requestId}` : ''}
                                    {event.requestId && event.sessionId ? ' · ' : ''}
                                    {event.sessionId ? `Session ${event.sessionId}` : ''}
                                  </Text>
                                ) : null}
                              </VStack>
                              <Text fontSize="xs" color="var(--text-muted)" flexShrink={0}>
                                {new Date(event.createdAt).toLocaleString()}
                              </Text>
                            </HStack>
                          </Box>
                        ))}
                      </VStack>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar />
                  </ScrollArea.Root>
                  <PaginationFooter
                    page={telemetryPage}
                    pageSize={telemetryResponse.pageSize}
                    total={telemetryResponse.total}
                    itemLabel="telemetry events"
                    onPageChange={onTelemetryPageChange}
                  />
                </VStack>
              )}
            </SectionCard>
          </VStack>
        </SettingsTabPanel>
      </Tabs.ContentGroup>
    </Tabs.Root>
  );
}

function SettingsTabPanel({
  value,
  children
}: {
  value: SettingsTabValue;
  children: ReactNode;
}) {
  return (
    <Tabs.Content value={value} h="100%" minH={0} pt="4" _open={{ display: 'block' }}>
      <ScrollArea.Root h="100%" minH={0} variant="hover">
        <ScrollArea.Viewport data-testid="settings-scroll">
          <VStack align="stretch" gap="4" pr={{ base: '1', xl: '2' }}>
            {children}
          </VStack>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar />
      </ScrollArea.Root>
    </Tabs.Content>
  );
}

function SectionCard({
  title,
  description,
  action,
  children
}: {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Box rounded="10px" border="1px solid var(--border-subtle)" bg="var(--surface-1)" px="5" py="5" overflow="hidden">
      <VStack align="stretch" gap="4">
        <HStack justify="recipe-between" align="start" wrap="wrap" gap="3">
          <Box>
            <Text fontWeight="600" color="var(--text-primary)">
              {title}
            </Text>
            <Text color="var(--text-secondary)">{description}</Text>
          </Box>
          {action ?? null}
        </HStack>
        {children}
      </VStack>
    </Box>
  );
}

function PaginationFooter({
  page,
  pageSize,
  total,
  itemLabel,
  onPageChange
}: {
  page: number;
  pageSize: number;
  total: number;
  itemLabel: string;
  onPageChange: (page: number) => void;
}) {
  return (
    <HStack justify="recipe-between" wrap="wrap" gap="3">
      <Text fontSize="sm" color="var(--text-secondary)">
        {total} {itemLabel}
      </Text>
      <HStack gap="2">
        <Button size="xs" variant="outline" rounded="14px" disabled={page <= 1} onClick={() => onPageChange(Math.max(1, page - 1))}>
          Previous
        </Button>
        <Text fontSize="sm" color="var(--text-secondary)">
          Page {page}
        </Text>
        <Button
          size="xs"
          variant="outline"
          rounded="14px"
          disabled={page * pageSize >= total}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </HStack>
    </HStack>
  );
}

function WarningBadge() {
  return (
    <Box
      flexShrink={0}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      rounded="full"
      width="30px"
      height="30px"
      bg="rgba(177, 86, 47, 0.18)"
      color="var(--text-primary)"
      fontWeight="700"
    >
      !
    </Box>
  );
}

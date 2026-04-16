import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Box, Button, CloseButton, Drawer, Flex, Grid, HStack, Text } from '@chakra-ui/react';
import type { ChatActivity, ChatMessage, RuntimeRequest, SessionMessagesResponse, Recipe, UpdateRecipeRequest } from '@hermes-recipes/protocol';
import { ErrorBanner } from '../molecules/ErrorBanner';
import { ConfirmDialog } from '../molecules/ConfirmDialog';
import { SessionActionMenu } from '../molecules/SessionActionMenu';
import { SessionRenameDialog } from '../molecules/SessionRenameDialog';
import { ChatActivityFeed } from '../organisms/ChatActivityFeed';
import { ChatComposer } from '../organisms/ChatComposer';
import { ChatTranscript } from '../organisms/ChatTranscript';
import { SessionRecipePanel } from '../organisms/SessionRecipePanel';

export function ChatPage({
  sessionPayload,
  loading,
  error,
  onSend,
  sending,
  progress,
  activities,
  assistantDraft,
  chatError,
  typing,
  selectedActivityRequestId,
  selectedActivityPreview,
  selectedActivityStatus,
  onFocusActivityRequest,
  runtimeDrawerOpen,
  onRuntimeDrawerOpenChange,
  onOpenRuntimeRequest,
  onRenameSession,
  onDeleteSession,
  onRenameRecipe,
  onDeleteRecipe,
  onRefreshRecipe,
  onExecuteRecipeAction,
  onUpdateRecipe,
  onApplyRecipeEntryAction
}: {
  sessionPayload: SessionMessagesResponse | null;
  loading: boolean;
  error: string | null;
  onSend: (content: string) => boolean | Promise<boolean>;
  sending: boolean;
  progress: string | null;
  activities: ChatActivity[];
  assistantDraft: string;
  chatError: string | null;
  typing: boolean;
  selectedActivityRequestId: string | null;
  selectedActivityPreview: string | null;
  selectedActivityStatus: RuntimeRequest['status'] | null;
  onFocusActivityRequest: (requestId: string | null) => void;
  runtimeDrawerOpen: boolean;
  onRuntimeDrawerOpenChange: (open: boolean) => void;
  onOpenRuntimeRequest: (requestId: string | null) => void;
  onRenameSession: (sessionId: string, title: string) => Promise<void> | void;
  onDeleteSession: (sessionId: string) => Promise<void> | void;
  onRenameRecipe: (recipeId: string, title: string) => Promise<void> | void;
  onDeleteRecipe: (recipeId: string) => Promise<void> | void;
  onRefreshRecipe: (recipe: Recipe) => Promise<void> | void;
  onExecuteRecipeAction: (
    recipe: Recipe,
    actionId: string,
    input: {
      selectedItemIds?: string[];
      pageState?: Record<string, number>;
      filterState?: Record<string, string>;
      formValues?: Record<string, string | number | boolean | null>;
    }
  ) => Promise<void> | void;
  onUpdateRecipe: (
    recipeId: string,
    partial: Omit<UpdateRecipeRequest, 'profileId'>,
    options?: {
      toastTitle?: string;
      toastDescription?: string;
      quiet?: boolean;
    }
  ) => Promise<Recipe> | void;
  onApplyRecipeEntryAction: (
    recipeId: string,
    action: 'remove' | 'delete_source',
    entryIds: string[],
    options?: {
      quiet?: boolean;
      toastTitle?: string;
      toastDescription?: string;
    }
  ) => Promise<void> | void;
}) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [spaceRenameOpen, setRecipeRenameOpen] = useState(false);
  const [spaceDeleteOpen, setRecipeDeleteOpen] = useState(false);
  const [spaceChatCollapsed, setRecipeChatCollapsed] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const runtimeButtonRef = useRef<HTMLButtonElement | null>(null);
  const activeSession = sessionPayload?.session ?? null;
  const attachedRecipe = sessionPayload?.attachedRecipe ?? null;
  const handleStandaloneTranscriptMessageClick = useCallback(
    (message: ChatMessage) => {
      onFocusActivityRequest(message.requestId);
    },
    [onFocusActivityRequest]
  );
  const handleAttachedTranscriptMessageClick = useCallback(
    (message: ChatMessage) => {
      onOpenRuntimeRequest(message.requestId);
    },
    [onOpenRuntimeRequest]
  );

  useEffect(() => {
    setRecipeChatCollapsed(false);
  }, [activeSession?.id, attachedRecipe?.id]);

  async function handleRename(title: string) {
    if (!activeSession) {
      return;
    }

    setActionLoading(true);
    setActionError(null);

    try {
      await onRenameSession(activeSession.id, title);
      setRenameOpen(false);
    } catch (renameError) {
      setActionError(renameError instanceof Error ? renameError.message : 'Failed to rename the session.');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDelete() {
    if (!activeSession) {
      return;
    }

    flushSync(() => {
      setDeleteOpen(false);
      setActionError(null);
    });
    setActionLoading(true);

    try {
      await onDeleteSession(activeSession.id);
    } catch (deleteError) {
      setActionError(deleteError instanceof Error ? deleteError.message : 'Failed to delete the session.');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleRenameAttachedSpace(title: string) {
    if (!attachedRecipe) {
      return;
    }

    setActionLoading(true);
    setActionError(null);

    try {
      await onRenameRecipe(attachedRecipe.id, title);
      setRecipeRenameOpen(false);
    } catch (renameError) {
      setActionError(renameError instanceof Error ? renameError.message : 'Failed to rename the attached recipe.');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDeleteAttachedSpace() {
    if (!attachedRecipe) {
      return;
    }

    flushSync(() => {
      setRecipeDeleteOpen(false);
      setActionError(null);
    });
    setActionLoading(true);

    try {
      await onDeleteRecipe(attachedRecipe.id);
    } catch (deleteError) {
      setActionError(deleteError instanceof Error ? deleteError.message : 'Failed to delete the attached recipe.');
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <Flex direction="column" h="100%" minH={0} gap="3">
      {!attachedRecipe ? (
        <HStack justify="recipe-between" align="start" gap="4">
          <Box minW={0}>
            <Text fontSize={{ base: 'xl', xl: '2xl' }} fontWeight="600" color="var(--text-primary)" lineClamp={2}>
              {activeSession?.title ?? 'Chat'}
            </Text>
            <Text color="var(--text-secondary)" lineClamp={2}>
              {activeSession?.summary ?? 'Choose a recent session or start a new one.'}
            </Text>
          </Box>
          {activeSession ? (
            <SessionActionMenu
              label={`Chat actions for ${activeSession.title}`}
              onRename={() => {
                setActionError(null);
                setRenameOpen(true);
              }}
              onDelete={() => {
                setActionError(null);
                setDeleteOpen(true);
              }}
            />
          ) : null}
        </HStack>
      ) : null}

      {error ? <ErrorBanner title="Session load failed" detail={error} /> : null}
      {chatError ? <ErrorBanner title="Hermes request failed" detail={chatError} /> : null}
      {actionError ? <ErrorBanner title="Session update failed" detail={actionError} /> : null}

      {attachedRecipe ? (
        <>
          <Grid
            flex="1"
            minH={0}
            gap="3"
            templateColumns={
              spaceChatCollapsed
                ? { base: 'minmax(0, 1fr) 92px', xl: 'minmax(0, 1fr) 92px' }
                : { base: '1fr', xl: 'minmax(0, 1fr) 400px' }
            }
            data-testid="combined-session-recipe-layout"
          >
            <Box minH={0} minW={0} overflow="hidden">
              <SessionRecipePanel
                recipe={attachedRecipe}
                onRename={() => {
                  setActionError(null);
                  setRecipeRenameOpen(true);
                }}
                onDelete={() => {
                  setActionError(null);
                  setRecipeDeleteOpen(true);
                }}
                onRefresh={onRefreshRecipe}
                onExecuteAction={onExecuteRecipeAction}
                onUpdateRecipe={onUpdateRecipe}
                onApplyRecipeEntryAction={onApplyRecipeEntryAction}
              />
            </Box>

            {spaceChatCollapsed ? (
              <Flex
                direction="column"
                minH={0}
                rounded="10px"
                border="1px solid var(--border-subtle)"
                bg="var(--surface-1)"
                px="2"
                py="3"
                align="center"
                gap="3"
                data-testid="collapsed-session-recipe-chat-rail"
              >
                <Button
                  size="xs"
                  variant="outline"
                  w="100%"
                  minW={0}
                  aria-label="Expand chat pane"
                  title="Expand chat pane"
                  onClick={() => setRecipeChatCollapsed(false)}
                >
                  Chat
                </Button>
                <Button
                  ref={runtimeButtonRef}
                  size="xs"
                  variant="subtle"
                  w="100%"
                  minW={0}
                  aria-label="Open runtime drawer"
                  title="Open runtime drawer"
                  onClick={() => onRuntimeDrawerOpenChange(true)}
                >
                  Runtime
                </Button>
                <Box flex="1" minH={0} display="flex" alignItems="center" justifyContent="center">
                  <Text
                    fontSize="xs"
                    fontWeight="600"
                    color="var(--text-muted)"
                    textTransform="uppercase"
                    letterSpacing="0.12em"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    Session chat
                  </Text>
                </Box>
              </Flex>
            ) : (
              <Flex direction="column" minH={0} gap="3">
                <Box rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-1)" px="3.5" py="3">
                  <HStack justify="recipe-between" align="start" gap="3">
                    <Box minW={0}>
                      <Text fontSize="xs" fontWeight="600" color="var(--text-muted)" textTransform="uppercase" letterSpacing="0.12em">
                        Session chat
                      </Text>
                      <Text fontSize="sm" fontWeight="600" color="var(--text-primary)" lineClamp={2}>
                        {attachedRecipe?.title ?? activeSession?.title ?? 'Attached chat'}
                      </Text>
                    </Box>
                    <HStack gap="1.5" flexShrink={0}>
                      <Button
                        size="xs"
                        variant="ghost"
                        aria-label="Collapse chat pane"
                        title="Collapse chat pane"
                        onClick={() => setRecipeChatCollapsed(true)}
                      >
                        Collapse
                      </Button>
                      <Button
                        ref={runtimeButtonRef}
                        size="xs"
                        variant="outline"
                        onClick={() => onRuntimeDrawerOpenChange(true)}
                      >
                        Runtime
                      </Button>
                      {activeSession ? (
                        <SessionActionMenu
                          label={`Chat actions for ${activeSession.title}`}
                          onRename={() => {
                            setActionError(null);
                            setRenameOpen(true);
                          }}
                          onDelete={() => {
                            setActionError(null);
                            setDeleteOpen(true);
                          }}
                        />
                      ) : null}
                    </HStack>
                  </HStack>
                </Box>

                <Box
                  flex="1"
                  minH={0}
                  rounded="10px"
                  border="1px solid var(--border-subtle)"
                  bg="var(--surface-1)"
                  px={{ base: '3', xl: '3.5' }}
                  py={{ base: '3', xl: '3.5' }}
                  data-testid="session-recipe-chat-pane"
                >
                  <ChatTranscript
                    loading={loading}
                    messages={sessionPayload?.messages ?? []}
                    assistantDraft={assistantDraft}
                    showTypingIndicator={typing}
                    typingStatusLabel={progress}
                    selectedRequestId={selectedActivityRequestId}
                    onMessageClick={handleAttachedTranscriptMessageClick}
                    emptyTitle="No messages yet"
                    emptyDetail="Start chatting in this attached recipe session."
                  />
                </Box>

                <ChatComposer onSend={onSend} sending={sending} disabled={loading} />
              </Flex>
            )}
          </Grid>

          <Drawer.Root
            lazyMount
            unmountOnExit
            open={runtimeDrawerOpen}
            onOpenChange={(event) => onRuntimeDrawerOpenChange(event.open)}
            size={{ base: 'full', md: 'md' }}
            finalFocusEl={() => (runtimeButtonRef.current && runtimeButtonRef.current.isConnected ? runtimeButtonRef.current : document.body)}
          >
            <Drawer.Backdrop backdropFilter="auto" backdropBlur="sm" bg="blackAlpha.500" />
            <Drawer.Positioner>
              <Drawer.Content
                bg="var(--surface-1)"
                borderLeft="1px solid var(--border-subtle)"
                data-testid="recipe-runtime-drawer"
              >
                <Drawer.Header>
                  <HStack justify="recipe-between" align="center" gap="3">
                    <Drawer.Title color="var(--text-primary)">Runtime activity</Drawer.Title>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" aria-label="Close runtime drawer" title="Close runtime drawer" />
                    </Drawer.CloseTrigger>
                  </HStack>
                </Drawer.Header>
                <Drawer.Body>
                  <ChatActivityFeed
                    activities={activities}
                    sending={sending}
                    progress={progress}
                    requestPreview={selectedActivityPreview}
                    requestStatus={selectedActivityStatus}
                  />
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Drawer.Root>
        </>
      ) : (
        <Grid flex="1" minH={0} gap="4" templateColumns={{ base: '1fr', xl: 'minmax(0, 1fr) 360px' }}>
          <Flex direction="column" minH={0} gap="4">
            <Box
              flex="1"
              minH={0}
              rounded="12px"
              border="1px solid var(--border-subtle)"
              bg="var(--surface-1)"
              px={{ base: '3', xl: '4' }}
              py={{ base: '3', xl: '4' }}
            >
              <ChatTranscript
                loading={loading}
                messages={sessionPayload?.messages ?? []}
                assistantDraft={assistantDraft}
                showTypingIndicator={typing}
                typingStatusLabel={progress}
                selectedRequestId={selectedActivityRequestId}
                onMessageClick={handleStandaloneTranscriptMessageClick}
                emptyTitle="No messages yet"
                emptyDetail="Start a real Hermes session with the composer below."
              />
            </Box>

            <ChatComposer onSend={onSend} sending={sending} disabled={loading} />
          </Flex>

          <Box minH={0}>
            <ChatActivityFeed
              activities={activities}
              sending={sending}
              progress={progress}
              requestPreview={selectedActivityPreview}
              requestStatus={selectedActivityStatus}
            />
          </Box>
        </Grid>
      )}

      {activeSession ? (
        <>
          <SessionRenameDialog
            open={renameOpen}
            loading={actionLoading}
            sessionTitle={activeSession.title}
            onOpenChange={(open) => {
              setRenameOpen(open);
              if (!open) {
                setActionError(null);
              }
            }}
            onSave={handleRename}
          />
          <ConfirmDialog
            open={deleteOpen}
            loading={actionLoading}
            title="Delete session"
            description="Delete this session from the app. If Hermes supports remote deletion it will be removed there too; otherwise it will be hidden locally until new Hermes activity revives it."
            confirmLabel="Delete session"
            onOpenChange={(open) => {
              setDeleteOpen(open);
              if (!open) {
                setActionError(null);
              }
            }}
            onConfirm={handleDelete}
          />
        </>
      ) : null}

      {attachedRecipe ? (
        <>
          <SessionRenameDialog
            open={spaceRenameOpen}
            loading={actionLoading}
            sessionTitle={attachedRecipe.title}
            dialogTitle="Rename recipe"
            description="Update the attached recipe title used in this combined recipe."
            fieldLabel="Recipe title"
            placeholder="Give this recipe a clear title"
            saveLabel="Save recipe"
            onOpenChange={(open) => {
              setRecipeRenameOpen(open);
              if (!open) {
                setActionError(null);
              }
            }}
            onSave={handleRenameAttachedSpace}
          />
          <ConfirmDialog
            open={spaceDeleteOpen}
            loading={actionLoading}
            title="Delete attached recipe"
            description="Delete the attached structured recipe and keep the chat session intact."
            confirmLabel="Delete recipe"
            onOpenChange={(open) => {
              setRecipeDeleteOpen(open);
              if (!open) {
                setActionError(null);
              }
            }}
            onConfirm={handleDeleteAttachedSpace}
          />
        </>
      ) : null}
    </Flex>
  );
}

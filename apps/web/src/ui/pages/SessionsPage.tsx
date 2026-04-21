import { useState } from 'react';
import { flushSync } from 'react-dom';
import { Box, Button, Field, HStack, Input, Table, Text, VStack } from '@chakra-ui/react';
import type { Session, SessionsResponse } from '@hermes-recipes/protocol';
import { RecipeTypeBadge } from '../atoms/RecipeTypeBadge';
import { EmptyStateCard } from '../molecules/EmptyStateCard';
import { ErrorBanner } from '../molecules/ErrorBanner';
import { ConfirmDialog } from '../molecules/ConfirmDialog';
import { SessionActionMenu } from '../molecules/SessionActionMenu';
import { SessionRenameDialog } from '../molecules/SessionRenameDialog';

export function SessionsPage({
  value,
  onChange,
  onSearch,
  onPageChange,
  response,
  loading,
  error,
  onOpenSession,
  onRenameSession,
  onDeleteSession
}: {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onPageChange: (page: number) => void;
  response: SessionsResponse | null;
  loading: boolean;
  error: string | null;
  onOpenSession: (sessionId: string) => void;
  onRenameSession: (sessionId: string, title: string) => Promise<void> | void;
  onDeleteSession: (sessionId: string) => Promise<void> | void;
}) {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleRename(title: string) {
    if (!selectedSession) {
      return;
    }

    setActionLoading(true);
    setActionError(null);

    try {
      await onRenameSession(selectedSession.id, title);
      setRenameOpen(false);
    } catch (renameError) {
      setActionError(renameError instanceof Error ? renameError.message : 'Failed to rename the session.');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDelete() {
    if (!selectedSession) {
      return;
    }

    flushSync(() => {
      setDeleteOpen(false);
      setActionError(null);
    });
    setActionLoading(true);

    try {
      await onDeleteSession(selectedSession.id);
    } catch (deleteError) {
      setActionError(deleteError instanceof Error ? deleteError.message : 'Failed to delete the session.');
    } finally {
      setActionLoading(false);
    }
  }

  function openRename(session: Session) {
    setSelectedSession(session);
    setActionError(null);
    setRenameOpen(true);
  }

  function openDelete(session: Session) {
    setSelectedSession(session);
    setActionError(null);
    setDeleteOpen(true);
  }

  return (
    <VStack align="stretch" h="100%" minH={0} gap="4">
      <HStack align="end" gap="3" rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-elevated)" p="4" boxShadow="var(--shadow-xs)">
        <Field.Root>
          <Field.Label color="var(--text-secondary)" fontWeight="650">Search sessions</Field.Label>
          <Input
            value={value}
            onChange={(event) => onChange(event.currentTarget.value)}
            placeholder="Search titles or summaries"
            bg="var(--surface-2)"
            borderColor="var(--border-subtle)"
            rounded="8px"
          />
        </Field.Root>
        <Button rounded="8px" bg="var(--accent)" color="var(--accent-contrast)" _hover={{ bg: 'var(--accent-strong)' }} onClick={onSearch} loading={loading}>
          Search
        </Button>
      </HStack>

      {error ? <ErrorBanner title="Session browse failed" detail={error} /> : null}
      {actionError ? <ErrorBanner title="Session update failed" detail={actionError} /> : null}

      <Box flex="1" minH={0} rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-elevated)" p="4" boxShadow="var(--shadow-sm)">
        {!response || response.items.length === 0 ? (
          <EmptyStateCard
            title={loading ? 'Loading sessions' : 'No sessions matched'}
            detail={loading ? 'The bridge is reading persisted and Hermes-backed sessions.' : 'Adjust the search terms or create a new chat.'}
          />
        ) : (
          <VStack align="stretch" gap="3" h="100%">
            <Table.ScrollArea data-testid="sessions-table-scroll" borderWidth="1px" borderColor="var(--border-subtle)" rounded="8px" flex="1">
              <Table.Root size="sm" variant="outline" interactive>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Title</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">Type</Table.ColumnHeader>
                    <Table.ColumnHeader>Summary</Table.ColumnHeader>
                    <Table.ColumnHeader>Updated</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Messages</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {response.items.map((session) => (
                    <Table.Row key={session.id} cursor="pointer" onClick={() => onOpenSession(session.id)}>
                      <Table.Cell>
                          <Text fontWeight="750" color="var(--text-primary)">
                            {session.title}
                          </Text>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <RecipeTypeBadge
                          recipeType={session.recipeType}
                          testId={session.recipeType === 'home' ? 'session-recipe-indicator' : 'session-type-indicator'}
                        />
                      </Table.Cell>
                      <Table.Cell color="var(--text-secondary)">{session.summary}</Table.Cell>
                      <Table.Cell color="var(--text-secondary)">{new Date(session.lastUpdatedAt).toLocaleString()}</Table.Cell>
                      <Table.Cell textAlign="end" color="var(--text-secondary)">
                        {session.messageCount}
                      </Table.Cell>
                      <Table.Cell textAlign="end" onClick={(event) => event.stopPropagation()}>
                        <SessionActionMenu
                          label={`Actions for ${session.title}`}
                          onRename={() => openRename(session)}
                          onDelete={() => openDelete(session)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>

            <HStack justify="space-between" wrap="wrap" gap="3">
              <Text color="var(--text-secondary)">
                {response.total} visible sessions for {response.profileId}
                {response.hiddenSyntheticCount > 0 ? ` · ${response.hiddenSyntheticCount} synthetic sessions hidden` : ''}
              </Text>
              <HStack gap="2">
                <Button variant="outline" rounded="8px" onClick={() => onPageChange(Math.max(1, response.page - 1))} disabled={response.page <= 1}>
                  Previous
                </Button>
                <Text color="var(--text-secondary)">Page {response.page}</Text>
                <Button variant="outline" rounded="8px" onClick={() => onPageChange(response.page + 1)} disabled={response.page * response.pageSize >= response.total}>
                  Next
                </Button>
              </HStack>
            </HStack>
          </VStack>
        )}
      </Box>

      {selectedSession ? (
        <>
          <SessionRenameDialog
            open={renameOpen}
            loading={actionLoading}
            sessionTitle={selectedSession.title}
            onOpenChange={setRenameOpen}
            onSave={handleRename}
          />
          <ConfirmDialog
            open={deleteOpen}
            loading={actionLoading}
            title="Delete session"
            description="Delete this session from the main lists. If Hermes supports session deletion it will be removed there too; otherwise the bridge will soft-delete it locally until new activity makes it visible again."
            confirmLabel="Delete session"
            onOpenChange={setDeleteOpen}
            onConfirm={handleDelete}
          />
        </>
      ) : null}
    </VStack>
  );
}

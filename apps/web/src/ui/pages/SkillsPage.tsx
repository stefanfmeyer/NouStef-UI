import { useState } from 'react';
import { Box, Button, HStack, Menu, Portal, Table, Text, Tooltip, VStack } from '@chakra-ui/react';
import type { Skill, SkillsResponse } from '@hermes-recipes/protocol';
import { InfoTag } from '../atoms/InfoTag';
import { ConfirmDialog } from '../molecules/ConfirmDialog';
import { EmptyStateCard } from '../molecules/EmptyStateCard';
import { ErrorBanner } from '../molecules/ErrorBanner';

function trustPalette(value: string) {
  if (/builtin/i.test(value)) {
    return 'teal';
  }

  if (/verified/i.test(value)) {
    return 'green';
  }

  return 'gray';
}

function categoryPalette(value: string) {
  if (/productivity/i.test(value)) {
    return 'blue';
  }

  if (/workspace|project/i.test(value)) {
    return 'orange';
  }

  return 'gray';
}

export function SkillsPage({
  response,
  loading,
  error,
  onRefresh,
  onDeleteSkill
}: {
  response: SkillsResponse | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onDeleteSkill: (skill: Skill) => Promise<void> | void;
}) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleDelete() {
    if (!selectedSkill) {
      return;
    }

    setDeleteLoading(true);
    setActionError(null);

    try {
      await onDeleteSkill(selectedSkill);
      setDeleteOpen(false);
    } catch (deleteError) {
      setActionError(deleteError instanceof Error ? deleteError.message : 'Failed to delete the selected skill.');
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <VStack align="stretch" h="100%" minH={0} gap="4">
      <HStack justify="recipe-between" wrap="wrap" gap="3">
        <Box>
          <Text fontWeight="700" color="var(--text-primary)">
            Runtime skills
          </Text>
          <Text color="var(--text-secondary)">Skills available to the active Hermes profile.</Text>
        </Box>
        <Button variant="outline" onClick={onRefresh} loading={loading}>
          Refresh
        </Button>
      </HStack>

      {error ? <ErrorBanner title="Skills refresh failed" detail={error} /> : null}
      {actionError ? <ErrorBanner title="Skill update failed" detail={actionError} /> : null}

      <Box flex="1" minH={0} rounded="10px" border="1px solid var(--border-subtle)" bg="var(--surface-1)" p="4">
        {!response ? (
          <EmptyStateCard title="Loading skills" detail="Reading the active profile skill catalog from Hermes." />
        ) : response.items.length === 0 ? (
          <EmptyStateCard title="No skills reported" detail="Hermes did not report any installed skills for the active profile." />
        ) : (
          <Table.ScrollArea data-testid="skills-table-scroll" borderWidth="1px" borderColor="var(--border-subtle)" rounded="8px" h="100%">
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Category</Table.ColumnHeader>
                  <Table.ColumnHeader>Source</Table.ColumnHeader>
                  <Table.ColumnHeader>Trust</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {response.items.map((skill) => {
                  const canDelete = !/builtin/i.test(skill.source) && !/builtin/i.test(skill.trust);

                  return (
                    <Table.Row key={skill.id}>
                      <Table.Cell>
                        <VStack align="stretch" gap="0.5">
                          <HStack gap="1.5" align="center">
                            {skill.summary ? (
                              <Tooltip.Root openDelay={200} closeDelay={100}>
                                <Tooltip.Trigger asChild>
                                  <Box
                                    as="span"
                                    display="inline-flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    w="16px"
                                    h="16px"
                                    rounded="full"
                                    border="1px solid var(--border-subtle)"
                                    color="var(--text-muted)"
                                    fontSize="10px"
                                    fontWeight="700"
                                    cursor="help"
                                    flexShrink={0}
                                  >
                                    ?
                                  </Box>
                                </Tooltip.Trigger>
                                <Portal>
                                  <Tooltip.Positioner>
                                    <Tooltip.Content
                                      bg="var(--surface-1)"
                                      color="var(--text-primary)"
                                      border="1px solid var(--border-subtle)"
                                      rounded="8px"
                                      px="3"
                                      py="2"
                                      maxW="280px"
                                      boxShadow="md"
                                    >
                                      <Text fontSize="sm">{skill.summary}</Text>
                                    </Tooltip.Content>
                                  </Tooltip.Positioner>
                                </Portal>
                              </Tooltip.Root>
                            ) : null}
                            <Text fontWeight="700" color="var(--text-primary)">
                              {skill.name}
                            </Text>
                          </HStack>
                          {skill.summary ? (
                            <Text fontSize="sm" color="var(--text-secondary)" lineClamp={1}>
                              {skill.summary}
                            </Text>
                          ) : null}
                        </VStack>
                      </Table.Cell>
                      <Table.Cell>
                        <InfoTag label={skill.category || 'Uncategorized'} colorPalette={categoryPalette(skill.category)} />
                      </Table.Cell>
                      <Table.Cell color="var(--text-secondary)">{skill.source}</Table.Cell>
                      <Table.Cell>
                        <InfoTag label={skill.trust} colorPalette={trustPalette(skill.trust)} />
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <Menu.Root positioning={{ placement: 'bottom-end' }}>
                          <Menu.Trigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              minW={0}
                              px="2.5"
                              rounded="full"
                              aria-label={`Actions for ${skill.name}`}
                              color="var(--text-secondary)"
                              _hover={{ bg: 'var(--surface-2)', color: 'var(--text-primary)' }}
                            >
                              ⋮
                            </Button>
                          </Menu.Trigger>
                          <Portal>
                            <Menu.Positioner>
                              <Menu.Content minW="12rem">
                                <Menu.Item
                                  value={`delete-${skill.id}`}
                                  disabled={!canDelete}
                                  color={canDelete ? 'fg.error' : undefined}
                                  _hover={canDelete ? { bg: 'bg.error', color: 'fg.error' } : undefined}
                                  onClick={() => {
                                    if (!canDelete) {
                                      return;
                                    }

                                    setSelectedSkill(skill);
                                    setActionError(null);
                                    setDeleteOpen(true);
                                  }}
                                >
                                  Delete
                                </Menu.Item>
                              </Menu.Content>
                            </Menu.Positioner>
                          </Portal>
                        </Menu.Root>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        )}
      </Box>

      {selectedSkill ? (
        <ConfirmDialog
          open={deleteOpen}
          loading={deleteLoading}
          title="Delete skill"
          description={`Delete ${selectedSkill.name} from the active Hermes profile. This deletion is permanent and cannot be undone.`}
          confirmLabel="Delete skill"
          onOpenChange={setDeleteOpen}
          onConfirm={handleDelete}
        >
          <Box mt="4" rounded="8px" border="1px solid var(--border-danger)" bg="var(--surface-danger)" px="4" py="3">
            <Text color="var(--text-primary)" fontWeight="500">
              Permanent deletion
            </Text>
            <Text color="var(--text-secondary)">
              This removes the installed skill from the active profile immediately. The app will not recreate it locally after deletion succeeds.
            </Text>
          </Box>
        </ConfirmDialog>
      ) : null}
    </VStack>
  );
}

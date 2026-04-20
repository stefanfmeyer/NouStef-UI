import { Box, Table, Tabs, Text, VStack } from '@chakra-ui/react';
import type { ToolHistoryResponse, ToolsResponse, ToolsTab } from '@hermes-recipes/protocol';
import { StatusPill } from '../atoms/StatusPill';
import { EmptyStateCard } from '../molecules/EmptyStateCard';
import { ErrorBanner } from '../molecules/ErrorBanner';
import { ToolHistoryPage } from './ToolHistoryPage';

export function ToolsPage({
  response,
  loading,
  error,
  toolsTab,
  onToolsTabChange,
  toolHistoryResponse,
  toolHistoryLoading,
  toolHistoryError,
  toolHistoryPage,
  onToolHistoryPageChange
}: {
  response: ToolsResponse | null;
  loading: boolean;
  error: string | null;
  toolsTab: ToolsTab;
  onToolsTabChange: (tab: ToolsTab) => Promise<void> | void;
  toolHistoryResponse: ToolHistoryResponse | null;
  toolHistoryLoading: boolean;
  toolHistoryError: string | null;
  toolHistoryPage: number;
  onToolHistoryPageChange: (page: number) => void;
}) {
  return (
    <VStack align="stretch" h="100%" minH={0} gap="4">
      {error ? <ErrorBanner title="Tools refresh failed" detail={error} /> : null}

      <Tabs.Root
        value={toolsTab}
        onValueChange={(event) => {
          void onToolsTabChange(event.value as ToolsTab);
        }}
        h="100%"
        minH={0}
        display="flex"
        flexDirection="column"
        variant="plain"
        css={{
          '--tabs-indicator-bg': 'var(--surface-1)',
          '--tabs-indicator-shadow': 'var(--shadow-xs)',
          '--tabs-trigger-radius': '8px'
        }}
      >
        <Tabs.List rounded="8px" bg="var(--surface-2)" border="1px solid var(--border-subtle)" p="1" w="fit-content">
          <Tabs.Trigger value="all">All Tools</Tabs.Trigger>
          <Tabs.Trigger value="history">Tool History</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>

        <Tabs.Content value="all" flex="1" minH={0} pt="4">
          <VStack align="stretch" h="100%" minH={0} gap="4">
            <Box rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-elevated)" px="5" py="4" boxShadow="var(--shadow-xs)">
              <Text fontWeight="750" color="var(--text-primary)">
                Runtime capability inventory
              </Text>
              <Text color="var(--text-secondary)">
                Tool History shows what Hermes actually used during chat. Reviewed bridge executions remain tracked there, even though the manual shell runner is no longer exposed in this UI.
              </Text>
            </Box>

            <Box flex="1" minH={0} rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-elevated)" p="4" boxShadow="var(--shadow-sm)">
              {!response ? (
                <EmptyStateCard title={loading ? 'Loading tools' : 'No tools reported'} detail="Reading Hermes and bridge tool capabilities." />
              ) : (
                <Table.ScrollArea data-testid="tools-table-scroll" borderWidth="1px" borderColor="var(--border-subtle)" rounded="8px" h="100%">
                  <Table.Root size="sm" variant="outline">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>Tool</Table.ColumnHeader>
                        <Table.ColumnHeader>Source</Table.ColumnHeader>
                        <Table.ColumnHeader>Capabilities</Table.ColumnHeader>
                        <Table.ColumnHeader>Status</Table.ColumnHeader>
                        <Table.ColumnHeader>Approval</Table.ColumnHeader>
                        <Table.ColumnHeader>Restrictions</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {response.items.map((tool) => (
                        <Table.Row key={tool.id}>
                          <Table.Cell>
                            <Text fontWeight="750" color="var(--text-primary)">
                              {tool.name}
                            </Text>
                            <Text fontSize="sm" color="var(--text-secondary)">
                              {tool.description}
                            </Text>
                          </Table.Cell>
                          <Table.Cell color="var(--text-secondary)">{tool.source}</Table.Cell>
                          <Table.Cell color="var(--text-secondary)">{tool.capabilities.join(', ') || 'None reported'}</Table.Cell>
                          <Table.Cell>
                            <StatusPill label={tool.status} />
                          </Table.Cell>
                          <Table.Cell color="var(--text-secondary)">{tool.approvalModel}</Table.Cell>
                          <Table.Cell color="var(--text-secondary)">{tool.restrictions[0] ?? 'None reported'}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Table.ScrollArea>
              )}
            </Box>
          </VStack>
        </Tabs.Content>

        <Tabs.Content value="history" flex="1" minH={0} pt="4">
          <ToolHistoryPage
            response={toolHistoryResponse}
            loading={toolHistoryLoading}
            error={toolHistoryError}
            page={toolHistoryPage}
            onPageChange={onToolHistoryPageChange}
          />
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
}

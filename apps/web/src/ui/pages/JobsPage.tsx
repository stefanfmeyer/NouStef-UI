import { Box, Button, HStack, Table, Text, VStack } from '@chakra-ui/react';
import type { JobsResponse } from '@hermes-recipes/protocol';
import { StatusPill } from '../atoms/StatusPill';
import { EmptyStateCard } from '../molecules/EmptyStateCard';
import { ErrorBanner } from '../molecules/ErrorBanner';

export function JobsPage({
  response,
  loading,
  error,
  onRefresh
}: {
  response: JobsResponse | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}) {
  return (
    <VStack align="stretch" h="100%" minH={0} gap="4">
      <HStack justify="recipe-between">
        <HStack gap="2">
          {response ? <StatusPill label={response.freshness.status} /> : null}
          {response?.freshness.lastSuccessfulAt ? (
            <Text color="var(--text-secondary)">
              Last synced {new Date(response.freshness.lastSuccessfulAt).toLocaleString()}
            </Text>
          ) : null}
        </HStack>
        <Button variant="outline" onClick={onRefresh} loading={loading}>
          Refresh
        </Button>
      </HStack>

      {error ? <ErrorBanner title="Jobs refresh failed" detail={error} /> : null}
      {response?.freshness.lastError ? (
        <ErrorBanner title="Latest Hermes jobs error" detail={response.freshness.lastError} />
      ) : null}

      <Box flex="1" minH={0} rounded="10px" border="1px solid var(--border-subtle)" bg="var(--surface-1)" p="4">
        {!response ? (
          <EmptyStateCard title="Loading jobs" detail="Reading Hermes cron state for the selected profile." />
        ) : response.items.length === 0 ? (
          <EmptyStateCard
            title="No scheduled jobs"
            detail="Hermes reported no cron jobs for the selected profile."
          />
        ) : (
          <Table.ScrollArea data-testid="jobs-table-scroll" borderWidth="1px" borderColor="var(--border-subtle)" rounded="8px" h="100%">
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Job</Table.ColumnHeader>
                  <Table.ColumnHeader>Schedule</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader>Next run</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {response.items.map((job) => (
                  <Table.Row key={job.id}>
                    <Table.Cell>
                      <Text fontWeight="700" color="var(--text-primary)">
                        {job.label}
                      </Text>
                      <Text fontSize="sm" color="var(--text-secondary)">
                        {job.description}
                      </Text>
                    </Table.Cell>
                    <Table.Cell color="var(--text-secondary)">{job.schedule}</Table.Cell>
                    <Table.Cell>
                      <StatusPill label={job.status} />
                    </Table.Cell>
                    <Table.Cell color="var(--text-secondary)">{job.nextRun}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        )}
      </Box>
    </VStack>
  );
}

import { Alert, Box, Flex, HStack, VStack } from '@chakra-ui/react';
import type { ConnectionState } from '@hermes-recipes/protocol';
import type { ReactNode } from 'react';
import { StatusPill } from '../atoms/StatusPill';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { BrandLockup } from '../atoms/BrandLockup';
import { ErrorBanner } from '../molecules/ErrorBanner';
import { PageHeader } from '../molecules/PageHeader';
import { Sidebar } from '../organisms/Sidebar';

export function ShellLayout({
  connection,
  profileName,
  pageTitle,
  headerDetail,
  headerMode = 'full',
  sidebar,
  tabBar,
  onPersistTheme,
  hermesVersion,
  expectedHermesVersion,
  children
}: {
  connection: ConnectionState;
  profileName: string | null;
  pageTitle: string;
  headerDetail: string;
  headerMode?: 'full' | 'compact';
  sidebar: ReactNode;
  tabBar?: ReactNode;
  onPersistTheme: (themeMode: 'dark' | 'light') => Promise<void> | void;
  hermesVersion?: string | null;
  expectedHermesVersion?: string | null;
  children: ReactNode;
}) {
  const versionMismatch =
    expectedHermesVersion &&
    hermesVersion &&
    hermesVersion !== expectedHermesVersion;
  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      minH="100dvh"
      h="100dvh"
      overflow="hidden"
      bg="transparent"
      p={{ base: '0', lg: '4' }}
      gap="4"
    >
      {sidebar}

      <Flex
        direction="column"
        flex="1"
        minW={0}
        minH={0}
        rounded={{ base: '0', lg: '12px' }}
        border={{ base: 'none', lg: '1px solid var(--border-subtle)' }}
        bg="var(--shell-bg)"
        overflow="hidden"
      >
        <VStack
          align="stretch"
          gap={headerMode === 'compact' ? '3' : '4'}
          px={{ base: '4', lg: '6' }}
          py={{ base: '4', lg: headerMode === 'compact' ? '4' : '5' }}
        >
          <HStack justify="recipe-between" align="start" gap="4" data-testid="shell-toolbar">
            {headerMode === 'full' ? (
              <PageHeader profileName={profileName} pageName={pageTitle} detail={headerDetail} />
            ) : (
              <Box flex="1" minW={0}>
                <BrandLockup compact />
              </Box>
            )}
            <VStack align="end" gap="2">
              <HStack gap="2">
                <StatusPill label={connection.status} />
                <ThemeToggle onPersist={onPersistTheme} />
              </HStack>
            </VStack>
          </HStack>

          {versionMismatch ? (
            <Alert.Root status="warning" rounded="8px" border="1px solid var(--border-warning, rgba(234, 179, 8, 0.4))" bg="var(--surface-warning, rgba(234, 179, 8, 0.08))">
              <Alert.Content>
                <Alert.Title color="var(--text-primary)">Hermes version mismatch</Alert.Title>
                <Alert.Description color="var(--text-secondary)">
                  This app was built for Hermes v{expectedHermesVersion}. You are running v{hermesVersion}. Some features may not work correctly.
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          ) : null}

          {connection.status !== 'connected' && connection.detail ? (
            <ErrorBanner
              title="Hermes is not fully healthy"
              detail={`${connection.detail}${connection.usingCachedData ? ' Showing cached real data where available.' : ''}`}
            />
          ) : null}
        </VStack>

        {tabBar ?? null}

        <Box flex="1" minH={0} px={{ base: '4', lg: '6' }} pt={tabBar ? '3' : '0'} pb={{ base: '4', lg: '6' }}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

export { Sidebar };

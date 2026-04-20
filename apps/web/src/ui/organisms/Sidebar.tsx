import { useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { Box, Button, Flex, HStack, ScrollArea, Separator, Text, VStack, chakra } from '@chakra-ui/react';
import type { AppPage, Profile, Session } from '@hermes-recipes/protocol';
import { ConfirmDialog } from '../molecules/ConfirmDialog';
import { ErrorBanner } from '../molecules/ErrorBanner';
import { ProfileSelector } from '../molecules/ProfileSelector';
import { SessionRow } from '../molecules/SessionRow';
import { SessionRenameDialog } from '../molecules/SessionRenameDialog';
import { BrandLockup } from '../atoms/BrandLockup';

type SidebarIconName = 'recipes' | 'sessions' | 'jobs' | 'tools' | 'skills' | 'settings' | 'new-session' | 'collapse' | 'expand';

const navItems: Array<{ page: AppPage; label: string; icon: SidebarIconName }> = [
  { page: 'recipes', label: 'Spaces', icon: 'recipes' },
  { page: 'sessions', label: 'All sessions', icon: 'sessions' },
  { page: 'jobs', label: 'Jobs', icon: 'jobs' },
  { page: 'tools', label: 'Tools', icon: 'tools' },
  { page: 'skills', label: 'Skills', icon: 'skills' },
  { page: 'settings', label: 'Settings', icon: 'settings' }
];

export function Sidebar({
  profiles,
  activeProfileId,
  activeSessionId,
  recentSessions,
  activePage,
  collapsed,
  onCollapsedChange,
  onProfileChange,
  onCreateSession,
  onOpenSession,
  onOpenPage,
  onRenameSession,
  onDeleteSession
}: {
  profiles: Profile[];
  activeProfileId: string | null;
  activeSessionId: string | null;
  recentSessions: Session[];
  activePage: AppPage;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => Promise<void> | void;
  onProfileChange: (profileId: string) => void;
  onCreateSession: () => void;
  onOpenSession: (sessionId: string) => void;
  onOpenPage: (page: AppPage) => void;
  onRenameSession: (sessionId: string, title: string) => Promise<void> | void;
  onDeleteSession: (sessionId: string) => Promise<void> | void;
}) {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId) ?? null,
    [activeProfileId, profiles]
  );
  const activeProfileBadge = activeProfile?.name?.slice(0, 2).toUpperCase() ?? activeProfile?.id?.slice(0, 2).toUpperCase() ?? 'HM';

  async function handleRename(title: string) {
    if (!selectedSession) {
      return;
    }

    setActionLoading(true);
    setActionError(null);

    try {
      await onRenameSession(selectedSession.id, title);
      setRenameOpen(false);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to rename the session.');
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
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to delete the session.');
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <>
      <Flex
        direction="column"
        width={{ base: '100%', lg: collapsed ? '76px' : '304px' }}
        minWidth={{ base: '100%', lg: collapsed ? '76px' : '304px' }}
        maxWidth={{ base: '100%', lg: collapsed ? '76px' : '304px' }}
        flexShrink={0}
        height={{ base: '34dvh', lg: 'auto' }}
        minHeight={{ base: '260px', lg: '0' }}
        maxHeight={{ base: '34dvh', lg: 'none' }}
        rounded={{ base: '0', lg: '8px' }}
        border={{ base: 'none', lg: '1px solid var(--border-subtle)' }}
        bg="var(--sidebar-bg)"
        boxShadow={{ base: 'none', lg: 'var(--shadow-sm)' }}
        backdropFilter="blur(18px)"
        minH={0}
        overflow="hidden"
        overflowX="hidden"
        transition="width 180ms ease, min-width 180ms ease, max-width 180ms ease"
      >
        <VStack align="stretch" gap="4" px={collapsed ? '3' : '4'} py="4" minW={0}>
          {collapsed ? (
            <VStack align="center" gap="2.5">
              <Button
                variant="ghost"
                rounded="8px"
                minW="0"
                w="9"
                h="9"
                px="0"
                py="0"
                color="var(--text-muted)"
                _hover={{ bg: 'var(--surface-hover)', color: 'var(--text-primary)' }}
                title="Expand sidebar"
                aria-label="Expand sidebar"
                onClick={() => void onCollapsedChange(false)}
              >
                <SidebarIcon name="expand" />
              </Button>

              <Button
                variant="ghost"
                rounded="8px"
                minW="0"
                px="0"
                py="0"
                w="11"
                h="11"
                title={activeProfile ? `${activeProfile.name} (${activeProfile.id})` : 'Active profile'}
                aria-label={activeProfile ? `${activeProfile.name} (${activeProfile.id})` : 'Active profile'}
                onClick={() => void onCollapsedChange(false)}
              >
                <Flex
                  align="center"
                  justify="center"
                  w="9"
                  h="9"
                  rounded="8px"
                  bg="var(--surface-selected)"
                  color="var(--text-primary)"
                  fontWeight="750"
                  fontSize="10px"
                >
                  {activeProfileBadge}
                </Flex>
              </Button>

              <Button
                size="sm"
                rounded="8px"
                minW="0"
                w="11"
                h="11"
                px="0"
                py="0"
                bg="var(--accent)"
                color="var(--accent-contrast)"
                boxShadow="var(--shadow-xs)"
                _hover={{ bg: 'var(--accent-strong)' }}
                onClick={onCreateSession}
                title="New session"
                aria-label="New session"
              >
                <SidebarIcon name="new-session" />
              </Button>
            </VStack>
          ) : (
            <>
              <BrandLockup />

              <HStack justify="space-between" align="center" gap="2">
                <Box flex="1" minW={0}>
                  <ProfileSelector profiles={profiles} activeProfileId={activeProfileId} onChange={onProfileChange} />
                </Box>

                <Button
                  variant="ghost"
                  rounded="8px"
                  minW="0"
                  w="8"
                  h="8"
                  px="0"
                  py="0"
                  color="var(--text-muted)"
                  _hover={{ bg: 'var(--surface-hover)', color: 'var(--text-primary)' }}
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                  onClick={() => void onCollapsedChange(true)}
                >
                  <SidebarIcon name="collapse" />
                </Button>
              </HStack>

              <Button
                size="sm"
                rounded="8px"
                bg="var(--accent)"
                color="var(--accent-contrast)"
                minH="10"
                fontWeight="750"
                boxShadow="var(--shadow-xs)"
                _hover={{ bg: 'var(--accent-strong)' }}
                onClick={onCreateSession}
                title="New session"
                aria-label="New session"
              >
                <HStack justify="start" w="100%" gap="2">
                  <SidebarIcon name="new-session" />
                  <Text>New session</Text>
                </HStack>
              </Button>
            </>
          )}
          {actionError ? <ErrorBanner title="Recent session update failed" detail={actionError} /> : null}
        </VStack>

        <Separator borderColor="var(--border-subtle)" />

        <ScrollArea.Root flex="1" minH={0} variant="hover" overflow="hidden" maxW="100%">
          <ScrollArea.Viewport data-testid="sidebar-scroll" style={{ overflowX: 'hidden', maxWidth: '100%' }}>
            <VStack align="stretch" gap="5" px={collapsed ? '3' : '4'} py="4" minW={0} w="100%" maxW="100%">
              {!collapsed ? (
                <Box minW={0}>
                  <Text
                    px="2"
                    pb="2"
                    fontSize="xs"
                    fontWeight="700"
                    color="var(--text-muted)"
                    letterSpacing="0"
                    textTransform="uppercase"
                  >
                    Recent sessions
                  </Text>
                  <VStack align="stretch" gap="1.5">
                    {recentSessions.length === 0 ? (
                      <Text px="2" fontSize="sm" color="var(--text-secondary)">
                        No sessions yet.
                      </Text>
                    ) : (
                      recentSessions.map((session) => (
                        <SessionRow
                          key={session.id}
                          session={session}
                          active={session.id === activeSessionId && activePage === 'chat'}
                          onClick={() => onOpenSession(session.id)}
                          onRename={() => {
                            setSelectedSession(session);
                            setActionError(null);
                            setRenameOpen(true);
                          }}
                          onDelete={() => {
                            setSelectedSession(session);
                            setActionError(null);
                            setDeleteOpen(true);
                          }}
                        />
                      ))
                    )}
                  </VStack>
                </Box>
              ) : null}

              <Box minW={0}>
                {!collapsed ? (
                  <Text
                    px="2"
                    pb="1.5"
                    fontSize="xs"
                    fontWeight="500"
                    color="var(--text-muted)"
                    letterSpacing="0"
                    textTransform="uppercase"
                  >
                    Workspace
                  </Text>
                ) : null}
                <VStack align="stretch" gap="1.5">
                  {navItems.map((item) => (
                    <NavButton
                      key={item.page}
                      label={item.label}
                      icon={item.icon}
                      collapsed={collapsed}
                      active={activePage === item.page}
                      onClick={() => onOpenPage(item.page)}
                    />
                  ))}
                </VStack>
              </Box>
            </VStack>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar />
        </ScrollArea.Root>
      </Flex>

      {selectedSession ? (
        <>
          <SessionRenameDialog
            open={renameOpen}
            loading={actionLoading}
            sessionTitle={selectedSession.title}
            onOpenChange={(open) => {
              setRenameOpen(open);
              if (!open && !deleteOpen) {
                setSelectedSession(null);
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
              if (!open && !renameOpen) {
                setSelectedSession(null);
                setActionError(null);
              }
            }}
            onConfirm={handleDelete}
          />
        </>
      ) : null}
    </>
  );
}

function NavButton({
  label,
  icon,
  collapsed,
  active,
  onClick
}: {
  label: string;
  icon: SidebarIconName;
  collapsed: boolean;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      justifyContent={collapsed ? 'center' : 'start'}
      variant="ghost"
      width="100%"
      minW={0}
      rounded="8px"
      px={collapsed ? '0' : '3'}
      py="2.5"
      height="auto"
      bg={active ? 'var(--surface-selected)' : 'transparent'}
      color={active ? 'var(--text-primary)' : 'var(--text-secondary)'}
      fontWeight={active ? '700' : '600'}
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      title={collapsed ? label : undefined}
      aria-label={label}
      _hover={{
        bg: active ? 'var(--surface-selected)' : 'var(--surface-hover)',
        color: 'var(--text-primary)'
      }}
      onClick={onClick}
    >
      <HStack justify={collapsed ? 'center' : 'start'} gap="3" w="100%">
        <SidebarIcon name={icon} />
        {!collapsed ? <Text>{label}</Text> : null}
      </HStack>
    </Button>
  );
}

function SidebarIcon({ name }: { name: SidebarIconName }) {
  const Svg = chakra('svg');

  const content = (() => {
    switch (name) {
      case 'new-session':
        return (
          <>
            <path d="M4 5.5h7.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4.5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 7.5v5M5.5 10h5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </>
        );
      case 'sessions':
        return (
          <>
            <path d="M3 4.5h10a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H3.5A1.5 1.5 0 0 1 2 14V6a1.5 1.5 0 0 1 1-1.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4.5 8h7M4.5 11h5.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </>
        );
      case 'recipes':
        return (
          <>
            <path d="M3 4h4.5v4.5H3zM8.5 4H13v4.5H8.5zM3 9.5h4.5V14H3zM8.5 9.5H13V14H8.5z" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
          </>
        );
      case 'jobs':
        return (
          <>
            <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5.5v3l2 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </>
        );
      case 'tools':
        return (
          <>
            <path d="M6 3.5 4.5 5l2 2L5 8.5l-2-2L1.5 8 4 10.5l2-2 1.5 1.5-2 2L7 13.5l2-2 2.5 2.5L14 11.5 9.5 7 8 8.5 6 6.5 7.5 5 6 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </>
        );
      case 'skills':
        return (
          <>
            <path d="M8 2.5 9.6 6l3.9.4-2.9 2.5.9 3.8L8 10.8 4.5 12.7l.9-3.8L2.5 6.4 6.4 6Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </>
        );
      case 'settings':
        return (
          <>
            <circle cx="8" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 2.5v1.7M8 11.8v1.7M13.5 8h-1.7M4.2 8H2.5M11.9 4.1 10.7 5.3M5.3 10.7 4.1 11.9M11.9 11.9 10.7 10.7M5.3 5.3 4.1 4.1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        );
      case 'collapse':
        return <path d="M10.5 3.5 5.5 8l5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />;
      case 'expand':
      default:
        return <path d="M5.5 3.5 10.5 8l-5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />;
    }
  })();

  return (
    <Svg viewBox="0 0 16 16" boxSize="3.5" color="currentColor" aria-hidden="true" flexShrink={0}>
      {content}
    </Svg>
  );
}

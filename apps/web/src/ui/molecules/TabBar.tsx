import { useCallback, useRef, useState } from 'react';
import type { DragEvent, ReactNode } from 'react';
import { Button, Flex, HStack, Text } from '@chakra-ui/react';

export interface TabItem {
  sessionId: string;
  title: string;
}

export function TabBar({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onReorderTabs,
  rightContent
}: {
  tabs: TabItem[];
  activeTabId: string | null;
  onSelectTab: (sessionId: string) => void;
  onCloseTab: (sessionId: string) => void;
  onNewTab: () => void;
  onReorderTabs?: (tabs: TabItem[]) => void;
  rightContent?: ReactNode;
}) {
  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = useCallback((index: number) => {
    dragIndexRef.current = index;
  }, []);

  const handleDragOver = useCallback((e: DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDrop = useCallback(
    (dropIndex: number) => {
      const fromIndex = dragIndexRef.current;
      if (fromIndex === null || fromIndex === dropIndex || !onReorderTabs) {
        dragIndexRef.current = null;
        setDragOverIndex(null);
        return;
      }

      const reordered = [...tabs];
      const [moved] = reordered.splice(fromIndex, 1);
      if (moved) {
        reordered.splice(dropIndex, 0, moved);
        onReorderTabs(reordered);
      }
      dragIndexRef.current = null;
      setDragOverIndex(null);
    },
    [tabs, onReorderTabs]
  );

  const handleDragEnd = useCallback(() => {
    dragIndexRef.current = null;
    setDragOverIndex(null);
  }, []);

  return (
    <Flex
      direction="column"
      flexShrink={0}
      data-testid="session-tab-bar"
    >
      <Flex
        align="center"
        gap="2"
        bg="transparent"
        borderBottom="1px solid var(--border-subtle)"
        px="4"
        py="2"
        minH="44px"
      >
        <HStack gap="2" flex="1" minW={0} overflow="auto" css={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
          {tabs.map((tab, index) => {
            const isActive = tab.sessionId === activeTabId;
            const isDragOver = dragOverIndex === index;
            return (
              <HStack
                key={tab.sessionId}
                gap="0"
                align="center"
                px="3"
                py="1.5"
                cursor="pointer"
                bg={isActive ? 'var(--surface-selected)' : 'transparent'}
                rounded="8px"
                border="1px solid"
                borderColor={isActive ? 'rgba(14, 116, 103, 0.22)' : 'transparent'}
                borderBottom={isActive ? '1px solid rgba(14, 116, 103, 0.22)' : '1px solid transparent'}
                borderLeft={isDragOver ? '2px solid var(--accent)' : '2px solid transparent'}
                boxShadow={isActive ? 'var(--shadow-xs)' : 'none'}
                _hover={{ bg: isActive ? 'var(--surface-selected)' : 'var(--surface-hover)' }}
                transition="all 140ms ease"
                onClick={() => onSelectTab(tab.sessionId)}
                maxW="200px"
                minW="0"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={handleDragEnd}
                data-testid={`session-tab-${tab.sessionId}`}
              >
                <Text
                  fontSize="xs"
                  fontWeight={isActive ? '700' : '500'}
                  color={isActive ? 'var(--text-primary)' : 'var(--text-muted)'}
                  lineClamp={1}
                  flex="1"
                  minW={0}
                  userSelect="none"
                >
                  {tab.title || 'New chat'}
                </Text>
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  minW={0}
                  px="1"
                  py="0"
                  ml="1"
                  rounded="8px"
                  fontSize="xs"
                  color="var(--text-muted)"
                  _hover={{ color: 'var(--text-primary)', bg: 'var(--surface-accent)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.sessionId);
                  }}
                  aria-label={`Close ${tab.title}`}
                >
                  ×
                </Button>
              </HStack>
            );
          })}
          <Button
            type="button"
            variant="ghost"
            size="xs"
            minW={0}
            px="2"
            py="1"
            rounded="8px"
            fontSize="sm"
            color="var(--text-muted)"
            _hover={{ color: 'var(--text-primary)', bg: 'var(--surface-accent)' }}
            onClick={onNewTab}
            aria-label="New tab"
          >
            +
          </Button>
        </HStack>
        {rightContent ? (
          <HStack gap="2" flexShrink={0} pl="3">
            {rightContent}
          </HStack>
        ) : null}
      </Flex>
    </Flex>
  );
}

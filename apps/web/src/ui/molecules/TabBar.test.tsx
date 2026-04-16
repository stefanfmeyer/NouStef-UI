// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TabBar } from './TabBar';

afterEach(() => {
  cleanup();
});

function renderTabBar(overrides: Partial<Parameters<typeof TabBar>[0]> = {}) {
  const props = {
    tabs: overrides.tabs ?? [
      { sessionId: 'session-1', title: 'Chat about hotels' },
      { sessionId: 'session-2', title: 'Vendor comparison' }
    ],
    activeTabId: overrides.activeTabId ?? 'session-1',
    onSelectTab: overrides.onSelectTab ?? vi.fn(),
    onCloseTab: overrides.onCloseTab ?? vi.fn(),
    onNewTab: overrides.onNewTab ?? vi.fn(),
    rightContent: overrides.rightContent
  };

  render(
    <ChakraProvider value={defaultSystem}>
      <TabBar {...props} />
    </ChakraProvider>
  );

  return props;
}

describe('TabBar', () => {
  it('renders all tabs with the active one highlighted', () => {
    renderTabBar();

    expect(screen.getByTestId('session-tab-bar')).toBeInTheDocument();
    expect(screen.getByTestId('session-tab-session-1')).toBeInTheDocument();
    expect(screen.getByTestId('session-tab-session-2')).toBeInTheDocument();
    expect(screen.getByText('Chat about hotels')).toBeInTheDocument();
    expect(screen.getByText('Vendor comparison')).toBeInTheDocument();
  });

  it('calls onSelectTab when clicking a tab', async () => {
    const onSelectTab = vi.fn();
    renderTabBar({ onSelectTab });

    await userEvent.click(screen.getByText('Vendor comparison'));
    expect(onSelectTab).toHaveBeenCalledWith('session-2');
  });

  it('calls onCloseTab when clicking the close button', async () => {
    const onCloseTab = vi.fn();
    renderTabBar({ onCloseTab });

    const tab = screen.getByTestId('session-tab-session-1');
    await userEvent.click(within(tab).getByRole('button', { name: 'Close Chat about hotels' }));
    expect(onCloseTab).toHaveBeenCalledWith('session-1');
  });

  it('calls onNewTab when clicking the + button', async () => {
    const onNewTab = vi.fn();
    renderTabBar({ onNewTab });

    await userEvent.click(screen.getByRole('button', { name: 'New tab' }));
    expect(onNewTab).toHaveBeenCalledTimes(1);
  });

  it('renders right content when provided', () => {
    renderTabBar({ rightContent: <span data-testid="right-content">Connected</span> });

    expect(screen.getByTestId('right-content')).toBeInTheDocument();
  });

  it('shows "New chat" for tabs with empty titles', () => {
    renderTabBar({
      tabs: [{ sessionId: 'session-empty', title: '' }],
      activeTabId: 'session-empty'
    });

    expect(screen.getByText('New chat')).toBeInTheDocument();
  });
});

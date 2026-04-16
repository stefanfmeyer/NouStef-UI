import { useTheme } from 'next-themes';

export const hermesThemeStorageKey = 'hermes-workspaces-theme';

interface HermesThemeApi {
  themeMode: 'dark' | 'light';
  setThemeMode(nextTheme: 'dark' | 'light'): void;
}

export function useHermesTheme(): HermesThemeApi {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const activeTheme: 'dark' | 'light' | undefined =
    theme === 'light' || theme === 'dark' ? theme : resolvedTheme === 'light' || resolvedTheme === 'dark' ? resolvedTheme : undefined;
  const themeMode: 'dark' | 'light' = activeTheme === 'light' ? 'light' : 'dark';

  return {
    themeMode,
    setThemeMode(nextTheme: 'dark' | 'light') {
      setTheme(nextTheme);
    }
  };
}

export function useHermesColorModeValue<T>(lightValue: T, darkValue: T) {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === 'light' ? lightValue : darkValue;
}

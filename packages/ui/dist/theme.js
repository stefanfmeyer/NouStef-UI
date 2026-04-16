import { useTheme } from 'next-themes';
export const hermesThemeStorageKey = 'hermes-workspaces-theme';
export function useHermesTheme() {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const activeTheme = theme === 'light' || theme === 'dark' ? theme : resolvedTheme === 'light' || resolvedTheme === 'dark' ? resolvedTheme : undefined;
    const themeMode = activeTheme === 'light' ? 'light' : 'dark';
    return {
        themeMode,
        setThemeMode(nextTheme) {
            setTheme(nextTheme);
        }
    };
}
export function useHermesColorModeValue(lightValue, darkValue) {
    const { resolvedTheme } = useTheme();
    return resolvedTheme === 'light' ? lightValue : darkValue;
}

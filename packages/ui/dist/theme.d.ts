export declare const hermesThemeStorageKey = "hermes-workspaces-theme";
interface HermesThemeApi {
    themeMode: 'dark' | 'light';
    setThemeMode(nextTheme: 'dark' | 'light'): void;
}
export declare function useHermesTheme(): HermesThemeApi;
export declare function useHermesColorModeValue<T>(lightValue: T, darkValue: T): T;
export {};

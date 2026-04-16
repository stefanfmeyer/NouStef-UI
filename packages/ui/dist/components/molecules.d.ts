import type { PropsWithChildren, ReactNode } from 'react';
export declare function PageHeading({ eyebrow, title, detail, className }: {
    eyebrow?: string;
    title: string;
    detail?: string;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function FieldGroup({ label, helperText, children }: PropsWithChildren<{
    label: string;
    helperText?: string;
}>): import("react/jsx-runtime").JSX.Element;
export declare function EmptyState({ title, detail, className }: {
    title: string;
    detail: string;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function NavigationButton({ active, label, detail, leading, trailing, onClick }: {
    active?: boolean;
    label: string;
    detail?: string;
    leading?: string;
    trailing?: ReactNode;
    onClick: () => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function StatTile({ label, value, accent }: {
    label: string;
    value: string;
    accent?: 'blue' | 'slate';
}): import("react/jsx-runtime").JSX.Element;
export declare function InlineMeta({ items }: {
    items: Array<{
        label: string;
        tone?: 'neutral' | 'success' | 'warning' | 'info';
    }>;
}): import("react/jsx-runtime").JSX.Element;

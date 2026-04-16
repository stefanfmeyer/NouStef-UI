import type { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren } from 'react';
export declare function Panel({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>>): import("react/jsx-runtime").JSX.Element;
export declare function SectionTitle({ eyebrow, title, detail }: {
    eyebrow?: string;
    title: string;
    detail?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function StatusPill({ tone, children, className }: PropsWithChildren<{
    tone?: 'neutral' | 'success' | 'warning' | 'info';
    className?: string;
}>): import("react/jsx-runtime").JSX.Element;
export declare function ActionButton({ className, tone, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: 'primary' | 'secondary' | 'danger';
}): import("react/jsx-runtime").JSX.Element;
export declare function MetricCard({ label, value, accent }: {
    label: string;
    value: string;
    accent?: 'teal' | 'slate';
}): import("react/jsx-runtime").JSX.Element;

import type { HTMLAttributes, ReactNode } from 'react';
export declare function BrowserHeader({ address, title, detail, items, activeTab, tabs, onSelectTab }: {
    address: string;
    title: string;
    detail?: string;
    items: Array<{
        label: string;
        tone?: 'neutral' | 'success' | 'warning' | 'info';
    }>;
    activeTab: string;
    tabs: Array<{
        id: string;
        label: string;
    }>;
    onSelectTab: (tabId: string) => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function SidebarBlock({ eyebrow, title, detail, children, actions }: {
    eyebrow: string;
    title: string;
    detail?: string;
    children: ReactNode;
    actions?: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function PageSection({ className, bodyClassName, eyebrow, title, detail, actions, children, ...props }: {
    className?: string;
    bodyClassName?: string;
    eyebrow?: string;
    title: string;
    detail?: string;
    actions?: ReactNode;
    children: ReactNode;
} & HTMLAttributes<HTMLElement>): import("react/jsx-runtime").JSX.Element;

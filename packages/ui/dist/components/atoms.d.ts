import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, PropsWithChildren, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
type SurfaceElement = 'article' | 'aside' | 'div' | 'header' | 'nav' | 'section';
export declare function Surface({ children, className, element, style, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement> & {
    element?: SurfaceElement;
}>): import("react/jsx-runtime").JSX.Element;
export declare function Button({ className, tone, size, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md';
}): import("react/jsx-runtime").JSX.Element;
export declare function IconButton({ className, tone, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: 'primary' | 'secondary' | 'ghost';
}): import("react/jsx-runtime").JSX.Element;
export declare function Badge({ tone, children, className }: PropsWithChildren<{
    tone?: 'neutral' | 'success' | 'warning' | 'info';
    className?: string;
}>): import("react/jsx-runtime").JSX.Element;
export declare const TextInput: import("react").ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & import("react").RefAttributes<HTMLInputElement>>;
export declare const SelectInput: import("react").ForwardRefExoticComponent<SelectHTMLAttributes<HTMLSelectElement> & import("react").RefAttributes<HTMLSelectElement>>;
export declare const TextArea: import("react").ForwardRefExoticComponent<TextareaHTMLAttributes<HTMLTextAreaElement> & import("react").RefAttributes<HTMLTextAreaElement>>;
export declare function Toggle({ checked, className, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>): import("react/jsx-runtime").JSX.Element;
export declare function WindowControls(): import("react/jsx-runtime").JSX.Element;
export {};

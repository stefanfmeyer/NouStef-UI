import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { cx } from './cx';
export function Surface({ children, className, element = 'section', style, ...props }) {
    const Component = element;
    return (_jsx(Component, { className: cx('rounded-[22px] border border-white/8 bg-[rgba(20,24,31,0.92)] shadow-[0_20px_50px_-38px_rgba(0,0,0,0.85)]', className), style: {
            contain: 'layout paint style',
            ...style
        }, ...props, children: children }));
}
export function Button({ className, tone = 'secondary', size = 'md', ...props }) {
    const toneClasses = tone === 'primary'
        ? 'border border-blue-400/20 bg-blue-500 text-white hover:bg-blue-400'
        : tone === 'danger'
            ? 'border border-rose-400/20 bg-rose-500/12 text-rose-50 hover:bg-rose-500/18'
            : tone === 'ghost'
                ? 'border border-transparent bg-transparent text-slate-300 hover:bg-white/[0.06]'
                : 'border border-white/10 bg-white/[0.04] text-slate-100 hover:bg-white/[0.08]';
    const sizeClasses = size === 'sm' ? 'rounded-xl px-3 py-1.5 text-xs' : 'rounded-2xl px-4 py-2 text-sm';
    return (_jsx("button", { className: cx('inline-flex items-center justify-center gap-2 font-medium transition duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-50', toneClasses, sizeClasses, className), type: "button", ...props }));
}
export function IconButton({ className, tone = 'secondary', ...props }) {
    return (_jsx(Button, { className: cx('h-10 w-10 rounded-xl p-0', className), size: "sm", tone: tone, ...props }));
}
export function Badge({ tone = 'neutral', children, className }) {
    const toneClasses = tone === 'success'
        ? 'border-emerald-400/15 bg-emerald-500/12 text-emerald-100'
        : tone === 'warning'
            ? 'border-amber-400/15 bg-amber-500/12 text-amber-100'
            : tone === 'info'
                ? 'border-blue-400/15 bg-blue-500/12 text-blue-100'
                : 'border-white/10 bg-white/[0.04] text-slate-300';
    return (_jsx("span", { className: cx('inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em]', toneClasses, className), children: children }));
}
const fieldClass = 'w-full rounded-2xl border border-white/10 bg-[#10141b] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400/40 focus:bg-[#121924]';
export const TextInput = forwardRef(function TextInput(props, ref) {
    return _jsx("input", { ref: ref, className: cx(fieldClass, props.className), ...props });
});
export const SelectInput = forwardRef(function SelectInput(props, ref) {
    return _jsx("select", { ref: ref, className: cx(fieldClass, props.className), ...props });
});
export const TextArea = forwardRef(function TextArea(props, ref) {
    return _jsx("textarea", { ref: ref, className: cx(fieldClass, props.className), ...props });
});
export function Toggle({ checked, className, ...props }) {
    return (_jsx("input", { checked: checked, className: cx('h-5 w-5 rounded border border-white/10 bg-[#10141b] accent-blue-500', className), type: "checkbox", ...props }));
}
export function WindowControls() {
    const controlColors = ['bg-rose-400', 'bg-amber-300', 'bg-emerald-400'];
    return (_jsx("div", { "aria-hidden": "true", className: "flex items-center gap-2", children: controlColors.map((color) => (_jsx("span", { className: cx('h-3 w-3 rounded-full', color) }, color))) }));
}

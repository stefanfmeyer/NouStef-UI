import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Surface } from './atoms';
import { cx } from './cx';
export function PageHeading({ eyebrow, title, detail, className }) {
    return (_jsxs("header", { className: cx('space-y-1.5', className), children: [eyebrow ? (_jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500", children: eyebrow })) : null, _jsxs("div", { children: [_jsx("h2", { className: "font-['Aptos_Display','IBM_Plex_Sans','Segoe_UI_Variable','Segoe_UI',sans-serif] text-xl font-semibold text-slate-50", children: title }), detail ? _jsx("p", { className: "mt-1 text-sm leading-6 text-slate-400", children: detail }) : null] })] }));
}
export function FieldGroup({ label, helperText, children }) {
    return (_jsxs("label", { className: "space-y-2.5", children: [_jsxs("div", { children: [_jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500", children: label }), helperText ? _jsx("p", { className: "mt-1 text-xs leading-5 text-slate-500", children: helperText }) : null] }), children] }));
}
export function EmptyState({ title, detail, className }) {
    return (_jsxs("div", { className: cx('rounded-[22px] border border-dashed border-white/10 bg-white/[0.02] px-5 py-6 text-left', className), children: [_jsx("p", { className: "text-sm font-medium text-slate-100", children: title }), _jsx("p", { className: "mt-2 text-sm leading-6 text-slate-400", children: detail })] }));
}
export function NavigationButton({ active, label, detail, leading, trailing, onClick }) {
    return (_jsxs("button", { className: cx('flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition', active
            ? 'border-blue-400/20 bg-blue-500/10 text-slate-50'
            : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]'), type: "button", onClick: onClick, children: [_jsxs("span", { className: "flex min-w-0 items-center gap-3", children: [leading ? (_jsx("span", { "aria-hidden": "true", className: cx('flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-semibold uppercase', active
                            ? 'border-blue-400/20 bg-blue-500/12 text-blue-100'
                            : 'border-white/10 bg-white/[0.04] text-slate-400'), children: leading })) : null, _jsxs("span", { className: "min-w-0", children: [_jsx("span", { className: "block truncate text-sm font-medium", children: label }), detail ? (_jsx("span", { className: cx('mt-1 block truncate text-xs', active ? 'text-blue-100/75' : 'text-slate-500'), children: detail })) : null] })] }), trailing] }));
}
export function StatTile({ label, value, accent = 'slate' }) {
    return (_jsxs(Surface, { className: cx('p-4', accent === 'blue'
            ? 'border-blue-400/18 bg-[linear-gradient(180deg,rgba(37,99,235,0.16),rgba(17,22,31,0.94))]'
            : 'bg-[rgba(23,28,36,0.92)]'), children: [_jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500", children: label }), _jsx("p", { className: "mt-3 text-2xl font-semibold text-slate-50", children: value })] }));
}
export function InlineMeta({ items }) {
    return (_jsx("div", { className: "flex flex-wrap gap-2", children: items.map((item) => (_jsx(Badge, { tone: item.tone, children: item.label }, `${item.label}-${item.tone ?? 'neutral'}`))) }));
}

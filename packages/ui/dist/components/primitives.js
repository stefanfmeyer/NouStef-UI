import { jsx as _jsx } from "react/jsx-runtime";
import { Badge, Button, Surface } from './atoms';
import { PageHeading, StatTile } from './molecules';
export function Panel({ children, className, ...props }) {
    return (_jsx(Surface, { className: className, ...props, children: children }));
}
export function SectionTitle({ eyebrow, title, detail }) {
    return _jsx(PageHeading, { detail: detail, eyebrow: eyebrow, title: title });
}
export function StatusPill({ tone = 'neutral', children, className }) {
    return (_jsx(Badge, { className: className, tone: tone, children: children }));
}
export function ActionButton({ className, tone = 'secondary', ...props }) {
    return _jsx(Button, { className: className, tone: tone, ...props });
}
export function MetricCard({ label, value, accent = 'teal' }) {
    return _jsx(StatTile, { accent: accent === 'teal' ? 'blue' : 'slate', label: label, value: value });
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx';
export function BrowserPageShell({ header, sidebar, main, rail, dock }) {
    return (_jsx("div", { className: "min-h-screen px-3 py-3 md:px-4", children: _jsxs("div", { className: "mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1880px] flex-col gap-3", children: [header, _jsxs("div", { className: "grid min-h-0 flex-1 gap-3 xl:grid-cols-[300px_minmax(0,1fr)_380px] xl:grid-rows-[minmax(0,1fr)_260px]", children: [_jsx("div", { className: "min-h-0 xl:row-span-2", children: sidebar }), _jsx("div", { className: "min-h-0", children: main }), _jsx("div", { className: "min-h-0", children: rail }), _jsx("div", { className: cx('min-h-0 xl:col-span-2'), children: dock })] })] }) }));
}

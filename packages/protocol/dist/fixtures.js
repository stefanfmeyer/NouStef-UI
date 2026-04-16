"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleCreateWorkspaceCommand = exports.sampleFilterEvent = exports.sampleChatTranscript = exports.sampleCarWorkspaceState = exports.sampleCarWorkspaceDefinition = void 0;
const schemas_1 = require("./schemas");
const now = '2026-04-05T13:00:00.000Z';
exports.sampleCarWorkspaceDefinition = {
    id: 'car-market',
    title: 'Car Market Radar',
    description: 'Compare practical, low-mileage vehicles with a predictable monthly cost.',
    icon: 'car',
    layout: 'split',
    version: 1,
    persistedStateSchema: [
        { key: 'make', label: 'Make', type: 'string', defaultValue: 'Toyota' },
        { key: 'maxPrice', label: 'Max Price', type: 'number', defaultValue: 32000 },
        { key: 'fuel', label: 'Fuel', type: 'string', defaultValue: 'hybrid' },
        { key: 'selectedIds', label: 'Selected Vehicles', type: 'string[]', defaultValue: [] }
    ],
    actions: [
        {
            id: 'save_search',
            label: 'Save Search',
            tone: 'secondary',
            event: 'button_clicked',
            description: 'Persist the current filter set for later.'
        },
        {
            id: 'delete_workspace',
            label: 'Delete Workspace',
            tone: 'danger',
            event: 'button_clicked',
            description: 'Remove this workspace from the sidebar.',
            confirmation: {
                title: 'Delete car workspace',
                description: 'This removes the workspace and its persisted local state.',
                confirmLabel: 'Delete'
            }
        },
        {
            id: 'buying_checklist',
            label: 'Buying Checklist',
            tone: 'primary',
            event: 'button_clicked',
            description: 'Ask Hermes for a tailored buying checklist.'
        }
    ],
    components: [
        {
            id: 'intro',
            type: 'text',
            title: 'Workspace Summary',
            props: {
                markdown: '### Car Market Radar\nFocus on practical listings, compare total cost quickly, and keep the selection logic inspectable.',
                tone: 'info'
            }
        },
        {
            id: 'toolbar',
            type: 'toolbar',
            title: 'Workspace Actions',
            props: {
                actionIds: ['save_search', 'buying_checklist', 'delete_workspace']
            }
        },
        {
            id: 'filters',
            type: 'form',
            title: 'Search Filters',
            props: {
                submitLabel: 'Apply Filters',
                eventType: 'filter_changed',
                fields: [
                    {
                        id: 'make',
                        kind: 'select',
                        label: 'Make',
                        defaultValue: 'Toyota',
                        options: [
                            { label: 'Toyota', value: 'Toyota' },
                            { label: 'Honda', value: 'Honda' },
                            { label: 'Subaru', value: 'Subaru' },
                            { label: 'Tesla', value: 'Tesla' }
                        ]
                    },
                    {
                        id: 'maxPrice',
                        kind: 'number',
                        label: 'Max Price',
                        defaultValue: 32000,
                        min: 15000,
                        max: 60000,
                        step: 500
                    },
                    {
                        id: 'fuel',
                        kind: 'select',
                        label: 'Fuel',
                        defaultValue: 'hybrid',
                        options: [
                            { label: 'Hybrid', value: 'hybrid' },
                            { label: 'Gas', value: 'gas' },
                            { label: 'Electric', value: 'electric' }
                        ]
                    }
                ]
            }
        },
        {
            id: 'stats',
            type: 'stat',
            title: 'Snapshot',
            props: {
                items: [
                    { id: 'results', label: 'Matching listings', metric: 'result_count', format: 'number' },
                    { id: 'selected', label: 'Tracked picks', metric: 'selection_count', format: 'number' },
                    { id: 'avg', label: 'Average price', metric: 'average_price', format: 'currency' },
                    { id: 'low', label: 'Lowest price', metric: 'lowest_price', format: 'currency' }
                ]
            }
        },
        {
            id: 'results',
            type: 'cards',
            title: 'Listings',
            props: {
                emptyMessage: 'No cars match the current filter set.',
                titleKey: 'headline',
                subtitleKeys: ['city', 'dealer'],
                metricFields: [
                    { label: 'Price', key: 'price', format: 'currency' },
                    { label: 'Mileage', key: 'mileage', format: 'number' },
                    { label: 'MPG', key: 'mpg', format: 'number' }
                ],
                selectable: true
            }
        },
        {
            id: 'detail',
            type: 'detail',
            title: 'Selected Vehicle',
            props: {
                emptyMessage: 'Select a result card to inspect the full spec sheet.',
                fields: [
                    { label: 'Trim', key: 'trim', format: 'text' },
                    { label: 'Year', key: 'year', format: 'number' },
                    { label: 'Battery / Fuel', key: 'powertrain', format: 'text' },
                    { label: 'Price', key: 'price', format: 'currency' },
                    { label: 'Notes', key: 'notes', format: 'text' }
                ]
            }
        },
        {
            id: 'comparison',
            type: 'table',
            title: 'Top Picks',
            props: {
                emptyMessage: 'Apply filters to see comparable listings.',
                maxRows: 3,
                columns: [
                    { label: 'Vehicle', key: 'headline', format: 'text' },
                    { label: 'Price', key: 'price', format: 'currency' },
                    { label: 'Mileage', key: 'mileage', format: 'number' },
                    { label: 'Fuel', key: 'fuel', format: 'text' }
                ]
            }
        }
    ]
};
exports.sampleCarWorkspaceState = (0, schemas_1.buildDefaultWorkspaceState)(exports.sampleCarWorkspaceDefinition, {
    at: now,
    source: 'local',
    reason: 'bootstrap'
});
exports.sampleChatTranscript = [
    {
        id: 'msg-1',
        role: 'assistant',
        content: 'I pinned a car-shopping workspace with safe filters, inspectable state, and a buying checklist action.',
        blocks: [
            {
                id: 'block-1',
                type: 'markdown',
                markdown: 'I pinned a **car-shopping workspace** with safe filters, inspectable state, and a buying checklist action.'
            }
        ],
        attachments: [],
        timestamp: now
    },
    {
        id: 'msg-2',
        role: 'system',
        content: 'Transport mode is running through the local Hermes desktop bridge.',
        blocks: [
            {
                id: 'block-2',
                type: 'markdown',
                markdown: 'Transport mode is running through the local Hermes desktop bridge.'
            }
        ],
        attachments: [],
        timestamp: now
    }
];
exports.sampleFilterEvent = {
    type: 'filter_changed',
    payload: {
        workspaceId: 'car-market',
        filters: {
            make: 'Toyota',
            maxPrice: 32000,
            fuel: 'hybrid'
        }
    }
};
exports.sampleCreateWorkspaceCommand = {
    type: 'create_workspace',
    auditLabel: 'sample:create-workspace',
    issuedAt: now,
    payload: exports.sampleCarWorkspaceDefinition
};

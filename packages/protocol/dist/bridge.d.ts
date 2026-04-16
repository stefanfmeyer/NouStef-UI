import { z } from 'zod';
import { UICommandSchema } from './schemas';
export declare const AppShellTabSchema: z.ZodEnum<["chat", "workspace", "jobs", "settings", "profiles"]>;
export type AppShellTab = z.infer<typeof AppShellTabSchema>;
export declare const HermesContextActiveTabSchema: z.ZodEnum<["chat", "workspace", "jobs", "settings", "profiles"]>;
export type HermesContextActiveTab = z.infer<typeof HermesContextActiveTabSchema>;
export declare const BridgeProviderSchema: z.ZodEnum<["hermes", "openclaw"]>;
export type BridgeProvider = z.infer<typeof BridgeProviderSchema>;
export declare const ThemeModeSchema: z.ZodEnum<["dark", "light"]>;
export type ThemeMode = z.infer<typeof ThemeModeSchema>;
export declare const ProfileSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    provider: z.ZodDefault<z.ZodEnum<["hermes", "openclaw"]>>;
}, "strict", z.ZodTypeAny, {
    id: string;
    description: string;
    name: string;
    provider: "hermes" | "openclaw";
}, {
    id: string;
    description: string;
    name: string;
    provider?: "hermes" | "openclaw" | undefined;
}>;
export type Profile = z.infer<typeof ProfileSchema>;
export declare const SessionSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    summary: z.ZodString;
    provider: z.ZodDefault<z.ZodEnum<["hermes", "openclaw"]>>;
    runtimeSessionId: z.ZodOptional<z.ZodString>;
    lastUpdatedAt: z.ZodOptional<z.ZodString>;
    messageCount: z.ZodOptional<z.ZodNumber>;
    lastUsedProfileId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    id: string;
    title: string;
    provider: "hermes" | "openclaw";
    summary: string;
    lastUpdatedAt?: string | undefined;
    runtimeSessionId?: string | undefined;
    messageCount?: number | undefined;
    lastUsedProfileId?: string | undefined;
}, {
    id: string;
    title: string;
    summary: string;
    lastUpdatedAt?: string | undefined;
    provider?: "hermes" | "openclaw" | undefined;
    runtimeSessionId?: string | undefined;
    messageCount?: number | undefined;
    lastUsedProfileId?: string | undefined;
}>;
export type Session = z.infer<typeof SessionSchema>;
export declare const JobRecordSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    schedule: z.ZodString;
    status: z.ZodEnum<["healthy", "paused", "attention"]>;
    description: z.ZodString;
    lastRun: z.ZodString;
    nextRun: z.ZodString;
}, "strict", z.ZodTypeAny, {
    status: "healthy" | "paused" | "attention";
    id: string;
    label: string;
    description: string;
    schedule: string;
    lastRun: string;
    nextRun: string;
}, {
    status: "healthy" | "paused" | "attention";
    id: string;
    label: string;
    description: string;
    schedule: string;
    lastRun: string;
    nextRun: string;
}>;
export type JobRecord = z.infer<typeof JobRecordSchema>;
export declare const ReminderRecordSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    dueAt: z.ZodString;
    status: z.ZodEnum<["scheduled", "due", "completed"]>;
    description: z.ZodString;
}, "strict", z.ZodTypeAny, {
    status: "scheduled" | "due" | "completed";
    id: string;
    label: string;
    description: string;
    dueAt: string;
}, {
    status: "scheduled" | "due" | "completed";
    id: string;
    label: string;
    description: string;
    dueAt: string;
}>;
export type ReminderRecord = z.infer<typeof ReminderRecordSchema>;
export declare const ToolSettingsSchema: z.ZodObject<{
    transportMode: z.ZodLiteral<"bridge">;
    allowFilesystemRead: z.ZodBoolean;
    allowShellExecution: z.ZodBoolean;
    allowDesktopNotifications: z.ZodBoolean;
    confirmDestructiveActions: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    transportMode: "bridge";
    allowFilesystemRead: boolean;
    allowShellExecution: boolean;
    allowDesktopNotifications: boolean;
    confirmDestructiveActions: boolean;
}, {
    transportMode: "bridge";
    allowFilesystemRead: boolean;
    allowShellExecution: boolean;
    allowDesktopNotifications: boolean;
    confirmDestructiveActions: boolean;
}>;
export type ToolSettings = z.infer<typeof ToolSettingsSchema>;
export declare const AuditEntrySchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodString;
    source: z.ZodEnum<["system", "chat", "command", "event"]>;
    label: z.ZodString;
    details: z.ZodString;
    profileId: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    id: string;
    label: string;
    timestamp: string;
    source: "system" | "event" | "chat" | "command";
    details: string;
    profileId?: string | undefined;
    sessionId?: string | undefined;
}, {
    id: string;
    label: string;
    timestamp: string;
    source: "system" | "event" | "chat" | "command";
    details: string;
    profileId?: string | undefined;
    sessionId?: string | undefined;
}>;
export type AuditEntry = z.infer<typeof AuditEntrySchema>;
export declare const ArtifactRecordSchema: z.ZodObject<{
    id: z.ZodString;
    kind: z.ZodEnum<["saved_search", "checklist", "session_note"]>;
    title: z.ZodString;
    summary: z.ZodString;
    createdAt: z.ZodString;
    workspaceId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    id: string;
    kind: "saved_search" | "checklist" | "session_note";
    title: string;
    summary: string;
    createdAt: string;
    workspaceId?: string | undefined;
}, {
    id: string;
    kind: "saved_search" | "checklist" | "session_note";
    title: string;
    summary: string;
    createdAt: string;
    workspaceId?: string | undefined;
}>;
export type ArtifactRecord = z.infer<typeof ArtifactRecordSchema>;
export declare const SessionSummarySchema: z.ZodObject<{
    profileId: z.ZodString;
    profileName: z.ZodString;
    sessionId: z.ZodString;
    sessionTitle: z.ZodString;
    activeTab: z.ZodEnum<["chat", "workspace", "jobs", "settings", "profiles"]>;
    focusedWorkspaceId: z.ZodNullable<z.ZodString>;
    messageCount: z.ZodNumber;
    workspaceCount: z.ZodNumber;
    jobCount: z.ZodNumber;
    reminderCount: z.ZodNumber;
    artifactCount: z.ZodNumber;
    lastInteractionAt: z.ZodString;
}, "strict", z.ZodTypeAny, {
    messageCount: number;
    profileId: string;
    sessionId: string;
    profileName: string;
    sessionTitle: string;
    activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
    focusedWorkspaceId: string | null;
    workspaceCount: number;
    jobCount: number;
    reminderCount: number;
    artifactCount: number;
    lastInteractionAt: string;
}, {
    messageCount: number;
    profileId: string;
    sessionId: string;
    profileName: string;
    sessionTitle: string;
    activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
    focusedWorkspaceId: string | null;
    workspaceCount: number;
    jobCount: number;
    reminderCount: number;
    artifactCount: number;
    lastInteractionAt: string;
}>;
export type SessionSummary = z.infer<typeof SessionSummarySchema>;
export declare const PendingConfirmationSchema: z.ZodObject<{
    command: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        auditLabel: z.ZodString;
        issuedAt: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"create_workspace">;
        payload: z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            description: z.ZodDefault<z.ZodString>;
            icon: z.ZodDefault<z.ZodString>;
            layout: z.ZodDefault<z.ZodEnum<["single", "split", "board"]>>;
            components: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"text">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    markdown: z.ZodString;
                    tone: z.ZodDefault<z.ZodEnum<["default", "muted", "info"]>>;
                }, "strict", z.ZodTypeAny, {
                    markdown: string;
                    tone: "default" | "muted" | "info";
                }, {
                    markdown: string;
                    tone?: "default" | "muted" | "info" | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone: "default" | "muted" | "info";
                };
                title?: string | undefined;
            }, {
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone?: "default" | "muted" | "info" | undefined;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"form">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    submitLabel: z.ZodDefault<z.ZodString>;
                    eventType: z.ZodDefault<z.ZodEnum<["filter_changed", "form_submitted"]>>;
                    fields: z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                        id: z.ZodString;
                        label: z.ZodString;
                        helperText: z.ZodOptional<z.ZodString>;
                    } & {
                        kind: z.ZodLiteral<"text">;
                        placeholder: z.ZodOptional<z.ZodString>;
                        defaultValue: z.ZodDefault<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    }, {
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        label: z.ZodString;
                        helperText: z.ZodOptional<z.ZodString>;
                    } & {
                        kind: z.ZodLiteral<"number">;
                        placeholder: z.ZodOptional<z.ZodString>;
                        min: z.ZodOptional<z.ZodNumber>;
                        max: z.ZodOptional<z.ZodNumber>;
                        step: z.ZodOptional<z.ZodNumber>;
                        defaultValue: z.ZodOptional<z.ZodNumber>;
                    }, "strict", z.ZodTypeAny, {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    }, {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        label: z.ZodString;
                        helperText: z.ZodOptional<z.ZodString>;
                    } & {
                        kind: z.ZodLiteral<"select">;
                        options: z.ZodArray<z.ZodObject<{
                            label: z.ZodString;
                            value: z.ZodString;
                        }, "strict", z.ZodTypeAny, {
                            value: string;
                            label: string;
                        }, {
                            value: string;
                            label: string;
                        }>, "many">;
                        defaultValue: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    }, {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        label: z.ZodString;
                        helperText: z.ZodOptional<z.ZodString>;
                    } & {
                        kind: z.ZodLiteral<"toggle">;
                        defaultValue: z.ZodDefault<z.ZodBoolean>;
                    }, "strict", z.ZodTypeAny, {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    }, {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    }>]>, "many">;
                }, "strict", z.ZodTypeAny, {
                    submitLabel: string;
                    eventType: "filter_changed" | "form_submitted";
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    })[];
                }, {
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    })[];
                    submitLabel?: string | undefined;
                    eventType?: "filter_changed" | "form_submitted" | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "form";
                id: string;
                props: {
                    submitLabel: string;
                    eventType: "filter_changed" | "form_submitted";
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    })[];
                };
                title?: string | undefined;
            }, {
                type: "form";
                id: string;
                props: {
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    })[];
                    submitLabel?: string | undefined;
                    eventType?: "filter_changed" | "form_submitted" | undefined;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"cards">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    emptyMessage: z.ZodString;
                    titleKey: z.ZodString;
                    subtitleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    metricFields: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        label: z.ZodString;
                        key: z.ZodString;
                        format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                    }, "strict", z.ZodTypeAny, {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }, {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }>, "many">>;
                    selectable: z.ZodDefault<z.ZodBoolean>;
                }, "strict", z.ZodTypeAny, {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys: string[];
                    metricFields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    selectable: boolean;
                }, {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys?: string[] | undefined;
                    metricFields?: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[] | undefined;
                    selectable?: boolean | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys: string[];
                    metricFields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    selectable: boolean;
                };
                title?: string | undefined;
            }, {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys?: string[] | undefined;
                    metricFields?: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[] | undefined;
                    selectable?: boolean | undefined;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"detail">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    emptyMessage: z.ZodString;
                    fields: z.ZodArray<z.ZodObject<{
                        label: z.ZodString;
                        key: z.ZodString;
                        format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                    }, "strict", z.ZodTypeAny, {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }, {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }>, "many">;
                }, "strict", z.ZodTypeAny, {
                    fields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    emptyMessage: string;
                }, {
                    fields: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    emptyMessage: string;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            }, {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"table">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    emptyMessage: z.ZodString;
                    maxRows: z.ZodDefault<z.ZodNumber>;
                    columns: z.ZodArray<z.ZodObject<{
                        label: z.ZodString;
                        key: z.ZodString;
                        format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                    }, "strict", z.ZodTypeAny, {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }, {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }>, "many">;
                }, "strict", z.ZodTypeAny, {
                    emptyMessage: string;
                    maxRows: number;
                    columns: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                }, {
                    emptyMessage: string;
                    columns: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    maxRows?: number | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    maxRows: number;
                    columns: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                };
                title?: string | undefined;
            }, {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    columns: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    maxRows?: number | undefined;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"toolbar">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    actionIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }, "strict", z.ZodTypeAny, {
                    actionIds: string[];
                }, {
                    actionIds?: string[] | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "toolbar";
                id: string;
                props: {
                    actionIds: string[];
                };
                title?: string | undefined;
            }, {
                type: "toolbar";
                id: string;
                props: {
                    actionIds?: string[] | undefined;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"stat">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    items: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        label: z.ZodString;
                        metric: z.ZodEnum<["result_count", "selection_count", "average_price", "lowest_price"]>;
                        format: z.ZodDefault<z.ZodEnum<["number", "currency"]>>;
                    }, "strict", z.ZodTypeAny, {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }, {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }>, "many">;
                }, "strict", z.ZodTypeAny, {
                    items: {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }[];
                }, {
                    items: {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }[];
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }[];
                };
                title?: string | undefined;
            }, {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }[];
                };
                title?: string | undefined;
            }>]>, "many">;
            actions: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                label: z.ZodString;
                tone: z.ZodDefault<z.ZodEnum<["primary", "secondary", "danger"]>>;
                event: z.ZodLiteral<"button_clicked">;
                description: z.ZodOptional<z.ZodString>;
                confirmation: z.ZodOptional<z.ZodObject<{
                    title: z.ZodString;
                    description: z.ZodString;
                    confirmLabel: z.ZodDefault<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    title: string;
                    description: string;
                    confirmLabel: string;
                }, {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                id: string;
                label: string;
                tone: "primary" | "secondary" | "danger";
                event: "button_clicked";
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            }, {
                id: string;
                label: string;
                event: "button_clicked";
                tone?: "primary" | "secondary" | "danger" | undefined;
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            }>, "many">>;
            persistedStateSchema: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                key: z.ZodString;
                label: z.ZodString;
                type: z.ZodLiteral<"string">;
                defaultValue: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                type: "string";
                label: string;
                defaultValue: string;
                key: string;
            }, {
                type: "string";
                label: string;
                key: string;
                defaultValue?: string | undefined;
            }>, z.ZodObject<{
                key: z.ZodString;
                label: z.ZodString;
                type: z.ZodLiteral<"number">;
                defaultValue: z.ZodDefault<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                type: "number";
                label: string;
                defaultValue: number;
                key: string;
            }, {
                type: "number";
                label: string;
                key: string;
                defaultValue?: number | undefined;
            }>, z.ZodObject<{
                key: z.ZodString;
                label: z.ZodString;
                type: z.ZodLiteral<"boolean">;
                defaultValue: z.ZodDefault<z.ZodBoolean>;
            }, "strict", z.ZodTypeAny, {
                type: "boolean";
                label: string;
                defaultValue: boolean;
                key: string;
            }, {
                type: "boolean";
                label: string;
                key: string;
                defaultValue?: boolean | undefined;
            }>, z.ZodObject<{
                key: z.ZodString;
                label: z.ZodString;
                type: z.ZodLiteral<"string[]">;
                defaultValue: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strict", z.ZodTypeAny, {
                type: "string[]";
                label: string;
                defaultValue: string[];
                key: string;
            }, {
                type: "string[]";
                label: string;
                key: string;
                defaultValue?: string[] | undefined;
            }>, z.ZodObject<{
                key: z.ZodString;
                label: z.ZodString;
                type: z.ZodLiteral<"number[]">;
                defaultValue: z.ZodDefault<z.ZodArray<z.ZodNumber, "many">>;
            }, "strict", z.ZodTypeAny, {
                type: "number[]";
                label: string;
                defaultValue: number[];
                key: string;
            }, {
                type: "number[]";
                label: string;
                key: string;
                defaultValue?: number[] | undefined;
            }>]>, "many">>;
            version: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            title: string;
            description: string;
            icon: string;
            layout: "single" | "split" | "board";
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone: "default" | "muted" | "info";
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    submitLabel: string;
                    eventType: "filter_changed" | "form_submitted";
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    })[];
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys: string[];
                    metricFields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    selectable: boolean;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    maxRows: number;
                    columns: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds: string[];
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }[];
                };
                title?: string | undefined;
            })[];
            actions: {
                id: string;
                label: string;
                tone: "primary" | "secondary" | "danger";
                event: "button_clicked";
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            }[];
            persistedStateSchema: ({
                type: "string";
                label: string;
                defaultValue: string;
                key: string;
            } | {
                type: "number";
                label: string;
                defaultValue: number;
                key: string;
            } | {
                type: "boolean";
                label: string;
                defaultValue: boolean;
                key: string;
            } | {
                type: "string[]";
                label: string;
                defaultValue: string[];
                key: string;
            } | {
                type: "number[]";
                label: string;
                defaultValue: number[];
                key: string;
            })[];
            version: number;
        }, {
            id: string;
            title: string;
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone?: "default" | "muted" | "info" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    })[];
                    submitLabel?: string | undefined;
                    eventType?: "filter_changed" | "form_submitted" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys?: string[] | undefined;
                    metricFields?: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[] | undefined;
                    selectable?: boolean | undefined;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    columns: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    maxRows?: number | undefined;
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds?: string[] | undefined;
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }[];
                };
                title?: string | undefined;
            })[];
            version: number;
            description?: string | undefined;
            icon?: string | undefined;
            layout?: "single" | "split" | "board" | undefined;
            actions?: {
                id: string;
                label: string;
                event: "button_clicked";
                tone?: "primary" | "secondary" | "danger" | undefined;
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            }[] | undefined;
            persistedStateSchema?: ({
                type: "string";
                label: string;
                key: string;
                defaultValue?: string | undefined;
            } | {
                type: "number";
                label: string;
                key: string;
                defaultValue?: number | undefined;
            } | {
                type: "boolean";
                label: string;
                key: string;
                defaultValue?: boolean | undefined;
            } | {
                type: "string[]";
                label: string;
                key: string;
                defaultValue?: string[] | undefined;
            } | {
                type: "number[]";
                label: string;
                key: string;
                defaultValue?: number[] | undefined;
            })[] | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "create_workspace";
        payload: {
            id: string;
            title: string;
            description: string;
            icon: string;
            layout: "single" | "split" | "board";
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone: "default" | "muted" | "info";
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    submitLabel: string;
                    eventType: "filter_changed" | "form_submitted";
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    })[];
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys: string[];
                    metricFields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    selectable: boolean;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    maxRows: number;
                    columns: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds: string[];
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }[];
                };
                title?: string | undefined;
            })[];
            actions: {
                id: string;
                label: string;
                tone: "primary" | "secondary" | "danger";
                event: "button_clicked";
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            }[];
            persistedStateSchema: ({
                type: "string";
                label: string;
                defaultValue: string;
                key: string;
            } | {
                type: "number";
                label: string;
                defaultValue: number;
                key: string;
            } | {
                type: "boolean";
                label: string;
                defaultValue: boolean;
                key: string;
            } | {
                type: "string[]";
                label: string;
                defaultValue: string[];
                key: string;
            } | {
                type: "number[]";
                label: string;
                defaultValue: number[];
                key: string;
            })[];
            version: number;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }, {
        type: "create_workspace";
        payload: {
            id: string;
            title: string;
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone?: "default" | "muted" | "info" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    })[];
                    submitLabel?: string | undefined;
                    eventType?: "filter_changed" | "form_submitted" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys?: string[] | undefined;
                    metricFields?: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[] | undefined;
                    selectable?: boolean | undefined;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    columns: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    maxRows?: number | undefined;
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds?: string[] | undefined;
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }[];
                };
                title?: string | undefined;
            })[];
            version: number;
            description?: string | undefined;
            icon?: string | undefined;
            layout?: "single" | "split" | "board" | undefined;
            actions?: {
                id: string;
                label: string;
                event: "button_clicked";
                tone?: "primary" | "secondary" | "danger" | undefined;
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            }[] | undefined;
            persistedStateSchema?: ({
                type: "string";
                label: string;
                key: string;
                defaultValue?: string | undefined;
            } | {
                type: "number";
                label: string;
                key: string;
                defaultValue?: number | undefined;
            } | {
                type: "boolean";
                label: string;
                key: string;
                defaultValue?: boolean | undefined;
            } | {
                type: "string[]";
                label: string;
                key: string;
                defaultValue?: string[] | undefined;
            } | {
                type: "number[]";
                label: string;
                key: string;
                defaultValue?: number[] | undefined;
            })[] | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }>, z.ZodObject<{
        auditLabel: z.ZodString;
        issuedAt: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"update_workspace">;
        payload: z.ZodObject<{
            workspaceId: z.ZodString;
            definitionPatch: z.ZodDefault<z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
                icon: z.ZodOptional<z.ZodString>;
                layout: z.ZodOptional<z.ZodEnum<["single", "split", "board"]>>;
                components: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"text">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        markdown: z.ZodString;
                        tone: z.ZodDefault<z.ZodEnum<["default", "muted", "info"]>>;
                    }, "strict", z.ZodTypeAny, {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    }, {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    };
                    title?: string | undefined;
                }, {
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"form">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        submitLabel: z.ZodDefault<z.ZodString>;
                        eventType: z.ZodDefault<z.ZodEnum<["filter_changed", "form_submitted"]>>;
                        fields: z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                            id: z.ZodString;
                            label: z.ZodString;
                            helperText: z.ZodOptional<z.ZodString>;
                        } & {
                            kind: z.ZodLiteral<"text">;
                            placeholder: z.ZodOptional<z.ZodString>;
                            defaultValue: z.ZodDefault<z.ZodString>;
                        }, "strict", z.ZodTypeAny, {
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        }, {
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        }>, z.ZodObject<{
                            id: z.ZodString;
                            label: z.ZodString;
                            helperText: z.ZodOptional<z.ZodString>;
                        } & {
                            kind: z.ZodLiteral<"number">;
                            placeholder: z.ZodOptional<z.ZodString>;
                            min: z.ZodOptional<z.ZodNumber>;
                            max: z.ZodOptional<z.ZodNumber>;
                            step: z.ZodOptional<z.ZodNumber>;
                            defaultValue: z.ZodOptional<z.ZodNumber>;
                        }, "strict", z.ZodTypeAny, {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        }, {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        }>, z.ZodObject<{
                            id: z.ZodString;
                            label: z.ZodString;
                            helperText: z.ZodOptional<z.ZodString>;
                        } & {
                            kind: z.ZodLiteral<"select">;
                            options: z.ZodArray<z.ZodObject<{
                                label: z.ZodString;
                                value: z.ZodString;
                            }, "strict", z.ZodTypeAny, {
                                value: string;
                                label: string;
                            }, {
                                value: string;
                                label: string;
                            }>, "many">;
                            defaultValue: z.ZodOptional<z.ZodString>;
                        }, "strict", z.ZodTypeAny, {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        }, {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        }>, z.ZodObject<{
                            id: z.ZodString;
                            label: z.ZodString;
                            helperText: z.ZodOptional<z.ZodString>;
                        } & {
                            kind: z.ZodLiteral<"toggle">;
                            defaultValue: z.ZodDefault<z.ZodBoolean>;
                        }, "strict", z.ZodTypeAny, {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        }, {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        }>]>, "many">;
                    }, "strict", z.ZodTypeAny, {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    }, {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "form";
                    id: string;
                    props: {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    };
                    title?: string | undefined;
                }, {
                    type: "form";
                    id: string;
                    props: {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"cards">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        emptyMessage: z.ZodString;
                        titleKey: z.ZodString;
                        subtitleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                        metricFields: z.ZodDefault<z.ZodArray<z.ZodObject<{
                            label: z.ZodString;
                            key: z.ZodString;
                            format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                        }, "strict", z.ZodTypeAny, {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }, {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }>, "many">>;
                        selectable: z.ZodDefault<z.ZodBoolean>;
                    }, "strict", z.ZodTypeAny, {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    }, {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    };
                    title?: string | undefined;
                }, {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"detail">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        emptyMessage: z.ZodString;
                        fields: z.ZodArray<z.ZodObject<{
                            label: z.ZodString;
                            key: z.ZodString;
                            format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                        }, "strict", z.ZodTypeAny, {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }, {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }>, "many">;
                    }, "strict", z.ZodTypeAny, {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    }, {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                }, {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"table">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        emptyMessage: z.ZodString;
                        maxRows: z.ZodDefault<z.ZodNumber>;
                        columns: z.ZodArray<z.ZodObject<{
                            label: z.ZodString;
                            key: z.ZodString;
                            format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                        }, "strict", z.ZodTypeAny, {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }, {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }>, "many">;
                    }, "strict", z.ZodTypeAny, {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    }, {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    };
                    title?: string | undefined;
                }, {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"toolbar">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        actionIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    }, "strict", z.ZodTypeAny, {
                        actionIds: string[];
                    }, {
                        actionIds?: string[] | undefined;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds: string[];
                    };
                    title?: string | undefined;
                }, {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds?: string[] | undefined;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"stat">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        items: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            label: z.ZodString;
                            metric: z.ZodEnum<["result_count", "selection_count", "average_price", "lowest_price"]>;
                            format: z.ZodDefault<z.ZodEnum<["number", "currency"]>>;
                        }, "strict", z.ZodTypeAny, {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }, {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }>, "many">;
                    }, "strict", z.ZodTypeAny, {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    }, {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    };
                    title?: string | undefined;
                }, {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    };
                    title?: string | undefined;
                }>]>, "many">>;
                actions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    label: z.ZodString;
                    tone: z.ZodDefault<z.ZodEnum<["primary", "secondary", "danger"]>>;
                    event: z.ZodLiteral<"button_clicked">;
                    description: z.ZodOptional<z.ZodString>;
                    confirmation: z.ZodOptional<z.ZodObject<{
                        title: z.ZodString;
                        description: z.ZodString;
                        confirmLabel: z.ZodDefault<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    }, {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    label: string;
                    tone: "primary" | "secondary" | "danger";
                    event: "button_clicked";
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    } | undefined;
                }, {
                    id: string;
                    label: string;
                    event: "button_clicked";
                    tone?: "primary" | "secondary" | "danger" | undefined;
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    } | undefined;
                }>, "many">>;
                version: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                title?: string | undefined;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                components?: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds: string[];
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    };
                    title?: string | undefined;
                })[] | undefined;
                actions?: {
                    id: string;
                    label: string;
                    tone: "primary" | "secondary" | "danger";
                    event: "button_clicked";
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    } | undefined;
                }[] | undefined;
                version?: number | undefined;
            }, {
                title?: string | undefined;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                components?: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds?: string[] | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    };
                    title?: string | undefined;
                })[] | undefined;
                actions?: {
                    id: string;
                    label: string;
                    event: "button_clicked";
                    tone?: "primary" | "secondary" | "danger" | undefined;
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    } | undefined;
                }[] | undefined;
                version?: number | undefined;
            }>>;
            statePatch: z.ZodDefault<z.ZodObject<{
                filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
                selectedItemId: z.ZodOptional<z.ZodString>;
                pagination: z.ZodOptional<z.ZodObject<{
                    page: z.ZodOptional<z.ZodNumber>;
                    pageSize: z.ZodOptional<z.ZodNumber>;
                    total: z.ZodOptional<z.ZodNumber>;
                }, "strict", z.ZodTypeAny, {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                }, {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                }>>;
                formValues: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
                notes: z.ZodOptional<z.ZodString>;
                metadata: z.ZodOptional<z.ZodObject<{
                    lastUpdatedAt: z.ZodOptional<z.ZodString>;
                    source: z.ZodOptional<z.ZodEnum<["local", "hermes"]>>;
                    lastEvent: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    lastUpdatedAt?: string | undefined;
                    source?: "local" | "hermes" | undefined;
                    lastEvent?: string | undefined;
                }, {
                    lastUpdatedAt?: string | undefined;
                    source?: "local" | "hermes" | undefined;
                    lastEvent?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
                metadata?: {
                    lastUpdatedAt?: string | undefined;
                    source?: "local" | "hermes" | undefined;
                    lastEvent?: string | undefined;
                } | undefined;
            }, {
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
                metadata?: {
                    lastUpdatedAt?: string | undefined;
                    source?: "local" | "hermes" | undefined;
                    lastEvent?: string | undefined;
                } | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            workspaceId: string;
            definitionPatch: {
                title?: string | undefined;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                components?: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds: string[];
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    };
                    title?: string | undefined;
                })[] | undefined;
                actions?: {
                    id: string;
                    label: string;
                    tone: "primary" | "secondary" | "danger";
                    event: "button_clicked";
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    } | undefined;
                }[] | undefined;
                version?: number | undefined;
            };
            statePatch: {
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
                metadata?: {
                    lastUpdatedAt?: string | undefined;
                    source?: "local" | "hermes" | undefined;
                    lastEvent?: string | undefined;
                } | undefined;
            };
        }, {
            workspaceId: string;
            definitionPatch?: {
                title?: string | undefined;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                components?: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds?: string[] | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    };
                    title?: string | undefined;
                })[] | undefined;
                actions?: {
                    id: string;
                    label: string;
                    event: "button_clicked";
                    tone?: "primary" | "secondary" | "danger" | undefined;
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    } | undefined;
                }[] | undefined;
                version?: number | undefined;
            } | undefined;
            statePatch?: {
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
                metadata?: {
                    lastUpdatedAt?: string | undefined;
                    source?: "local" | "hermes" | undefined;
                    lastEvent?: string | undefined;
                } | undefined;
            } | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "update_workspace";
        payload: {
            workspaceId: string;
            definitionPatch: {
                title?: string | undefined;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                components?: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds: string[];
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    };
                    title?: string | undefined;
                })[] | undefined;
                actions?: {
                    id: string;
                    label: string;
                    tone: "primary" | "secondary" | "danger";
                    event: "button_clicked";
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    } | undefined;
                }[] | undefined;
                version?: number | undefined;
            };
            statePatch: {
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
                metadata?: {
                    lastUpdatedAt?: string | undefined;
                    source?: "local" | "hermes" | undefined;
                    lastEvent?: string | undefined;
                } | undefined;
            };
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }, {
        type: "update_workspace";
        payload: {
            workspaceId: string;
            definitionPatch?: {
                title?: string | undefined;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                components?: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds?: string[] | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    };
                    title?: string | undefined;
                })[] | undefined;
                actions?: {
                    id: string;
                    label: string;
                    event: "button_clicked";
                    tone?: "primary" | "secondary" | "danger" | undefined;
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    } | undefined;
                }[] | undefined;
                version?: number | undefined;
            } | undefined;
            statePatch?: {
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
                metadata?: {
                    lastUpdatedAt?: string | undefined;
                    source?: "local" | "hermes" | undefined;
                    lastEvent?: string | undefined;
                } | undefined;
            } | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }>, z.ZodObject<{
        auditLabel: z.ZodString;
        issuedAt: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"delete_workspace">;
        payload: z.ZodObject<{
            workspaceId: z.ZodString;
            confirmation: z.ZodOptional<z.ZodObject<{
                title: z.ZodString;
                description: z.ZodString;
                confirmLabel: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                title: string;
                description: string;
                confirmLabel: string;
            }, {
                title: string;
                description: string;
                confirmLabel?: string | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            workspaceId: string;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel: string;
            } | undefined;
        }, {
            workspaceId: string;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel?: string | undefined;
            } | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "delete_workspace";
        payload: {
            workspaceId: string;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel: string;
            } | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }, {
        type: "delete_workspace";
        payload: {
            workspaceId: string;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel?: string | undefined;
            } | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }>, z.ZodObject<{
        auditLabel: z.ZodString;
        issuedAt: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"open_tab">;
        payload: z.ZodObject<{
            tabId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            tabId: string;
        }, {
            tabId: string;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "open_tab";
        payload: {
            tabId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }, {
        type: "open_tab";
        payload: {
            tabId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }>, z.ZodObject<{
        auditLabel: z.ZodString;
        issuedAt: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"focus_workspace">;
        payload: z.ZodObject<{
            workspaceId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            workspaceId: string;
        }, {
            workspaceId: string;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "focus_workspace";
        payload: {
            workspaceId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }, {
        type: "focus_workspace";
        payload: {
            workspaceId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }>, z.ZodObject<{
        auditLabel: z.ZodString;
        issuedAt: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"show_toast">;
        payload: z.ZodObject<{
            tone: z.ZodEnum<["info", "success", "warning", "error"]>;
            message: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            message: string;
            tone: "info" | "success" | "warning" | "error";
        }, {
            message: string;
            tone: "info" | "success" | "warning" | "error";
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "show_toast";
        payload: {
            message: string;
            tone: "info" | "success" | "warning" | "error";
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }, {
        type: "show_toast";
        payload: {
            message: string;
            tone: "info" | "success" | "warning" | "error";
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }>, z.ZodObject<{
        auditLabel: z.ZodString;
        issuedAt: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"set_form_values">;
        payload: z.ZodObject<{
            workspaceId: z.ZodString;
            values: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>;
        }, "strict", z.ZodTypeAny, {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        }, {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "set_form_values";
        payload: {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }, {
        type: "set_form_values";
        payload: {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }>, z.ZodObject<{
        auditLabel: z.ZodString;
        issuedAt: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"set_results">;
        payload: z.ZodObject<{
            workspaceId: z.ZodString;
            results: z.ZodDefault<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        }, "strict", z.ZodTypeAny, {
            workspaceId: string;
            results: Record<string, unknown>[];
        }, {
            workspaceId: string;
            results?: Record<string, unknown>[] | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "set_results";
        payload: {
            workspaceId: string;
            results: Record<string, unknown>[];
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }, {
        type: "set_results";
        payload: {
            workspaceId: string;
            results?: Record<string, unknown>[] | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }>, z.ZodObject<{
        auditLabel: z.ZodString;
        issuedAt: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"request_user_input">;
        payload: z.ZodObject<{
            workspaceId: z.ZodOptional<z.ZodString>;
            prompt: z.ZodString;
            inputKind: z.ZodDefault<z.ZodEnum<["text", "confirm"]>>;
            placeholder: z.ZodOptional<z.ZodString>;
            confirmLabel: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            confirmLabel: string;
            prompt: string;
            inputKind: "text" | "confirm";
            placeholder?: string | undefined;
            workspaceId?: string | undefined;
        }, {
            prompt: string;
            placeholder?: string | undefined;
            confirmLabel?: string | undefined;
            workspaceId?: string | undefined;
            inputKind?: "text" | "confirm" | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "request_user_input";
        payload: {
            confirmLabel: string;
            prompt: string;
            inputKind: "text" | "confirm";
            placeholder?: string | undefined;
            workspaceId?: string | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }, {
        type: "request_user_input";
        payload: {
            prompt: string;
            placeholder?: string | undefined;
            confirmLabel?: string | undefined;
            workspaceId?: string | undefined;
            inputKind?: "text" | "confirm" | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    }>]>;
    request: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        confirmLabel: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        title: string;
        description: string;
        confirmLabel: string;
    }, {
        title: string;
        description: string;
        confirmLabel?: string | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    command: {
        type: "create_workspace";
        payload: {
            id: string;
            title: string;
            description: string;
            icon: string;
            layout: "single" | "split" | "board";
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone: "default" | "muted" | "info";
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    submitLabel: string;
                    eventType: "filter_changed" | "form_submitted";
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    })[];
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys: string[];
                    metricFields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    selectable: boolean;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    maxRows: number;
                    columns: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds: string[];
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }[];
                };
                title?: string | undefined;
            })[];
            actions: {
                id: string;
                label: string;
                tone: "primary" | "secondary" | "danger";
                event: "button_clicked";
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            }[];
            persistedStateSchema: ({
                type: "string";
                label: string;
                defaultValue: string;
                key: string;
            } | {
                type: "number";
                label: string;
                defaultValue: number;
                key: string;
            } | {
                type: "boolean";
                label: string;
                defaultValue: boolean;
                key: string;
            } | {
                type: "string[]";
                label: string;
                defaultValue: string[];
                key: string;
            } | {
                type: "number[]";
                label: string;
                defaultValue: number[];
                key: string;
            })[];
            version: number;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "update_workspace";
        payload: {
            workspaceId: string;
            definitionPatch: {
                title?: string | undefined;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                components?: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds: string[];
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    };
                    title?: string | undefined;
                })[] | undefined;
                actions?: {
                    id: string;
                    label: string;
                    tone: "primary" | "secondary" | "danger";
                    event: "button_clicked";
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    } | undefined;
                }[] | undefined;
                version?: number | undefined;
            };
            statePatch: {
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
                metadata?: {
                    lastUpdatedAt?: string | undefined;
                    source?: "local" | "hermes" | undefined;
                    lastEvent?: string | undefined;
                } | undefined;
            };
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "delete_workspace";
        payload: {
            workspaceId: string;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel: string;
            } | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "open_tab";
        payload: {
            tabId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "focus_workspace";
        payload: {
            workspaceId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "show_toast";
        payload: {
            message: string;
            tone: "info" | "success" | "warning" | "error";
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "set_form_values";
        payload: {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "set_results";
        payload: {
            workspaceId: string;
            results: Record<string, unknown>[];
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "request_user_input";
        payload: {
            confirmLabel: string;
            prompt: string;
            inputKind: "text" | "confirm";
            placeholder?: string | undefined;
            workspaceId?: string | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    };
    request: {
        title: string;
        description: string;
        confirmLabel: string;
    };
}, {
    command: {
        type: "create_workspace";
        payload: {
            id: string;
            title: string;
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone?: "default" | "muted" | "info" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    })[];
                    submitLabel?: string | undefined;
                    eventType?: "filter_changed" | "form_submitted" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys?: string[] | undefined;
                    metricFields?: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[] | undefined;
                    selectable?: boolean | undefined;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    columns: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    maxRows?: number | undefined;
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds?: string[] | undefined;
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }[];
                };
                title?: string | undefined;
            })[];
            version: number;
            description?: string | undefined;
            icon?: string | undefined;
            layout?: "single" | "split" | "board" | undefined;
            actions?: {
                id: string;
                label: string;
                event: "button_clicked";
                tone?: "primary" | "secondary" | "danger" | undefined;
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            }[] | undefined;
            persistedStateSchema?: ({
                type: "string";
                label: string;
                key: string;
                defaultValue?: string | undefined;
            } | {
                type: "number";
                label: string;
                key: string;
                defaultValue?: number | undefined;
            } | {
                type: "boolean";
                label: string;
                key: string;
                defaultValue?: boolean | undefined;
            } | {
                type: "string[]";
                label: string;
                key: string;
                defaultValue?: string[] | undefined;
            } | {
                type: "number[]";
                label: string;
                key: string;
                defaultValue?: number[] | undefined;
            })[] | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "update_workspace";
        payload: {
            workspaceId: string;
            definitionPatch?: {
                title?: string | undefined;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                components?: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds?: string[] | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    };
                    title?: string | undefined;
                })[] | undefined;
                actions?: {
                    id: string;
                    label: string;
                    event: "button_clicked";
                    tone?: "primary" | "secondary" | "danger" | undefined;
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    } | undefined;
                }[] | undefined;
                version?: number | undefined;
            } | undefined;
            statePatch?: {
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
                metadata?: {
                    lastUpdatedAt?: string | undefined;
                    source?: "local" | "hermes" | undefined;
                    lastEvent?: string | undefined;
                } | undefined;
            } | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "delete_workspace";
        payload: {
            workspaceId: string;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel?: string | undefined;
            } | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "open_tab";
        payload: {
            tabId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "focus_workspace";
        payload: {
            workspaceId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "show_toast";
        payload: {
            message: string;
            tone: "info" | "success" | "warning" | "error";
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "set_form_values";
        payload: {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "set_results";
        payload: {
            workspaceId: string;
            results?: Record<string, unknown>[] | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    } | {
        type: "request_user_input";
        payload: {
            prompt: string;
            placeholder?: string | undefined;
            confirmLabel?: string | undefined;
            workspaceId?: string | undefined;
            inputKind?: "text" | "confirm" | undefined;
        };
        auditLabel: string;
        issuedAt?: string | undefined;
    };
    request: {
        title: string;
        description: string;
        confirmLabel?: string | undefined;
    };
}>;
export type PendingConfirmation = z.infer<typeof PendingConfirmationSchema>;
export declare const PendingUserInputSchema: z.ZodObject<{
    workspaceId: z.ZodOptional<z.ZodString>;
    prompt: z.ZodString;
    inputKind: z.ZodEnum<["text", "confirm"]>;
    placeholder: z.ZodOptional<z.ZodString>;
    confirmLabel: z.ZodString;
}, "strict", z.ZodTypeAny, {
    confirmLabel: string;
    prompt: string;
    inputKind: "text" | "confirm";
    placeholder?: string | undefined;
    workspaceId?: string | undefined;
}, {
    confirmLabel: string;
    prompt: string;
    inputKind: "text" | "confirm";
    placeholder?: string | undefined;
    workspaceId?: string | undefined;
}>;
export type PendingUserInput = z.infer<typeof PendingUserInputSchema>;
export declare const JobsCacheStateSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodLiteral<1>>;
    status: z.ZodDefault<z.ZodEnum<["idle", "refreshing", "connected", "disconnected", "error"]>>;
    source: z.ZodDefault<z.ZodEnum<["local_cache", "hermes_cli"]>>;
    lastRequestedAt: z.ZodOptional<z.ZodString>;
    lastSuccessfulAt: z.ZodOptional<z.ZodString>;
    lastError: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
    version: 1;
    source: "local_cache" | "hermes_cli";
    lastRequestedAt?: string | undefined;
    lastSuccessfulAt?: string | undefined;
    lastError?: string | undefined;
}, {
    status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
    version?: 1 | undefined;
    source?: "local_cache" | "hermes_cli" | undefined;
    lastRequestedAt?: string | undefined;
    lastSuccessfulAt?: string | undefined;
    lastError?: string | undefined;
}>;
export type JobsCacheState = z.infer<typeof JobsCacheStateSchema>;
export declare const ProfileRuntimeStateSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodLiteral<1>>;
    jobs: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        schedule: z.ZodString;
        status: z.ZodEnum<["healthy", "paused", "attention"]>;
        description: z.ZodString;
        lastRun: z.ZodString;
        nextRun: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }, {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }>, "many">>;
    jobsCacheState: z.ZodDefault<z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<1>>;
        status: z.ZodDefault<z.ZodEnum<["idle", "refreshing", "connected", "disconnected", "error"]>>;
        source: z.ZodDefault<z.ZodEnum<["local_cache", "hermes_cli"]>>;
        lastRequestedAt: z.ZodOptional<z.ZodString>;
        lastSuccessfulAt: z.ZodOptional<z.ZodString>;
        lastError: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
        version: 1;
        source: "local_cache" | "hermes_cli";
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    }, {
        status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
        version?: 1 | undefined;
        source?: "local_cache" | "hermes_cli" | undefined;
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    }>>;
    reminders: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        dueAt: z.ZodString;
        status: z.ZodEnum<["scheduled", "due", "completed"]>;
        description: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }, {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    version: 1;
    jobs: {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }[];
    jobsCacheState: {
        status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
        version: 1;
        source: "local_cache" | "hermes_cli";
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    };
    reminders: {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }[];
}, {
    version?: 1 | undefined;
    jobs?: {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }[] | undefined;
    jobsCacheState?: {
        status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
        version?: 1 | undefined;
        source?: "local_cache" | "hermes_cli" | undefined;
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    } | undefined;
    reminders?: {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }[] | undefined;
}>;
export type ProfileRuntimeState = z.infer<typeof ProfileRuntimeStateSchema>;
export declare const ProfileRuntimeStateMapSchema: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
    version: z.ZodDefault<z.ZodLiteral<1>>;
    jobs: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        schedule: z.ZodString;
        status: z.ZodEnum<["healthy", "paused", "attention"]>;
        description: z.ZodString;
        lastRun: z.ZodString;
        nextRun: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }, {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }>, "many">>;
    jobsCacheState: z.ZodDefault<z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<1>>;
        status: z.ZodDefault<z.ZodEnum<["idle", "refreshing", "connected", "disconnected", "error"]>>;
        source: z.ZodDefault<z.ZodEnum<["local_cache", "hermes_cli"]>>;
        lastRequestedAt: z.ZodOptional<z.ZodString>;
        lastSuccessfulAt: z.ZodOptional<z.ZodString>;
        lastError: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
        version: 1;
        source: "local_cache" | "hermes_cli";
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    }, {
        status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
        version?: 1 | undefined;
        source?: "local_cache" | "hermes_cli" | undefined;
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    }>>;
    reminders: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        dueAt: z.ZodString;
        status: z.ZodEnum<["scheduled", "due", "completed"]>;
        description: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }, {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    version: 1;
    jobs: {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }[];
    jobsCacheState: {
        status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
        version: 1;
        source: "local_cache" | "hermes_cli";
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    };
    reminders: {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }[];
}, {
    version?: 1 | undefined;
    jobs?: {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }[] | undefined;
    jobsCacheState?: {
        status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
        version?: 1 | undefined;
        source?: "local_cache" | "hermes_cli" | undefined;
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    } | undefined;
    reminders?: {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }[] | undefined;
}>>>;
export type ProfileRuntimeStateMap = z.infer<typeof ProfileRuntimeStateMapSchema>;
export declare const ToolExecutionRequestSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"shell_command">;
    summary: z.ZodString;
    command: z.ZodString;
    args: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    cwd: z.ZodOptional<z.ZodString>;
    requiresConfirmation: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    type: "shell_command";
    id: string;
    summary: string;
    command: string;
    args: string[];
    requiresConfirmation: boolean;
    cwd?: string | undefined;
}, {
    type: "shell_command";
    id: string;
    summary: string;
    command: string;
    args?: string[] | undefined;
    cwd?: string | undefined;
    requiresConfirmation?: boolean | undefined;
}>;
export type ToolExecutionRequest = z.infer<typeof ToolExecutionRequestSchema>;
export declare const ToolExecutionResultSchema: z.ZodObject<{
    requestId: z.ZodString;
    status: z.ZodEnum<["completed", "failed", "rejected"]>;
    summary: z.ZodString;
    stdout: z.ZodString;
    stderr: z.ZodString;
    exitCode: z.ZodNumber;
    completedAt: z.ZodString;
}, "strict", z.ZodTypeAny, {
    status: "completed" | "failed" | "rejected";
    summary: string;
    requestId: string;
    stdout: string;
    stderr: string;
    exitCode: number;
    completedAt: string;
}, {
    status: "completed" | "failed" | "rejected";
    summary: string;
    requestId: string;
    stdout: string;
    stderr: string;
    exitCode: number;
    completedAt: string;
}>;
export type ToolExecutionResult = z.infer<typeof ToolExecutionResultSchema>;
export declare const ToolExecutionHistoryEntrySchema: z.ZodObject<{
    request: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodLiteral<"shell_command">;
        summary: z.ZodString;
        command: z.ZodString;
        args: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        cwd: z.ZodOptional<z.ZodString>;
        requiresConfirmation: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        type: "shell_command";
        id: string;
        summary: string;
        command: string;
        args: string[];
        requiresConfirmation: boolean;
        cwd?: string | undefined;
    }, {
        type: "shell_command";
        id: string;
        summary: string;
        command: string;
        args?: string[] | undefined;
        cwd?: string | undefined;
        requiresConfirmation?: boolean | undefined;
    }>;
    profileId: z.ZodString;
    profileName: z.ZodString;
    sessionId: z.ZodString;
    sessionTitle: z.ZodString;
    requestedAt: z.ZodString;
    status: z.ZodEnum<["pending", "dismissed", "completed", "failed", "rejected"]>;
    resolvedAt: z.ZodOptional<z.ZodString>;
    result: z.ZodOptional<z.ZodObject<{
        requestId: z.ZodString;
        status: z.ZodEnum<["completed", "failed", "rejected"]>;
        summary: z.ZodString;
        stdout: z.ZodString;
        stderr: z.ZodString;
        exitCode: z.ZodNumber;
        completedAt: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        status: "completed" | "failed" | "rejected";
        summary: string;
        requestId: string;
        stdout: string;
        stderr: string;
        exitCode: number;
        completedAt: string;
    }, {
        status: "completed" | "failed" | "rejected";
        summary: string;
        requestId: string;
        stdout: string;
        stderr: string;
        exitCode: number;
        completedAt: string;
    }>>;
}, "strict", z.ZodTypeAny, {
    status: "completed" | "failed" | "rejected" | "pending" | "dismissed";
    profileId: string;
    sessionId: string;
    profileName: string;
    sessionTitle: string;
    request: {
        type: "shell_command";
        id: string;
        summary: string;
        command: string;
        args: string[];
        requiresConfirmation: boolean;
        cwd?: string | undefined;
    };
    requestedAt: string;
    resolvedAt?: string | undefined;
    result?: {
        status: "completed" | "failed" | "rejected";
        summary: string;
        requestId: string;
        stdout: string;
        stderr: string;
        exitCode: number;
        completedAt: string;
    } | undefined;
}, {
    status: "completed" | "failed" | "rejected" | "pending" | "dismissed";
    profileId: string;
    sessionId: string;
    profileName: string;
    sessionTitle: string;
    request: {
        type: "shell_command";
        id: string;
        summary: string;
        command: string;
        args?: string[] | undefined;
        cwd?: string | undefined;
        requiresConfirmation?: boolean | undefined;
    };
    requestedAt: string;
    resolvedAt?: string | undefined;
    result?: {
        status: "completed" | "failed" | "rejected";
        summary: string;
        requestId: string;
        stdout: string;
        stderr: string;
        exitCode: number;
        completedAt: string;
    } | undefined;
}>;
export type ToolExecutionHistoryEntry = z.infer<typeof ToolExecutionHistoryEntrySchema>;
export declare const PendingToolApprovalSchema: z.ZodObject<{
    request: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodLiteral<"shell_command">;
        summary: z.ZodString;
        command: z.ZodString;
        args: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        cwd: z.ZodOptional<z.ZodString>;
        requiresConfirmation: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        type: "shell_command";
        id: string;
        summary: string;
        command: string;
        args: string[];
        requiresConfirmation: boolean;
        cwd?: string | undefined;
    }, {
        type: "shell_command";
        id: string;
        summary: string;
        command: string;
        args?: string[] | undefined;
        cwd?: string | undefined;
        requiresConfirmation?: boolean | undefined;
    }>;
    profileId: z.ZodOptional<z.ZodString>;
    profileName: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodOptional<z.ZodString>;
    sessionTitle: z.ZodOptional<z.ZodString>;
    requestedAt: z.ZodString;
}, "strict", z.ZodTypeAny, {
    request: {
        type: "shell_command";
        id: string;
        summary: string;
        command: string;
        args: string[];
        requiresConfirmation: boolean;
        cwd?: string | undefined;
    };
    requestedAt: string;
    profileId?: string | undefined;
    sessionId?: string | undefined;
    profileName?: string | undefined;
    sessionTitle?: string | undefined;
}, {
    request: {
        type: "shell_command";
        id: string;
        summary: string;
        command: string;
        args?: string[] | undefined;
        cwd?: string | undefined;
        requiresConfirmation?: boolean | undefined;
    };
    requestedAt: string;
    profileId?: string | undefined;
    sessionId?: string | undefined;
    profileName?: string | undefined;
    sessionTitle?: string | undefined;
}>;
export type PendingToolApproval = z.infer<typeof PendingToolApprovalSchema>;
export declare const WorkspaceResultSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export type WorkspaceResult = z.infer<typeof WorkspaceResultSchema>;
export declare const WorkspaceRecordSchema: z.ZodObject<{
    definition: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodDefault<z.ZodString>;
        icon: z.ZodDefault<z.ZodString>;
        layout: z.ZodDefault<z.ZodEnum<["single", "split", "board"]>>;
        components: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"text">;
            title: z.ZodOptional<z.ZodString>;
            props: z.ZodObject<{
                markdown: z.ZodString;
                tone: z.ZodDefault<z.ZodEnum<["default", "muted", "info"]>>;
            }, "strict", z.ZodTypeAny, {
                markdown: string;
                tone: "default" | "muted" | "info";
            }, {
                markdown: string;
                tone?: "default" | "muted" | "info" | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "text";
            id: string;
            props: {
                markdown: string;
                tone: "default" | "muted" | "info";
            };
            title?: string | undefined;
        }, {
            type: "text";
            id: string;
            props: {
                markdown: string;
                tone?: "default" | "muted" | "info" | undefined;
            };
            title?: string | undefined;
        }>, z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"form">;
            title: z.ZodOptional<z.ZodString>;
            props: z.ZodObject<{
                submitLabel: z.ZodDefault<z.ZodString>;
                eventType: z.ZodDefault<z.ZodEnum<["filter_changed", "form_submitted"]>>;
                fields: z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                    id: z.ZodString;
                    label: z.ZodString;
                    helperText: z.ZodOptional<z.ZodString>;
                } & {
                    kind: z.ZodLiteral<"text">;
                    placeholder: z.ZodOptional<z.ZodString>;
                    defaultValue: z.ZodDefault<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    kind: "text";
                    label: string;
                    defaultValue: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                }, {
                    id: string;
                    kind: "text";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    label: z.ZodString;
                    helperText: z.ZodOptional<z.ZodString>;
                } & {
                    kind: z.ZodLiteral<"number">;
                    placeholder: z.ZodOptional<z.ZodString>;
                    min: z.ZodOptional<z.ZodNumber>;
                    max: z.ZodOptional<z.ZodNumber>;
                    step: z.ZodOptional<z.ZodNumber>;
                    defaultValue: z.ZodOptional<z.ZodNumber>;
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    kind: "number";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: number | undefined;
                    min?: number | undefined;
                    max?: number | undefined;
                    step?: number | undefined;
                }, {
                    id: string;
                    kind: "number";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: number | undefined;
                    min?: number | undefined;
                    max?: number | undefined;
                    step?: number | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    label: z.ZodString;
                    helperText: z.ZodOptional<z.ZodString>;
                } & {
                    kind: z.ZodLiteral<"select">;
                    options: z.ZodArray<z.ZodObject<{
                        label: z.ZodString;
                        value: z.ZodString;
                    }, "strict", z.ZodTypeAny, {
                        value: string;
                        label: string;
                    }, {
                        value: string;
                        label: string;
                    }>, "many">;
                    defaultValue: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    options: {
                        value: string;
                        label: string;
                    }[];
                    id: string;
                    kind: "select";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: string | undefined;
                }, {
                    options: {
                        value: string;
                        label: string;
                    }[];
                    id: string;
                    kind: "select";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    label: z.ZodString;
                    helperText: z.ZodOptional<z.ZodString>;
                } & {
                    kind: z.ZodLiteral<"toggle">;
                    defaultValue: z.ZodDefault<z.ZodBoolean>;
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    kind: "toggle";
                    label: string;
                    defaultValue: boolean;
                    helperText?: string | undefined;
                }, {
                    id: string;
                    kind: "toggle";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: boolean | undefined;
                }>]>, "many">;
            }, "strict", z.ZodTypeAny, {
                submitLabel: string;
                eventType: "filter_changed" | "form_submitted";
                fields: ({
                    id: string;
                    kind: "text";
                    label: string;
                    defaultValue: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                } | {
                    id: string;
                    kind: "number";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: number | undefined;
                    min?: number | undefined;
                    max?: number | undefined;
                    step?: number | undefined;
                } | {
                    options: {
                        value: string;
                        label: string;
                    }[];
                    id: string;
                    kind: "select";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "toggle";
                    label: string;
                    defaultValue: boolean;
                    helperText?: string | undefined;
                })[];
            }, {
                fields: ({
                    id: string;
                    kind: "text";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "number";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: number | undefined;
                    min?: number | undefined;
                    max?: number | undefined;
                    step?: number | undefined;
                } | {
                    options: {
                        value: string;
                        label: string;
                    }[];
                    id: string;
                    kind: "select";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "toggle";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: boolean | undefined;
                })[];
                submitLabel?: string | undefined;
                eventType?: "filter_changed" | "form_submitted" | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "form";
            id: string;
            props: {
                submitLabel: string;
                eventType: "filter_changed" | "form_submitted";
                fields: ({
                    id: string;
                    kind: "text";
                    label: string;
                    defaultValue: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                } | {
                    id: string;
                    kind: "number";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: number | undefined;
                    min?: number | undefined;
                    max?: number | undefined;
                    step?: number | undefined;
                } | {
                    options: {
                        value: string;
                        label: string;
                    }[];
                    id: string;
                    kind: "select";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "toggle";
                    label: string;
                    defaultValue: boolean;
                    helperText?: string | undefined;
                })[];
            };
            title?: string | undefined;
        }, {
            type: "form";
            id: string;
            props: {
                fields: ({
                    id: string;
                    kind: "text";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "number";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: number | undefined;
                    min?: number | undefined;
                    max?: number | undefined;
                    step?: number | undefined;
                } | {
                    options: {
                        value: string;
                        label: string;
                    }[];
                    id: string;
                    kind: "select";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "toggle";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: boolean | undefined;
                })[];
                submitLabel?: string | undefined;
                eventType?: "filter_changed" | "form_submitted" | undefined;
            };
            title?: string | undefined;
        }>, z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"cards">;
            title: z.ZodOptional<z.ZodString>;
            props: z.ZodObject<{
                emptyMessage: z.ZodString;
                titleKey: z.ZodString;
                subtitleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                metricFields: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    label: z.ZodString;
                    key: z.ZodString;
                    format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                }, "strict", z.ZodTypeAny, {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }, {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }>, "many">>;
                selectable: z.ZodDefault<z.ZodBoolean>;
            }, "strict", z.ZodTypeAny, {
                emptyMessage: string;
                titleKey: string;
                subtitleKeys: string[];
                metricFields: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
                selectable: boolean;
            }, {
                emptyMessage: string;
                titleKey: string;
                subtitleKeys?: string[] | undefined;
                metricFields?: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[] | undefined;
                selectable?: boolean | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "cards";
            id: string;
            props: {
                emptyMessage: string;
                titleKey: string;
                subtitleKeys: string[];
                metricFields: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
                selectable: boolean;
            };
            title?: string | undefined;
        }, {
            type: "cards";
            id: string;
            props: {
                emptyMessage: string;
                titleKey: string;
                subtitleKeys?: string[] | undefined;
                metricFields?: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[] | undefined;
                selectable?: boolean | undefined;
            };
            title?: string | undefined;
        }>, z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"detail">;
            title: z.ZodOptional<z.ZodString>;
            props: z.ZodObject<{
                emptyMessage: z.ZodString;
                fields: z.ZodArray<z.ZodObject<{
                    label: z.ZodString;
                    key: z.ZodString;
                    format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                }, "strict", z.ZodTypeAny, {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }, {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }>, "many">;
            }, "strict", z.ZodTypeAny, {
                fields: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
                emptyMessage: string;
            }, {
                fields: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[];
                emptyMessage: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "detail";
            id: string;
            props: {
                fields: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
                emptyMessage: string;
            };
            title?: string | undefined;
        }, {
            type: "detail";
            id: string;
            props: {
                fields: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[];
                emptyMessage: string;
            };
            title?: string | undefined;
        }>, z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"table">;
            title: z.ZodOptional<z.ZodString>;
            props: z.ZodObject<{
                emptyMessage: z.ZodString;
                maxRows: z.ZodDefault<z.ZodNumber>;
                columns: z.ZodArray<z.ZodObject<{
                    label: z.ZodString;
                    key: z.ZodString;
                    format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                }, "strict", z.ZodTypeAny, {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }, {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }>, "many">;
            }, "strict", z.ZodTypeAny, {
                emptyMessage: string;
                maxRows: number;
                columns: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
            }, {
                emptyMessage: string;
                columns: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[];
                maxRows?: number | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "table";
            id: string;
            props: {
                emptyMessage: string;
                maxRows: number;
                columns: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
            };
            title?: string | undefined;
        }, {
            type: "table";
            id: string;
            props: {
                emptyMessage: string;
                columns: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[];
                maxRows?: number | undefined;
            };
            title?: string | undefined;
        }>, z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"toolbar">;
            title: z.ZodOptional<z.ZodString>;
            props: z.ZodObject<{
                actionIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strict", z.ZodTypeAny, {
                actionIds: string[];
            }, {
                actionIds?: string[] | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "toolbar";
            id: string;
            props: {
                actionIds: string[];
            };
            title?: string | undefined;
        }, {
            type: "toolbar";
            id: string;
            props: {
                actionIds?: string[] | undefined;
            };
            title?: string | undefined;
        }>, z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"stat">;
            title: z.ZodOptional<z.ZodString>;
            props: z.ZodObject<{
                items: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    label: z.ZodString;
                    metric: z.ZodEnum<["result_count", "selection_count", "average_price", "lowest_price"]>;
                    format: z.ZodDefault<z.ZodEnum<["number", "currency"]>>;
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    label: string;
                    format: "number" | "currency";
                    metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                }, {
                    id: string;
                    label: string;
                    metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    format?: "number" | "currency" | undefined;
                }>, "many">;
            }, "strict", z.ZodTypeAny, {
                items: {
                    id: string;
                    label: string;
                    format: "number" | "currency";
                    metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                }[];
            }, {
                items: {
                    id: string;
                    label: string;
                    metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    format?: "number" | "currency" | undefined;
                }[];
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "stat";
            id: string;
            props: {
                items: {
                    id: string;
                    label: string;
                    format: "number" | "currency";
                    metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                }[];
            };
            title?: string | undefined;
        }, {
            type: "stat";
            id: string;
            props: {
                items: {
                    id: string;
                    label: string;
                    metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    format?: "number" | "currency" | undefined;
                }[];
            };
            title?: string | undefined;
        }>]>, "many">;
        actions: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["primary", "secondary", "danger"]>>;
            event: z.ZodLiteral<"button_clicked">;
            description: z.ZodOptional<z.ZodString>;
            confirmation: z.ZodOptional<z.ZodObject<{
                title: z.ZodString;
                description: z.ZodString;
                confirmLabel: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                title: string;
                description: string;
                confirmLabel: string;
            }, {
                title: string;
                description: string;
                confirmLabel?: string | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            id: string;
            label: string;
            tone: "primary" | "secondary" | "danger";
            event: "button_clicked";
            description?: string | undefined;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel: string;
            } | undefined;
        }, {
            id: string;
            label: string;
            event: "button_clicked";
            tone?: "primary" | "secondary" | "danger" | undefined;
            description?: string | undefined;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel?: string | undefined;
            } | undefined;
        }>, "many">>;
        persistedStateSchema: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            key: z.ZodString;
            label: z.ZodString;
            type: z.ZodLiteral<"string">;
            defaultValue: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            type: "string";
            label: string;
            defaultValue: string;
            key: string;
        }, {
            type: "string";
            label: string;
            key: string;
            defaultValue?: string | undefined;
        }>, z.ZodObject<{
            key: z.ZodString;
            label: z.ZodString;
            type: z.ZodLiteral<"number">;
            defaultValue: z.ZodDefault<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            type: "number";
            label: string;
            defaultValue: number;
            key: string;
        }, {
            type: "number";
            label: string;
            key: string;
            defaultValue?: number | undefined;
        }>, z.ZodObject<{
            key: z.ZodString;
            label: z.ZodString;
            type: z.ZodLiteral<"boolean">;
            defaultValue: z.ZodDefault<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            type: "boolean";
            label: string;
            defaultValue: boolean;
            key: string;
        }, {
            type: "boolean";
            label: string;
            key: string;
            defaultValue?: boolean | undefined;
        }>, z.ZodObject<{
            key: z.ZodString;
            label: z.ZodString;
            type: z.ZodLiteral<"string[]">;
            defaultValue: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strict", z.ZodTypeAny, {
            type: "string[]";
            label: string;
            defaultValue: string[];
            key: string;
        }, {
            type: "string[]";
            label: string;
            key: string;
            defaultValue?: string[] | undefined;
        }>, z.ZodObject<{
            key: z.ZodString;
            label: z.ZodString;
            type: z.ZodLiteral<"number[]">;
            defaultValue: z.ZodDefault<z.ZodArray<z.ZodNumber, "many">>;
        }, "strict", z.ZodTypeAny, {
            type: "number[]";
            label: string;
            defaultValue: number[];
            key: string;
        }, {
            type: "number[]";
            label: string;
            key: string;
            defaultValue?: number[] | undefined;
        }>]>, "many">>;
        version: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: string;
        title: string;
        description: string;
        icon: string;
        layout: "single" | "split" | "board";
        components: ({
            type: "text";
            id: string;
            props: {
                markdown: string;
                tone: "default" | "muted" | "info";
            };
            title?: string | undefined;
        } | {
            type: "form";
            id: string;
            props: {
                submitLabel: string;
                eventType: "filter_changed" | "form_submitted";
                fields: ({
                    id: string;
                    kind: "text";
                    label: string;
                    defaultValue: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                } | {
                    id: string;
                    kind: "number";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: number | undefined;
                    min?: number | undefined;
                    max?: number | undefined;
                    step?: number | undefined;
                } | {
                    options: {
                        value: string;
                        label: string;
                    }[];
                    id: string;
                    kind: "select";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "toggle";
                    label: string;
                    defaultValue: boolean;
                    helperText?: string | undefined;
                })[];
            };
            title?: string | undefined;
        } | {
            type: "cards";
            id: string;
            props: {
                emptyMessage: string;
                titleKey: string;
                subtitleKeys: string[];
                metricFields: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
                selectable: boolean;
            };
            title?: string | undefined;
        } | {
            type: "detail";
            id: string;
            props: {
                fields: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
                emptyMessage: string;
            };
            title?: string | undefined;
        } | {
            type: "table";
            id: string;
            props: {
                emptyMessage: string;
                maxRows: number;
                columns: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
            };
            title?: string | undefined;
        } | {
            type: "toolbar";
            id: string;
            props: {
                actionIds: string[];
            };
            title?: string | undefined;
        } | {
            type: "stat";
            id: string;
            props: {
                items: {
                    id: string;
                    label: string;
                    format: "number" | "currency";
                    metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                }[];
            };
            title?: string | undefined;
        })[];
        actions: {
            id: string;
            label: string;
            tone: "primary" | "secondary" | "danger";
            event: "button_clicked";
            description?: string | undefined;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel: string;
            } | undefined;
        }[];
        persistedStateSchema: ({
            type: "string";
            label: string;
            defaultValue: string;
            key: string;
        } | {
            type: "number";
            label: string;
            defaultValue: number;
            key: string;
        } | {
            type: "boolean";
            label: string;
            defaultValue: boolean;
            key: string;
        } | {
            type: "string[]";
            label: string;
            defaultValue: string[];
            key: string;
        } | {
            type: "number[]";
            label: string;
            defaultValue: number[];
            key: string;
        })[];
        version: number;
    }, {
        id: string;
        title: string;
        components: ({
            type: "text";
            id: string;
            props: {
                markdown: string;
                tone?: "default" | "muted" | "info" | undefined;
            };
            title?: string | undefined;
        } | {
            type: "form";
            id: string;
            props: {
                fields: ({
                    id: string;
                    kind: "text";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "number";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: number | undefined;
                    min?: number | undefined;
                    max?: number | undefined;
                    step?: number | undefined;
                } | {
                    options: {
                        value: string;
                        label: string;
                    }[];
                    id: string;
                    kind: "select";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "toggle";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: boolean | undefined;
                })[];
                submitLabel?: string | undefined;
                eventType?: "filter_changed" | "form_submitted" | undefined;
            };
            title?: string | undefined;
        } | {
            type: "cards";
            id: string;
            props: {
                emptyMessage: string;
                titleKey: string;
                subtitleKeys?: string[] | undefined;
                metricFields?: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[] | undefined;
                selectable?: boolean | undefined;
            };
            title?: string | undefined;
        } | {
            type: "detail";
            id: string;
            props: {
                fields: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[];
                emptyMessage: string;
            };
            title?: string | undefined;
        } | {
            type: "table";
            id: string;
            props: {
                emptyMessage: string;
                columns: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[];
                maxRows?: number | undefined;
            };
            title?: string | undefined;
        } | {
            type: "toolbar";
            id: string;
            props: {
                actionIds?: string[] | undefined;
            };
            title?: string | undefined;
        } | {
            type: "stat";
            id: string;
            props: {
                items: {
                    id: string;
                    label: string;
                    metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    format?: "number" | "currency" | undefined;
                }[];
            };
            title?: string | undefined;
        })[];
        version: number;
        description?: string | undefined;
        icon?: string | undefined;
        layout?: "single" | "split" | "board" | undefined;
        actions?: {
            id: string;
            label: string;
            event: "button_clicked";
            tone?: "primary" | "secondary" | "danger" | undefined;
            description?: string | undefined;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel?: string | undefined;
            } | undefined;
        }[] | undefined;
        persistedStateSchema?: ({
            type: "string";
            label: string;
            key: string;
            defaultValue?: string | undefined;
        } | {
            type: "number";
            label: string;
            key: string;
            defaultValue?: number | undefined;
        } | {
            type: "boolean";
            label: string;
            key: string;
            defaultValue?: boolean | undefined;
        } | {
            type: "string[]";
            label: string;
            key: string;
            defaultValue?: string[] | undefined;
        } | {
            type: "number[]";
            label: string;
            key: string;
            defaultValue?: number[] | undefined;
        })[] | undefined;
    }>;
    state: z.ZodObject<{
        version: z.ZodDefault<z.ZodNumber>;
        filters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
        selectedItemId: z.ZodOptional<z.ZodString>;
        pagination: z.ZodDefault<z.ZodObject<{
            page: z.ZodDefault<z.ZodNumber>;
            pageSize: z.ZodDefault<z.ZodNumber>;
            total: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            page: number;
            pageSize: number;
            total?: number | undefined;
        }, {
            page?: number | undefined;
            pageSize?: number | undefined;
            total?: number | undefined;
        }>>;
        formValues: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
        notes: z.ZodDefault<z.ZodString>;
        metadata: z.ZodObject<{
            lastUpdatedAt: z.ZodString;
            source: z.ZodEnum<["local", "hermes"]>;
            lastEvent: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent: string;
        }, {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent?: string | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        version: number;
        filters: Record<string, string | number | boolean | string[] | number[]>;
        pagination: {
            page: number;
            pageSize: number;
            total?: number | undefined;
        };
        formValues: Record<string, string | number | boolean | string[] | number[]>;
        notes: string;
        metadata: {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent: string;
        };
        selectedItemId?: string | undefined;
    }, {
        metadata: {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent?: string | undefined;
        };
        version?: number | undefined;
        filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
        selectedItemId?: string | undefined;
        pagination?: {
            page?: number | undefined;
            pageSize?: number | undefined;
            total?: number | undefined;
        } | undefined;
        formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
        notes?: string | undefined;
    }>;
    results: z.ZodDefault<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    pinned: z.ZodBoolean;
    archived: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    results: Record<string, unknown>[];
    definition: {
        id: string;
        title: string;
        description: string;
        icon: string;
        layout: "single" | "split" | "board";
        components: ({
            type: "text";
            id: string;
            props: {
                markdown: string;
                tone: "default" | "muted" | "info";
            };
            title?: string | undefined;
        } | {
            type: "form";
            id: string;
            props: {
                submitLabel: string;
                eventType: "filter_changed" | "form_submitted";
                fields: ({
                    id: string;
                    kind: "text";
                    label: string;
                    defaultValue: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                } | {
                    id: string;
                    kind: "number";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: number | undefined;
                    min?: number | undefined;
                    max?: number | undefined;
                    step?: number | undefined;
                } | {
                    options: {
                        value: string;
                        label: string;
                    }[];
                    id: string;
                    kind: "select";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "toggle";
                    label: string;
                    defaultValue: boolean;
                    helperText?: string | undefined;
                })[];
            };
            title?: string | undefined;
        } | {
            type: "cards";
            id: string;
            props: {
                emptyMessage: string;
                titleKey: string;
                subtitleKeys: string[];
                metricFields: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
                selectable: boolean;
            };
            title?: string | undefined;
        } | {
            type: "detail";
            id: string;
            props: {
                fields: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
                emptyMessage: string;
            };
            title?: string | undefined;
        } | {
            type: "table";
            id: string;
            props: {
                emptyMessage: string;
                maxRows: number;
                columns: {
                    label: string;
                    key: string;
                    format: "number" | "text" | "currency";
                }[];
            };
            title?: string | undefined;
        } | {
            type: "toolbar";
            id: string;
            props: {
                actionIds: string[];
            };
            title?: string | undefined;
        } | {
            type: "stat";
            id: string;
            props: {
                items: {
                    id: string;
                    label: string;
                    format: "number" | "currency";
                    metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                }[];
            };
            title?: string | undefined;
        })[];
        actions: {
            id: string;
            label: string;
            tone: "primary" | "secondary" | "danger";
            event: "button_clicked";
            description?: string | undefined;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel: string;
            } | undefined;
        }[];
        persistedStateSchema: ({
            type: "string";
            label: string;
            defaultValue: string;
            key: string;
        } | {
            type: "number";
            label: string;
            defaultValue: number;
            key: string;
        } | {
            type: "boolean";
            label: string;
            defaultValue: boolean;
            key: string;
        } | {
            type: "string[]";
            label: string;
            defaultValue: string[];
            key: string;
        } | {
            type: "number[]";
            label: string;
            defaultValue: number[];
            key: string;
        })[];
        version: number;
    };
    state: {
        version: number;
        filters: Record<string, string | number | boolean | string[] | number[]>;
        pagination: {
            page: number;
            pageSize: number;
            total?: number | undefined;
        };
        formValues: Record<string, string | number | boolean | string[] | number[]>;
        notes: string;
        metadata: {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent: string;
        };
        selectedItemId?: string | undefined;
    };
    pinned: boolean;
    archived: boolean;
}, {
    definition: {
        id: string;
        title: string;
        components: ({
            type: "text";
            id: string;
            props: {
                markdown: string;
                tone?: "default" | "muted" | "info" | undefined;
            };
            title?: string | undefined;
        } | {
            type: "form";
            id: string;
            props: {
                fields: ({
                    id: string;
                    kind: "text";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "number";
                    label: string;
                    helperText?: string | undefined;
                    placeholder?: string | undefined;
                    defaultValue?: number | undefined;
                    min?: number | undefined;
                    max?: number | undefined;
                    step?: number | undefined;
                } | {
                    options: {
                        value: string;
                        label: string;
                    }[];
                    id: string;
                    kind: "select";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: string | undefined;
                } | {
                    id: string;
                    kind: "toggle";
                    label: string;
                    helperText?: string | undefined;
                    defaultValue?: boolean | undefined;
                })[];
                submitLabel?: string | undefined;
                eventType?: "filter_changed" | "form_submitted" | undefined;
            };
            title?: string | undefined;
        } | {
            type: "cards";
            id: string;
            props: {
                emptyMessage: string;
                titleKey: string;
                subtitleKeys?: string[] | undefined;
                metricFields?: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[] | undefined;
                selectable?: boolean | undefined;
            };
            title?: string | undefined;
        } | {
            type: "detail";
            id: string;
            props: {
                fields: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[];
                emptyMessage: string;
            };
            title?: string | undefined;
        } | {
            type: "table";
            id: string;
            props: {
                emptyMessage: string;
                columns: {
                    label: string;
                    key: string;
                    format?: "number" | "text" | "currency" | undefined;
                }[];
                maxRows?: number | undefined;
            };
            title?: string | undefined;
        } | {
            type: "toolbar";
            id: string;
            props: {
                actionIds?: string[] | undefined;
            };
            title?: string | undefined;
        } | {
            type: "stat";
            id: string;
            props: {
                items: {
                    id: string;
                    label: string;
                    metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    format?: "number" | "currency" | undefined;
                }[];
            };
            title?: string | undefined;
        })[];
        version: number;
        description?: string | undefined;
        icon?: string | undefined;
        layout?: "single" | "split" | "board" | undefined;
        actions?: {
            id: string;
            label: string;
            event: "button_clicked";
            tone?: "primary" | "secondary" | "danger" | undefined;
            description?: string | undefined;
            confirmation?: {
                title: string;
                description: string;
                confirmLabel?: string | undefined;
            } | undefined;
        }[] | undefined;
        persistedStateSchema?: ({
            type: "string";
            label: string;
            key: string;
            defaultValue?: string | undefined;
        } | {
            type: "number";
            label: string;
            key: string;
            defaultValue?: number | undefined;
        } | {
            type: "boolean";
            label: string;
            key: string;
            defaultValue?: boolean | undefined;
        } | {
            type: "string[]";
            label: string;
            key: string;
            defaultValue?: string[] | undefined;
        } | {
            type: "number[]";
            label: string;
            key: string;
            defaultValue?: number[] | undefined;
        })[] | undefined;
    };
    state: {
        metadata: {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent?: string | undefined;
        };
        version?: number | undefined;
        filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
        selectedItemId?: string | undefined;
        pagination?: {
            page?: number | undefined;
            pageSize?: number | undefined;
            total?: number | undefined;
        } | undefined;
        formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
        notes?: string | undefined;
    };
    pinned: boolean;
    archived: boolean;
    results?: Record<string, unknown>[] | undefined;
}>;
export type WorkspaceRecord = z.infer<typeof WorkspaceRecordSchema>;
export declare const InspectorModeSchema: z.ZodEnum<["audit", "state", "artifacts"]>;
export type InspectorMode = z.infer<typeof InspectorModeSchema>;
export declare const SessionMessagesSchema: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    role: z.ZodEnum<["user", "assistant", "system", "tool"]>;
    content: z.ZodString;
    blocks: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodLiteral<"markdown">;
        markdown: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        type: "markdown";
        id: string;
        markdown: string;
    }, {
        type: "markdown";
        id: string;
        markdown: string;
    }>, "many">;
    attachments: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        kind: z.ZodEnum<["file", "image", "json", "link"]>;
        label: z.ZodString;
        uri: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        id: string;
        kind: "file" | "image" | "json" | "link";
        label: string;
        uri: string;
    }, {
        id: string;
        kind: "file" | "image" | "json" | "link";
        label: string;
        uri: string;
    }>, "many">>;
    timestamp: z.ZodString;
}, "strict", z.ZodTypeAny, {
    id: string;
    role: "user" | "assistant" | "system" | "tool";
    content: string;
    blocks: {
        type: "markdown";
        id: string;
        markdown: string;
    }[];
    attachments: {
        id: string;
        kind: "file" | "image" | "json" | "link";
        label: string;
        uri: string;
    }[];
    timestamp: string;
}, {
    id: string;
    role: "user" | "assistant" | "system" | "tool";
    content: string;
    blocks: {
        type: "markdown";
        id: string;
        markdown: string;
    }[];
    timestamp: string;
    attachments?: {
        id: string;
        kind: "file" | "image" | "json" | "link";
        label: string;
        uri: string;
    }[] | undefined;
}>, "many">>>;
export type SessionMessages = z.infer<typeof SessionMessagesSchema>;
export declare const ProfilesPageStateSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodLiteral<2>>;
    lastViewedAt: z.ZodOptional<z.ZodString>;
    lastSelectedSessionId: z.ZodOptional<z.ZodString>;
    recentSessionIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    sessionBrowserPage: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    version: 2;
    recentSessionIds: string[];
    sessionBrowserPage: number;
    lastViewedAt?: string | undefined;
    lastSelectedSessionId?: string | undefined;
}, {
    version?: 2 | undefined;
    lastViewedAt?: string | undefined;
    lastSelectedSessionId?: string | undefined;
    recentSessionIds?: string[] | undefined;
    sessionBrowserPage?: number | undefined;
}>;
export type ProfilesPageState = z.infer<typeof ProfilesPageStateSchema>;
export declare const ChatPageStateSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodLiteral<1>>;
    lastVisitedSessionId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    version: 1;
    lastVisitedSessionId?: string | undefined;
}, {
    version?: 1 | undefined;
    lastVisitedSessionId?: string | undefined;
}>;
export type ChatPageState = z.infer<typeof ChatPageStateSchema>;
export declare const JobsPageStateSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodLiteral<1>>;
    lastViewedAt: z.ZodOptional<z.ZodString>;
    lastManualRefreshAt: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    version: 1;
    lastViewedAt?: string | undefined;
    lastManualRefreshAt?: string | undefined;
}, {
    version?: 1 | undefined;
    lastViewedAt?: string | undefined;
    lastManualRefreshAt?: string | undefined;
}>;
export type JobsPageState = z.infer<typeof JobsPageStateSchema>;
export declare const SettingsSectionSchema: z.ZodEnum<["general", "allowlist", "tool_history", "recent_activity"]>;
export type SettingsSection = z.infer<typeof SettingsSectionSchema>;
export declare const SettingsPageStateSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodLiteral<1>>;
    lastViewedAt: z.ZodOptional<z.ZodString>;
    highlightedToolRequestId: z.ZodOptional<z.ZodString>;
    activeSection: z.ZodDefault<z.ZodEnum<["general", "allowlist", "tool_history", "recent_activity"]>>;
    toolHistoryPageByProfile: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    recentActivityPageByProfile: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    version: 1;
    activeSection: "general" | "allowlist" | "tool_history" | "recent_activity";
    toolHistoryPageByProfile: Record<string, number>;
    recentActivityPageByProfile: Record<string, number>;
    lastViewedAt?: string | undefined;
    highlightedToolRequestId?: string | undefined;
}, {
    version?: 1 | undefined;
    lastViewedAt?: string | undefined;
    highlightedToolRequestId?: string | undefined;
    activeSection?: "general" | "allowlist" | "tool_history" | "recent_activity" | undefined;
    toolHistoryPageByProfile?: Record<string, number> | undefined;
    recentActivityPageByProfile?: Record<string, number> | undefined;
}>;
export type SettingsPageState = z.infer<typeof SettingsPageStateSchema>;
export declare const WorkspaceViewStateSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodLiteral<1>>;
    lastViewedAt: z.ZodOptional<z.ZodString>;
    selectedResultId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    version: 1;
    lastViewedAt?: string | undefined;
    selectedResultId?: string | undefined;
}, {
    version?: 1 | undefined;
    lastViewedAt?: string | undefined;
    selectedResultId?: string | undefined;
}>;
export type WorkspaceViewState = z.infer<typeof WorkspaceViewStateSchema>;
export declare const WorkspacePageStateSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodLiteral<1>>;
    views: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<1>>;
        lastViewedAt: z.ZodOptional<z.ZodString>;
        selectedResultId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        version: 1;
        lastViewedAt?: string | undefined;
        selectedResultId?: string | undefined;
    }, {
        version?: 1 | undefined;
        lastViewedAt?: string | undefined;
        selectedResultId?: string | undefined;
    }>>>;
}, "strict", z.ZodTypeAny, {
    version: 1;
    views: Record<string, {
        version: 1;
        lastViewedAt?: string | undefined;
        selectedResultId?: string | undefined;
    }>;
}, {
    version?: 1 | undefined;
    views?: Record<string, {
        version?: 1 | undefined;
        lastViewedAt?: string | undefined;
        selectedResultId?: string | undefined;
    }> | undefined;
}>;
export type WorkspacePageState = z.infer<typeof WorkspacePageStateSchema>;
export declare const PageStateSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodLiteral<1>>;
    chat: z.ZodDefault<z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<1>>;
        lastVisitedSessionId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        version: 1;
        lastVisitedSessionId?: string | undefined;
    }, {
        version?: 1 | undefined;
        lastVisitedSessionId?: string | undefined;
    }>>;
    profiles: z.ZodDefault<z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<2>>;
        lastViewedAt: z.ZodOptional<z.ZodString>;
        lastSelectedSessionId: z.ZodOptional<z.ZodString>;
        recentSessionIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        sessionBrowserPage: z.ZodDefault<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        version: 2;
        recentSessionIds: string[];
        sessionBrowserPage: number;
        lastViewedAt?: string | undefined;
        lastSelectedSessionId?: string | undefined;
    }, {
        version?: 2 | undefined;
        lastViewedAt?: string | undefined;
        lastSelectedSessionId?: string | undefined;
        recentSessionIds?: string[] | undefined;
        sessionBrowserPage?: number | undefined;
    }>>;
    jobs: z.ZodDefault<z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<1>>;
        lastViewedAt: z.ZodOptional<z.ZodString>;
        lastManualRefreshAt: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        version: 1;
        lastViewedAt?: string | undefined;
        lastManualRefreshAt?: string | undefined;
    }, {
        version?: 1 | undefined;
        lastViewedAt?: string | undefined;
        lastManualRefreshAt?: string | undefined;
    }>>;
    settings: z.ZodDefault<z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<1>>;
        lastViewedAt: z.ZodOptional<z.ZodString>;
        highlightedToolRequestId: z.ZodOptional<z.ZodString>;
        activeSection: z.ZodDefault<z.ZodEnum<["general", "allowlist", "tool_history", "recent_activity"]>>;
        toolHistoryPageByProfile: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        recentActivityPageByProfile: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    }, "strict", z.ZodTypeAny, {
        version: 1;
        activeSection: "general" | "allowlist" | "tool_history" | "recent_activity";
        toolHistoryPageByProfile: Record<string, number>;
        recentActivityPageByProfile: Record<string, number>;
        lastViewedAt?: string | undefined;
        highlightedToolRequestId?: string | undefined;
    }, {
        version?: 1 | undefined;
        lastViewedAt?: string | undefined;
        highlightedToolRequestId?: string | undefined;
        activeSection?: "general" | "allowlist" | "tool_history" | "recent_activity" | undefined;
        toolHistoryPageByProfile?: Record<string, number> | undefined;
        recentActivityPageByProfile?: Record<string, number> | undefined;
    }>>;
    workspaces: z.ZodDefault<z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<1>>;
        views: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
            version: z.ZodDefault<z.ZodLiteral<1>>;
            lastViewedAt: z.ZodOptional<z.ZodString>;
            selectedResultId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            version: 1;
            lastViewedAt?: string | undefined;
            selectedResultId?: string | undefined;
        }, {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            selectedResultId?: string | undefined;
        }>>>;
    }, "strict", z.ZodTypeAny, {
        version: 1;
        views: Record<string, {
            version: 1;
            lastViewedAt?: string | undefined;
            selectedResultId?: string | undefined;
        }>;
    }, {
        version?: 1 | undefined;
        views?: Record<string, {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            selectedResultId?: string | undefined;
        }> | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    version: 1;
    chat: {
        version: 1;
        lastVisitedSessionId?: string | undefined;
    };
    jobs: {
        version: 1;
        lastViewedAt?: string | undefined;
        lastManualRefreshAt?: string | undefined;
    };
    settings: {
        version: 1;
        activeSection: "general" | "allowlist" | "tool_history" | "recent_activity";
        toolHistoryPageByProfile: Record<string, number>;
        recentActivityPageByProfile: Record<string, number>;
        lastViewedAt?: string | undefined;
        highlightedToolRequestId?: string | undefined;
    };
    profiles: {
        version: 2;
        recentSessionIds: string[];
        sessionBrowserPage: number;
        lastViewedAt?: string | undefined;
        lastSelectedSessionId?: string | undefined;
    };
    workspaces: {
        version: 1;
        views: Record<string, {
            version: 1;
            lastViewedAt?: string | undefined;
            selectedResultId?: string | undefined;
        }>;
    };
}, {
    version?: 1 | undefined;
    chat?: {
        version?: 1 | undefined;
        lastVisitedSessionId?: string | undefined;
    } | undefined;
    jobs?: {
        version?: 1 | undefined;
        lastViewedAt?: string | undefined;
        lastManualRefreshAt?: string | undefined;
    } | undefined;
    settings?: {
        version?: 1 | undefined;
        lastViewedAt?: string | undefined;
        highlightedToolRequestId?: string | undefined;
        activeSection?: "general" | "allowlist" | "tool_history" | "recent_activity" | undefined;
        toolHistoryPageByProfile?: Record<string, number> | undefined;
        recentActivityPageByProfile?: Record<string, number> | undefined;
    } | undefined;
    profiles?: {
        version?: 2 | undefined;
        lastViewedAt?: string | undefined;
        lastSelectedSessionId?: string | undefined;
        recentSessionIds?: string[] | undefined;
        sessionBrowserPage?: number | undefined;
    } | undefined;
    workspaces?: {
        version?: 1 | undefined;
        views?: Record<string, {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            selectedResultId?: string | undefined;
        }> | undefined;
    } | undefined;
}>;
export type PageState = z.infer<typeof PageStateSchema>;
export declare const HermesAppSnapshotSchema: z.ZodEffects<z.ZodObject<{
    version: z.ZodUnion<[z.ZodLiteral<2>, z.ZodLiteral<3>]>;
    sessions: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        summary: z.ZodString;
        provider: z.ZodDefault<z.ZodEnum<["hermes", "openclaw"]>>;
        runtimeSessionId: z.ZodOptional<z.ZodString>;
        lastUpdatedAt: z.ZodOptional<z.ZodString>;
        messageCount: z.ZodOptional<z.ZodNumber>;
        lastUsedProfileId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        title: string;
        provider: "hermes" | "openclaw";
        summary: string;
        lastUpdatedAt?: string | undefined;
        runtimeSessionId?: string | undefined;
        messageCount?: number | undefined;
        lastUsedProfileId?: string | undefined;
    }, {
        id: string;
        title: string;
        summary: string;
        lastUpdatedAt?: string | undefined;
        provider?: "hermes" | "openclaw" | undefined;
        runtimeSessionId?: string | undefined;
        messageCount?: number | undefined;
        lastUsedProfileId?: string | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        profileId: z.ZodString;
        title: z.ZodString;
        summary: z.ZodString;
        provider: z.ZodDefault<z.ZodEnum<["hermes", "openclaw"]>>;
        runtimeSessionId: z.ZodOptional<z.ZodString>;
        lastUpdatedAt: z.ZodOptional<z.ZodString>;
        messageCount: z.ZodOptional<z.ZodNumber>;
        lastUsedProfileId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        title: string;
        provider: "hermes" | "openclaw";
        summary: string;
        profileId: string;
        lastUpdatedAt?: string | undefined;
        runtimeSessionId?: string | undefined;
        messageCount?: number | undefined;
        lastUsedProfileId?: string | undefined;
    }, {
        id: string;
        title: string;
        summary: string;
        profileId: string;
        lastUpdatedAt?: string | undefined;
        provider?: "hermes" | "openclaw" | undefined;
        runtimeSessionId?: string | undefined;
        messageCount?: number | undefined;
        lastUsedProfileId?: string | undefined;
    }>]>, "many">;
    pageState: z.ZodDefault<z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<1>>;
        chat: z.ZodDefault<z.ZodObject<{
            version: z.ZodDefault<z.ZodLiteral<1>>;
            lastVisitedSessionId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            version: 1;
            lastVisitedSessionId?: string | undefined;
        }, {
            version?: 1 | undefined;
            lastVisitedSessionId?: string | undefined;
        }>>;
        profiles: z.ZodDefault<z.ZodUnion<[z.ZodObject<{
            version: z.ZodDefault<z.ZodLiteral<2>>;
            lastViewedAt: z.ZodOptional<z.ZodString>;
            lastSelectedSessionId: z.ZodOptional<z.ZodString>;
            recentSessionIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            sessionBrowserPage: z.ZodDefault<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            version: 2;
            recentSessionIds: string[];
            sessionBrowserPage: number;
            lastViewedAt?: string | undefined;
            lastSelectedSessionId?: string | undefined;
        }, {
            version?: 2 | undefined;
            lastViewedAt?: string | undefined;
            lastSelectedSessionId?: string | undefined;
            recentSessionIds?: string[] | undefined;
            sessionBrowserPage?: number | undefined;
        }>, z.ZodObject<{
            version: z.ZodDefault<z.ZodLiteral<1>>;
            lastViewedAt: z.ZodOptional<z.ZodString>;
            lastSelectedSessionByProfile: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
            recentSessionIdsByProfile: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
            sessionBrowserPageByProfile: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strict", z.ZodTypeAny, {
            version: 1;
            lastSelectedSessionByProfile: Record<string, string>;
            recentSessionIdsByProfile: Record<string, string[]>;
            sessionBrowserPageByProfile: Record<string, number>;
            lastViewedAt?: string | undefined;
        }, {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            lastSelectedSessionByProfile?: Record<string, string> | undefined;
            recentSessionIdsByProfile?: Record<string, string[]> | undefined;
            sessionBrowserPageByProfile?: Record<string, number> | undefined;
        }>]>>;
        jobs: z.ZodDefault<z.ZodObject<{
            version: z.ZodDefault<z.ZodLiteral<1>>;
            lastViewedAt: z.ZodOptional<z.ZodString>;
            lastManualRefreshAt: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            version: 1;
            lastViewedAt?: string | undefined;
            lastManualRefreshAt?: string | undefined;
        }, {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            lastManualRefreshAt?: string | undefined;
        }>>;
        settings: z.ZodDefault<z.ZodObject<{
            version: z.ZodDefault<z.ZodLiteral<1>>;
            lastViewedAt: z.ZodOptional<z.ZodString>;
            highlightedToolRequestId: z.ZodOptional<z.ZodString>;
            activeSection: z.ZodDefault<z.ZodEnum<["general", "allowlist", "tool_history", "recent_activity"]>>;
            toolHistoryPageByProfile: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            recentActivityPageByProfile: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strict", z.ZodTypeAny, {
            version: 1;
            activeSection: "general" | "allowlist" | "tool_history" | "recent_activity";
            toolHistoryPageByProfile: Record<string, number>;
            recentActivityPageByProfile: Record<string, number>;
            lastViewedAt?: string | undefined;
            highlightedToolRequestId?: string | undefined;
        }, {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            highlightedToolRequestId?: string | undefined;
            activeSection?: "general" | "allowlist" | "tool_history" | "recent_activity" | undefined;
            toolHistoryPageByProfile?: Record<string, number> | undefined;
            recentActivityPageByProfile?: Record<string, number> | undefined;
        }>>;
        workspaces: z.ZodDefault<z.ZodObject<{
            version: z.ZodDefault<z.ZodLiteral<1>>;
            views: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
                version: z.ZodDefault<z.ZodLiteral<1>>;
                lastViewedAt: z.ZodOptional<z.ZodString>;
                selectedResultId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                version: 1;
                lastViewedAt?: string | undefined;
                selectedResultId?: string | undefined;
            }, {
                version?: 1 | undefined;
                lastViewedAt?: string | undefined;
                selectedResultId?: string | undefined;
            }>>>;
        }, "strict", z.ZodTypeAny, {
            version: 1;
            views: Record<string, {
                version: 1;
                lastViewedAt?: string | undefined;
                selectedResultId?: string | undefined;
            }>;
        }, {
            version?: 1 | undefined;
            views?: Record<string, {
                version?: 1 | undefined;
                lastViewedAt?: string | undefined;
                selectedResultId?: string | undefined;
            }> | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        version: 1;
        chat: {
            version: 1;
            lastVisitedSessionId?: string | undefined;
        };
        jobs: {
            version: 1;
            lastViewedAt?: string | undefined;
            lastManualRefreshAt?: string | undefined;
        };
        settings: {
            version: 1;
            activeSection: "general" | "allowlist" | "tool_history" | "recent_activity";
            toolHistoryPageByProfile: Record<string, number>;
            recentActivityPageByProfile: Record<string, number>;
            lastViewedAt?: string | undefined;
            highlightedToolRequestId?: string | undefined;
        };
        profiles: {
            version: 1;
            lastSelectedSessionByProfile: Record<string, string>;
            recentSessionIdsByProfile: Record<string, string[]>;
            sessionBrowserPageByProfile: Record<string, number>;
            lastViewedAt?: string | undefined;
        } | {
            version: 2;
            recentSessionIds: string[];
            sessionBrowserPage: number;
            lastViewedAt?: string | undefined;
            lastSelectedSessionId?: string | undefined;
        };
        workspaces: {
            version: 1;
            views: Record<string, {
                version: 1;
                lastViewedAt?: string | undefined;
                selectedResultId?: string | undefined;
            }>;
        };
    }, {
        version?: 1 | undefined;
        chat?: {
            version?: 1 | undefined;
            lastVisitedSessionId?: string | undefined;
        } | undefined;
        jobs?: {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            lastManualRefreshAt?: string | undefined;
        } | undefined;
        settings?: {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            highlightedToolRequestId?: string | undefined;
            activeSection?: "general" | "allowlist" | "tool_history" | "recent_activity" | undefined;
            toolHistoryPageByProfile?: Record<string, number> | undefined;
            recentActivityPageByProfile?: Record<string, number> | undefined;
        } | undefined;
        profiles?: {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            lastSelectedSessionByProfile?: Record<string, string> | undefined;
            recentSessionIdsByProfile?: Record<string, string[]> | undefined;
            sessionBrowserPageByProfile?: Record<string, number> | undefined;
        } | {
            version?: 2 | undefined;
            lastViewedAt?: string | undefined;
            lastSelectedSessionId?: string | undefined;
            recentSessionIds?: string[] | undefined;
            sessionBrowserPage?: number | undefined;
        } | undefined;
        workspaces?: {
            version?: 1 | undefined;
            views?: Record<string, {
                version?: 1 | undefined;
                lastViewedAt?: string | undefined;
                selectedResultId?: string | undefined;
            }> | undefined;
        } | undefined;
    }>>;
    chatMessages: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        role: z.ZodEnum<["user", "assistant", "system", "tool"]>;
        content: z.ZodString;
        blocks: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"markdown">;
            markdown: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            type: "markdown";
            id: string;
            markdown: string;
        }, {
            type: "markdown";
            id: string;
            markdown: string;
        }>, "many">;
        attachments: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            kind: z.ZodEnum<["file", "image", "json", "link"]>;
            label: z.ZodString;
            uri: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }, {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }>, "many">>;
        timestamp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        blocks: {
            type: "markdown";
            id: string;
            markdown: string;
        }[];
        attachments: {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }[];
        timestamp: string;
    }, {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        blocks: {
            type: "markdown";
            id: string;
            markdown: string;
        }[];
        timestamp: string;
        attachments?: {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }[] | undefined;
    }>, "many">>;
    activeTab: z.ZodEnum<["chat", "workspace", "jobs", "settings", "profiles"]>;
    themeMode: z.ZodDefault<z.ZodEnum<["dark", "light"]>>;
    profiles: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        provider: z.ZodDefault<z.ZodEnum<["hermes", "openclaw"]>>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        description: string;
        name: string;
        provider: "hermes" | "openclaw";
    }, {
        id: string;
        description: string;
        name: string;
        provider?: "hermes" | "openclaw" | undefined;
    }>, "many">;
    activeProfileId: z.ZodString;
    activeSessionId: z.ZodString;
    sessionMessages: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        role: z.ZodEnum<["user", "assistant", "system", "tool"]>;
        content: z.ZodString;
        blocks: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"markdown">;
            markdown: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            type: "markdown";
            id: string;
            markdown: string;
        }, {
            type: "markdown";
            id: string;
            markdown: string;
        }>, "many">;
        attachments: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            kind: z.ZodEnum<["file", "image", "json", "link"]>;
            label: z.ZodString;
            uri: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }, {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }>, "many">>;
        timestamp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        blocks: {
            type: "markdown";
            id: string;
            markdown: string;
        }[];
        attachments: {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }[];
        timestamp: string;
    }, {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        blocks: {
            type: "markdown";
            id: string;
            markdown: string;
        }[];
        timestamp: string;
        attachments?: {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }[] | undefined;
    }>, "many">>>;
    focusedWorkspaceId: z.ZodOptional<z.ZodString>;
    workspaces: z.ZodRecord<z.ZodString, z.ZodObject<{
        definition: z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            description: z.ZodDefault<z.ZodString>;
            icon: z.ZodDefault<z.ZodString>;
            layout: z.ZodDefault<z.ZodEnum<["single", "split", "board"]>>;
            components: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"text">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    markdown: z.ZodString;
                    tone: z.ZodDefault<z.ZodEnum<["default", "muted", "info"]>>;
                }, "strict", z.ZodTypeAny, {
                    markdown: string;
                    tone: "default" | "muted" | "info";
                }, {
                    markdown: string;
                    tone?: "default" | "muted" | "info" | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone: "default" | "muted" | "info";
                };
                title?: string | undefined;
            }, {
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone?: "default" | "muted" | "info" | undefined;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"form">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    submitLabel: z.ZodDefault<z.ZodString>;
                    eventType: z.ZodDefault<z.ZodEnum<["filter_changed", "form_submitted"]>>;
                    fields: z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                        id: z.ZodString;
                        label: z.ZodString;
                        helperText: z.ZodOptional<z.ZodString>;
                    } & {
                        kind: z.ZodLiteral<"text">;
                        placeholder: z.ZodOptional<z.ZodString>;
                        defaultValue: z.ZodDefault<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    }, {
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        label: z.ZodString;
                        helperText: z.ZodOptional<z.ZodString>;
                    } & {
                        kind: z.ZodLiteral<"number">;
                        placeholder: z.ZodOptional<z.ZodString>;
                        min: z.ZodOptional<z.ZodNumber>;
                        max: z.ZodOptional<z.ZodNumber>;
                        step: z.ZodOptional<z.ZodNumber>;
                        defaultValue: z.ZodOptional<z.ZodNumber>;
                    }, "strict", z.ZodTypeAny, {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    }, {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        label: z.ZodString;
                        helperText: z.ZodOptional<z.ZodString>;
                    } & {
                        kind: z.ZodLiteral<"select">;
                        options: z.ZodArray<z.ZodObject<{
                            label: z.ZodString;
                            value: z.ZodString;
                        }, "strict", z.ZodTypeAny, {
                            value: string;
                            label: string;
                        }, {
                            value: string;
                            label: string;
                        }>, "many">;
                        defaultValue: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    }, {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        label: z.ZodString;
                        helperText: z.ZodOptional<z.ZodString>;
                    } & {
                        kind: z.ZodLiteral<"toggle">;
                        defaultValue: z.ZodDefault<z.ZodBoolean>;
                    }, "strict", z.ZodTypeAny, {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    }, {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    }>]>, "many">;
                }, "strict", z.ZodTypeAny, {
                    submitLabel: string;
                    eventType: "filter_changed" | "form_submitted";
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    })[];
                }, {
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    })[];
                    submitLabel?: string | undefined;
                    eventType?: "filter_changed" | "form_submitted" | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "form";
                id: string;
                props: {
                    submitLabel: string;
                    eventType: "filter_changed" | "form_submitted";
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    })[];
                };
                title?: string | undefined;
            }, {
                type: "form";
                id: string;
                props: {
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    })[];
                    submitLabel?: string | undefined;
                    eventType?: "filter_changed" | "form_submitted" | undefined;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"cards">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    emptyMessage: z.ZodString;
                    titleKey: z.ZodString;
                    subtitleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    metricFields: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        label: z.ZodString;
                        key: z.ZodString;
                        format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                    }, "strict", z.ZodTypeAny, {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }, {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }>, "many">>;
                    selectable: z.ZodDefault<z.ZodBoolean>;
                }, "strict", z.ZodTypeAny, {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys: string[];
                    metricFields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    selectable: boolean;
                }, {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys?: string[] | undefined;
                    metricFields?: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[] | undefined;
                    selectable?: boolean | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys: string[];
                    metricFields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    selectable: boolean;
                };
                title?: string | undefined;
            }, {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys?: string[] | undefined;
                    metricFields?: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[] | undefined;
                    selectable?: boolean | undefined;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"detail">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    emptyMessage: z.ZodString;
                    fields: z.ZodArray<z.ZodObject<{
                        label: z.ZodString;
                        key: z.ZodString;
                        format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                    }, "strict", z.ZodTypeAny, {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }, {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }>, "many">;
                }, "strict", z.ZodTypeAny, {
                    fields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    emptyMessage: string;
                }, {
                    fields: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    emptyMessage: string;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            }, {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"table">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    emptyMessage: z.ZodString;
                    maxRows: z.ZodDefault<z.ZodNumber>;
                    columns: z.ZodArray<z.ZodObject<{
                        label: z.ZodString;
                        key: z.ZodString;
                        format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                    }, "strict", z.ZodTypeAny, {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }, {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }>, "many">;
                }, "strict", z.ZodTypeAny, {
                    emptyMessage: string;
                    maxRows: number;
                    columns: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                }, {
                    emptyMessage: string;
                    columns: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    maxRows?: number | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    maxRows: number;
                    columns: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                };
                title?: string | undefined;
            }, {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    columns: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    maxRows?: number | undefined;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"toolbar">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    actionIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }, "strict", z.ZodTypeAny, {
                    actionIds: string[];
                }, {
                    actionIds?: string[] | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "toolbar";
                id: string;
                props: {
                    actionIds: string[];
                };
                title?: string | undefined;
            }, {
                type: "toolbar";
                id: string;
                props: {
                    actionIds?: string[] | undefined;
                };
                title?: string | undefined;
            }>, z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"stat">;
                title: z.ZodOptional<z.ZodString>;
                props: z.ZodObject<{
                    items: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        label: z.ZodString;
                        metric: z.ZodEnum<["result_count", "selection_count", "average_price", "lowest_price"]>;
                        format: z.ZodDefault<z.ZodEnum<["number", "currency"]>>;
                    }, "strict", z.ZodTypeAny, {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }, {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }>, "many">;
                }, "strict", z.ZodTypeAny, {
                    items: {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }[];
                }, {
                    items: {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }[];
                }>;
            }, "strict", z.ZodTypeAny, {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }[];
                };
                title?: string | undefined;
            }, {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }[];
                };
                title?: string | undefined;
            }>]>, "many">;
            actions: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                label: z.ZodString;
                tone: z.ZodDefault<z.ZodEnum<["primary", "secondary", "danger"]>>;
                event: z.ZodLiteral<"button_clicked">;
                description: z.ZodOptional<z.ZodString>;
                confirmation: z.ZodOptional<z.ZodObject<{
                    title: z.ZodString;
                    description: z.ZodString;
                    confirmLabel: z.ZodDefault<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    title: string;
                    description: string;
                    confirmLabel: string;
                }, {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                id: string;
                label: string;
                tone: "primary" | "secondary" | "danger";
                event: "button_clicked";
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            }, {
                id: string;
                label: string;
                event: "button_clicked";
                tone?: "primary" | "secondary" | "danger" | undefined;
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            }>, "many">>;
            persistedStateSchema: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                key: z.ZodString;
                label: z.ZodString;
                type: z.ZodLiteral<"string">;
                defaultValue: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                type: "string";
                label: string;
                defaultValue: string;
                key: string;
            }, {
                type: "string";
                label: string;
                key: string;
                defaultValue?: string | undefined;
            }>, z.ZodObject<{
                key: z.ZodString;
                label: z.ZodString;
                type: z.ZodLiteral<"number">;
                defaultValue: z.ZodDefault<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                type: "number";
                label: string;
                defaultValue: number;
                key: string;
            }, {
                type: "number";
                label: string;
                key: string;
                defaultValue?: number | undefined;
            }>, z.ZodObject<{
                key: z.ZodString;
                label: z.ZodString;
                type: z.ZodLiteral<"boolean">;
                defaultValue: z.ZodDefault<z.ZodBoolean>;
            }, "strict", z.ZodTypeAny, {
                type: "boolean";
                label: string;
                defaultValue: boolean;
                key: string;
            }, {
                type: "boolean";
                label: string;
                key: string;
                defaultValue?: boolean | undefined;
            }>, z.ZodObject<{
                key: z.ZodString;
                label: z.ZodString;
                type: z.ZodLiteral<"string[]">;
                defaultValue: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strict", z.ZodTypeAny, {
                type: "string[]";
                label: string;
                defaultValue: string[];
                key: string;
            }, {
                type: "string[]";
                label: string;
                key: string;
                defaultValue?: string[] | undefined;
            }>, z.ZodObject<{
                key: z.ZodString;
                label: z.ZodString;
                type: z.ZodLiteral<"number[]">;
                defaultValue: z.ZodDefault<z.ZodArray<z.ZodNumber, "many">>;
            }, "strict", z.ZodTypeAny, {
                type: "number[]";
                label: string;
                defaultValue: number[];
                key: string;
            }, {
                type: "number[]";
                label: string;
                key: string;
                defaultValue?: number[] | undefined;
            }>]>, "many">>;
            version: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            title: string;
            description: string;
            icon: string;
            layout: "single" | "split" | "board";
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone: "default" | "muted" | "info";
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    submitLabel: string;
                    eventType: "filter_changed" | "form_submitted";
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    })[];
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys: string[];
                    metricFields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    selectable: boolean;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    maxRows: number;
                    columns: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds: string[];
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }[];
                };
                title?: string | undefined;
            })[];
            actions: {
                id: string;
                label: string;
                tone: "primary" | "secondary" | "danger";
                event: "button_clicked";
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            }[];
            persistedStateSchema: ({
                type: "string";
                label: string;
                defaultValue: string;
                key: string;
            } | {
                type: "number";
                label: string;
                defaultValue: number;
                key: string;
            } | {
                type: "boolean";
                label: string;
                defaultValue: boolean;
                key: string;
            } | {
                type: "string[]";
                label: string;
                defaultValue: string[];
                key: string;
            } | {
                type: "number[]";
                label: string;
                defaultValue: number[];
                key: string;
            })[];
            version: number;
        }, {
            id: string;
            title: string;
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone?: "default" | "muted" | "info" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    })[];
                    submitLabel?: string | undefined;
                    eventType?: "filter_changed" | "form_submitted" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys?: string[] | undefined;
                    metricFields?: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[] | undefined;
                    selectable?: boolean | undefined;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    columns: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    maxRows?: number | undefined;
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds?: string[] | undefined;
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }[];
                };
                title?: string | undefined;
            })[];
            version: number;
            description?: string | undefined;
            icon?: string | undefined;
            layout?: "single" | "split" | "board" | undefined;
            actions?: {
                id: string;
                label: string;
                event: "button_clicked";
                tone?: "primary" | "secondary" | "danger" | undefined;
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            }[] | undefined;
            persistedStateSchema?: ({
                type: "string";
                label: string;
                key: string;
                defaultValue?: string | undefined;
            } | {
                type: "number";
                label: string;
                key: string;
                defaultValue?: number | undefined;
            } | {
                type: "boolean";
                label: string;
                key: string;
                defaultValue?: boolean | undefined;
            } | {
                type: "string[]";
                label: string;
                key: string;
                defaultValue?: string[] | undefined;
            } | {
                type: "number[]";
                label: string;
                key: string;
                defaultValue?: number[] | undefined;
            })[] | undefined;
        }>;
        state: z.ZodObject<{
            version: z.ZodDefault<z.ZodNumber>;
            filters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
            selectedItemId: z.ZodOptional<z.ZodString>;
            pagination: z.ZodDefault<z.ZodObject<{
                page: z.ZodDefault<z.ZodNumber>;
                pageSize: z.ZodDefault<z.ZodNumber>;
                total: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                page: number;
                pageSize: number;
                total?: number | undefined;
            }, {
                page?: number | undefined;
                pageSize?: number | undefined;
                total?: number | undefined;
            }>>;
            formValues: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
            notes: z.ZodDefault<z.ZodString>;
            metadata: z.ZodObject<{
                lastUpdatedAt: z.ZodString;
                source: z.ZodEnum<["local", "hermes"]>;
                lastEvent: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                lastUpdatedAt: string;
                source: "local" | "hermes";
                lastEvent: string;
            }, {
                lastUpdatedAt: string;
                source: "local" | "hermes";
                lastEvent?: string | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            version: number;
            filters: Record<string, string | number | boolean | string[] | number[]>;
            pagination: {
                page: number;
                pageSize: number;
                total?: number | undefined;
            };
            formValues: Record<string, string | number | boolean | string[] | number[]>;
            notes: string;
            metadata: {
                lastUpdatedAt: string;
                source: "local" | "hermes";
                lastEvent: string;
            };
            selectedItemId?: string | undefined;
        }, {
            metadata: {
                lastUpdatedAt: string;
                source: "local" | "hermes";
                lastEvent?: string | undefined;
            };
            version?: number | undefined;
            filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
            selectedItemId?: string | undefined;
            pagination?: {
                page?: number | undefined;
                pageSize?: number | undefined;
                total?: number | undefined;
            } | undefined;
            formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
            notes?: string | undefined;
        }>;
        results: z.ZodDefault<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        pinned: z.ZodBoolean;
        archived: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        results: Record<string, unknown>[];
        definition: {
            id: string;
            title: string;
            description: string;
            icon: string;
            layout: "single" | "split" | "board";
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone: "default" | "muted" | "info";
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    submitLabel: string;
                    eventType: "filter_changed" | "form_submitted";
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    })[];
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys: string[];
                    metricFields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    selectable: boolean;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    maxRows: number;
                    columns: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds: string[];
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }[];
                };
                title?: string | undefined;
            })[];
            actions: {
                id: string;
                label: string;
                tone: "primary" | "secondary" | "danger";
                event: "button_clicked";
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            }[];
            persistedStateSchema: ({
                type: "string";
                label: string;
                defaultValue: string;
                key: string;
            } | {
                type: "number";
                label: string;
                defaultValue: number;
                key: string;
            } | {
                type: "boolean";
                label: string;
                defaultValue: boolean;
                key: string;
            } | {
                type: "string[]";
                label: string;
                defaultValue: string[];
                key: string;
            } | {
                type: "number[]";
                label: string;
                defaultValue: number[];
                key: string;
            })[];
            version: number;
        };
        state: {
            version: number;
            filters: Record<string, string | number | boolean | string[] | number[]>;
            pagination: {
                page: number;
                pageSize: number;
                total?: number | undefined;
            };
            formValues: Record<string, string | number | boolean | string[] | number[]>;
            notes: string;
            metadata: {
                lastUpdatedAt: string;
                source: "local" | "hermes";
                lastEvent: string;
            };
            selectedItemId?: string | undefined;
        };
        pinned: boolean;
        archived: boolean;
    }, {
        definition: {
            id: string;
            title: string;
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone?: "default" | "muted" | "info" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    })[];
                    submitLabel?: string | undefined;
                    eventType?: "filter_changed" | "form_submitted" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys?: string[] | undefined;
                    metricFields?: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[] | undefined;
                    selectable?: boolean | undefined;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    columns: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    maxRows?: number | undefined;
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds?: string[] | undefined;
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }[];
                };
                title?: string | undefined;
            })[];
            version: number;
            description?: string | undefined;
            icon?: string | undefined;
            layout?: "single" | "split" | "board" | undefined;
            actions?: {
                id: string;
                label: string;
                event: "button_clicked";
                tone?: "primary" | "secondary" | "danger" | undefined;
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            }[] | undefined;
            persistedStateSchema?: ({
                type: "string";
                label: string;
                key: string;
                defaultValue?: string | undefined;
            } | {
                type: "number";
                label: string;
                key: string;
                defaultValue?: number | undefined;
            } | {
                type: "boolean";
                label: string;
                key: string;
                defaultValue?: boolean | undefined;
            } | {
                type: "string[]";
                label: string;
                key: string;
                defaultValue?: string[] | undefined;
            } | {
                type: "number[]";
                label: string;
                key: string;
                defaultValue?: number[] | undefined;
            })[] | undefined;
        };
        state: {
            metadata: {
                lastUpdatedAt: string;
                source: "local" | "hermes";
                lastEvent?: string | undefined;
            };
            version?: number | undefined;
            filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
            selectedItemId?: string | undefined;
            pagination?: {
                page?: number | undefined;
                pageSize?: number | undefined;
                total?: number | undefined;
            } | undefined;
            formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
            notes?: string | undefined;
        };
        pinned: boolean;
        archived: boolean;
        results?: Record<string, unknown>[] | undefined;
    }>>;
    workspaceOrder: z.ZodArray<z.ZodString, "many">;
    jobs: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        schedule: z.ZodString;
        status: z.ZodEnum<["healthy", "paused", "attention"]>;
        description: z.ZodString;
        lastRun: z.ZodString;
        nextRun: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }, {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }>, "many">;
    jobsCacheState: z.ZodDefault<z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<1>>;
        status: z.ZodDefault<z.ZodEnum<["idle", "refreshing", "connected", "disconnected", "error"]>>;
        source: z.ZodDefault<z.ZodEnum<["local_cache", "hermes_cli"]>>;
        lastRequestedAt: z.ZodOptional<z.ZodString>;
        lastSuccessfulAt: z.ZodOptional<z.ZodString>;
        lastError: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
        version: 1;
        source: "local_cache" | "hermes_cli";
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    }, {
        status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
        version?: 1 | undefined;
        source?: "local_cache" | "hermes_cli" | undefined;
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    }>>;
    reminders: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        dueAt: z.ZodString;
        status: z.ZodEnum<["scheduled", "due", "completed"]>;
        description: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }, {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }>, "many">;
    profileState: z.ZodDefault<z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<1>>;
        jobs: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            schedule: z.ZodString;
            status: z.ZodEnum<["healthy", "paused", "attention"]>;
            description: z.ZodString;
            lastRun: z.ZodString;
            nextRun: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }, {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }>, "many">>;
        jobsCacheState: z.ZodDefault<z.ZodObject<{
            version: z.ZodDefault<z.ZodLiteral<1>>;
            status: z.ZodDefault<z.ZodEnum<["idle", "refreshing", "connected", "disconnected", "error"]>>;
            source: z.ZodDefault<z.ZodEnum<["local_cache", "hermes_cli"]>>;
            lastRequestedAt: z.ZodOptional<z.ZodString>;
            lastSuccessfulAt: z.ZodOptional<z.ZodString>;
            lastError: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
            version: 1;
            source: "local_cache" | "hermes_cli";
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        }, {
            status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
            version?: 1 | undefined;
            source?: "local_cache" | "hermes_cli" | undefined;
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        }>>;
        reminders: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            dueAt: z.ZodString;
            status: z.ZodEnum<["scheduled", "due", "completed"]>;
            description: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }, {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        version: 1;
        jobs: {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }[];
        jobsCacheState: {
            status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
            version: 1;
            source: "local_cache" | "hermes_cli";
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        };
        reminders: {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }[];
    }, {
        version?: 1 | undefined;
        jobs?: {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }[] | undefined;
        jobsCacheState?: {
            status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
            version?: 1 | undefined;
            source?: "local_cache" | "hermes_cli" | undefined;
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        } | undefined;
        reminders?: {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }[] | undefined;
    }>>>>;
    toolSettings: z.ZodObject<{
        transportMode: z.ZodLiteral<"bridge">;
        allowFilesystemRead: z.ZodBoolean;
        allowShellExecution: z.ZodBoolean;
        allowDesktopNotifications: z.ZodBoolean;
        confirmDestructiveActions: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        transportMode: "bridge";
        allowFilesystemRead: boolean;
        allowShellExecution: boolean;
        allowDesktopNotifications: boolean;
        confirmDestructiveActions: boolean;
    }, {
        transportMode: "bridge";
        allowFilesystemRead: boolean;
        allowShellExecution: boolean;
        allowDesktopNotifications: boolean;
        confirmDestructiveActions: boolean;
    }>;
    toolExecutionHistory: z.ZodDefault<z.ZodArray<z.ZodObject<{
        request: z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"shell_command">;
            summary: z.ZodString;
            command: z.ZodString;
            args: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            cwd: z.ZodOptional<z.ZodString>;
            requiresConfirmation: z.ZodDefault<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args: string[];
            requiresConfirmation: boolean;
            cwd?: string | undefined;
        }, {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args?: string[] | undefined;
            cwd?: string | undefined;
            requiresConfirmation?: boolean | undefined;
        }>;
        profileId: z.ZodString;
        profileName: z.ZodString;
        sessionId: z.ZodString;
        sessionTitle: z.ZodString;
        requestedAt: z.ZodString;
        status: z.ZodEnum<["pending", "dismissed", "completed", "failed", "rejected"]>;
        resolvedAt: z.ZodOptional<z.ZodString>;
        result: z.ZodOptional<z.ZodObject<{
            requestId: z.ZodString;
            status: z.ZodEnum<["completed", "failed", "rejected"]>;
            summary: z.ZodString;
            stdout: z.ZodString;
            stderr: z.ZodString;
            exitCode: z.ZodNumber;
            completedAt: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            status: "completed" | "failed" | "rejected";
            summary: string;
            requestId: string;
            stdout: string;
            stderr: string;
            exitCode: number;
            completedAt: string;
        }, {
            status: "completed" | "failed" | "rejected";
            summary: string;
            requestId: string;
            stdout: string;
            stderr: string;
            exitCode: number;
            completedAt: string;
        }>>;
    }, "strict", z.ZodTypeAny, {
        status: "completed" | "failed" | "rejected" | "pending" | "dismissed";
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args: string[];
            requiresConfirmation: boolean;
            cwd?: string | undefined;
        };
        requestedAt: string;
        resolvedAt?: string | undefined;
        result?: {
            status: "completed" | "failed" | "rejected";
            summary: string;
            requestId: string;
            stdout: string;
            stderr: string;
            exitCode: number;
            completedAt: string;
        } | undefined;
    }, {
        status: "completed" | "failed" | "rejected" | "pending" | "dismissed";
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args?: string[] | undefined;
            cwd?: string | undefined;
            requiresConfirmation?: boolean | undefined;
        };
        requestedAt: string;
        resolvedAt?: string | undefined;
        result?: {
            status: "completed" | "failed" | "rejected";
            summary: string;
            requestId: string;
            stdout: string;
            stderr: string;
            exitCode: number;
            completedAt: string;
        } | undefined;
    }>, "many">>;
    auditLog: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        timestamp: z.ZodString;
        source: z.ZodEnum<["system", "chat", "command", "event"]>;
        label: z.ZodString;
        details: z.ZodString;
        profileId: z.ZodOptional<z.ZodString>;
        sessionId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        label: string;
        timestamp: string;
        source: "system" | "event" | "chat" | "command";
        details: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
    }, {
        id: string;
        label: string;
        timestamp: string;
        source: "system" | "event" | "chat" | "command";
        details: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
    }>, "many">;
    pendingConfirmation: z.ZodOptional<z.ZodObject<{
        command: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            auditLabel: z.ZodString;
            issuedAt: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"create_workspace">;
            payload: z.ZodObject<{
                id: z.ZodString;
                title: z.ZodString;
                description: z.ZodDefault<z.ZodString>;
                icon: z.ZodDefault<z.ZodString>;
                layout: z.ZodDefault<z.ZodEnum<["single", "split", "board"]>>;
                components: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"text">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        markdown: z.ZodString;
                        tone: z.ZodDefault<z.ZodEnum<["default", "muted", "info"]>>;
                    }, "strict", z.ZodTypeAny, {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    }, {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    };
                    title?: string | undefined;
                }, {
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"form">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        submitLabel: z.ZodDefault<z.ZodString>;
                        eventType: z.ZodDefault<z.ZodEnum<["filter_changed", "form_submitted"]>>;
                        fields: z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                            id: z.ZodString;
                            label: z.ZodString;
                            helperText: z.ZodOptional<z.ZodString>;
                        } & {
                            kind: z.ZodLiteral<"text">;
                            placeholder: z.ZodOptional<z.ZodString>;
                            defaultValue: z.ZodDefault<z.ZodString>;
                        }, "strict", z.ZodTypeAny, {
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        }, {
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        }>, z.ZodObject<{
                            id: z.ZodString;
                            label: z.ZodString;
                            helperText: z.ZodOptional<z.ZodString>;
                        } & {
                            kind: z.ZodLiteral<"number">;
                            placeholder: z.ZodOptional<z.ZodString>;
                            min: z.ZodOptional<z.ZodNumber>;
                            max: z.ZodOptional<z.ZodNumber>;
                            step: z.ZodOptional<z.ZodNumber>;
                            defaultValue: z.ZodOptional<z.ZodNumber>;
                        }, "strict", z.ZodTypeAny, {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        }, {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        }>, z.ZodObject<{
                            id: z.ZodString;
                            label: z.ZodString;
                            helperText: z.ZodOptional<z.ZodString>;
                        } & {
                            kind: z.ZodLiteral<"select">;
                            options: z.ZodArray<z.ZodObject<{
                                label: z.ZodString;
                                value: z.ZodString;
                            }, "strict", z.ZodTypeAny, {
                                value: string;
                                label: string;
                            }, {
                                value: string;
                                label: string;
                            }>, "many">;
                            defaultValue: z.ZodOptional<z.ZodString>;
                        }, "strict", z.ZodTypeAny, {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        }, {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        }>, z.ZodObject<{
                            id: z.ZodString;
                            label: z.ZodString;
                            helperText: z.ZodOptional<z.ZodString>;
                        } & {
                            kind: z.ZodLiteral<"toggle">;
                            defaultValue: z.ZodDefault<z.ZodBoolean>;
                        }, "strict", z.ZodTypeAny, {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        }, {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        }>]>, "many">;
                    }, "strict", z.ZodTypeAny, {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    }, {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "form";
                    id: string;
                    props: {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    };
                    title?: string | undefined;
                }, {
                    type: "form";
                    id: string;
                    props: {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"cards">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        emptyMessage: z.ZodString;
                        titleKey: z.ZodString;
                        subtitleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                        metricFields: z.ZodDefault<z.ZodArray<z.ZodObject<{
                            label: z.ZodString;
                            key: z.ZodString;
                            format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                        }, "strict", z.ZodTypeAny, {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }, {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }>, "many">>;
                        selectable: z.ZodDefault<z.ZodBoolean>;
                    }, "strict", z.ZodTypeAny, {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    }, {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    };
                    title?: string | undefined;
                }, {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"detail">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        emptyMessage: z.ZodString;
                        fields: z.ZodArray<z.ZodObject<{
                            label: z.ZodString;
                            key: z.ZodString;
                            format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                        }, "strict", z.ZodTypeAny, {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }, {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }>, "many">;
                    }, "strict", z.ZodTypeAny, {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    }, {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                }, {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"table">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        emptyMessage: z.ZodString;
                        maxRows: z.ZodDefault<z.ZodNumber>;
                        columns: z.ZodArray<z.ZodObject<{
                            label: z.ZodString;
                            key: z.ZodString;
                            format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                        }, "strict", z.ZodTypeAny, {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }, {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }>, "many">;
                    }, "strict", z.ZodTypeAny, {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    }, {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    };
                    title?: string | undefined;
                }, {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"toolbar">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        actionIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    }, "strict", z.ZodTypeAny, {
                        actionIds: string[];
                    }, {
                        actionIds?: string[] | undefined;
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds: string[];
                    };
                    title?: string | undefined;
                }, {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds?: string[] | undefined;
                    };
                    title?: string | undefined;
                }>, z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"stat">;
                    title: z.ZodOptional<z.ZodString>;
                    props: z.ZodObject<{
                        items: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            label: z.ZodString;
                            metric: z.ZodEnum<["result_count", "selection_count", "average_price", "lowest_price"]>;
                            format: z.ZodDefault<z.ZodEnum<["number", "currency"]>>;
                        }, "strict", z.ZodTypeAny, {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }, {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }>, "many">;
                    }, "strict", z.ZodTypeAny, {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    }, {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    }>;
                }, "strict", z.ZodTypeAny, {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    };
                    title?: string | undefined;
                }, {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    };
                    title?: string | undefined;
                }>]>, "many">;
                actions: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    label: z.ZodString;
                    tone: z.ZodDefault<z.ZodEnum<["primary", "secondary", "danger"]>>;
                    event: z.ZodLiteral<"button_clicked">;
                    description: z.ZodOptional<z.ZodString>;
                    confirmation: z.ZodOptional<z.ZodObject<{
                        title: z.ZodString;
                        description: z.ZodString;
                        confirmLabel: z.ZodDefault<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    }, {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    label: string;
                    tone: "primary" | "secondary" | "danger";
                    event: "button_clicked";
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    } | undefined;
                }, {
                    id: string;
                    label: string;
                    event: "button_clicked";
                    tone?: "primary" | "secondary" | "danger" | undefined;
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    } | undefined;
                }>, "many">>;
                persistedStateSchema: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                    key: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodLiteral<"string">;
                    defaultValue: z.ZodDefault<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    type: "string";
                    label: string;
                    defaultValue: string;
                    key: string;
                }, {
                    type: "string";
                    label: string;
                    key: string;
                    defaultValue?: string | undefined;
                }>, z.ZodObject<{
                    key: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodLiteral<"number">;
                    defaultValue: z.ZodDefault<z.ZodNumber>;
                }, "strict", z.ZodTypeAny, {
                    type: "number";
                    label: string;
                    defaultValue: number;
                    key: string;
                }, {
                    type: "number";
                    label: string;
                    key: string;
                    defaultValue?: number | undefined;
                }>, z.ZodObject<{
                    key: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodLiteral<"boolean">;
                    defaultValue: z.ZodDefault<z.ZodBoolean>;
                }, "strict", z.ZodTypeAny, {
                    type: "boolean";
                    label: string;
                    defaultValue: boolean;
                    key: string;
                }, {
                    type: "boolean";
                    label: string;
                    key: string;
                    defaultValue?: boolean | undefined;
                }>, z.ZodObject<{
                    key: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodLiteral<"string[]">;
                    defaultValue: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }, "strict", z.ZodTypeAny, {
                    type: "string[]";
                    label: string;
                    defaultValue: string[];
                    key: string;
                }, {
                    type: "string[]";
                    label: string;
                    key: string;
                    defaultValue?: string[] | undefined;
                }>, z.ZodObject<{
                    key: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodLiteral<"number[]">;
                    defaultValue: z.ZodDefault<z.ZodArray<z.ZodNumber, "many">>;
                }, "strict", z.ZodTypeAny, {
                    type: "number[]";
                    label: string;
                    defaultValue: number[];
                    key: string;
                }, {
                    type: "number[]";
                    label: string;
                    key: string;
                    defaultValue?: number[] | undefined;
                }>]>, "many">>;
                version: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                title: string;
                description: string;
                icon: string;
                layout: "single" | "split" | "board";
                components: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds: string[];
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    };
                    title?: string | undefined;
                })[];
                actions: {
                    id: string;
                    label: string;
                    tone: "primary" | "secondary" | "danger";
                    event: "button_clicked";
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    } | undefined;
                }[];
                persistedStateSchema: ({
                    type: "string";
                    label: string;
                    defaultValue: string;
                    key: string;
                } | {
                    type: "number";
                    label: string;
                    defaultValue: number;
                    key: string;
                } | {
                    type: "boolean";
                    label: string;
                    defaultValue: boolean;
                    key: string;
                } | {
                    type: "string[]";
                    label: string;
                    defaultValue: string[];
                    key: string;
                } | {
                    type: "number[]";
                    label: string;
                    defaultValue: number[];
                    key: string;
                })[];
                version: number;
            }, {
                id: string;
                title: string;
                components: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds?: string[] | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    };
                    title?: string | undefined;
                })[];
                version: number;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                actions?: {
                    id: string;
                    label: string;
                    event: "button_clicked";
                    tone?: "primary" | "secondary" | "danger" | undefined;
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    } | undefined;
                }[] | undefined;
                persistedStateSchema?: ({
                    type: "string";
                    label: string;
                    key: string;
                    defaultValue?: string | undefined;
                } | {
                    type: "number";
                    label: string;
                    key: string;
                    defaultValue?: number | undefined;
                } | {
                    type: "boolean";
                    label: string;
                    key: string;
                    defaultValue?: boolean | undefined;
                } | {
                    type: "string[]";
                    label: string;
                    key: string;
                    defaultValue?: string[] | undefined;
                } | {
                    type: "number[]";
                    label: string;
                    key: string;
                    defaultValue?: number[] | undefined;
                })[] | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "create_workspace";
            payload: {
                id: string;
                title: string;
                description: string;
                icon: string;
                layout: "single" | "split" | "board";
                components: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds: string[];
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    };
                    title?: string | undefined;
                })[];
                actions: {
                    id: string;
                    label: string;
                    tone: "primary" | "secondary" | "danger";
                    event: "button_clicked";
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    } | undefined;
                }[];
                persistedStateSchema: ({
                    type: "string";
                    label: string;
                    defaultValue: string;
                    key: string;
                } | {
                    type: "number";
                    label: string;
                    defaultValue: number;
                    key: string;
                } | {
                    type: "boolean";
                    label: string;
                    defaultValue: boolean;
                    key: string;
                } | {
                    type: "string[]";
                    label: string;
                    defaultValue: string[];
                    key: string;
                } | {
                    type: "number[]";
                    label: string;
                    defaultValue: number[];
                    key: string;
                })[];
                version: number;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }, {
            type: "create_workspace";
            payload: {
                id: string;
                title: string;
                components: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds?: string[] | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    };
                    title?: string | undefined;
                })[];
                version: number;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                actions?: {
                    id: string;
                    label: string;
                    event: "button_clicked";
                    tone?: "primary" | "secondary" | "danger" | undefined;
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    } | undefined;
                }[] | undefined;
                persistedStateSchema?: ({
                    type: "string";
                    label: string;
                    key: string;
                    defaultValue?: string | undefined;
                } | {
                    type: "number";
                    label: string;
                    key: string;
                    defaultValue?: number | undefined;
                } | {
                    type: "boolean";
                    label: string;
                    key: string;
                    defaultValue?: boolean | undefined;
                } | {
                    type: "string[]";
                    label: string;
                    key: string;
                    defaultValue?: string[] | undefined;
                } | {
                    type: "number[]";
                    label: string;
                    key: string;
                    defaultValue?: number[] | undefined;
                })[] | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }>, z.ZodObject<{
            auditLabel: z.ZodString;
            issuedAt: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"update_workspace">;
            payload: z.ZodObject<{
                workspaceId: z.ZodString;
                definitionPatch: z.ZodDefault<z.ZodObject<{
                    title: z.ZodOptional<z.ZodString>;
                    description: z.ZodOptional<z.ZodString>;
                    icon: z.ZodOptional<z.ZodString>;
                    layout: z.ZodOptional<z.ZodEnum<["single", "split", "board"]>>;
                    components: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                        id: z.ZodString;
                        type: z.ZodLiteral<"text">;
                        title: z.ZodOptional<z.ZodString>;
                        props: z.ZodObject<{
                            markdown: z.ZodString;
                            tone: z.ZodDefault<z.ZodEnum<["default", "muted", "info"]>>;
                        }, "strict", z.ZodTypeAny, {
                            markdown: string;
                            tone: "default" | "muted" | "info";
                        }, {
                            markdown: string;
                            tone?: "default" | "muted" | "info" | undefined;
                        }>;
                    }, "strict", z.ZodTypeAny, {
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone: "default" | "muted" | "info";
                        };
                        title?: string | undefined;
                    }, {
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone?: "default" | "muted" | "info" | undefined;
                        };
                        title?: string | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        type: z.ZodLiteral<"form">;
                        title: z.ZodOptional<z.ZodString>;
                        props: z.ZodObject<{
                            submitLabel: z.ZodDefault<z.ZodString>;
                            eventType: z.ZodDefault<z.ZodEnum<["filter_changed", "form_submitted"]>>;
                            fields: z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                                id: z.ZodString;
                                label: z.ZodString;
                                helperText: z.ZodOptional<z.ZodString>;
                            } & {
                                kind: z.ZodLiteral<"text">;
                                placeholder: z.ZodOptional<z.ZodString>;
                                defaultValue: z.ZodDefault<z.ZodString>;
                            }, "strict", z.ZodTypeAny, {
                                id: string;
                                kind: "text";
                                label: string;
                                defaultValue: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                            }, {
                                id: string;
                                kind: "text";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: string | undefined;
                            }>, z.ZodObject<{
                                id: z.ZodString;
                                label: z.ZodString;
                                helperText: z.ZodOptional<z.ZodString>;
                            } & {
                                kind: z.ZodLiteral<"number">;
                                placeholder: z.ZodOptional<z.ZodString>;
                                min: z.ZodOptional<z.ZodNumber>;
                                max: z.ZodOptional<z.ZodNumber>;
                                step: z.ZodOptional<z.ZodNumber>;
                                defaultValue: z.ZodOptional<z.ZodNumber>;
                            }, "strict", z.ZodTypeAny, {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            }, {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            }>, z.ZodObject<{
                                id: z.ZodString;
                                label: z.ZodString;
                                helperText: z.ZodOptional<z.ZodString>;
                            } & {
                                kind: z.ZodLiteral<"select">;
                                options: z.ZodArray<z.ZodObject<{
                                    label: z.ZodString;
                                    value: z.ZodString;
                                }, "strict", z.ZodTypeAny, {
                                    value: string;
                                    label: string;
                                }, {
                                    value: string;
                                    label: string;
                                }>, "many">;
                                defaultValue: z.ZodOptional<z.ZodString>;
                            }, "strict", z.ZodTypeAny, {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            }, {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            }>, z.ZodObject<{
                                id: z.ZodString;
                                label: z.ZodString;
                                helperText: z.ZodOptional<z.ZodString>;
                            } & {
                                kind: z.ZodLiteral<"toggle">;
                                defaultValue: z.ZodDefault<z.ZodBoolean>;
                            }, "strict", z.ZodTypeAny, {
                                id: string;
                                kind: "toggle";
                                label: string;
                                defaultValue: boolean;
                                helperText?: string | undefined;
                            }, {
                                id: string;
                                kind: "toggle";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: boolean | undefined;
                            }>]>, "many">;
                        }, "strict", z.ZodTypeAny, {
                            submitLabel: string;
                            eventType: "filter_changed" | "form_submitted";
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                defaultValue: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                defaultValue: boolean;
                                helperText?: string | undefined;
                            })[];
                        }, {
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: boolean | undefined;
                            })[];
                            submitLabel?: string | undefined;
                            eventType?: "filter_changed" | "form_submitted" | undefined;
                        }>;
                    }, "strict", z.ZodTypeAny, {
                        type: "form";
                        id: string;
                        props: {
                            submitLabel: string;
                            eventType: "filter_changed" | "form_submitted";
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                defaultValue: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                defaultValue: boolean;
                                helperText?: string | undefined;
                            })[];
                        };
                        title?: string | undefined;
                    }, {
                        type: "form";
                        id: string;
                        props: {
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: boolean | undefined;
                            })[];
                            submitLabel?: string | undefined;
                            eventType?: "filter_changed" | "form_submitted" | undefined;
                        };
                        title?: string | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        type: z.ZodLiteral<"cards">;
                        title: z.ZodOptional<z.ZodString>;
                        props: z.ZodObject<{
                            emptyMessage: z.ZodString;
                            titleKey: z.ZodString;
                            subtitleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                            metricFields: z.ZodDefault<z.ZodArray<z.ZodObject<{
                                label: z.ZodString;
                                key: z.ZodString;
                                format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                            }, "strict", z.ZodTypeAny, {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }, {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }>, "many">>;
                            selectable: z.ZodDefault<z.ZodBoolean>;
                        }, "strict", z.ZodTypeAny, {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys: string[];
                            metricFields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            selectable: boolean;
                        }, {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys?: string[] | undefined;
                            metricFields?: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[] | undefined;
                            selectable?: boolean | undefined;
                        }>;
                    }, "strict", z.ZodTypeAny, {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys: string[];
                            metricFields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            selectable: boolean;
                        };
                        title?: string | undefined;
                    }, {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys?: string[] | undefined;
                            metricFields?: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[] | undefined;
                            selectable?: boolean | undefined;
                        };
                        title?: string | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        type: z.ZodLiteral<"detail">;
                        title: z.ZodOptional<z.ZodString>;
                        props: z.ZodObject<{
                            emptyMessage: z.ZodString;
                            fields: z.ZodArray<z.ZodObject<{
                                label: z.ZodString;
                                key: z.ZodString;
                                format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                            }, "strict", z.ZodTypeAny, {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }, {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }>, "many">;
                        }, "strict", z.ZodTypeAny, {
                            fields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            emptyMessage: string;
                        }, {
                            fields: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            emptyMessage: string;
                        }>;
                    }, "strict", z.ZodTypeAny, {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    }, {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        type: z.ZodLiteral<"table">;
                        title: z.ZodOptional<z.ZodString>;
                        props: z.ZodObject<{
                            emptyMessage: z.ZodString;
                            maxRows: z.ZodDefault<z.ZodNumber>;
                            columns: z.ZodArray<z.ZodObject<{
                                label: z.ZodString;
                                key: z.ZodString;
                                format: z.ZodDefault<z.ZodEnum<["text", "currency", "number"]>>;
                            }, "strict", z.ZodTypeAny, {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }, {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }>, "many">;
                        }, "strict", z.ZodTypeAny, {
                            emptyMessage: string;
                            maxRows: number;
                            columns: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                        }, {
                            emptyMessage: string;
                            columns: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            maxRows?: number | undefined;
                        }>;
                    }, "strict", z.ZodTypeAny, {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            maxRows: number;
                            columns: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                        };
                        title?: string | undefined;
                    }, {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            columns: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            maxRows?: number | undefined;
                        };
                        title?: string | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        type: z.ZodLiteral<"toolbar">;
                        title: z.ZodOptional<z.ZodString>;
                        props: z.ZodObject<{
                            actionIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                        }, "strict", z.ZodTypeAny, {
                            actionIds: string[];
                        }, {
                            actionIds?: string[] | undefined;
                        }>;
                    }, "strict", z.ZodTypeAny, {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds: string[];
                        };
                        title?: string | undefined;
                    }, {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds?: string[] | undefined;
                        };
                        title?: string | undefined;
                    }>, z.ZodObject<{
                        id: z.ZodString;
                        type: z.ZodLiteral<"stat">;
                        title: z.ZodOptional<z.ZodString>;
                        props: z.ZodObject<{
                            items: z.ZodArray<z.ZodObject<{
                                id: z.ZodString;
                                label: z.ZodString;
                                metric: z.ZodEnum<["result_count", "selection_count", "average_price", "lowest_price"]>;
                                format: z.ZodDefault<z.ZodEnum<["number", "currency"]>>;
                            }, "strict", z.ZodTypeAny, {
                                id: string;
                                label: string;
                                format: "number" | "currency";
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            }, {
                                id: string;
                                label: string;
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                                format?: "number" | "currency" | undefined;
                            }>, "many">;
                        }, "strict", z.ZodTypeAny, {
                            items: {
                                id: string;
                                label: string;
                                format: "number" | "currency";
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            }[];
                        }, {
                            items: {
                                id: string;
                                label: string;
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                                format?: "number" | "currency" | undefined;
                            }[];
                        }>;
                    }, "strict", z.ZodTypeAny, {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                format: "number" | "currency";
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            }[];
                        };
                        title?: string | undefined;
                    }, {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                                format?: "number" | "currency" | undefined;
                            }[];
                        };
                        title?: string | undefined;
                    }>]>, "many">>;
                    actions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        label: z.ZodString;
                        tone: z.ZodDefault<z.ZodEnum<["primary", "secondary", "danger"]>>;
                        event: z.ZodLiteral<"button_clicked">;
                        description: z.ZodOptional<z.ZodString>;
                        confirmation: z.ZodOptional<z.ZodObject<{
                            title: z.ZodString;
                            description: z.ZodString;
                            confirmLabel: z.ZodDefault<z.ZodString>;
                        }, "strict", z.ZodTypeAny, {
                            title: string;
                            description: string;
                            confirmLabel: string;
                        }, {
                            title: string;
                            description: string;
                            confirmLabel?: string | undefined;
                        }>>;
                    }, "strict", z.ZodTypeAny, {
                        id: string;
                        label: string;
                        tone: "primary" | "secondary" | "danger";
                        event: "button_clicked";
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel: string;
                        } | undefined;
                    }, {
                        id: string;
                        label: string;
                        event: "button_clicked";
                        tone?: "primary" | "secondary" | "danger" | undefined;
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel?: string | undefined;
                        } | undefined;
                    }>, "many">>;
                    version: z.ZodOptional<z.ZodNumber>;
                }, "strict", z.ZodTypeAny, {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone: "default" | "muted" | "info";
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            submitLabel: string;
                            eventType: "filter_changed" | "form_submitted";
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                defaultValue: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                defaultValue: boolean;
                                helperText?: string | undefined;
                            })[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys: string[];
                            metricFields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            selectable: boolean;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            maxRows: number;
                            columns: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds: string[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                format: "number" | "currency";
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        tone: "primary" | "secondary" | "danger";
                        event: "button_clicked";
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel: string;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                }, {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone?: "default" | "muted" | "info" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: boolean | undefined;
                            })[];
                            submitLabel?: string | undefined;
                            eventType?: "filter_changed" | "form_submitted" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys?: string[] | undefined;
                            metricFields?: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[] | undefined;
                            selectable?: boolean | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            columns: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            maxRows?: number | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds?: string[] | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                                format?: "number" | "currency" | undefined;
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        event: "button_clicked";
                        tone?: "primary" | "secondary" | "danger" | undefined;
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                }>>;
                statePatch: z.ZodDefault<z.ZodObject<{
                    filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
                    selectedItemId: z.ZodOptional<z.ZodString>;
                    pagination: z.ZodOptional<z.ZodObject<{
                        page: z.ZodOptional<z.ZodNumber>;
                        pageSize: z.ZodOptional<z.ZodNumber>;
                        total: z.ZodOptional<z.ZodNumber>;
                    }, "strict", z.ZodTypeAny, {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    }, {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    }>>;
                    formValues: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
                    notes: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodObject<{
                        lastUpdatedAt: z.ZodOptional<z.ZodString>;
                        source: z.ZodOptional<z.ZodEnum<["local", "hermes"]>>;
                        lastEvent: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    }, {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                }, {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                workspaceId: string;
                definitionPatch: {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone: "default" | "muted" | "info";
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            submitLabel: string;
                            eventType: "filter_changed" | "form_submitted";
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                defaultValue: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                defaultValue: boolean;
                                helperText?: string | undefined;
                            })[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys: string[];
                            metricFields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            selectable: boolean;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            maxRows: number;
                            columns: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds: string[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                format: "number" | "currency";
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        tone: "primary" | "secondary" | "danger";
                        event: "button_clicked";
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel: string;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                };
                statePatch: {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                };
            }, {
                workspaceId: string;
                definitionPatch?: {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone?: "default" | "muted" | "info" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: boolean | undefined;
                            })[];
                            submitLabel?: string | undefined;
                            eventType?: "filter_changed" | "form_submitted" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys?: string[] | undefined;
                            metricFields?: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[] | undefined;
                            selectable?: boolean | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            columns: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            maxRows?: number | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds?: string[] | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                                format?: "number" | "currency" | undefined;
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        event: "button_clicked";
                        tone?: "primary" | "secondary" | "danger" | undefined;
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                } | undefined;
                statePatch?: {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                } | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "update_workspace";
            payload: {
                workspaceId: string;
                definitionPatch: {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone: "default" | "muted" | "info";
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            submitLabel: string;
                            eventType: "filter_changed" | "form_submitted";
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                defaultValue: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                defaultValue: boolean;
                                helperText?: string | undefined;
                            })[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys: string[];
                            metricFields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            selectable: boolean;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            maxRows: number;
                            columns: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds: string[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                format: "number" | "currency";
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        tone: "primary" | "secondary" | "danger";
                        event: "button_clicked";
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel: string;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                };
                statePatch: {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                };
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }, {
            type: "update_workspace";
            payload: {
                workspaceId: string;
                definitionPatch?: {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone?: "default" | "muted" | "info" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: boolean | undefined;
                            })[];
                            submitLabel?: string | undefined;
                            eventType?: "filter_changed" | "form_submitted" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys?: string[] | undefined;
                            metricFields?: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[] | undefined;
                            selectable?: boolean | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            columns: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            maxRows?: number | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds?: string[] | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                                format?: "number" | "currency" | undefined;
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        event: "button_clicked";
                        tone?: "primary" | "secondary" | "danger" | undefined;
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                } | undefined;
                statePatch?: {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }>, z.ZodObject<{
            auditLabel: z.ZodString;
            issuedAt: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"delete_workspace">;
            payload: z.ZodObject<{
                workspaceId: z.ZodString;
                confirmation: z.ZodOptional<z.ZodObject<{
                    title: z.ZodString;
                    description: z.ZodString;
                    confirmLabel: z.ZodDefault<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    title: string;
                    description: string;
                    confirmLabel: string;
                }, {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                workspaceId: string;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            }, {
                workspaceId: string;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "delete_workspace";
            payload: {
                workspaceId: string;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }, {
            type: "delete_workspace";
            payload: {
                workspaceId: string;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }>, z.ZodObject<{
            auditLabel: z.ZodString;
            issuedAt: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"open_tab">;
            payload: z.ZodObject<{
                tabId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                tabId: string;
            }, {
                tabId: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "open_tab";
            payload: {
                tabId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }, {
            type: "open_tab";
            payload: {
                tabId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }>, z.ZodObject<{
            auditLabel: z.ZodString;
            issuedAt: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"focus_workspace">;
            payload: z.ZodObject<{
                workspaceId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                workspaceId: string;
            }, {
                workspaceId: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "focus_workspace";
            payload: {
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }, {
            type: "focus_workspace";
            payload: {
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }>, z.ZodObject<{
            auditLabel: z.ZodString;
            issuedAt: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"show_toast">;
            payload: z.ZodObject<{
                tone: z.ZodEnum<["info", "success", "warning", "error"]>;
                message: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                message: string;
                tone: "info" | "success" | "warning" | "error";
            }, {
                message: string;
                tone: "info" | "success" | "warning" | "error";
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "show_toast";
            payload: {
                message: string;
                tone: "info" | "success" | "warning" | "error";
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }, {
            type: "show_toast";
            payload: {
                message: string;
                tone: "info" | "success" | "warning" | "error";
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }>, z.ZodObject<{
            auditLabel: z.ZodString;
            issuedAt: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"set_form_values">;
            payload: z.ZodObject<{
                workspaceId: z.ZodString;
                values: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>;
            }, "strict", z.ZodTypeAny, {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            }, {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "set_form_values";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }, {
            type: "set_form_values";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }>, z.ZodObject<{
            auditLabel: z.ZodString;
            issuedAt: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"set_results">;
            payload: z.ZodObject<{
                workspaceId: z.ZodString;
                results: z.ZodDefault<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
            }, "strict", z.ZodTypeAny, {
                workspaceId: string;
                results: Record<string, unknown>[];
            }, {
                workspaceId: string;
                results?: Record<string, unknown>[] | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "set_results";
            payload: {
                workspaceId: string;
                results: Record<string, unknown>[];
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }, {
            type: "set_results";
            payload: {
                workspaceId: string;
                results?: Record<string, unknown>[] | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }>, z.ZodObject<{
            auditLabel: z.ZodString;
            issuedAt: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"request_user_input">;
            payload: z.ZodObject<{
                workspaceId: z.ZodOptional<z.ZodString>;
                prompt: z.ZodString;
                inputKind: z.ZodDefault<z.ZodEnum<["text", "confirm"]>>;
                placeholder: z.ZodOptional<z.ZodString>;
                confirmLabel: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                confirmLabel: string;
                prompt: string;
                inputKind: "text" | "confirm";
                placeholder?: string | undefined;
                workspaceId?: string | undefined;
            }, {
                prompt: string;
                placeholder?: string | undefined;
                confirmLabel?: string | undefined;
                workspaceId?: string | undefined;
                inputKind?: "text" | "confirm" | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "request_user_input";
            payload: {
                confirmLabel: string;
                prompt: string;
                inputKind: "text" | "confirm";
                placeholder?: string | undefined;
                workspaceId?: string | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }, {
            type: "request_user_input";
            payload: {
                prompt: string;
                placeholder?: string | undefined;
                confirmLabel?: string | undefined;
                workspaceId?: string | undefined;
                inputKind?: "text" | "confirm" | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        }>]>;
        request: z.ZodObject<{
            title: z.ZodString;
            description: z.ZodString;
            confirmLabel: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            title: string;
            description: string;
            confirmLabel: string;
        }, {
            title: string;
            description: string;
            confirmLabel?: string | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        command: {
            type: "create_workspace";
            payload: {
                id: string;
                title: string;
                description: string;
                icon: string;
                layout: "single" | "split" | "board";
                components: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds: string[];
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    };
                    title?: string | undefined;
                })[];
                actions: {
                    id: string;
                    label: string;
                    tone: "primary" | "secondary" | "danger";
                    event: "button_clicked";
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    } | undefined;
                }[];
                persistedStateSchema: ({
                    type: "string";
                    label: string;
                    defaultValue: string;
                    key: string;
                } | {
                    type: "number";
                    label: string;
                    defaultValue: number;
                    key: string;
                } | {
                    type: "boolean";
                    label: string;
                    defaultValue: boolean;
                    key: string;
                } | {
                    type: "string[]";
                    label: string;
                    defaultValue: string[];
                    key: string;
                } | {
                    type: "number[]";
                    label: string;
                    defaultValue: number[];
                    key: string;
                })[];
                version: number;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "update_workspace";
            payload: {
                workspaceId: string;
                definitionPatch: {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone: "default" | "muted" | "info";
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            submitLabel: string;
                            eventType: "filter_changed" | "form_submitted";
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                defaultValue: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                defaultValue: boolean;
                                helperText?: string | undefined;
                            })[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys: string[];
                            metricFields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            selectable: boolean;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            maxRows: number;
                            columns: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds: string[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                format: "number" | "currency";
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        tone: "primary" | "secondary" | "danger";
                        event: "button_clicked";
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel: string;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                };
                statePatch: {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                };
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "delete_workspace";
            payload: {
                workspaceId: string;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "open_tab";
            payload: {
                tabId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "focus_workspace";
            payload: {
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "show_toast";
            payload: {
                message: string;
                tone: "info" | "success" | "warning" | "error";
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_form_values";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_results";
            payload: {
                workspaceId: string;
                results: Record<string, unknown>[];
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "request_user_input";
            payload: {
                confirmLabel: string;
                prompt: string;
                inputKind: "text" | "confirm";
                placeholder?: string | undefined;
                workspaceId?: string | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        };
        request: {
            title: string;
            description: string;
            confirmLabel: string;
        };
    }, {
        command: {
            type: "create_workspace";
            payload: {
                id: string;
                title: string;
                components: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds?: string[] | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    };
                    title?: string | undefined;
                })[];
                version: number;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                actions?: {
                    id: string;
                    label: string;
                    event: "button_clicked";
                    tone?: "primary" | "secondary" | "danger" | undefined;
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    } | undefined;
                }[] | undefined;
                persistedStateSchema?: ({
                    type: "string";
                    label: string;
                    key: string;
                    defaultValue?: string | undefined;
                } | {
                    type: "number";
                    label: string;
                    key: string;
                    defaultValue?: number | undefined;
                } | {
                    type: "boolean";
                    label: string;
                    key: string;
                    defaultValue?: boolean | undefined;
                } | {
                    type: "string[]";
                    label: string;
                    key: string;
                    defaultValue?: string[] | undefined;
                } | {
                    type: "number[]";
                    label: string;
                    key: string;
                    defaultValue?: number[] | undefined;
                })[] | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "update_workspace";
            payload: {
                workspaceId: string;
                definitionPatch?: {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone?: "default" | "muted" | "info" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: boolean | undefined;
                            })[];
                            submitLabel?: string | undefined;
                            eventType?: "filter_changed" | "form_submitted" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys?: string[] | undefined;
                            metricFields?: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[] | undefined;
                            selectable?: boolean | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            columns: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            maxRows?: number | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds?: string[] | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                                format?: "number" | "currency" | undefined;
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        event: "button_clicked";
                        tone?: "primary" | "secondary" | "danger" | undefined;
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                } | undefined;
                statePatch?: {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "delete_workspace";
            payload: {
                workspaceId: string;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "open_tab";
            payload: {
                tabId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "focus_workspace";
            payload: {
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "show_toast";
            payload: {
                message: string;
                tone: "info" | "success" | "warning" | "error";
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_form_values";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_results";
            payload: {
                workspaceId: string;
                results?: Record<string, unknown>[] | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "request_user_input";
            payload: {
                prompt: string;
                placeholder?: string | undefined;
                confirmLabel?: string | undefined;
                workspaceId?: string | undefined;
                inputKind?: "text" | "confirm" | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        };
        request: {
            title: string;
            description: string;
            confirmLabel?: string | undefined;
        };
    }>>;
    pendingUserInput: z.ZodOptional<z.ZodObject<{
        workspaceId: z.ZodOptional<z.ZodString>;
        prompt: z.ZodString;
        inputKind: z.ZodEnum<["text", "confirm"]>;
        placeholder: z.ZodOptional<z.ZodString>;
        confirmLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        confirmLabel: string;
        prompt: string;
        inputKind: "text" | "confirm";
        placeholder?: string | undefined;
        workspaceId?: string | undefined;
    }, {
        confirmLabel: string;
        prompt: string;
        inputKind: "text" | "confirm";
        placeholder?: string | undefined;
        workspaceId?: string | undefined;
    }>>;
    pendingToolApproval: z.ZodOptional<z.ZodObject<{
        request: z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"shell_command">;
            summary: z.ZodString;
            command: z.ZodString;
            args: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            cwd: z.ZodOptional<z.ZodString>;
            requiresConfirmation: z.ZodDefault<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args: string[];
            requiresConfirmation: boolean;
            cwd?: string | undefined;
        }, {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args?: string[] | undefined;
            cwd?: string | undefined;
            requiresConfirmation?: boolean | undefined;
        }>;
        profileId: z.ZodOptional<z.ZodString>;
        profileName: z.ZodOptional<z.ZodString>;
        sessionId: z.ZodOptional<z.ZodString>;
        sessionTitle: z.ZodOptional<z.ZodString>;
        requestedAt: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args: string[];
            requiresConfirmation: boolean;
            cwd?: string | undefined;
        };
        requestedAt: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
        profileName?: string | undefined;
        sessionTitle?: string | undefined;
    }, {
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args?: string[] | undefined;
            cwd?: string | undefined;
            requiresConfirmation?: boolean | undefined;
        };
        requestedAt: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
        profileName?: string | undefined;
        sessionTitle?: string | undefined;
    }>>;
    inspectorMode: z.ZodEnum<["audit", "state", "artifacts"]>;
    sessionSummary: z.ZodObject<{
        profileId: z.ZodString;
        profileName: z.ZodString;
        sessionId: z.ZodString;
        sessionTitle: z.ZodString;
        activeTab: z.ZodEnum<["chat", "workspace", "jobs", "settings", "profiles"]>;
        focusedWorkspaceId: z.ZodNullable<z.ZodString>;
        messageCount: z.ZodNumber;
        workspaceCount: z.ZodNumber;
        jobCount: z.ZodNumber;
        reminderCount: z.ZodNumber;
        artifactCount: z.ZodNumber;
        lastInteractionAt: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        messageCount: number;
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        workspaceCount: number;
        jobCount: number;
        reminderCount: number;
        artifactCount: number;
        lastInteractionAt: string;
    }, {
        messageCount: number;
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        workspaceCount: number;
        jobCount: number;
        reminderCount: number;
        artifactCount: number;
        lastInteractionAt: string;
    }>;
    artifacts: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        kind: z.ZodEnum<["saved_search", "checklist", "session_note"]>;
        title: z.ZodString;
        summary: z.ZodString;
        createdAt: z.ZodString;
        workspaceId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        kind: "saved_search" | "checklist" | "session_note";
        title: string;
        summary: string;
        createdAt: string;
        workspaceId?: string | undefined;
    }, {
        id: string;
        kind: "saved_search" | "checklist" | "session_note";
        title: string;
        summary: string;
        createdAt: string;
        workspaceId?: string | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    version: 2 | 3;
    jobs: {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }[];
    profiles: {
        id: string;
        description: string;
        name: string;
        provider: "hermes" | "openclaw";
    }[];
    activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
    jobsCacheState: {
        status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
        version: 1;
        source: "local_cache" | "hermes_cli";
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    };
    reminders: {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }[];
    artifacts: {
        id: string;
        kind: "saved_search" | "checklist" | "session_note";
        title: string;
        summary: string;
        createdAt: string;
        workspaceId?: string | undefined;
    }[];
    workspaces: Record<string, {
        results: Record<string, unknown>[];
        definition: {
            id: string;
            title: string;
            description: string;
            icon: string;
            layout: "single" | "split" | "board";
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone: "default" | "muted" | "info";
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    submitLabel: string;
                    eventType: "filter_changed" | "form_submitted";
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    })[];
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys: string[];
                    metricFields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    selectable: boolean;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    maxRows: number;
                    columns: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds: string[];
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }[];
                };
                title?: string | undefined;
            })[];
            actions: {
                id: string;
                label: string;
                tone: "primary" | "secondary" | "danger";
                event: "button_clicked";
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            }[];
            persistedStateSchema: ({
                type: "string";
                label: string;
                defaultValue: string;
                key: string;
            } | {
                type: "number";
                label: string;
                defaultValue: number;
                key: string;
            } | {
                type: "boolean";
                label: string;
                defaultValue: boolean;
                key: string;
            } | {
                type: "string[]";
                label: string;
                defaultValue: string[];
                key: string;
            } | {
                type: "number[]";
                label: string;
                defaultValue: number[];
                key: string;
            })[];
            version: number;
        };
        state: {
            version: number;
            filters: Record<string, string | number | boolean | string[] | number[]>;
            pagination: {
                page: number;
                pageSize: number;
                total?: number | undefined;
            };
            formValues: Record<string, string | number | boolean | string[] | number[]>;
            notes: string;
            metadata: {
                lastUpdatedAt: string;
                source: "local" | "hermes";
                lastEvent: string;
            };
            selectedItemId?: string | undefined;
        };
        pinned: boolean;
        archived: boolean;
    }>;
    themeMode: "dark" | "light";
    activeProfileId: string;
    sessions: ({
        id: string;
        title: string;
        provider: "hermes" | "openclaw";
        summary: string;
        lastUpdatedAt?: string | undefined;
        runtimeSessionId?: string | undefined;
        messageCount?: number | undefined;
        lastUsedProfileId?: string | undefined;
    } | {
        id: string;
        title: string;
        provider: "hermes" | "openclaw";
        summary: string;
        profileId: string;
        lastUpdatedAt?: string | undefined;
        runtimeSessionId?: string | undefined;
        messageCount?: number | undefined;
        lastUsedProfileId?: string | undefined;
    })[];
    activeSessionId: string;
    sessionMessages: Record<string, {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        blocks: {
            type: "markdown";
            id: string;
            markdown: string;
        }[];
        attachments: {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }[];
        timestamp: string;
    }[]>;
    workspaceOrder: string[];
    profileState: Record<string, {
        version: 1;
        jobs: {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }[];
        jobsCacheState: {
            status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
            version: 1;
            source: "local_cache" | "hermes_cli";
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        };
        reminders: {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }[];
    }>;
    toolSettings: {
        transportMode: "bridge";
        allowFilesystemRead: boolean;
        allowShellExecution: boolean;
        allowDesktopNotifications: boolean;
        confirmDestructiveActions: boolean;
    };
    toolExecutionHistory: {
        status: "completed" | "failed" | "rejected" | "pending" | "dismissed";
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args: string[];
            requiresConfirmation: boolean;
            cwd?: string | undefined;
        };
        requestedAt: string;
        resolvedAt?: string | undefined;
        result?: {
            status: "completed" | "failed" | "rejected";
            summary: string;
            requestId: string;
            stdout: string;
            stderr: string;
            exitCode: number;
            completedAt: string;
        } | undefined;
    }[];
    auditLog: {
        id: string;
        label: string;
        timestamp: string;
        source: "system" | "event" | "chat" | "command";
        details: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
    }[];
    inspectorMode: "state" | "audit" | "artifacts";
    sessionSummary: {
        messageCount: number;
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        workspaceCount: number;
        jobCount: number;
        reminderCount: number;
        artifactCount: number;
        lastInteractionAt: string;
    };
    pageState: {
        version: 1;
        chat: {
            version: 1;
            lastVisitedSessionId?: string | undefined;
        };
        jobs: {
            version: 1;
            lastViewedAt?: string | undefined;
            lastManualRefreshAt?: string | undefined;
        };
        settings: {
            version: 1;
            activeSection: "general" | "allowlist" | "tool_history" | "recent_activity";
            toolHistoryPageByProfile: Record<string, number>;
            recentActivityPageByProfile: Record<string, number>;
            lastViewedAt?: string | undefined;
            highlightedToolRequestId?: string | undefined;
        };
        profiles: {
            version: 1;
            lastSelectedSessionByProfile: Record<string, string>;
            recentSessionIdsByProfile: Record<string, string[]>;
            sessionBrowserPageByProfile: Record<string, number>;
            lastViewedAt?: string | undefined;
        } | {
            version: 2;
            recentSessionIds: string[];
            sessionBrowserPage: number;
            lastViewedAt?: string | undefined;
            lastSelectedSessionId?: string | undefined;
        };
        workspaces: {
            version: 1;
            views: Record<string, {
                version: 1;
                lastViewedAt?: string | undefined;
                selectedResultId?: string | undefined;
            }>;
        };
    };
    focusedWorkspaceId?: string | undefined;
    pendingConfirmation?: {
        command: {
            type: "create_workspace";
            payload: {
                id: string;
                title: string;
                description: string;
                icon: string;
                layout: "single" | "split" | "board";
                components: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds: string[];
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    };
                    title?: string | undefined;
                })[];
                actions: {
                    id: string;
                    label: string;
                    tone: "primary" | "secondary" | "danger";
                    event: "button_clicked";
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    } | undefined;
                }[];
                persistedStateSchema: ({
                    type: "string";
                    label: string;
                    defaultValue: string;
                    key: string;
                } | {
                    type: "number";
                    label: string;
                    defaultValue: number;
                    key: string;
                } | {
                    type: "boolean";
                    label: string;
                    defaultValue: boolean;
                    key: string;
                } | {
                    type: "string[]";
                    label: string;
                    defaultValue: string[];
                    key: string;
                } | {
                    type: "number[]";
                    label: string;
                    defaultValue: number[];
                    key: string;
                })[];
                version: number;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "update_workspace";
            payload: {
                workspaceId: string;
                definitionPatch: {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone: "default" | "muted" | "info";
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            submitLabel: string;
                            eventType: "filter_changed" | "form_submitted";
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                defaultValue: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                defaultValue: boolean;
                                helperText?: string | undefined;
                            })[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys: string[];
                            metricFields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            selectable: boolean;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            maxRows: number;
                            columns: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds: string[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                format: "number" | "currency";
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        tone: "primary" | "secondary" | "danger";
                        event: "button_clicked";
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel: string;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                };
                statePatch: {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                };
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "delete_workspace";
            payload: {
                workspaceId: string;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "open_tab";
            payload: {
                tabId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "focus_workspace";
            payload: {
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "show_toast";
            payload: {
                message: string;
                tone: "info" | "success" | "warning" | "error";
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_form_values";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_results";
            payload: {
                workspaceId: string;
                results: Record<string, unknown>[];
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "request_user_input";
            payload: {
                confirmLabel: string;
                prompt: string;
                inputKind: "text" | "confirm";
                placeholder?: string | undefined;
                workspaceId?: string | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        };
        request: {
            title: string;
            description: string;
            confirmLabel: string;
        };
    } | undefined;
    pendingUserInput?: {
        confirmLabel: string;
        prompt: string;
        inputKind: "text" | "confirm";
        placeholder?: string | undefined;
        workspaceId?: string | undefined;
    } | undefined;
    pendingToolApproval?: {
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args: string[];
            requiresConfirmation: boolean;
            cwd?: string | undefined;
        };
        requestedAt: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
        profileName?: string | undefined;
        sessionTitle?: string | undefined;
    } | undefined;
    chatMessages?: {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        blocks: {
            type: "markdown";
            id: string;
            markdown: string;
        }[];
        attachments: {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }[];
        timestamp: string;
    }[] | undefined;
}, {
    version: 2 | 3;
    jobs: {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }[];
    profiles: {
        id: string;
        description: string;
        name: string;
        provider?: "hermes" | "openclaw" | undefined;
    }[];
    activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
    reminders: {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }[];
    artifacts: {
        id: string;
        kind: "saved_search" | "checklist" | "session_note";
        title: string;
        summary: string;
        createdAt: string;
        workspaceId?: string | undefined;
    }[];
    workspaces: Record<string, {
        definition: {
            id: string;
            title: string;
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone?: "default" | "muted" | "info" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    })[];
                    submitLabel?: string | undefined;
                    eventType?: "filter_changed" | "form_submitted" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys?: string[] | undefined;
                    metricFields?: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[] | undefined;
                    selectable?: boolean | undefined;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    columns: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    maxRows?: number | undefined;
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds?: string[] | undefined;
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }[];
                };
                title?: string | undefined;
            })[];
            version: number;
            description?: string | undefined;
            icon?: string | undefined;
            layout?: "single" | "split" | "board" | undefined;
            actions?: {
                id: string;
                label: string;
                event: "button_clicked";
                tone?: "primary" | "secondary" | "danger" | undefined;
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            }[] | undefined;
            persistedStateSchema?: ({
                type: "string";
                label: string;
                key: string;
                defaultValue?: string | undefined;
            } | {
                type: "number";
                label: string;
                key: string;
                defaultValue?: number | undefined;
            } | {
                type: "boolean";
                label: string;
                key: string;
                defaultValue?: boolean | undefined;
            } | {
                type: "string[]";
                label: string;
                key: string;
                defaultValue?: string[] | undefined;
            } | {
                type: "number[]";
                label: string;
                key: string;
                defaultValue?: number[] | undefined;
            })[] | undefined;
        };
        state: {
            metadata: {
                lastUpdatedAt: string;
                source: "local" | "hermes";
                lastEvent?: string | undefined;
            };
            version?: number | undefined;
            filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
            selectedItemId?: string | undefined;
            pagination?: {
                page?: number | undefined;
                pageSize?: number | undefined;
                total?: number | undefined;
            } | undefined;
            formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
            notes?: string | undefined;
        };
        pinned: boolean;
        archived: boolean;
        results?: Record<string, unknown>[] | undefined;
    }>;
    activeProfileId: string;
    sessions: ({
        id: string;
        title: string;
        summary: string;
        lastUpdatedAt?: string | undefined;
        provider?: "hermes" | "openclaw" | undefined;
        runtimeSessionId?: string | undefined;
        messageCount?: number | undefined;
        lastUsedProfileId?: string | undefined;
    } | {
        id: string;
        title: string;
        summary: string;
        profileId: string;
        lastUpdatedAt?: string | undefined;
        provider?: "hermes" | "openclaw" | undefined;
        runtimeSessionId?: string | undefined;
        messageCount?: number | undefined;
        lastUsedProfileId?: string | undefined;
    })[];
    activeSessionId: string;
    workspaceOrder: string[];
    toolSettings: {
        transportMode: "bridge";
        allowFilesystemRead: boolean;
        allowShellExecution: boolean;
        allowDesktopNotifications: boolean;
        confirmDestructiveActions: boolean;
    };
    auditLog: {
        id: string;
        label: string;
        timestamp: string;
        source: "system" | "event" | "chat" | "command";
        details: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
    }[];
    inspectorMode: "state" | "audit" | "artifacts";
    sessionSummary: {
        messageCount: number;
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        workspaceCount: number;
        jobCount: number;
        reminderCount: number;
        artifactCount: number;
        lastInteractionAt: string;
    };
    focusedWorkspaceId?: string | undefined;
    jobsCacheState?: {
        status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
        version?: 1 | undefined;
        source?: "local_cache" | "hermes_cli" | undefined;
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    } | undefined;
    themeMode?: "dark" | "light" | undefined;
    sessionMessages?: Record<string, {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        blocks: {
            type: "markdown";
            id: string;
            markdown: string;
        }[];
        timestamp: string;
        attachments?: {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }[] | undefined;
    }[]> | undefined;
    profileState?: Record<string, {
        version?: 1 | undefined;
        jobs?: {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }[] | undefined;
        jobsCacheState?: {
            status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
            version?: 1 | undefined;
            source?: "local_cache" | "hermes_cli" | undefined;
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        } | undefined;
        reminders?: {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }[] | undefined;
    }> | undefined;
    toolExecutionHistory?: {
        status: "completed" | "failed" | "rejected" | "pending" | "dismissed";
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args?: string[] | undefined;
            cwd?: string | undefined;
            requiresConfirmation?: boolean | undefined;
        };
        requestedAt: string;
        resolvedAt?: string | undefined;
        result?: {
            status: "completed" | "failed" | "rejected";
            summary: string;
            requestId: string;
            stdout: string;
            stderr: string;
            exitCode: number;
            completedAt: string;
        } | undefined;
    }[] | undefined;
    pendingConfirmation?: {
        command: {
            type: "create_workspace";
            payload: {
                id: string;
                title: string;
                components: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds?: string[] | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    };
                    title?: string | undefined;
                })[];
                version: number;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                actions?: {
                    id: string;
                    label: string;
                    event: "button_clicked";
                    tone?: "primary" | "secondary" | "danger" | undefined;
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    } | undefined;
                }[] | undefined;
                persistedStateSchema?: ({
                    type: "string";
                    label: string;
                    key: string;
                    defaultValue?: string | undefined;
                } | {
                    type: "number";
                    label: string;
                    key: string;
                    defaultValue?: number | undefined;
                } | {
                    type: "boolean";
                    label: string;
                    key: string;
                    defaultValue?: boolean | undefined;
                } | {
                    type: "string[]";
                    label: string;
                    key: string;
                    defaultValue?: string[] | undefined;
                } | {
                    type: "number[]";
                    label: string;
                    key: string;
                    defaultValue?: number[] | undefined;
                })[] | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "update_workspace";
            payload: {
                workspaceId: string;
                definitionPatch?: {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone?: "default" | "muted" | "info" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: boolean | undefined;
                            })[];
                            submitLabel?: string | undefined;
                            eventType?: "filter_changed" | "form_submitted" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys?: string[] | undefined;
                            metricFields?: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[] | undefined;
                            selectable?: boolean | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            columns: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            maxRows?: number | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds?: string[] | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                                format?: "number" | "currency" | undefined;
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        event: "button_clicked";
                        tone?: "primary" | "secondary" | "danger" | undefined;
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                } | undefined;
                statePatch?: {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "delete_workspace";
            payload: {
                workspaceId: string;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "open_tab";
            payload: {
                tabId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "focus_workspace";
            payload: {
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "show_toast";
            payload: {
                message: string;
                tone: "info" | "success" | "warning" | "error";
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_form_values";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_results";
            payload: {
                workspaceId: string;
                results?: Record<string, unknown>[] | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "request_user_input";
            payload: {
                prompt: string;
                placeholder?: string | undefined;
                confirmLabel?: string | undefined;
                workspaceId?: string | undefined;
                inputKind?: "text" | "confirm" | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        };
        request: {
            title: string;
            description: string;
            confirmLabel?: string | undefined;
        };
    } | undefined;
    pendingUserInput?: {
        confirmLabel: string;
        prompt: string;
        inputKind: "text" | "confirm";
        placeholder?: string | undefined;
        workspaceId?: string | undefined;
    } | undefined;
    pendingToolApproval?: {
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args?: string[] | undefined;
            cwd?: string | undefined;
            requiresConfirmation?: boolean | undefined;
        };
        requestedAt: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
        profileName?: string | undefined;
        sessionTitle?: string | undefined;
    } | undefined;
    pageState?: {
        version?: 1 | undefined;
        chat?: {
            version?: 1 | undefined;
            lastVisitedSessionId?: string | undefined;
        } | undefined;
        jobs?: {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            lastManualRefreshAt?: string | undefined;
        } | undefined;
        settings?: {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            highlightedToolRequestId?: string | undefined;
            activeSection?: "general" | "allowlist" | "tool_history" | "recent_activity" | undefined;
            toolHistoryPageByProfile?: Record<string, number> | undefined;
            recentActivityPageByProfile?: Record<string, number> | undefined;
        } | undefined;
        profiles?: {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            lastSelectedSessionByProfile?: Record<string, string> | undefined;
            recentSessionIdsByProfile?: Record<string, string[]> | undefined;
            sessionBrowserPageByProfile?: Record<string, number> | undefined;
        } | {
            version?: 2 | undefined;
            lastViewedAt?: string | undefined;
            lastSelectedSessionId?: string | undefined;
            recentSessionIds?: string[] | undefined;
            sessionBrowserPage?: number | undefined;
        } | undefined;
        workspaces?: {
            version?: 1 | undefined;
            views?: Record<string, {
                version?: 1 | undefined;
                lastViewedAt?: string | undefined;
                selectedResultId?: string | undefined;
            }> | undefined;
        } | undefined;
    } | undefined;
    chatMessages?: {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        blocks: {
            type: "markdown";
            id: string;
            markdown: string;
        }[];
        timestamp: string;
        attachments?: {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }[] | undefined;
    }[] | undefined;
}>, {
    version: 3;
    jobs: {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }[];
    profiles: {
        id: string;
        description: string;
        name: string;
        provider: "hermes" | "openclaw";
    }[];
    activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
    jobsCacheState: {
        status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
        version: 1;
        source: "local_cache" | "hermes_cli";
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    };
    reminders: {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }[];
    artifacts: {
        id: string;
        kind: "saved_search" | "checklist" | "session_note";
        title: string;
        summary: string;
        createdAt: string;
        workspaceId?: string | undefined;
    }[];
    workspaces: Record<string, {
        results: Record<string, unknown>[];
        definition: {
            id: string;
            title: string;
            description: string;
            icon: string;
            layout: "single" | "split" | "board";
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone: "default" | "muted" | "info";
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    submitLabel: string;
                    eventType: "filter_changed" | "form_submitted";
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        defaultValue: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        defaultValue: boolean;
                        helperText?: string | undefined;
                    })[];
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys: string[];
                    metricFields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    selectable: boolean;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    maxRows: number;
                    columns: {
                        label: string;
                        key: string;
                        format: "number" | "text" | "currency";
                    }[];
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds: string[];
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        format: "number" | "currency";
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                    }[];
                };
                title?: string | undefined;
            })[];
            actions: {
                id: string;
                label: string;
                tone: "primary" | "secondary" | "danger";
                event: "button_clicked";
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            }[];
            persistedStateSchema: ({
                type: "string";
                label: string;
                defaultValue: string;
                key: string;
            } | {
                type: "number";
                label: string;
                defaultValue: number;
                key: string;
            } | {
                type: "boolean";
                label: string;
                defaultValue: boolean;
                key: string;
            } | {
                type: "string[]";
                label: string;
                defaultValue: string[];
                key: string;
            } | {
                type: "number[]";
                label: string;
                defaultValue: number[];
                key: string;
            })[];
            version: number;
        };
        state: {
            version: number;
            filters: Record<string, string | number | boolean | string[] | number[]>;
            pagination: {
                page: number;
                pageSize: number;
                total?: number | undefined;
            };
            formValues: Record<string, string | number | boolean | string[] | number[]>;
            notes: string;
            metadata: {
                lastUpdatedAt: string;
                source: "local" | "hermes";
                lastEvent: string;
            };
            selectedItemId?: string | undefined;
        };
        pinned: boolean;
        archived: boolean;
    }>;
    themeMode: "dark" | "light";
    activeProfileId: string;
    sessions: {
        id: string;
        title: string;
        provider: "hermes" | "openclaw";
        summary: string;
        lastUpdatedAt?: string | undefined;
        runtimeSessionId?: string | undefined;
        messageCount?: number | undefined;
        lastUsedProfileId?: string | undefined;
    }[];
    activeSessionId: string;
    sessionMessages: Record<string, {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        blocks: {
            type: "markdown";
            id: string;
            markdown: string;
        }[];
        attachments: {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }[];
        timestamp: string;
    }[]>;
    workspaceOrder: string[];
    profileState: Record<string, {
        version: 1;
        jobs: {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }[];
        jobsCacheState: {
            status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
            version: 1;
            source: "local_cache" | "hermes_cli";
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        };
        reminders: {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }[];
    }>;
    toolSettings: {
        transportMode: "bridge";
        allowFilesystemRead: boolean;
        allowShellExecution: boolean;
        allowDesktopNotifications: boolean;
        confirmDestructiveActions: boolean;
    };
    toolExecutionHistory: {
        status: "completed" | "failed" | "rejected" | "pending" | "dismissed";
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args: string[];
            requiresConfirmation: boolean;
            cwd?: string | undefined;
        };
        requestedAt: string;
        resolvedAt?: string | undefined;
        result?: {
            status: "completed" | "failed" | "rejected";
            summary: string;
            requestId: string;
            stdout: string;
            stderr: string;
            exitCode: number;
            completedAt: string;
        } | undefined;
    }[];
    auditLog: {
        id: string;
        label: string;
        timestamp: string;
        source: "system" | "event" | "chat" | "command";
        details: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
    }[];
    inspectorMode: "state" | "audit" | "artifacts";
    sessionSummary: {
        messageCount: number;
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        workspaceCount: number;
        jobCount: number;
        reminderCount: number;
        artifactCount: number;
        lastInteractionAt: string;
    };
    pageState: {
        version: 1;
        chat: {
            version: 1;
            lastVisitedSessionId?: string | undefined;
        };
        jobs: {
            version: 1;
            lastViewedAt?: string | undefined;
            lastManualRefreshAt?: string | undefined;
        };
        settings: {
            version: 1;
            activeSection: "general" | "allowlist" | "tool_history" | "recent_activity";
            toolHistoryPageByProfile: Record<string, number>;
            recentActivityPageByProfile: Record<string, number>;
            lastViewedAt?: string | undefined;
            highlightedToolRequestId?: string | undefined;
        };
        profiles: {
            version: 2;
            recentSessionIds: string[];
            sessionBrowserPage: number;
            lastViewedAt?: string | undefined;
            lastSelectedSessionId?: string | undefined;
        };
        workspaces: {
            version: 1;
            views: Record<string, {
                version: 1;
                lastViewedAt?: string | undefined;
                selectedResultId?: string | undefined;
            }>;
        };
    };
    focusedWorkspaceId?: string | undefined;
    pendingConfirmation?: {
        command: {
            type: "create_workspace";
            payload: {
                id: string;
                title: string;
                description: string;
                icon: string;
                layout: "single" | "split" | "board";
                components: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone: "default" | "muted" | "info";
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        submitLabel: string;
                        eventType: "filter_changed" | "form_submitted";
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            defaultValue: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            defaultValue: boolean;
                            helperText?: string | undefined;
                        })[];
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys: string[];
                        metricFields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        selectable: boolean;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        maxRows: number;
                        columns: {
                            label: string;
                            key: string;
                            format: "number" | "text" | "currency";
                        }[];
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds: string[];
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            format: "number" | "currency";
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        }[];
                    };
                    title?: string | undefined;
                })[];
                actions: {
                    id: string;
                    label: string;
                    tone: "primary" | "secondary" | "danger";
                    event: "button_clicked";
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel: string;
                    } | undefined;
                }[];
                persistedStateSchema: ({
                    type: "string";
                    label: string;
                    defaultValue: string;
                    key: string;
                } | {
                    type: "number";
                    label: string;
                    defaultValue: number;
                    key: string;
                } | {
                    type: "boolean";
                    label: string;
                    defaultValue: boolean;
                    key: string;
                } | {
                    type: "string[]";
                    label: string;
                    defaultValue: string[];
                    key: string;
                } | {
                    type: "number[]";
                    label: string;
                    defaultValue: number[];
                    key: string;
                })[];
                version: number;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "update_workspace";
            payload: {
                workspaceId: string;
                definitionPatch: {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone: "default" | "muted" | "info";
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            submitLabel: string;
                            eventType: "filter_changed" | "form_submitted";
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                defaultValue: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                defaultValue: boolean;
                                helperText?: string | undefined;
                            })[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys: string[];
                            metricFields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            selectable: boolean;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            maxRows: number;
                            columns: {
                                label: string;
                                key: string;
                                format: "number" | "text" | "currency";
                            }[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds: string[];
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                format: "number" | "currency";
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        tone: "primary" | "secondary" | "danger";
                        event: "button_clicked";
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel: string;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                };
                statePatch: {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                };
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "delete_workspace";
            payload: {
                workspaceId: string;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel: string;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "open_tab";
            payload: {
                tabId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "focus_workspace";
            payload: {
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "show_toast";
            payload: {
                message: string;
                tone: "info" | "success" | "warning" | "error";
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_form_values";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_results";
            payload: {
                workspaceId: string;
                results: Record<string, unknown>[];
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "request_user_input";
            payload: {
                confirmLabel: string;
                prompt: string;
                inputKind: "text" | "confirm";
                placeholder?: string | undefined;
                workspaceId?: string | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        };
        request: {
            title: string;
            description: string;
            confirmLabel: string;
        };
    } | undefined;
    pendingUserInput?: {
        confirmLabel: string;
        prompt: string;
        inputKind: "text" | "confirm";
        placeholder?: string | undefined;
        workspaceId?: string | undefined;
    } | undefined;
    pendingToolApproval?: {
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args: string[];
            requiresConfirmation: boolean;
            cwd?: string | undefined;
        };
        requestedAt: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
        profileName?: string | undefined;
        sessionTitle?: string | undefined;
    } | undefined;
}, {
    version: 2 | 3;
    jobs: {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }[];
    profiles: {
        id: string;
        description: string;
        name: string;
        provider?: "hermes" | "openclaw" | undefined;
    }[];
    activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
    reminders: {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }[];
    artifacts: {
        id: string;
        kind: "saved_search" | "checklist" | "session_note";
        title: string;
        summary: string;
        createdAt: string;
        workspaceId?: string | undefined;
    }[];
    workspaces: Record<string, {
        definition: {
            id: string;
            title: string;
            components: ({
                type: "text";
                id: string;
                props: {
                    markdown: string;
                    tone?: "default" | "muted" | "info" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "form";
                id: string;
                props: {
                    fields: ({
                        id: string;
                        kind: "text";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "number";
                        label: string;
                        helperText?: string | undefined;
                        placeholder?: string | undefined;
                        defaultValue?: number | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    } | {
                        options: {
                            value: string;
                            label: string;
                        }[];
                        id: string;
                        kind: "select";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: string | undefined;
                    } | {
                        id: string;
                        kind: "toggle";
                        label: string;
                        helperText?: string | undefined;
                        defaultValue?: boolean | undefined;
                    })[];
                    submitLabel?: string | undefined;
                    eventType?: "filter_changed" | "form_submitted" | undefined;
                };
                title?: string | undefined;
            } | {
                type: "cards";
                id: string;
                props: {
                    emptyMessage: string;
                    titleKey: string;
                    subtitleKeys?: string[] | undefined;
                    metricFields?: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[] | undefined;
                    selectable?: boolean | undefined;
                };
                title?: string | undefined;
            } | {
                type: "detail";
                id: string;
                props: {
                    fields: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    emptyMessage: string;
                };
                title?: string | undefined;
            } | {
                type: "table";
                id: string;
                props: {
                    emptyMessage: string;
                    columns: {
                        label: string;
                        key: string;
                        format?: "number" | "text" | "currency" | undefined;
                    }[];
                    maxRows?: number | undefined;
                };
                title?: string | undefined;
            } | {
                type: "toolbar";
                id: string;
                props: {
                    actionIds?: string[] | undefined;
                };
                title?: string | undefined;
            } | {
                type: "stat";
                id: string;
                props: {
                    items: {
                        id: string;
                        label: string;
                        metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                        format?: "number" | "currency" | undefined;
                    }[];
                };
                title?: string | undefined;
            })[];
            version: number;
            description?: string | undefined;
            icon?: string | undefined;
            layout?: "single" | "split" | "board" | undefined;
            actions?: {
                id: string;
                label: string;
                event: "button_clicked";
                tone?: "primary" | "secondary" | "danger" | undefined;
                description?: string | undefined;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            }[] | undefined;
            persistedStateSchema?: ({
                type: "string";
                label: string;
                key: string;
                defaultValue?: string | undefined;
            } | {
                type: "number";
                label: string;
                key: string;
                defaultValue?: number | undefined;
            } | {
                type: "boolean";
                label: string;
                key: string;
                defaultValue?: boolean | undefined;
            } | {
                type: "string[]";
                label: string;
                key: string;
                defaultValue?: string[] | undefined;
            } | {
                type: "number[]";
                label: string;
                key: string;
                defaultValue?: number[] | undefined;
            })[] | undefined;
        };
        state: {
            metadata: {
                lastUpdatedAt: string;
                source: "local" | "hermes";
                lastEvent?: string | undefined;
            };
            version?: number | undefined;
            filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
            selectedItemId?: string | undefined;
            pagination?: {
                page?: number | undefined;
                pageSize?: number | undefined;
                total?: number | undefined;
            } | undefined;
            formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
            notes?: string | undefined;
        };
        pinned: boolean;
        archived: boolean;
        results?: Record<string, unknown>[] | undefined;
    }>;
    activeProfileId: string;
    sessions: ({
        id: string;
        title: string;
        summary: string;
        lastUpdatedAt?: string | undefined;
        provider?: "hermes" | "openclaw" | undefined;
        runtimeSessionId?: string | undefined;
        messageCount?: number | undefined;
        lastUsedProfileId?: string | undefined;
    } | {
        id: string;
        title: string;
        summary: string;
        profileId: string;
        lastUpdatedAt?: string | undefined;
        provider?: "hermes" | "openclaw" | undefined;
        runtimeSessionId?: string | undefined;
        messageCount?: number | undefined;
        lastUsedProfileId?: string | undefined;
    })[];
    activeSessionId: string;
    workspaceOrder: string[];
    toolSettings: {
        transportMode: "bridge";
        allowFilesystemRead: boolean;
        allowShellExecution: boolean;
        allowDesktopNotifications: boolean;
        confirmDestructiveActions: boolean;
    };
    auditLog: {
        id: string;
        label: string;
        timestamp: string;
        source: "system" | "event" | "chat" | "command";
        details: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
    }[];
    inspectorMode: "state" | "audit" | "artifacts";
    sessionSummary: {
        messageCount: number;
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        workspaceCount: number;
        jobCount: number;
        reminderCount: number;
        artifactCount: number;
        lastInteractionAt: string;
    };
    focusedWorkspaceId?: string | undefined;
    jobsCacheState?: {
        status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
        version?: 1 | undefined;
        source?: "local_cache" | "hermes_cli" | undefined;
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    } | undefined;
    themeMode?: "dark" | "light" | undefined;
    sessionMessages?: Record<string, {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        blocks: {
            type: "markdown";
            id: string;
            markdown: string;
        }[];
        timestamp: string;
        attachments?: {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }[] | undefined;
    }[]> | undefined;
    profileState?: Record<string, {
        version?: 1 | undefined;
        jobs?: {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }[] | undefined;
        jobsCacheState?: {
            status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
            version?: 1 | undefined;
            source?: "local_cache" | "hermes_cli" | undefined;
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        } | undefined;
        reminders?: {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }[] | undefined;
    }> | undefined;
    toolExecutionHistory?: {
        status: "completed" | "failed" | "rejected" | "pending" | "dismissed";
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args?: string[] | undefined;
            cwd?: string | undefined;
            requiresConfirmation?: boolean | undefined;
        };
        requestedAt: string;
        resolvedAt?: string | undefined;
        result?: {
            status: "completed" | "failed" | "rejected";
            summary: string;
            requestId: string;
            stdout: string;
            stderr: string;
            exitCode: number;
            completedAt: string;
        } | undefined;
    }[] | undefined;
    pendingConfirmation?: {
        command: {
            type: "create_workspace";
            payload: {
                id: string;
                title: string;
                components: ({
                    type: "text";
                    id: string;
                    props: {
                        markdown: string;
                        tone?: "default" | "muted" | "info" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "form";
                    id: string;
                    props: {
                        fields: ({
                            id: string;
                            kind: "text";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "number";
                            label: string;
                            helperText?: string | undefined;
                            placeholder?: string | undefined;
                            defaultValue?: number | undefined;
                            min?: number | undefined;
                            max?: number | undefined;
                            step?: number | undefined;
                        } | {
                            options: {
                                value: string;
                                label: string;
                            }[];
                            id: string;
                            kind: "select";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: string | undefined;
                        } | {
                            id: string;
                            kind: "toggle";
                            label: string;
                            helperText?: string | undefined;
                            defaultValue?: boolean | undefined;
                        })[];
                        submitLabel?: string | undefined;
                        eventType?: "filter_changed" | "form_submitted" | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "cards";
                    id: string;
                    props: {
                        emptyMessage: string;
                        titleKey: string;
                        subtitleKeys?: string[] | undefined;
                        metricFields?: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[] | undefined;
                        selectable?: boolean | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "detail";
                    id: string;
                    props: {
                        fields: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        emptyMessage: string;
                    };
                    title?: string | undefined;
                } | {
                    type: "table";
                    id: string;
                    props: {
                        emptyMessage: string;
                        columns: {
                            label: string;
                            key: string;
                            format?: "number" | "text" | "currency" | undefined;
                        }[];
                        maxRows?: number | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "toolbar";
                    id: string;
                    props: {
                        actionIds?: string[] | undefined;
                    };
                    title?: string | undefined;
                } | {
                    type: "stat";
                    id: string;
                    props: {
                        items: {
                            id: string;
                            label: string;
                            metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                            format?: "number" | "currency" | undefined;
                        }[];
                    };
                    title?: string | undefined;
                })[];
                version: number;
                description?: string | undefined;
                icon?: string | undefined;
                layout?: "single" | "split" | "board" | undefined;
                actions?: {
                    id: string;
                    label: string;
                    event: "button_clicked";
                    tone?: "primary" | "secondary" | "danger" | undefined;
                    description?: string | undefined;
                    confirmation?: {
                        title: string;
                        description: string;
                        confirmLabel?: string | undefined;
                    } | undefined;
                }[] | undefined;
                persistedStateSchema?: ({
                    type: "string";
                    label: string;
                    key: string;
                    defaultValue?: string | undefined;
                } | {
                    type: "number";
                    label: string;
                    key: string;
                    defaultValue?: number | undefined;
                } | {
                    type: "boolean";
                    label: string;
                    key: string;
                    defaultValue?: boolean | undefined;
                } | {
                    type: "string[]";
                    label: string;
                    key: string;
                    defaultValue?: string[] | undefined;
                } | {
                    type: "number[]";
                    label: string;
                    key: string;
                    defaultValue?: number[] | undefined;
                })[] | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "update_workspace";
            payload: {
                workspaceId: string;
                definitionPatch?: {
                    title?: string | undefined;
                    description?: string | undefined;
                    icon?: string | undefined;
                    layout?: "single" | "split" | "board" | undefined;
                    components?: ({
                        type: "text";
                        id: string;
                        props: {
                            markdown: string;
                            tone?: "default" | "muted" | "info" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "form";
                        id: string;
                        props: {
                            fields: ({
                                id: string;
                                kind: "text";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "number";
                                label: string;
                                helperText?: string | undefined;
                                placeholder?: string | undefined;
                                defaultValue?: number | undefined;
                                min?: number | undefined;
                                max?: number | undefined;
                                step?: number | undefined;
                            } | {
                                options: {
                                    value: string;
                                    label: string;
                                }[];
                                id: string;
                                kind: "select";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: string | undefined;
                            } | {
                                id: string;
                                kind: "toggle";
                                label: string;
                                helperText?: string | undefined;
                                defaultValue?: boolean | undefined;
                            })[];
                            submitLabel?: string | undefined;
                            eventType?: "filter_changed" | "form_submitted" | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "cards";
                        id: string;
                        props: {
                            emptyMessage: string;
                            titleKey: string;
                            subtitleKeys?: string[] | undefined;
                            metricFields?: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[] | undefined;
                            selectable?: boolean | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "detail";
                        id: string;
                        props: {
                            fields: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            emptyMessage: string;
                        };
                        title?: string | undefined;
                    } | {
                        type: "table";
                        id: string;
                        props: {
                            emptyMessage: string;
                            columns: {
                                label: string;
                                key: string;
                                format?: "number" | "text" | "currency" | undefined;
                            }[];
                            maxRows?: number | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "toolbar";
                        id: string;
                        props: {
                            actionIds?: string[] | undefined;
                        };
                        title?: string | undefined;
                    } | {
                        type: "stat";
                        id: string;
                        props: {
                            items: {
                                id: string;
                                label: string;
                                metric: "result_count" | "selection_count" | "average_price" | "lowest_price";
                                format?: "number" | "currency" | undefined;
                            }[];
                        };
                        title?: string | undefined;
                    })[] | undefined;
                    actions?: {
                        id: string;
                        label: string;
                        event: "button_clicked";
                        tone?: "primary" | "secondary" | "danger" | undefined;
                        description?: string | undefined;
                        confirmation?: {
                            title: string;
                            description: string;
                            confirmLabel?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                    version?: number | undefined;
                } | undefined;
                statePatch?: {
                    filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    selectedItemId?: string | undefined;
                    pagination?: {
                        page?: number | undefined;
                        pageSize?: number | undefined;
                        total?: number | undefined;
                    } | undefined;
                    formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                    notes?: string | undefined;
                    metadata?: {
                        lastUpdatedAt?: string | undefined;
                        source?: "local" | "hermes" | undefined;
                        lastEvent?: string | undefined;
                    } | undefined;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "delete_workspace";
            payload: {
                workspaceId: string;
                confirmation?: {
                    title: string;
                    description: string;
                    confirmLabel?: string | undefined;
                } | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "open_tab";
            payload: {
                tabId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "focus_workspace";
            payload: {
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "show_toast";
            payload: {
                message: string;
                tone: "info" | "success" | "warning" | "error";
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_form_values";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "set_results";
            payload: {
                workspaceId: string;
                results?: Record<string, unknown>[] | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        } | {
            type: "request_user_input";
            payload: {
                prompt: string;
                placeholder?: string | undefined;
                confirmLabel?: string | undefined;
                workspaceId?: string | undefined;
                inputKind?: "text" | "confirm" | undefined;
            };
            auditLabel: string;
            issuedAt?: string | undefined;
        };
        request: {
            title: string;
            description: string;
            confirmLabel?: string | undefined;
        };
    } | undefined;
    pendingUserInput?: {
        confirmLabel: string;
        prompt: string;
        inputKind: "text" | "confirm";
        placeholder?: string | undefined;
        workspaceId?: string | undefined;
    } | undefined;
    pendingToolApproval?: {
        request: {
            type: "shell_command";
            id: string;
            summary: string;
            command: string;
            args?: string[] | undefined;
            cwd?: string | undefined;
            requiresConfirmation?: boolean | undefined;
        };
        requestedAt: string;
        profileId?: string | undefined;
        sessionId?: string | undefined;
        profileName?: string | undefined;
        sessionTitle?: string | undefined;
    } | undefined;
    pageState?: {
        version?: 1 | undefined;
        chat?: {
            version?: 1 | undefined;
            lastVisitedSessionId?: string | undefined;
        } | undefined;
        jobs?: {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            lastManualRefreshAt?: string | undefined;
        } | undefined;
        settings?: {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            highlightedToolRequestId?: string | undefined;
            activeSection?: "general" | "allowlist" | "tool_history" | "recent_activity" | undefined;
            toolHistoryPageByProfile?: Record<string, number> | undefined;
            recentActivityPageByProfile?: Record<string, number> | undefined;
        } | undefined;
        profiles?: {
            version?: 1 | undefined;
            lastViewedAt?: string | undefined;
            lastSelectedSessionByProfile?: Record<string, string> | undefined;
            recentSessionIdsByProfile?: Record<string, string[]> | undefined;
            sessionBrowserPageByProfile?: Record<string, number> | undefined;
        } | {
            version?: 2 | undefined;
            lastViewedAt?: string | undefined;
            lastSelectedSessionId?: string | undefined;
            recentSessionIds?: string[] | undefined;
            sessionBrowserPage?: number | undefined;
        } | undefined;
        workspaces?: {
            version?: 1 | undefined;
            views?: Record<string, {
                version?: 1 | undefined;
                lastViewedAt?: string | undefined;
                selectedResultId?: string | undefined;
            }> | undefined;
        } | undefined;
    } | undefined;
    chatMessages?: {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        blocks: {
            type: "markdown";
            id: string;
            markdown: string;
        }[];
        timestamp: string;
        attachments?: {
            id: string;
            kind: "file" | "image" | "json" | "link";
            label: string;
            uri: string;
        }[] | undefined;
    }[] | undefined;
}>;
export type HermesAppSnapshot = z.infer<typeof HermesAppSnapshotSchema>;
export declare const HermesBridgeWorkspaceContextSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    state: z.ZodObject<{
        version: z.ZodDefault<z.ZodNumber>;
        filters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
        selectedItemId: z.ZodOptional<z.ZodString>;
        pagination: z.ZodDefault<z.ZodObject<{
            page: z.ZodDefault<z.ZodNumber>;
            pageSize: z.ZodDefault<z.ZodNumber>;
            total: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            page: number;
            pageSize: number;
            total?: number | undefined;
        }, {
            page?: number | undefined;
            pageSize?: number | undefined;
            total?: number | undefined;
        }>>;
        formValues: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
        notes: z.ZodDefault<z.ZodString>;
        metadata: z.ZodObject<{
            lastUpdatedAt: z.ZodString;
            source: z.ZodEnum<["local", "hermes"]>;
            lastEvent: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent: string;
        }, {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent?: string | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        version: number;
        filters: Record<string, string | number | boolean | string[] | number[]>;
        pagination: {
            page: number;
            pageSize: number;
            total?: number | undefined;
        };
        formValues: Record<string, string | number | boolean | string[] | number[]>;
        notes: string;
        metadata: {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent: string;
        };
        selectedItemId?: string | undefined;
    }, {
        metadata: {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent?: string | undefined;
        };
        version?: number | undefined;
        filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
        selectedItemId?: string | undefined;
        pagination?: {
            page?: number | undefined;
            pageSize?: number | undefined;
            total?: number | undefined;
        } | undefined;
        formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
        notes?: string | undefined;
    }>;
    selectedItemId: z.ZodNullable<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    id: string;
    title: string;
    selectedItemId: string | null;
    state: {
        version: number;
        filters: Record<string, string | number | boolean | string[] | number[]>;
        pagination: {
            page: number;
            pageSize: number;
            total?: number | undefined;
        };
        formValues: Record<string, string | number | boolean | string[] | number[]>;
        notes: string;
        metadata: {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent: string;
        };
        selectedItemId?: string | undefined;
    };
}, {
    id: string;
    title: string;
    selectedItemId: string | null;
    state: {
        metadata: {
            lastUpdatedAt: string;
            source: "local" | "hermes";
            lastEvent?: string | undefined;
        };
        version?: number | undefined;
        filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
        selectedItemId?: string | undefined;
        pagination?: {
            page?: number | undefined;
            pageSize?: number | undefined;
            total?: number | undefined;
        } | undefined;
        formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
        notes?: string | undefined;
    };
}>;
export type HermesBridgeWorkspaceContext = z.infer<typeof HermesBridgeWorkspaceContextSchema>;
export declare const HermesAppStateSummarySchema: z.ZodObject<{
    jobsCount: z.ZodNumber;
    workspacesCount: z.ZodNumber;
    lastAuditEntries: z.ZodArray<z.ZodString, "many">;
}, "strict", z.ZodTypeAny, {
    jobsCount: number;
    workspacesCount: number;
    lastAuditEntries: string[];
}, {
    jobsCount: number;
    workspacesCount: number;
    lastAuditEntries: string[];
}>;
export type HermesAppStateSummary = z.infer<typeof HermesAppStateSummarySchema>;
export declare const HermesTranscriptWindowMessageSchema: z.ZodObject<{
    id: z.ZodString;
    role: z.ZodEnum<["user", "assistant", "system", "tool"]>;
    content: z.ZodString;
    timestamp: z.ZodString;
}, "strict", z.ZodTypeAny, {
    id: string;
    role: "user" | "assistant" | "system" | "tool";
    content: string;
    timestamp: string;
}, {
    id: string;
    role: "user" | "assistant" | "system" | "tool";
    content: string;
    timestamp: string;
}>;
export type HermesTranscriptWindowMessage = z.infer<typeof HermesTranscriptWindowMessageSchema>;
export declare const HermesTranscriptWindowSchema: z.ZodObject<{
    sessionId: z.ZodString;
    messageWindowLimit: z.ZodNumber;
    characterWindowLimit: z.ZodNumber;
    totalMessages: z.ZodNumber;
    omittedMessages: z.ZodNumber;
    includedCharacters: z.ZodNumber;
    truncated: z.ZodBoolean;
    messages: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        role: z.ZodEnum<["user", "assistant", "system", "tool"]>;
        content: z.ZodString;
        timestamp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        timestamp: string;
    }, {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        timestamp: string;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    sessionId: string;
    messages: {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        timestamp: string;
    }[];
    messageWindowLimit: number;
    characterWindowLimit: number;
    totalMessages: number;
    omittedMessages: number;
    includedCharacters: number;
    truncated: boolean;
}, {
    sessionId: string;
    messages: {
        id: string;
        role: "user" | "assistant" | "system" | "tool";
        content: string;
        timestamp: string;
    }[];
    messageWindowLimit: number;
    characterWindowLimit: number;
    totalMessages: number;
    omittedMessages: number;
    includedCharacters: number;
    truncated: boolean;
}>;
export type HermesTranscriptWindow = z.infer<typeof HermesTranscriptWindowSchema>;
export declare const HermesBridgeChatMessageInputSchema: z.ZodObject<{
    id: z.ZodString;
    role: z.ZodLiteral<"user">;
    markdown: z.ZodString;
}, "strict", z.ZodTypeAny, {
    id: string;
    markdown: string;
    role: "user";
}, {
    id: string;
    markdown: string;
    role: "user";
}>;
export type HermesBridgeChatMessageInput = z.infer<typeof HermesBridgeChatMessageInputSchema>;
export declare const HermesBridgeRequestInputSchema: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
    kind: z.ZodLiteral<"chat_message">;
    chatMessage: z.ZodObject<{
        id: z.ZodString;
        role: z.ZodLiteral<"user">;
        markdown: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        id: string;
        markdown: string;
        role: "user";
    }, {
        id: string;
        markdown: string;
        role: "user";
    }>;
}, "strict", z.ZodTypeAny, {
    kind: "chat_message";
    chatMessage: {
        id: string;
        markdown: string;
        role: "user";
    };
}, {
    kind: "chat_message";
    chatMessage: {
        id: string;
        markdown: string;
        role: "user";
    };
}>, z.ZodObject<{
    kind: z.ZodLiteral<"ui_event">;
    event: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"button_clicked">;
        payload: z.ZodObject<{
            actionId: z.ZodString;
            workspaceId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            actionId: string;
            workspaceId?: string | undefined;
        }, {
            actionId: string;
            workspaceId?: string | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "button_clicked";
        payload: {
            actionId: string;
            workspaceId?: string | undefined;
        };
    }, {
        type: "button_clicked";
        payload: {
            actionId: string;
            workspaceId?: string | undefined;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"form_submitted">;
        payload: z.ZodObject<{
            workspaceId: z.ZodString;
            values: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>;
        }, "strict", z.ZodTypeAny, {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        }, {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "form_submitted";
        payload: {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
    }, {
        type: "form_submitted";
        payload: {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"filter_changed">;
        payload: z.ZodObject<{
            workspaceId: z.ZodString;
            filters: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>;
        }, "strict", z.ZodTypeAny, {
            filters: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        }, {
            filters: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "filter_changed";
        payload: {
            filters: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
    }, {
        type: "filter_changed";
        payload: {
            filters: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"tab_opened">;
        payload: z.ZodObject<{
            tabId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            tabId: string;
        }, {
            tabId: string;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "tab_opened";
        payload: {
            tabId: string;
        };
    }, {
        type: "tab_opened";
        payload: {
            tabId: string;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"row_selected">;
        payload: z.ZodObject<{
            workspaceId: z.ZodString;
            rowId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            workspaceId: string;
            rowId: string;
        }, {
            workspaceId: string;
            rowId: string;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "row_selected";
        payload: {
            workspaceId: string;
            rowId: string;
        };
    }, {
        type: "row_selected";
        payload: {
            workspaceId: string;
            rowId: string;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"workspace_state_changed">;
        payload: z.ZodObject<{
            workspaceId: z.ZodString;
            patch: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>;
        }, "strict", z.ZodTypeAny, {
            workspaceId: string;
            patch: Record<string, string | number | boolean | string[] | number[]>;
        }, {
            workspaceId: string;
            patch: Record<string, string | number | boolean | string[] | number[]>;
        }>;
    }, "strict", z.ZodTypeAny, {
        type: "workspace_state_changed";
        payload: {
            workspaceId: string;
            patch: Record<string, string | number | boolean | string[] | number[]>;
        };
    }, {
        type: "workspace_state_changed";
        payload: {
            workspaceId: string;
            patch: Record<string, string | number | boolean | string[] | number[]>;
        };
    }>]>;
}, "strict", z.ZodTypeAny, {
    kind: "ui_event";
    event: {
        type: "button_clicked";
        payload: {
            actionId: string;
            workspaceId?: string | undefined;
        };
    } | {
        type: "form_submitted";
        payload: {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
    } | {
        type: "filter_changed";
        payload: {
            filters: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
    } | {
        type: "tab_opened";
        payload: {
            tabId: string;
        };
    } | {
        type: "row_selected";
        payload: {
            workspaceId: string;
            rowId: string;
        };
    } | {
        type: "workspace_state_changed";
        payload: {
            workspaceId: string;
            patch: Record<string, string | number | boolean | string[] | number[]>;
        };
    };
}, {
    kind: "ui_event";
    event: {
        type: "button_clicked";
        payload: {
            actionId: string;
            workspaceId?: string | undefined;
        };
    } | {
        type: "form_submitted";
        payload: {
            values: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
    } | {
        type: "filter_changed";
        payload: {
            filters: Record<string, string | number | boolean | string[] | number[]>;
            workspaceId: string;
        };
    } | {
        type: "tab_opened";
        payload: {
            tabId: string;
        };
    } | {
        type: "row_selected";
        payload: {
            workspaceId: string;
            rowId: string;
        };
    } | {
        type: "workspace_state_changed";
        payload: {
            workspaceId: string;
            patch: Record<string, string | number | boolean | string[] | number[]>;
        };
    };
}>, z.ZodObject<{
    kind: z.ZodLiteral<"system_refresh">;
}, "strict", z.ZodTypeAny, {
    kind: "system_refresh";
}, {
    kind: "system_refresh";
}>]>;
export type HermesBridgeRequestInput = z.infer<typeof HermesBridgeRequestInputSchema>;
export declare const HermesBridgeRequestEnvelopeSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    profileId: z.ZodString;
    sessionId: z.ZodString;
    requestId: z.ZodString;
    timestamp: z.ZodString;
    context: z.ZodObject<{
        activeTab: z.ZodEnum<["chat", "workspace", "jobs", "settings", "profiles"]>;
        focusedWorkspaceId: z.ZodNullable<z.ZodString>;
        workspace: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            state: z.ZodObject<{
                version: z.ZodDefault<z.ZodNumber>;
                filters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
                selectedItemId: z.ZodOptional<z.ZodString>;
                pagination: z.ZodDefault<z.ZodObject<{
                    page: z.ZodDefault<z.ZodNumber>;
                    pageSize: z.ZodDefault<z.ZodNumber>;
                    total: z.ZodOptional<z.ZodNumber>;
                }, "strict", z.ZodTypeAny, {
                    page: number;
                    pageSize: number;
                    total?: number | undefined;
                }, {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                }>>;
                formValues: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>>;
                notes: z.ZodDefault<z.ZodString>;
                metadata: z.ZodObject<{
                    lastUpdatedAt: z.ZodString;
                    source: z.ZodEnum<["local", "hermes"]>;
                    lastEvent: z.ZodDefault<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    lastUpdatedAt: string;
                    source: "local" | "hermes";
                    lastEvent: string;
                }, {
                    lastUpdatedAt: string;
                    source: "local" | "hermes";
                    lastEvent?: string | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                version: number;
                filters: Record<string, string | number | boolean | string[] | number[]>;
                pagination: {
                    page: number;
                    pageSize: number;
                    total?: number | undefined;
                };
                formValues: Record<string, string | number | boolean | string[] | number[]>;
                notes: string;
                metadata: {
                    lastUpdatedAt: string;
                    source: "local" | "hermes";
                    lastEvent: string;
                };
                selectedItemId?: string | undefined;
            }, {
                metadata: {
                    lastUpdatedAt: string;
                    source: "local" | "hermes";
                    lastEvent?: string | undefined;
                };
                version?: number | undefined;
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
            }>;
            selectedItemId: z.ZodNullable<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            id: string;
            title: string;
            selectedItemId: string | null;
            state: {
                version: number;
                filters: Record<string, string | number | boolean | string[] | number[]>;
                pagination: {
                    page: number;
                    pageSize: number;
                    total?: number | undefined;
                };
                formValues: Record<string, string | number | boolean | string[] | number[]>;
                notes: string;
                metadata: {
                    lastUpdatedAt: string;
                    source: "local" | "hermes";
                    lastEvent: string;
                };
                selectedItemId?: string | undefined;
            };
        }, {
            id: string;
            title: string;
            selectedItemId: string | null;
            state: {
                metadata: {
                    lastUpdatedAt: string;
                    source: "local" | "hermes";
                    lastEvent?: string | undefined;
                };
                version?: number | undefined;
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
            };
        }>>;
        transcriptWindow: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            sessionId: z.ZodString;
            messageWindowLimit: z.ZodNumber;
            characterWindowLimit: z.ZodNumber;
            totalMessages: z.ZodNumber;
            omittedMessages: z.ZodNumber;
            includedCharacters: z.ZodNumber;
            truncated: z.ZodBoolean;
            messages: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                role: z.ZodEnum<["user", "assistant", "system", "tool"]>;
                content: z.ZodString;
                timestamp: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                id: string;
                role: "user" | "assistant" | "system" | "tool";
                content: string;
                timestamp: string;
            }, {
                id: string;
                role: "user" | "assistant" | "system" | "tool";
                content: string;
                timestamp: string;
            }>, "many">;
        }, "strict", z.ZodTypeAny, {
            sessionId: string;
            messages: {
                id: string;
                role: "user" | "assistant" | "system" | "tool";
                content: string;
                timestamp: string;
            }[];
            messageWindowLimit: number;
            characterWindowLimit: number;
            totalMessages: number;
            omittedMessages: number;
            includedCharacters: number;
            truncated: boolean;
        }, {
            sessionId: string;
            messages: {
                id: string;
                role: "user" | "assistant" | "system" | "tool";
                content: string;
                timestamp: string;
            }[];
            messageWindowLimit: number;
            characterWindowLimit: number;
            totalMessages: number;
            omittedMessages: number;
            includedCharacters: number;
            truncated: boolean;
        }>>>;
        appStateSummary: z.ZodObject<{
            jobsCount: z.ZodNumber;
            workspacesCount: z.ZodNumber;
            lastAuditEntries: z.ZodArray<z.ZodString, "many">;
        }, "strict", z.ZodTypeAny, {
            jobsCount: number;
            workspacesCount: number;
            lastAuditEntries: string[];
        }, {
            jobsCount: number;
            workspacesCount: number;
            lastAuditEntries: string[];
        }>;
    }, "strict", z.ZodTypeAny, {
        workspace: {
            id: string;
            title: string;
            selectedItemId: string | null;
            state: {
                version: number;
                filters: Record<string, string | number | boolean | string[] | number[]>;
                pagination: {
                    page: number;
                    pageSize: number;
                    total?: number | undefined;
                };
                formValues: Record<string, string | number | boolean | string[] | number[]>;
                notes: string;
                metadata: {
                    lastUpdatedAt: string;
                    source: "local" | "hermes";
                    lastEvent: string;
                };
                selectedItemId?: string | undefined;
            };
        } | null;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        transcriptWindow: {
            sessionId: string;
            messages: {
                id: string;
                role: "user" | "assistant" | "system" | "tool";
                content: string;
                timestamp: string;
            }[];
            messageWindowLimit: number;
            characterWindowLimit: number;
            totalMessages: number;
            omittedMessages: number;
            includedCharacters: number;
            truncated: boolean;
        } | null;
        appStateSummary: {
            jobsCount: number;
            workspacesCount: number;
            lastAuditEntries: string[];
        };
    }, {
        workspace: {
            id: string;
            title: string;
            selectedItemId: string | null;
            state: {
                metadata: {
                    lastUpdatedAt: string;
                    source: "local" | "hermes";
                    lastEvent?: string | undefined;
                };
                version?: number | undefined;
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
            };
        } | null;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        appStateSummary: {
            jobsCount: number;
            workspacesCount: number;
            lastAuditEntries: string[];
        };
        transcriptWindow?: {
            sessionId: string;
            messages: {
                id: string;
                role: "user" | "assistant" | "system" | "tool";
                content: string;
                timestamp: string;
            }[];
            messageWindowLimit: number;
            characterWindowLimit: number;
            totalMessages: number;
            omittedMessages: number;
            includedCharacters: number;
            truncated: boolean;
        } | null | undefined;
    }>;
    input: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
        kind: z.ZodLiteral<"chat_message">;
        chatMessage: z.ZodObject<{
            id: z.ZodString;
            role: z.ZodLiteral<"user">;
            markdown: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            id: string;
            markdown: string;
            role: "user";
        }, {
            id: string;
            markdown: string;
            role: "user";
        }>;
    }, "strict", z.ZodTypeAny, {
        kind: "chat_message";
        chatMessage: {
            id: string;
            markdown: string;
            role: "user";
        };
    }, {
        kind: "chat_message";
        chatMessage: {
            id: string;
            markdown: string;
            role: "user";
        };
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"ui_event">;
        event: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"button_clicked">;
            payload: z.ZodObject<{
                actionId: z.ZodString;
                workspaceId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                actionId: string;
                workspaceId?: string | undefined;
            }, {
                actionId: string;
                workspaceId?: string | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "button_clicked";
            payload: {
                actionId: string;
                workspaceId?: string | undefined;
            };
        }, {
            type: "button_clicked";
            payload: {
                actionId: string;
                workspaceId?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"form_submitted">;
            payload: z.ZodObject<{
                workspaceId: z.ZodString;
                values: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>;
            }, "strict", z.ZodTypeAny, {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            }, {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "form_submitted";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        }, {
            type: "form_submitted";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"filter_changed">;
            payload: z.ZodObject<{
                workspaceId: z.ZodString;
                filters: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>;
            }, "strict", z.ZodTypeAny, {
                filters: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            }, {
                filters: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "filter_changed";
            payload: {
                filters: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        }, {
            type: "filter_changed";
            payload: {
                filters: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"tab_opened">;
            payload: z.ZodObject<{
                tabId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                tabId: string;
            }, {
                tabId: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "tab_opened";
            payload: {
                tabId: string;
            };
        }, {
            type: "tab_opened";
            payload: {
                tabId: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"row_selected">;
            payload: z.ZodObject<{
                workspaceId: z.ZodString;
                rowId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                workspaceId: string;
                rowId: string;
            }, {
                workspaceId: string;
                rowId: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "row_selected";
            payload: {
                workspaceId: string;
                rowId: string;
            };
        }, {
            type: "row_selected";
            payload: {
                workspaceId: string;
                rowId: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"workspace_state_changed">;
            payload: z.ZodObject<{
                workspaceId: z.ZodString;
                patch: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>;
            }, "strict", z.ZodTypeAny, {
                workspaceId: string;
                patch: Record<string, string | number | boolean | string[] | number[]>;
            }, {
                workspaceId: string;
                patch: Record<string, string | number | boolean | string[] | number[]>;
            }>;
        }, "strict", z.ZodTypeAny, {
            type: "workspace_state_changed";
            payload: {
                workspaceId: string;
                patch: Record<string, string | number | boolean | string[] | number[]>;
            };
        }, {
            type: "workspace_state_changed";
            payload: {
                workspaceId: string;
                patch: Record<string, string | number | boolean | string[] | number[]>;
            };
        }>]>;
    }, "strict", z.ZodTypeAny, {
        kind: "ui_event";
        event: {
            type: "button_clicked";
            payload: {
                actionId: string;
                workspaceId?: string | undefined;
            };
        } | {
            type: "form_submitted";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        } | {
            type: "filter_changed";
            payload: {
                filters: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        } | {
            type: "tab_opened";
            payload: {
                tabId: string;
            };
        } | {
            type: "row_selected";
            payload: {
                workspaceId: string;
                rowId: string;
            };
        } | {
            type: "workspace_state_changed";
            payload: {
                workspaceId: string;
                patch: Record<string, string | number | boolean | string[] | number[]>;
            };
        };
    }, {
        kind: "ui_event";
        event: {
            type: "button_clicked";
            payload: {
                actionId: string;
                workspaceId?: string | undefined;
            };
        } | {
            type: "form_submitted";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        } | {
            type: "filter_changed";
            payload: {
                filters: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        } | {
            type: "tab_opened";
            payload: {
                tabId: string;
            };
        } | {
            type: "row_selected";
            payload: {
                workspaceId: string;
                rowId: string;
            };
        } | {
            type: "workspace_state_changed";
            payload: {
                workspaceId: string;
                patch: Record<string, string | number | boolean | string[] | number[]>;
            };
        };
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"system_refresh">;
    }, "strict", z.ZodTypeAny, {
        kind: "system_refresh";
    }, {
        kind: "system_refresh";
    }>]>;
}, "strict", z.ZodTypeAny, {
    timestamp: string;
    version: 1;
    profileId: string;
    sessionId: string;
    requestId: string;
    context: {
        workspace: {
            id: string;
            title: string;
            selectedItemId: string | null;
            state: {
                version: number;
                filters: Record<string, string | number | boolean | string[] | number[]>;
                pagination: {
                    page: number;
                    pageSize: number;
                    total?: number | undefined;
                };
                formValues: Record<string, string | number | boolean | string[] | number[]>;
                notes: string;
                metadata: {
                    lastUpdatedAt: string;
                    source: "local" | "hermes";
                    lastEvent: string;
                };
                selectedItemId?: string | undefined;
            };
        } | null;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        transcriptWindow: {
            sessionId: string;
            messages: {
                id: string;
                role: "user" | "assistant" | "system" | "tool";
                content: string;
                timestamp: string;
            }[];
            messageWindowLimit: number;
            characterWindowLimit: number;
            totalMessages: number;
            omittedMessages: number;
            includedCharacters: number;
            truncated: boolean;
        } | null;
        appStateSummary: {
            jobsCount: number;
            workspacesCount: number;
            lastAuditEntries: string[];
        };
    };
    input: {
        kind: "chat_message";
        chatMessage: {
            id: string;
            markdown: string;
            role: "user";
        };
    } | {
        kind: "ui_event";
        event: {
            type: "button_clicked";
            payload: {
                actionId: string;
                workspaceId?: string | undefined;
            };
        } | {
            type: "form_submitted";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        } | {
            type: "filter_changed";
            payload: {
                filters: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        } | {
            type: "tab_opened";
            payload: {
                tabId: string;
            };
        } | {
            type: "row_selected";
            payload: {
                workspaceId: string;
                rowId: string;
            };
        } | {
            type: "workspace_state_changed";
            payload: {
                workspaceId: string;
                patch: Record<string, string | number | boolean | string[] | number[]>;
            };
        };
    } | {
        kind: "system_refresh";
    };
}, {
    timestamp: string;
    version: 1;
    profileId: string;
    sessionId: string;
    requestId: string;
    context: {
        workspace: {
            id: string;
            title: string;
            selectedItemId: string | null;
            state: {
                metadata: {
                    lastUpdatedAt: string;
                    source: "local" | "hermes";
                    lastEvent?: string | undefined;
                };
                version?: number | undefined;
                filters?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                selectedItemId?: string | undefined;
                pagination?: {
                    page?: number | undefined;
                    pageSize?: number | undefined;
                    total?: number | undefined;
                } | undefined;
                formValues?: Record<string, string | number | boolean | string[] | number[]> | undefined;
                notes?: string | undefined;
            };
        } | null;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        appStateSummary: {
            jobsCount: number;
            workspacesCount: number;
            lastAuditEntries: string[];
        };
        transcriptWindow?: {
            sessionId: string;
            messages: {
                id: string;
                role: "user" | "assistant" | "system" | "tool";
                content: string;
                timestamp: string;
            }[];
            messageWindowLimit: number;
            characterWindowLimit: number;
            totalMessages: number;
            omittedMessages: number;
            includedCharacters: number;
            truncated: boolean;
        } | null | undefined;
    };
    input: {
        kind: "chat_message";
        chatMessage: {
            id: string;
            markdown: string;
            role: "user";
        };
    } | {
        kind: "ui_event";
        event: {
            type: "button_clicked";
            payload: {
                actionId: string;
                workspaceId?: string | undefined;
            };
        } | {
            type: "form_submitted";
            payload: {
                values: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        } | {
            type: "filter_changed";
            payload: {
                filters: Record<string, string | number | boolean | string[] | number[]>;
                workspaceId: string;
            };
        } | {
            type: "tab_opened";
            payload: {
                tabId: string;
            };
        } | {
            type: "row_selected";
            payload: {
                workspaceId: string;
                rowId: string;
            };
        } | {
            type: "workspace_state_changed";
            payload: {
                workspaceId: string;
                patch: Record<string, string | number | boolean | string[] | number[]>;
            };
        };
    } | {
        kind: "system_refresh";
    };
}>;
export type HermesBridgeRequestEnvelope = z.infer<typeof HermesBridgeRequestEnvelopeSchema>;
export declare const HermesAssistantMessageSchema: z.ZodObject<{
    id: z.ZodString;
    role: z.ZodLiteral<"assistant">;
    markdown: z.ZodString;
}, "strict", z.ZodTypeAny, {
    id: string;
    markdown: string;
    role: "assistant";
}, {
    id: string;
    markdown: string;
    role: "assistant";
}>;
export type HermesAssistantMessage = z.infer<typeof HermesAssistantMessageSchema>;
export declare const HermesBridgeStateSchema: z.ZodObject<{
    jobs: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        schedule: z.ZodString;
        status: z.ZodEnum<["healthy", "paused", "attention"]>;
        description: z.ZodString;
        lastRun: z.ZodString;
        nextRun: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }, {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }>, "many">;
    jobsCacheState: z.ZodDefault<z.ZodObject<{
        version: z.ZodDefault<z.ZodLiteral<1>>;
        status: z.ZodDefault<z.ZodEnum<["idle", "refreshing", "connected", "disconnected", "error"]>>;
        source: z.ZodDefault<z.ZodEnum<["local_cache", "hermes_cli"]>>;
        lastRequestedAt: z.ZodOptional<z.ZodString>;
        lastSuccessfulAt: z.ZodOptional<z.ZodString>;
        lastError: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
        version: 1;
        source: "local_cache" | "hermes_cli";
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    }, {
        status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
        version?: 1 | undefined;
        source?: "local_cache" | "hermes_cli" | undefined;
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    }>>;
    reminders: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        dueAt: z.ZodString;
        status: z.ZodEnum<["scheduled", "due", "completed"]>;
        description: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }, {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }>, "many">;
    sessionSummary: z.ZodObject<{
        profileId: z.ZodString;
        profileName: z.ZodString;
        sessionId: z.ZodString;
        sessionTitle: z.ZodString;
        activeTab: z.ZodEnum<["chat", "workspace", "jobs", "settings", "profiles"]>;
        focusedWorkspaceId: z.ZodNullable<z.ZodString>;
        messageCount: z.ZodNumber;
        workspaceCount: z.ZodNumber;
        jobCount: z.ZodNumber;
        reminderCount: z.ZodNumber;
        artifactCount: z.ZodNumber;
        lastInteractionAt: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        messageCount: number;
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        workspaceCount: number;
        jobCount: number;
        reminderCount: number;
        artifactCount: number;
        lastInteractionAt: string;
    }, {
        messageCount: number;
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        workspaceCount: number;
        jobCount: number;
        reminderCount: number;
        artifactCount: number;
        lastInteractionAt: string;
    }>;
    artifacts: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        kind: z.ZodEnum<["saved_search", "checklist", "session_note"]>;
        title: z.ZodString;
        summary: z.ZodString;
        createdAt: z.ZodString;
        workspaceId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        kind: "saved_search" | "checklist" | "session_note";
        title: string;
        summary: string;
        createdAt: string;
        workspaceId?: string | undefined;
    }, {
        id: string;
        kind: "saved_search" | "checklist" | "session_note";
        title: string;
        summary: string;
        createdAt: string;
        workspaceId?: string | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    jobs: {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }[];
    jobsCacheState: {
        status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
        version: 1;
        source: "local_cache" | "hermes_cli";
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    };
    reminders: {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }[];
    artifacts: {
        id: string;
        kind: "saved_search" | "checklist" | "session_note";
        title: string;
        summary: string;
        createdAt: string;
        workspaceId?: string | undefined;
    }[];
    sessionSummary: {
        messageCount: number;
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        workspaceCount: number;
        jobCount: number;
        reminderCount: number;
        artifactCount: number;
        lastInteractionAt: string;
    };
}, {
    jobs: {
        status: "healthy" | "paused" | "attention";
        id: string;
        label: string;
        description: string;
        schedule: string;
        lastRun: string;
        nextRun: string;
    }[];
    reminders: {
        status: "scheduled" | "due" | "completed";
        id: string;
        label: string;
        description: string;
        dueAt: string;
    }[];
    artifacts: {
        id: string;
        kind: "saved_search" | "checklist" | "session_note";
        title: string;
        summary: string;
        createdAt: string;
        workspaceId?: string | undefined;
    }[];
    sessionSummary: {
        messageCount: number;
        profileId: string;
        sessionId: string;
        profileName: string;
        sessionTitle: string;
        activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
        focusedWorkspaceId: string | null;
        workspaceCount: number;
        jobCount: number;
        reminderCount: number;
        artifactCount: number;
        lastInteractionAt: string;
    };
    jobsCacheState?: {
        status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
        version?: 1 | undefined;
        source?: "local_cache" | "hermes_cli" | undefined;
        lastRequestedAt?: string | undefined;
        lastSuccessfulAt?: string | undefined;
        lastError?: string | undefined;
    } | undefined;
}>;
export type HermesBridgeState = z.infer<typeof HermesBridgeStateSchema>;
export declare const HermesBridgeStreamEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"progress">;
    requestId: z.ZodString;
    stage: z.ZodEnum<["launching", "working", "streaming", "complete", "error"]>;
    message: z.ZodString;
}, "strict", z.ZodTypeAny, {
    message: string;
    type: "progress";
    requestId: string;
    stage: "error" | "launching" | "working" | "streaming" | "complete";
}, {
    message: string;
    type: "progress";
    requestId: string;
    stage: "error" | "launching" | "working" | "streaming" | "complete";
}>, z.ZodObject<{
    type: z.ZodLiteral<"assistant_chunk">;
    requestId: z.ZodString;
    markdown: z.ZodString;
}, "strict", z.ZodTypeAny, {
    type: "assistant_chunk";
    markdown: string;
    requestId: string;
}, {
    type: "assistant_chunk";
    markdown: string;
    requestId: string;
}>]>;
export type HermesBridgeStreamEvent = z.infer<typeof HermesBridgeStreamEventSchema>;
export declare const HermesBridgeMetaSchema: z.ZodObject<{
    requiresConfirmation: z.ZodBoolean;
    errors: z.ZodArray<z.ZodString, "many">;
}, "strict", z.ZodTypeAny, {
    requiresConfirmation: boolean;
    errors: string[];
}, {
    requiresConfirmation: boolean;
    errors: string[];
}>;
export type HermesBridgeMeta = z.infer<typeof HermesBridgeMetaSchema>;
declare const HermesBridgeResponseEnvelopeBaseSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    requestId: z.ZodString;
    assistantMessage: z.ZodObject<{
        id: z.ZodString;
        role: z.ZodLiteral<"assistant">;
        markdown: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        id: string;
        markdown: string;
        role: "assistant";
    }, {
        id: string;
        markdown: string;
        role: "assistant";
    }>;
    commands: z.ZodArray<z.ZodUnknown, "many">;
    toolRequests: z.ZodDefault<z.ZodArray<z.ZodUnknown, "many">>;
    state: z.ZodObject<{
        jobs: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            schedule: z.ZodString;
            status: z.ZodEnum<["healthy", "paused", "attention"]>;
            description: z.ZodString;
            lastRun: z.ZodString;
            nextRun: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }, {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }>, "many">;
        jobsCacheState: z.ZodDefault<z.ZodObject<{
            version: z.ZodDefault<z.ZodLiteral<1>>;
            status: z.ZodDefault<z.ZodEnum<["idle", "refreshing", "connected", "disconnected", "error"]>>;
            source: z.ZodDefault<z.ZodEnum<["local_cache", "hermes_cli"]>>;
            lastRequestedAt: z.ZodOptional<z.ZodString>;
            lastSuccessfulAt: z.ZodOptional<z.ZodString>;
            lastError: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
            version: 1;
            source: "local_cache" | "hermes_cli";
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        }, {
            status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
            version?: 1 | undefined;
            source?: "local_cache" | "hermes_cli" | undefined;
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        }>>;
        reminders: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            dueAt: z.ZodString;
            status: z.ZodEnum<["scheduled", "due", "completed"]>;
            description: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }, {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }>, "many">;
        sessionSummary: z.ZodObject<{
            profileId: z.ZodString;
            profileName: z.ZodString;
            sessionId: z.ZodString;
            sessionTitle: z.ZodString;
            activeTab: z.ZodEnum<["chat", "workspace", "jobs", "settings", "profiles"]>;
            focusedWorkspaceId: z.ZodNullable<z.ZodString>;
            messageCount: z.ZodNumber;
            workspaceCount: z.ZodNumber;
            jobCount: z.ZodNumber;
            reminderCount: z.ZodNumber;
            artifactCount: z.ZodNumber;
            lastInteractionAt: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            messageCount: number;
            profileId: string;
            sessionId: string;
            profileName: string;
            sessionTitle: string;
            activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
            focusedWorkspaceId: string | null;
            workspaceCount: number;
            jobCount: number;
            reminderCount: number;
            artifactCount: number;
            lastInteractionAt: string;
        }, {
            messageCount: number;
            profileId: string;
            sessionId: string;
            profileName: string;
            sessionTitle: string;
            activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
            focusedWorkspaceId: string | null;
            workspaceCount: number;
            jobCount: number;
            reminderCount: number;
            artifactCount: number;
            lastInteractionAt: string;
        }>;
        artifacts: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            kind: z.ZodEnum<["saved_search", "checklist", "session_note"]>;
            title: z.ZodString;
            summary: z.ZodString;
            createdAt: z.ZodString;
            workspaceId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            id: string;
            kind: "saved_search" | "checklist" | "session_note";
            title: string;
            summary: string;
            createdAt: string;
            workspaceId?: string | undefined;
        }, {
            id: string;
            kind: "saved_search" | "checklist" | "session_note";
            title: string;
            summary: string;
            createdAt: string;
            workspaceId?: string | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        jobs: {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }[];
        jobsCacheState: {
            status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
            version: 1;
            source: "local_cache" | "hermes_cli";
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        };
        reminders: {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }[];
        artifacts: {
            id: string;
            kind: "saved_search" | "checklist" | "session_note";
            title: string;
            summary: string;
            createdAt: string;
            workspaceId?: string | undefined;
        }[];
        sessionSummary: {
            messageCount: number;
            profileId: string;
            sessionId: string;
            profileName: string;
            sessionTitle: string;
            activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
            focusedWorkspaceId: string | null;
            workspaceCount: number;
            jobCount: number;
            reminderCount: number;
            artifactCount: number;
            lastInteractionAt: string;
        };
    }, {
        jobs: {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }[];
        reminders: {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }[];
        artifacts: {
            id: string;
            kind: "saved_search" | "checklist" | "session_note";
            title: string;
            summary: string;
            createdAt: string;
            workspaceId?: string | undefined;
        }[];
        sessionSummary: {
            messageCount: number;
            profileId: string;
            sessionId: string;
            profileName: string;
            sessionTitle: string;
            activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
            focusedWorkspaceId: string | null;
            workspaceCount: number;
            jobCount: number;
            reminderCount: number;
            artifactCount: number;
            lastInteractionAt: string;
        };
        jobsCacheState?: {
            status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
            version?: 1 | undefined;
            source?: "local_cache" | "hermes_cli" | undefined;
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        } | undefined;
    }>;
    meta: z.ZodObject<{
        requiresConfirmation: z.ZodBoolean;
        errors: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        requiresConfirmation: boolean;
        errors: string[];
    }, {
        requiresConfirmation: boolean;
        errors: string[];
    }>;
}, "strict", z.ZodTypeAny, {
    version: 1;
    requestId: string;
    state: {
        jobs: {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }[];
        jobsCacheState: {
            status: "error" | "idle" | "refreshing" | "connected" | "disconnected";
            version: 1;
            source: "local_cache" | "hermes_cli";
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        };
        reminders: {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }[];
        artifacts: {
            id: string;
            kind: "saved_search" | "checklist" | "session_note";
            title: string;
            summary: string;
            createdAt: string;
            workspaceId?: string | undefined;
        }[];
        sessionSummary: {
            messageCount: number;
            profileId: string;
            sessionId: string;
            profileName: string;
            sessionTitle: string;
            activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
            focusedWorkspaceId: string | null;
            workspaceCount: number;
            jobCount: number;
            reminderCount: number;
            artifactCount: number;
            lastInteractionAt: string;
        };
    };
    assistantMessage: {
        id: string;
        markdown: string;
        role: "assistant";
    };
    commands: unknown[];
    toolRequests: unknown[];
    meta: {
        requiresConfirmation: boolean;
        errors: string[];
    };
}, {
    version: 1;
    requestId: string;
    state: {
        jobs: {
            status: "healthy" | "paused" | "attention";
            id: string;
            label: string;
            description: string;
            schedule: string;
            lastRun: string;
            nextRun: string;
        }[];
        reminders: {
            status: "scheduled" | "due" | "completed";
            id: string;
            label: string;
            description: string;
            dueAt: string;
        }[];
        artifacts: {
            id: string;
            kind: "saved_search" | "checklist" | "session_note";
            title: string;
            summary: string;
            createdAt: string;
            workspaceId?: string | undefined;
        }[];
        sessionSummary: {
            messageCount: number;
            profileId: string;
            sessionId: string;
            profileName: string;
            sessionTitle: string;
            activeTab: "chat" | "workspace" | "jobs" | "settings" | "profiles";
            focusedWorkspaceId: string | null;
            workspaceCount: number;
            jobCount: number;
            reminderCount: number;
            artifactCount: number;
            lastInteractionAt: string;
        };
        jobsCacheState?: {
            status?: "error" | "idle" | "refreshing" | "connected" | "disconnected" | undefined;
            version?: 1 | undefined;
            source?: "local_cache" | "hermes_cli" | undefined;
            lastRequestedAt?: string | undefined;
            lastSuccessfulAt?: string | undefined;
            lastError?: string | undefined;
        } | undefined;
    };
    assistantMessage: {
        id: string;
        markdown: string;
        role: "assistant";
    };
    commands: unknown[];
    meta: {
        requiresConfirmation: boolean;
        errors: string[];
    };
    toolRequests?: unknown[] | undefined;
}>;
export interface HermesBridgeResponseEnvelope extends Omit<z.infer<typeof HermesBridgeResponseEnvelopeBaseSchema>, 'commands' | 'toolRequests'> {
    commands: z.infer<typeof UICommandSchema>[];
    toolRequests: ToolExecutionRequest[];
}
export declare function parseHermesAppSnapshot(input: unknown): HermesAppSnapshot;
export declare function parseHermesBridgeRequestEnvelope(input: unknown): HermesBridgeRequestEnvelope;
export declare function parseHermesBridgeResponseEnvelope(input: unknown): HermesBridgeResponseEnvelope;
export declare function parseHermesBridgeStreamEvent(input: unknown): HermesBridgeStreamEvent;
export declare function parseToolExecutionResult(input: unknown): ToolExecutionResult;
export {};

import { z } from 'zod';
export declare const RecipeSpecSchema: z.ZodObject<{
    purpose: z.ZodDefault<z.ZodString>;
    primaryUserGoal: z.ZodDefault<z.ZodString>;
    whenHermesShouldChoose: z.ZodDefault<z.ZodString>;
    goodFor: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    supports: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    supportedTabs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    idealDataShape: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    requiredSections: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    optionalSections: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    requiredActions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    optionalActions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    references: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    smallPaneAdaptationNotes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    populationInstructions: z.ZodDefault<z.ZodObject<{
        summary: z.ZodDefault<z.ZodString>;
        steps: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        guardrails: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        summary: string;
        steps: string[];
        guardrails: string[];
    }, {
        summary?: string | undefined;
        steps?: string[] | undefined;
        guardrails?: string[] | undefined;
    }>>;
    updateRules: z.ZodDefault<z.ZodObject<{
        patchPrefer: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        replaceTriggers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        persistAcrossUpdates: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        stableRegions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        patchPrefer: string[];
        replaceTriggers: string[];
        persistAcrossUpdates: string[];
        stableRegions: string[];
    }, {
        patchPrefer?: string[] | undefined;
        replaceTriggers?: string[] | undefined;
        persistAcrossUpdates?: string[] | undefined;
        stableRegions?: string[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    purpose: string;
    primaryUserGoal: string;
    whenHermesShouldChoose: string;
    goodFor: string[];
    supports: string[];
    supportedTabs: string[];
    idealDataShape: string[];
    requiredSections: string[];
    optionalSections: string[];
    requiredActions: string[];
    optionalActions: string[];
    references: string[];
    smallPaneAdaptationNotes: string[];
    populationInstructions: {
        summary: string;
        steps: string[];
        guardrails: string[];
    };
    updateRules: {
        patchPrefer: string[];
        replaceTriggers: string[];
        persistAcrossUpdates: string[];
        stableRegions: string[];
    };
}, {
    purpose?: string | undefined;
    primaryUserGoal?: string | undefined;
    whenHermesShouldChoose?: string | undefined;
    goodFor?: string[] | undefined;
    supports?: string[] | undefined;
    supportedTabs?: string[] | undefined;
    idealDataShape?: string[] | undefined;
    requiredSections?: string[] | undefined;
    optionalSections?: string[] | undefined;
    requiredActions?: string[] | undefined;
    optionalActions?: string[] | undefined;
    references?: string[] | undefined;
    smallPaneAdaptationNotes?: string[] | undefined;
    populationInstructions?: {
        summary?: string | undefined;
        steps?: string[] | undefined;
        guardrails?: string[] | undefined;
    } | undefined;
    updateRules?: {
        patchPrefer?: string[] | undefined;
        replaceTriggers?: string[] | undefined;
        persistAcrossUpdates?: string[] | undefined;
        stableRegions?: string[] | undefined;
    } | undefined;
}>;
export type RecipeSpec = z.infer<typeof RecipeSpecSchema>;
export declare const RecipeVersionEntrySchema: z.ZodObject<{
    version: z.ZodString;
    summary: z.ZodString;
    savedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    summary: string;
    version: string;
    savedAt: string;
}, {
    summary: string;
    version: string;
    savedAt: string;
}>;
export type RecipeVersionEntry = z.infer<typeof RecipeVersionEntrySchema>;
export declare const RecipeVersionSchema: z.ZodObject<{
    version: z.ZodString;
    summary: z.ZodString;
    savedAt: z.ZodString;
} & {
    manifest: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    runtime: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    spec: z.ZodDefault<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    fixture: z.ZodDefault<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    summary: string;
    runtime: Record<string, unknown>;
    manifest: Record<string, unknown>;
    version: string;
    savedAt: string;
    spec: Record<string, unknown> | null;
    fixture: Record<string, unknown> | null;
}, {
    summary: string;
    runtime: Record<string, unknown>;
    manifest: Record<string, unknown>;
    version: string;
    savedAt: string;
    spec?: Record<string, unknown> | null | undefined;
    fixture?: Record<string, unknown> | null | undefined;
}>;
export type RecipeVersion = z.infer<typeof RecipeVersionSchema>;

import { WORKRECIPE_TEMPLATE_RUNTIME_REGISTRY } from './recipe-template-registry';

export const RECIPE_SLOT_KINDS = [
  'comparison-table', 'card-grid', 'notes', 'grouped-list', 'stats',
  'timeline', 'kanban', 'hero', 'filter-strip', 'action-bar'
];

export const RECIPE_UPDATE_OPS = [
  'set_header', 'set_scope_tags', 'upsert_table_rows', 'remove_items',
  'append_note_lines', 'upsert_cards', 'upsert_groups', 'upsert_timeline_items',
  'set_stats', 'move_card_stage', 'toggle_checklist'
];

export const RECIPE_BRIDGE_HANDLERS = [
  'refresh_space', 'retry_build', 'delete_source_entries', 'remove_selected_items',
  'switch_template', 'append_template_note', 'move_template_card_stage', 'toggle_template_checklist'
];

export function buildRecipeBuilderSystemPrompt(currentRecipe: Record<string, unknown> | null): string {
  const existingTemplateIds = Object.keys(WORKRECIPE_TEMPLATE_RUNTIME_REGISTRY);

  return `You are a recipe definition builder for The Kitchen — a Hermes Agent frontend.

A recipe is a structured workspace template stored as FOUR JSON files:

## manifest.json
{
  "id": "unique-kebab-case-id",
  "version": "1.0.0",
  "name": "Display Name",
  "category": "general|commerce|travel|research|operations|finance|communication",
  "description": "What this recipe does",
  "author": "User",
  "source": "user",
  "enabled": false
}

## runtime.json
{
  "selectionSignals": ["keyword1", "keyword2", "phrase3"],
  "slots": [
    { "id": "slot-id", "kind": "comparison-table|card-grid|notes|grouped-list|stats|timeline|kanban", "required": true }
  ],
  "allowedUpdateOps": ["set_header", "upsert_table_rows", "remove_items", "append_note_lines"],
  "actions": {
    "refresh-recipe": {
      "id": "refresh-recipe", "label": "Refresh", "kind": "bridge", "intent": "secondary",
      "visibility": { "requiresSelection": "none", "whenBuildReady": true },
      "bridge": { "handler": "refresh_space", "payload": {} }, "metadata": {}
    }
  },
  "transitions": []
}

## spec.json — Human-readable specification for the recipe
{
  "purpose": "One-sentence description of what the recipe organizes",
  "primaryUserGoal": "What the user is trying to accomplish",
  "whenHermesShouldChoose": "Signal phrase or context that tells Hermes to use this recipe",
  "goodFor": ["use case 1", "use case 2"],
  "supports": ["feature 1", "feature 2"],
  "supportedTabs": ["Overview", "Details"],
  "idealDataShape": ["Key/value pairs", "Tabular rows with multiple columns"],
  "requiredSections": ["comparison-table", "notes"],
  "optionalSections": ["stats", "filter-strip"],
  "requiredActions": ["refresh"],
  "optionalActions": ["export"],
  "references": ["price-comparison-grid"],
  "smallPaneAdaptationNotes": ["Collapse table to single column on narrow pane"],
  "populationInstructions": {
    "summary": "How Hermes should populate this recipe",
    "steps": [
      "1. Set the headline to the item being compared",
      "2. Populate the comparison table with merchant rows",
      "3. Add notes for any caveats"
    ],
    "guardrails": [
      "Do not include more than 10 rows",
      "Always include a price column"
    ]
  },
  "updateRules": {
    "patchPrefer": ["Add new rows without replacing existing ones"],
    "replaceTriggers": ["User asks to refresh all prices"],
    "persistAcrossUpdates": ["headline", "column headers"],
    "stableRegions": ["notes section"]
  }
}

## fixture.json — Example preview data matching RecipeTemplatePreviewSpec
Sections support these kinds: hero, filter-strip, action-bar, stats, comparison-table, grouped-list, card-grid, detail-panel, timeline, notes, activity-log, kanban, confirmation, split, tabs

Each section must have a "kind" field. Examples:

comparison-table section:
{ "kind": "comparison-table", "title": "Merchant Comparison", "columns": [{"id": "merchant", "label": "Merchant"}, {"id": "price", "label": "Price"}], "rows": [{"id": "r1", "label": "Best Buy", "cells": [{"value": "Best Buy"}, {"value": "$279", "tone": "success", "emphasis": true}]}] }

notes section:
{ "kind": "notes", "title": "Notes", "lines": ["Price includes tax", "Check for student discounts"] }

stats section:
{ "kind": "stats", "title": "Summary", "items": [{"label": "Total", "value": "4 merchants", "tone": "accent"}] }

card-grid section:
{ "kind": "card-grid", "title": "Options", "columns": 2, "cards": [{"title": "Sony WH-1000XM5", "subtitle": "Noise cancelling", "price": "$279", "chips": [{"label": "Best Price", "tone": "success"}]}] }

Full fixture example:
{
  "headline": "Price Comparison: Sony WH-1000XM5",
  "summary": "Comparing prices across 4 merchants",
  "sections": [
    {
      "kind": "comparison-table",
      "title": "Merchant Comparison",
      "columns": [{"id": "merchant", "label": "Merchant"}, {"id": "price", "label": "Price"}],
      "rows": [
        {"id": "r1", "label": "Best Buy", "cells": [{"value": "Best Buy"}, {"value": "$279", "tone": "success", "emphasis": true}]},
        {"id": "r2", "label": "Amazon", "cells": [{"value": "Amazon"}, {"value": "$299"}]}
      ]
    },
    {
      "kind": "notes",
      "title": "Notes",
      "lines": ["Price includes tax", "Check for student discounts"]
    }
  ]
}

## Valid slot kinds: ${RECIPE_SLOT_KINDS.join(', ')}
## Valid update ops: ${RECIPE_UPDATE_OPS.join(', ')}
## Valid bridge handlers: ${RECIPE_BRIDGE_HANDLERS.join(', ')}
## Existing template IDs (do NOT reuse): ${existingTemplateIds.join(', ')}

When the user describes a recipe, output the complete definition wrapped in XML tags:
<recipe_definition>
{
  "manifest": { ... },
  "runtime": { ... },
  "spec": { ... },
  "fixture": { ... }
}
</recipe_definition>

Then briefly explain what you built and ask if they want to adjust anything.

Current recipe state:
${currentRecipe ? JSON.stringify(currentRecipe, null, 2) : 'No recipe defined yet — the user wants to create a new one.'}`;
}

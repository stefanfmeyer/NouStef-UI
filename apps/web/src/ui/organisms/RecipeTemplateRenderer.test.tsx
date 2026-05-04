// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { Recipe } from '@noustef-ui/protocol';
import { RecipeTemplateFillSchema } from '@noustef-ui/protocol';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  compileRecipeTemplatePreviewState,
  compileRecipeTemplateState,
  createRecipeTemplateActionSpec,
  createRecipeTemplateGhostState
} from '../../../../bridge/src/services/recipes/recipe-template-contract';
import { RecipeTemplateRenderer } from './RecipeTemplateRenderer';

afterEach(() => {
  cleanup();
});

function createRenderedTemplate() {
  const fill = RecipeTemplateFillSchema.parse({
    kind: 'recipe_template_fill',
    schemaVersion: 'recipe_template_fill/v2',
    templateId: 'research-notebook',
    title: 'TOP HERO TITLE SHOULD NOT RENDER',
    subtitle: 'Research planning',
    summary: 'TOP HERO SUMMARY SHOULD NOT RENDER',
    data: {
      eyebrow: 'Research plan',
      heroChips: [],
      activeTabId: 'sources',
      sources: [
        {
          id: 'sources',
          label: 'Key sources',
          tone: 'accent',
          items: [
            {
              id: 'source-1',
              title: 'Hydration should populate the workbench before actions run.',
              subtitle: 'Reliability fix',
              meta: 'Required',
              chips: [],
              bullets: [],
              links: []
            }
          ]
        }
      ],
      noteLines: ['Insert a dedicated hydration stage before action generation.'],
      extractedPoints: [],
      followUps: []
    },
    metadata: {
      fixture: true
    }
  });
  const compiled = compileRecipeTemplateState({ fill });
  if (!compiled.state || !compiled.definition || compiled.errors.length > 0) {
    throw new Error(`Expected compiled template state, received errors: ${compiled.errors.join('; ')}`);
  }

  return {
    templateState: compiled.state,
    actionSpec: createRecipeTemplateActionSpec(compiled.state, compiled.definition)
  };
}

function renderTemplateState(templateState: ReturnType<typeof createRenderedTemplate>['templateState']) {
  render(
    <ChakraProvider value={defaultSystem}>
      <RecipeTemplateRenderer
        recipe={{ id: 'recipe-template-renderer' } as Recipe}
        templateState={templateState}
        actionSpec={null}
        actionLoadingId={null}
        actionError={null}
        onRunAction={vi.fn()}
      />
    </ChakraProvider>
  );
}

describe('RecipeTemplateRenderer', () => {
  it('renders the recipe body without the old hero/title summary chrome', () => {
    const renderedTemplate = createRenderedTemplate();
    renderTemplateState(renderedTemplate.templateState);

    expect(screen.getByText('Key sources')).toBeInTheDocument();
    expect(screen.getByText('Hydration should populate the workbench before actions run.')).toBeInTheDocument();
    expect(screen.queryByText('TOP HERO TITLE SHOULD NOT RENDER')).not.toBeInTheDocument();
    expect(screen.queryByText('TOP HERO SUMMARY SHOULD NOT RENDER')).not.toBeInTheDocument();
  });

  it('renders ghost template sections with visible pending hydration state', () => {
    const preview = createRecipeTemplateGhostState({
      templateId: 'research-notebook',
      updatedAt: '2026-04-14T03:25:00.000Z',
      phase: 'selected'
    });
    if (!preview.state) {
      throw new Error(`Expected a ghost template state. Errors: ${preview.errors.join('; ')}`);
    }

    renderTemplateState(preview.state);

    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-template-section-research-tabs')).toHaveAttribute('data-hydration-state', 'pending');
    expect(screen.getByTestId('recipe-template-section-research-tabs')).toHaveAttribute('data-content-state', 'ghost');
  });

  it('shows a visible repairing marker for a section under repair', () => {
    const preview = compileRecipeTemplatePreviewState({
      fill: RecipeTemplateFillSchema.parse({
        kind: 'recipe_template_fill',
        schemaVersion: 'recipe_template_fill/v2',
        templateId: 'research-notebook',
        title: 'Research notebook',
        subtitle: 'Repairing content',
        summary: 'Repairing content',
        data: {
          eyebrow: 'Research plan',
          heroChips: [],
          activeTabId: 'sources',
          sources: [],
          noteLines: [],
          extractedPoints: [],
          followUps: []
        },
        metadata: {
          fixture: true
        }
      }),
      phase: 'repairing',
      updatedAt: '2026-04-14T03:26:00.000Z',
      errorMessage: 'Repairing invalid staged content.',
      failureScope: 'content'
    });
    if (!preview.state) {
      throw new Error(`Expected a repairing preview state. Errors: ${preview.errors.join('; ')}`);
    }

    renderTemplateState(preview.state);

    expect(screen.getByText('Repairing')).toBeInTheDocument();
    expect(screen.getByText('Repairing invalid staged content.')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-template-section-research-tabs')).toHaveAttribute('data-repair-state', 'repairing');
  });
});

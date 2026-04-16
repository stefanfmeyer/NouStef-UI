import type { RecipeTemplateCategoryId } from './types';

export const RECIPE_TEMPLATE_CATEGORIES: Array<{
  id: RecipeTemplateCategoryId;
  label: string;
  summary: string;
}> = [
  {
    id: 'commerce',
    label: 'Commerce',
    summary: 'Comparison, shopping, and vendor-evaluation workspaces with dense decision support.'
  },
  {
    id: 'communication',
    label: 'Inbox & Queues',
    summary: 'Email, support, and triage patterns that emphasize grouped work, bulk actions, and queue hygiene.'
  },
  {
    id: 'travel',
    label: 'Travel & Local',
    summary: 'Search, compare, and itinerary layouts for restaurants, hotels, flights, and local discovery.'
  },
  {
    id: 'research',
    label: 'Research & Review',
    summary: 'Source gathering, coding analysis, and security review templates built around evidence and follow-up.'
  },
  {
    id: 'operations',
    label: 'Pipelines & Planning',
    summary: 'Pipeline, project, event, job-search, and campaign workflows with stable stages and next-step actions.'
  },
  {
    id: 'finance',
    label: 'Finance',
    summary: 'Recurring charges, subscriptions, and budget-oriented workspaces with totals and decision states.'
  }
];

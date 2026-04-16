import { z } from 'zod';

export const RECIPE_PROTOCOL_VERSION = '1.0.0';

export const RecipeManifestSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1).default('1.0.0'),
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().default(''),
  author: z.string().default('Hermes'),
  source: z.enum(['builtin', 'user', 'community']).default('builtin'),
  enabled: z.boolean().default(true),
  protocolVersion: z.string().default(RECIPE_PROTOCOL_VERSION),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});
export type RecipeManifest = z.infer<typeof RecipeManifestSchema>;

import { defineCollection, z } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      // Allow vault-specific frontmatter fields without validation errors
      extend: z.object({
        type: z.string().optional(),
        status: z.string().optional(),
        version: z.string().optional(),
        freshness: z.string().optional(),
        // freshness_checked is a YAML date in vault frontmatter — coerce to string
        freshness_checked: z.union([z.string(), z.date().transform(d => d.toISOString().slice(0, 10))]).optional(),
        created: z.union([z.string(), z.date().transform(d => d.toISOString().slice(0, 10))]).optional(),
        updated: z.union([z.string(), z.date().transform(d => d.toISOString().slice(0, 10))]).optional(),
        tags: z.array(z.string()).optional(),
        related_components: z.array(z.string()).optional(),
        related_tokens: z.array(z.string()).optional(),
        related_patterns: z.array(z.string()).optional(),
        related_heuristics: z.array(z.string()).optional(),
        platforms: z.union([z.array(z.string()), z.string()]).optional(),
        github: z.string().optional(),
        category: z.string().optional(),
      }),
    }),
  }),
}

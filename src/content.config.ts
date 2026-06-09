import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().max(170),
		date: z.coerce.date(),
		author: z.string().default('Avukat Aydin'),
		tags: z.array(z.string()).default([]),
		coverImage: z.string().optional(),
		slug: z.string().optional(),
		lang: z.enum(['tr', 'en']).default('tr'),
	}),
});

export const collections = { posts };

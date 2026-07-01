import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { departmentIds } from './data/team';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    excerpt: z.string(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    department: z.enum(departmentIds).optional(),
    avatar: z.string().optional(),
    socials: z.object({
      linkedin: z.string().optional(),
      website: z.string().optional(),
      twitter: z.string().optional(),
    }).optional(),
  }),
});

const character = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/character' }),
  schema: z.object({
    section: z.string(),
    title: z.string(),
    order: z.number().default(0),
    image: z.string().optional(),
  }),
});

const roadmap = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/roadmap' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['planned', 'in-progress', 'completed']),
    order: z.number().default(0),
    date: z.string().optional(),
    features: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, team, character, roadmap };

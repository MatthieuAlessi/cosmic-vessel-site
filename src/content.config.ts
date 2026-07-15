import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
 





const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/blog' }),
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
    loader: glob({ pattern: '*.json', base: './src/content/team' }),

    schema: z.object({
      department: z.string(),

      openroles: z.array(z.string()).default([]),

      members: z.array(z.object({
        name: z.string(),
        role: z.string().optional(),
        avatar: z.string().optional(),
        socials: z.object({
          linkedin: z.string().optional(),
          website: z.string().optional(),
          twitter: z.string().optional(),
        }).optional(),
      })).default([]),

    }),
  });


// const teasms = defineCollection({
//   loader: glob({ pattern: '**/*.json', base: './src/content/team' }),
//   schema: z.object({
//     name: z.string(),
//     role: z.string(),
//     department: z.enum(departmentIds).optional(),
//     avatar: z.string().optional(),
//     socials: z.object({
//       linkedin: z.string().optional(),
//       website: z.string().optional(),
//       twitter: z.string().optional(),
//     }).optional(),
//   }),
// });

const character = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/character' }),
  schema: z.object({
    section: z.string(),
    title: z.string(),
    order: z.number().default(0),
    image: z.string().optional(),
  }),
});

 

const roadmapCategories = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/roadmap-categories' }),
  schema: z.object({
      categorie: z.string(),                    // fields.slug → z.string()
      features: z.array(z.object({              // fields.array(fields.object(...)) → z.array(z.object(...))
        name: z.string(),
        description: z.string().optional(),
        icon: z.string().default('ph:sparkle'),
        status: z.enum(['completed', 'in-progress', 'planned']).default('planned'),  // fields.select → z.enum
      })).default([]),
  }),
});

const classes = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/classes' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    spells: z.array(z.object({
      name: z.string(),
      description: z.string().optional(),
      image: z.string().optional(),
    })).default([]),
  }),
});

export const collections = { blog, team, character, roadmapCategories, classes };

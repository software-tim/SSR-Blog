import { defineCollection, z } from 'astro:content';
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]), // This defines tags as an array of strings with default empty array
  }),
});

export const collections = {
  blog: blogCollection,
};


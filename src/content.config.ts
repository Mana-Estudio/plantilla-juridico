import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Blog: un .md por artículo en src/content/blog/. La foto es el slug de una de src/assets/fotos.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string().max(160),
    fecha: z.coerce.date(),
    actualizado: z.coerce.date().optional(),
    area: z.enum(['laboral', 'familia', 'herencias', 'trafico', 'penal', 'empresas', 'general']),
    foto: z.string(),
    autor: z.string(),
  }),
});

export const collections = { blog };

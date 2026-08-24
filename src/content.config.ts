import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/** 공지사항: src/content/notices/*.md 파일 하나가 공지 하나입니다. */
const notices = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notices' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    category: z.enum(['세무', '회계', '공지', '뉴스']).default('공지'),
    pinned: z.boolean().default(false),
  }),
});

/** 구성원: src/data/team.json 배열의 항목 하나가 구성원 한 명입니다. */
const team = defineCollection({
  loader: file('./src/data/team.json'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      role: z.enum(['대표파트너', '파트너', '이사', '공인회계사']),
      photo: image(),
      featured: z.boolean().default(false),
      order: z.number(),
      career: z.array(z.string()),
      expertise: z.array(z.string()).default([]),
    }),
});

/** 서비스: src/data/services.json */
const services = defineCollection({
  loader: file('./src/data/services.json'),
  schema: ({ image }) =>
    z.object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      image: image(),
      order: z.number(),
      groups: z.array(
        z.object({
          heading: z.string(),
          items: z.array(z.string()),
        }),
      ),
    }),
});

export const collections = { notices, team, services };

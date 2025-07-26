// content-collections.ts

import { type Context, defineCollection, defineConfig, type Meta } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { getTOC, rehypePlugins, remarkPlugins } from '@taxilkath/mdx-plugins'
import { z } from 'zod'

type BaseDoc = {
  _meta: Meta
  content: string
}

const transform = async <D extends BaseDoc>(document: D, context: Context) => {
  const code = await compileMDX(context, document, {
    remarkPlugins,
    rehypePlugins
  })
  const [locale, path] = document._meta.path.split(/[/\\]/)

  if (!locale || !path) {
    throw new Error(`Invalid path: ${document._meta.path}`)
  }

  return {
    ...document,
    code,
    locale,
    slug: path,
    toc: await getTOC(document.content)
  }
}

const posts = defineCollection({
  name: 'Post',
  directory: 'src/content/blog',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    modifiedTime: z.string(),
    summary: z.string()
  }),
  transform
})

const projects = defineCollection({
  name: 'Project',
  directory: 'src/content/projects',
  include: '**/*.mdx',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    homepage: z.string().optional(),
    github: z.string(),
    techstack: z.array(z.string()),
    projectType: z.enum(['Open Source', 'Company']).optional(), // Make projectType optional
    company: z.string().optional(),
    selected: z.boolean().optional().default(false),
    learning: z.array(z.string()).optional()
  }),
  transform
})

const pages = defineCollection({
  name: 'Page',
  directory: 'src/content/pages',
  include: '**/*.mdx',
  schema: z.object({}),
  transform
})

export default defineConfig({
  collections: [posts, projects, pages]
})
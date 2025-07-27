// file: apps/web/src/app/[locale]/(main)/projects/[slug]/page.tsx

import type { Metadata, ResolvingMetadata } from 'next'
import type { SoftwareApplication, WithContext } from 'schema-dts'

import { i18n } from '@taxilkath/i18n/config'
import { setRequestLocale } from '@taxilkath/i18n/server'
import { allProjects } from 'content-collections'
import { GitForkIcon, StarIcon, Brain } from 'lucide-react'
import { notFound } from 'next/navigation'

import Mdx from '@/components/mdx'
import type { Tech, TechCategory } from '@/config/tech-stack'
import { TECH_MAP } from '@/config/tech-stack'
import { SITE_NAME, SITE_URL } from '@/lib/constants'
import { getLocalizedPath } from '@/utils/get-localized-path'

import Header from './header'
import { ProjectMedia } from './project-media' // ✨ IMPORT the new component
import { Marquee } from '@taxilkath/ui'

// Helper function to render tech logo
const renderTechLogo = (tech: Tech) => {
  if (typeof tech.logo === 'string') {
    return null // Don't show anything for string logos
  }
  
  const LogoComponent = tech.logo
  return <LogoComponent className='h-5 w-5 text-slate-300 transition-colors duration-300' />
}

type PageProps = {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export const generateStaticParams = (): Array<{ slug: string; locale: string }> => {
  return allProjects.map((project) => ({
    slug: project.slug,
    locale: project.locale
  }))
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug, locale } = await props.params

  const project = allProjects.find((p) => p.slug === slug && p.locale === locale)

  if (!project) {
    return {}
  }

  const { name, description } = project
  const previousTwitter = (await parent).twitter ?? {}
  const previousOpenGraph = (await parent).openGraph ?? {}
  const fullSlug = `/projects/${slug}`
  const url = getLocalizedPath({ slug: fullSlug, locale, absolute: false })

  return {
    title: name,
    description: description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [
            l,
            getLocalizedPath({ slug: fullSlug, locale: l, absolute: false })
          ])
        ),
        'x-default': getLocalizedPath({
          slug: fullSlug,
          locale: i18n.defaultLocale,
          absolute: false
        })
      }
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      title: name,
      description: description,
      images: [
        {
          url: `/images/projects/${slug}/cover.png`,
          width: 1280,
          height: 832,
          alt: description,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      ...previousTwitter,
      title: name,
      description: description,
      images: [
        {
          url: `/images/projects/${slug}/cover.png`,
          width: 1280,
          height: 832,
          alt: description
        }
      ]
    }
  }
}

const Page = async (props: PageProps) => {
  const { slug, locale } = await props.params
  setRequestLocale(locale)

  const project = allProjects.find((p) => p.slug === slug && p.locale === locale)
  const url = getLocalizedPath({ slug: `/projects/${slug}`, locale, absolute: true })

  if (!project) {
    notFound()
  }

  const { name, code, description, github, techstack } = project

  // Group technologies by category
  const categorizedTech = techstack.reduce(
    (acc, techName) => {
      const tech = TECH_MAP.get(techName.toLowerCase())
      if (tech) {
        if (!acc[tech.category]) {
          acc[tech.category] = []
        }
        acc[tech.category].push(tech)
      }
      return acc
    },
    {} as Record<TechCategory, Tech[]>
  )

  const categoryOrder: TechCategory[] = [
    'Frontend',
    'Backend',
    'Database',
    'Styling',
    'Content',
    'Deployment',
    'Testing',
    'Tools',
    'APIs',
    'Animation',
    'State Management',
    'Validation',
    'HTTP Client',
    'Email',
    'Analytics',
    'Desktop'
  ]

  const jsonLd: WithContext<SoftwareApplication> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'WebApplication',
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL
    },
    sameAs: [github],
    screenshot: `${SITE_URL}/images/projects/${slug}/cover.png`
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='mx-auto max-w-5xl'>
        <Header {...project} />

        {/* ✨ REPLACE the old media rendering logic with the new component */}
        <ProjectMedia slug={slug} name={name} />

        <div className='grid grid-cols-1 gap-12 lg:grid-cols-3'>
          {/* Main Content */}
          <article className='prose prose-zinc dark:prose-invert col-span-1 w-full max-w-none lg:col-span-2'>
            <h2 className='border-b pb-2 text-3xl font-bold'>
              About This Project
            </h2>
            <Mdx code={code} />
          </article>

          {/* Sidebar */}
          <aside className='col-span-1 lg:col-span-1'>
            <div className='space-y-8 lg:sticky lg:top-24'>
              {/* Tech Stack Card */}
              <div className='relative overflow-hidden rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-700/20 p-6 shadow-xl backdrop-blur-sm transition-all duration-500'>
                <div className='absolute inset-0 bg-gradient-to-r from-slate-600/0 via-slate-500/3 to-slate-400/3 opacity-0 transition-opacity duration-500' />
                <div className='relative z-10'>
                  <h3 className='mb-6 bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-xl font-bold tracking-tight text-transparent'>
                    Tech Stack
                  </h3>
                  <div className='space-y-6'>
                    {categoryOrder.map(
                      (category) =>
                        categorizedTech[category] && (
                          <div key={category}>
                            <h4 className='mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400'>
                              {category}
                            </h4>
                            <div className='flex flex-wrap gap-x-4 gap-y-2'>
                              {categorizedTech[category].length > 2 ? (
                                <Marquee
                                  direction='left'
                                  className='min-w-0'
                                  pauseOnHover
                                >
                                  {categorizedTech[category].map((tech) => (
                                    <div
                                      key={tech.name}
                                      className='flex items-center gap-2 rounded-lg bg-slate-800/40 px-3 py-2 backdrop-blur-sm transition-all duration-300'
                                    >
                                      {renderTechLogo(tech)}
                                      <span className='text-sm font-medium text-slate-200 transition-colors duration-300'>
                                        {tech.name}
                                      </span>
                                    </div>
                                  ))}
                                </Marquee>
                              ) : (
                                categorizedTech[category].map((tech) => (
                                  <div
                                    key={tech.name}
                                    className='flex items-center gap-2 rounded-lg bg-slate-800/40 px-3 py-2 backdrop-blur-sm transition-all duration-300'
                                  >
                                    {renderTechLogo(tech)}
                                    <span className='text-sm font-medium text-slate-200 transition-colors duration-300'>
                                      {tech.name}
                                    </span>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
                {/* Animated border glow */}
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-500/10 to-slate-400/10 opacity-0 blur-xl transition-opacity duration-500' />
              </div>

              {/* Project Stats Card */}
              <div className='relative overflow-hidden rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-700/20 p-6 shadow-xl backdrop-blur-sm transition-all duration-500'>
                <div className='absolute inset-0 bg-gradient-to-r from-slate-600/0 via-slate-500/3 to-slate-400/3 opacity-0 transition-opacity duration-500' />
                <div className='relative z-10'>
                  <h3 className='mb-6 bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-xl font-bold tracking-tight text-transparent'>
                    Project Stats
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between rounded-lg bg-slate-800/40 p-3 backdrop-blur-sm transition-all duration-300'>
                      <div className='flex items-center gap-3 text-sm'>
                        <StarIcon className='size-4 text-slate-300 transition-transform duration-300' />
                        <span className='font-medium text-slate-200'>
                          Stars
                        </span>
                      </div>
                      <span className='font-mono text-lg font-bold text-slate-300'>
                        --
                      </span>
                    </div>
                    <div className='flex items-center justify-between rounded-lg bg-slate-800/40 p-3 backdrop-blur-sm transition-all duration-300'>
                      <div className='flex items-center gap-3 text-sm'>
                        <GitForkIcon className='size-4 text-slate-300 transition-transform duration-300' />
                        <span className='font-medium text-slate-200'>
                          Forks
                        </span>
                      </div>
                      <span className='font-mono text-lg font-bold text-slate-300'>
                        --
                      </span>
                    </div>
                  </div>
                </div>
                {/* Animated border glow */}
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-500/10 to-slate-400/10 opacity-0 blur-xl transition-opacity duration-500' />
              </div>

              {/* What I Learned Card */}
              <div className='relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-purple-950/30 p-6 shadow-xl backdrop-blur-sm transition-all duration-500'>
                <div className='absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-purple-600/5 to-blue-600/5 opacity-0 transition-opacity duration-500' />
                <div className='relative z-10'>
                  <div className='mb-6 flex items-center gap-3'>
                    <Brain className='size-6 text-indigo-400 transition-all duration-300' />
                    <h3 className='bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-xl font-bold tracking-tight text-transparent'>
                      What I Learned
                    </h3>
                  </div>
                  <div className='space-y-3'>
                    {(project.learning ?? []).map((learning, index) => (
                      <div
                        key={index}
                        className='group flex items-start gap-4 rounded-lg bg-slate-800/30 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-900/20 cursor-pointer'
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className='mt-1 text-indigo-400 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-400'>
                          ✅
                        </span>
                        <span className='text-sm leading-relaxed text-slate-300 transition-colors duration-300 group-hover:text-indigo-200'>
                          {learning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Animated border glow */}
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/15 to-purple-500/15 opacity-0 blur-xl transition-opacity duration-500' />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default Page
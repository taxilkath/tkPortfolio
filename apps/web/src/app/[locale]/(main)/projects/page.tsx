//file: apps/web/src/app/[locale]/(main)/projects/page.tsx

import type { Metadata, ResolvingMetadata } from 'next'
import type { CollectionPage, WithContext } from 'schema-dts'

import { i18n } from '@taxilkath/i18n/config'
import { getTranslations, setRequestLocale } from '@taxilkath/i18n/server'
import { allProjects } from 'content-collections'

import PageTitle from '@/components/page-title'
import ProjectCards from '@/components/project-cards'
import { SITE_URL } from '@/lib/constants'
import { getLocalizedPath } from '@/utils/get-localized-path'

type PageProps = {
  params: Promise<{
    locale: string
  }>
}

export const generateStaticParams = (): Array<{ locale: string }> => {
  return allProjects.map((project) => ({
    slug: project.slug,
    locale: project.locale
  }))
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { locale } = await props.params
  const previousOpenGraph = (await parent).openGraph ?? {}
  const previousTwitter = (await parent).twitter ?? {}
  const t = await getTranslations({ locale, namespace: 'projects' })
  const title = t('title')
  const description = t('description')
  const slug = '/projects'
  const url = getLocalizedPath({ slug, locale, absolute: false })

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, getLocalizedPath({ slug, locale: l, absolute: false })])
        ),
        'x-default': getLocalizedPath({ slug, locale: i18n.defaultLocale, absolute: false })
      }
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      title,
      description
    },
    twitter: {
      ...previousTwitter,
      title,
      description
    }
  }
}

const Page = async (props: PageProps) => {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations()
  const title = t('projects.title')
  const description = t('projects.description')
  const url = getLocalizedPath({ slug: '/projects', locale, absolute: true })

  const projects = allProjects.filter((project) => project.locale === locale)

  const jsonLd: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: t('metadata.site-title'),
      url: SITE_URL
    },
    hasPart: allProjects.map((project) => ({
      '@type': 'SoftwareApplication',
      name: project.name,
      description: project.description,
      url: `${url}/${project.slug}`,
      applicationCategory: 'WebApplication'
    }))
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={title} description={description} />
      <ProjectCards projects={projects} />
    </>
  )
}

export default Page
import type { MetadataRoute } from 'next'

import { supportedLanguages } from '@taxilkath/i18n/config'
import { allPages, allProjects } from 'content-collections'

import { getLocalizedPath } from '@/utils/get-localized-path'

const sitemap = (): MetadataRoute.Sitemap => {
  const routes = [
    '',
    '/projects',
    ...new Set(allPages.map((page) => `/${page.slug}`)),
    ...new Set(allProjects.map((project) => `/projects/${project.slug}`))
  ]

  return supportedLanguages.flatMap((locale) => {
    return routes.map((route) => ({
      url: getLocalizedPath({ slug: route, locale: locale.code, absolute: true }),
      lastModified: new Date()
    }))
  })
}

export default sitemap

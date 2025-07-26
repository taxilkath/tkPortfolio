import { i18n } from '@taxilkath/i18n/config'

import { SITE_URL } from '@/lib/constants'

type LocalizedDocument = {
  slug: string
  locale: string
  absolute: boolean
}

export const getLocalizedPath = (doc: LocalizedDocument) => {
  const { slug, locale, absolute } = doc

  let localePath: string

  if (locale === i18n.defaultLocale) {
    localePath = absolute ? SITE_URL : '/'
  } else {
    localePath = absolute ? `${SITE_URL}/${locale}` : `/${locale}`
  }

  return `${localePath}${slug}`
}

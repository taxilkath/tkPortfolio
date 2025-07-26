import type { AboutPage, WithContext } from 'schema-dts'

import { getTranslations, setRequestLocale } from '@taxilkath/i18n/server'
import { allPages } from 'content-collections'
import {
  Award,
  Briefcase,
  Code,
  Contact,
  GraduationCap,
  User
} from 'lucide-react'
import { notFound } from 'next/navigation'
import Link from '@/components/link'
import Mdx from '@/components/mdx'
import { BlurImage } from '@/components/ui/blur-image'
import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
  SITE_X_URL,
  SITE_YOUTUBE_URL
} from '@/lib/constants'
import { getLocalizedPath } from '@/utils/get-localized-path'

type PageProps = {
  params: Promise<{
    locale: string
  }>
}

const sections = [
  { id: 'summary', icon: <User />, label: 'summary' },
  { id: 'experience', icon: <Briefcase />, label: 'experience' },
  { id: 'education', icon: <GraduationCap />, label: 'education' },
  { id: 'certifications', icon: <Award />, label: 'certifications' },
  { id: 'skills', icon: <Code />, label: 'skills' },
  { id: 'contact', icon: <Contact />, label: 'contact' }
] as const

// ... (keep generateStaticParams and generateMetadata functions as they are) ...

const Page = async (props: PageProps) => {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations()
  const title = t('about.title')
  const description = t('about.description')
  const url = getLocalizedPath({ slug: '/about', locale, absolute: true })
  const page = allPages.find((p) => p.slug === 'about' && p.locale === locale)

  const jsonLd: WithContext<AboutPage> = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: title,
    description,
    url,
    mainEntity: {
      '@type': 'Person',
      name: SITE_NAME,
      description: t('metadata.site-description'),
      url: SITE_URL,
      sameAs: [
        SITE_FACEBOOK_URL,
        SITE_INSTAGRAM_URL,
        SITE_X_URL,
        SITE_GITHUB_URL,
        SITE_YOUTUBE_URL
      ]
    }
  }

  if (!page) {
    return notFound()
  }

  const { code } = page

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className='relative mx-auto max-w-6xl'>
        {/* Header/Intro Box */}
        <div className='relative -mx-4 sm:-mx-8 md:-mx-16'>
          <div className='absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-2xl' />
          <div className='flex flex-col items-center gap-8 px-4 py-16 text-center md:py-24'>
            {/* MODIFICATION START */}
            <div className='group h-32 w-32 [perspective:1000px]'>
              {/* The inner container that will actually flip and scale */}
              <div className='relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)_scale(1.25)]'>
                {/* Front Face: Initial Avatar */}
                <div className='absolute h-full w-full [backface-visibility:hidden]'>
                  <BlurImage
                    src='/images/avatar.png'
                    width={128}
                    height={128}
                    alt='Taxil Kathiriya'
                    className='rounded-full shadow-xl'
                    lazy={false}
                  />
                </div>

                {/* Back Face: The new profile.png, pre-rotated */}
                <div className='absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]'>
                  <BlurImage
                    src='/images/profile.png'
                    width={128}
                    height={128}
                    alt='Taxil Kathiriya Profile'
                    className='rounded-full shadow-xl'
                    lazy={false}
                  />
                </div>
              </div>
            </div>
            {/* MODIFICATION END */}
            <div className='space-y-4'>
              <h1 className='text-4xl font-bold md:text-5xl'>{t('about.title')}</h1>
              <p className='max-w-2xl text-lg text-muted-foreground'>
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='mt-16 grid grid-cols-1 gap-16 lg:grid-cols-4'>
          {/* Sticky Sidebar */}
          <aside className='col-span-1 hidden lg:block'>
            <div className='sticky top-24'>
              <nav className='flex flex-col space-y-2'>
                <p className='px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                  On this page
                </p>
                {sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className='group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
                  >
                    {section.icon}
                    <span>{t(`about.sections.${section.label}`)}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Columns */}
          <div className='col-span-1 lg:col-span-3'>
            <div className='prose prose-zinc w-full max-w-none dark:prose-invert'>
              <Mdx code={code} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
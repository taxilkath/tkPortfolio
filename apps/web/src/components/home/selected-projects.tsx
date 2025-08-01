'use client'

import { useLocale, useTranslations } from '@taxilkath/i18n/client'
import { buttonVariants } from '@taxilkath/ui'
import { cn } from '@taxilkath/utils'
import { allProjects, type Project } from 'content-collections'
import { ArrowUpRightIcon, LightbulbIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import { BlurImage } from '@/components/ui/blur-image'

import Link from '../link'

const variants = {
  initial: {
    y: 40,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1
  }
}

type CardProps = {
  project: Project
}

const SelectedProjects = () => {
  const projectsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' })
  const t = useTranslations()
  const locale = useLocale()
  const filteredProjects = allProjects.filter(
    (project) => project.selected && project.locale === locale
  )

  return (
    <motion.div
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
      transition={{
        duration: 0.5
      }}
      className='relative my-24'
    >
      <motion.h2
        className='section-title text-center text-xl font-bold tracking-tight lg:text-2xl'
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        {t('homepage.selectedProjects.title')}
      </motion.h2>
      <motion.div
        className='mt-12 grid gap-4 md:grid-cols-2'
        initial={{
          y: 40,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        {filteredProjects.map((project) => (
          <Card key={project.slug} project={project} />
        ))}
      </motion.div>
      <div className='my-8 flex items-center justify-center'>
        <Link
          href='/projects'
          className={cn(
            buttonVariants({
              variant: 'outline'
            }),
            'rounded-xl'
          )}
        >
          {t('homepage.selectedProjects.more')}
        </Link>
      </div>
    </motion.div>
  )
}

const Card = (props: CardProps) => {
  const { project } = props
  const { slug, name, description } = project
  const t = useTranslations()

  return (
    <Link
      key={slug}
      href={`/projects/${slug}`}
      className='shadow-feature-card group relative rounded-xl p-2 transition-all duration-300 border border-transparent hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10'
    >
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-3'>
          <LightbulbIcon className='size-[18px]' />
          <h2 className='font-accent text-sm font-medium'>{t('homepage.selectedProjects.card')}</h2>
        </div>
        <ArrowUpRightIcon className='size-[18px] opacity-0 transition-opacity group-hover:opacity-100' />
      </div>
      <BlurImage
        width={1280}
        height={832}
        src={`/images/projects/${slug}/cover.png`}
        alt={description}
        className='rounded-lg'
      />
      <div className='absolute bottom-6 left-7 flex flex-col transition-[left] ease-out group-hover:left-[30px]'>
        <h3 className='font-heading text-xl font-bold text-white'>{name}</h3>
      </div>
    </Link>
  )
}

export default SelectedProjects

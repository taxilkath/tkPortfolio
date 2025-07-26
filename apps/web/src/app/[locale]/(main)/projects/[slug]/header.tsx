// file: apps/web/src/app/[locale]/(main)/projects/[slug]/header.tsx

'use client'

import type { Project } from 'content-collections'

import { useTranslations } from '@taxilkath/i18n/client'
import { buttonVariants } from '@taxilkath/ui'
import { cn } from '@taxilkath/utils'
import { ArrowUpRightIcon } from 'lucide-react'
import { motion } from 'motion/react'

import Link from '@/components/link'
import { GITHUB_USERNAME } from '@/lib/constants'

const animation = {
  hide: {
    x: -30,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1
  }
}

type HeaderProps = Project

const Header = (props: HeaderProps) => {
  const { name, description, homepage, github } = props
  const t = useTranslations()

  const repo = github.split('/').pop()

  return (
    <div className='space-y-8 pt-10'>
      <motion.div
        className='flex flex-col items-start gap-3' // Changed to flex-col and items-start
        initial={animation.hide}
        animate={animation.show}
      >
        <h1 className='text-3xl font-bold'>{name}</h1>
        <h2 className='text-muted-foreground'>{description}</h2>
      </motion.div>
      <motion.div
        className='flex flex-col items-start gap-2 sm:flex-row sm:gap-4'
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        {homepage && (
          <Link href={homepage} className={cn(buttonVariants(), 'group')}>
            {t('projects.visit-website')}
            <ArrowUpRightIcon className='ml-2 size-5 transition-transform group-hover:-rotate-12' />
          </Link>
        )}
        <Link href={github} className={cn(buttonVariants({ variant: 'secondary' }), 'group')}>
          {GITHUB_USERNAME}/{repo}
          <ArrowUpRightIcon className='ml-2 size-5 transition-transform group-hover:-rotate-12' />
        </Link>
      </motion.div>
    </div>
  )
}
export default Header
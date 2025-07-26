'use client'

import { useTranslations } from '@taxilkath/i18n/client'
import { buttonVariants } from '@taxilkath/ui'
import { cn } from '@taxilkath/utils'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import Link from '../link'

import CodingHours from './coding-hours'
import Connect from './connect'
import CVCard from './cv-card'
import FavoriteFramework from './favorite-framework'
import GoToStack from './go-to-stack'
import LocationCard from './location-card'
import StacksCard from './stacks-card'

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

const AboutMe = () => {
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardsRef, { once: true, margin: '-100px' })
  const t = useTranslations()

  return (
    <motion.div
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={cardsRef}
      transition={{
        duration: 0.5
      }}
      className='relative my-24'
    >
      <motion.h2
        className='font-heading text-center text-3xl font-bold tracking-tight lg:text-4xl'
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
        {t('homepage.about-me.title')}
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
        <div className='grid gap-4'>
          <LocationCard />
          <StacksCard />
        </div>
        <div className='grid gap-4'>
          <div className='grid gap-4 [@media(min-width:450px)]:grid-cols-2'>
            <Connect />
            <CVCard />
          </div>
          <div className='grid gap-4 [@media(min-width:450px)]:grid-cols-3'>
            <CodingHours />
            <FavoriteFramework />
            <GoToStack />
          </div>
        </div>
      </motion.div>
      <div className='my-8 flex items-center justify-center'>
        <Link href='/about' className={cn(buttonVariants({ variant: 'outline' }), 'rounded-xl')}>

          {t('homepage.about-me.more')}
        </Link>
      </div>
    </motion.div>
  )
}

export default AboutMe

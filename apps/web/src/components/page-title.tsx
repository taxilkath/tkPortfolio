'use client'

import { Separator } from '@taxilkath/ui'
import { motion } from 'motion/react'

type PageTitleProps = {
  title: string
  description: string
  animate?: boolean
}

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

const PageTitle = (props: PageTitleProps) => {
  const { title, description, animate = true } = props

  return (
    <div className='mb-16 mt-6 sm:mb-24 sm:mt-12'>
      <motion.h1
        className='section-title my-4 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl'
        {...(animate && {
          initial: animation.hide,
          animate: animation.show
        })}
      >
        {title}
      </motion.h1>
      <motion.h2
        className='text-muted-foreground font-accent mb-8 text-lg font-medium'
        {...(animate && {
          initial: animation.hide,
          animate: animation.show,
          transition: {
            delay: 0.1
          }
        })}
      >
        {description}
      </motion.h2>
      <Separator className='absolute inset-x-0 translate-y-2 sm:translate-y-6' />
    </div>
  )
}

export default PageTitle

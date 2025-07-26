'use client'

import { useTranslations } from '@taxilkath/i18n/client'
import { cn } from '@taxilkath/utils'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { BlurImage } from '@/components/ui/blur-image'

import CommandMenu from '@/components/command-menu'

import Link from '../link'


import MobileNav from './mobile-nav'
import Navbar from './navbar'
import ThemeSwitcher from './theme-switcher'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    document.addEventListener('scroll', changeBackground)

    return () => document.removeEventListener('scroll', changeBackground)
  }, [])

  return (
    <motion.header
      className={cn(
        'fixed inset-x-0 top-4 z-40 mx-auto flex h-[60px] max-w-6xl items-center justify-between rounded-2xl px-7 saturate-100 backdrop-blur-[12px] transition-all duration-300',
        // Base styling with better visibility
        'bg-background/50 border border-border/20 shadow-lg shadow-black/5',
        // Dark mode improvements
        'dark:bg-background/60 dark:border-border/30 dark:shadow-lg dark:shadow-black/20',
        // Hover effects
        'hover:bg-background/70 hover:border-border/40 hover:shadow-xl hover:shadow-primary/5',
        'dark:hover:bg-background/80 dark:hover:border-border/50 dark:hover:shadow-xl dark:hover:shadow-primary/10',
        // Scrolled state
        isScrolled && 'bg-background/80 border-border/40 shadow-xl shadow-black/10',
        isScrolled && 'dark:bg-background/90 dark:border-border/50 dark:shadow-xl dark:shadow-black/30'
      )}
      initial={{
        y: -100
      }}
      animate={{
        y: 0
      }}
      transition={{
        duration: 0.3
      }}
    >
      <Link
        href='#skip-nav'
        className='bg-background focus-visible:ring-ring rounded-xs shadow-xs focus-visible:ring-3 fixed left-4 top-4 -translate-y-20 border p-2 font-accent font-medium transition-transform focus-visible:translate-y-0 focus-visible:ring-offset-2'
      >
        <span>{t('layout.skip-to-main-content')}</span>
      </Link>
      <Link
        href='/'
        className='flex items-center justify-center gap-1 group'
        aria-label={t('layout.home')}
      >


        <BlurImage
          src="/images/avatar.png"
          alt="Avatar"
          width={50}
          height={50}
          aria-hidden='true'
          className="rounded-full transition-transform duration-200 group-hover:scale-105"
        />

      </Link>
      <div className='flex items-center gap-2'>
        <Navbar />
        <ThemeSwitcher />
        <CommandMenu />
        <MobileNav />
      </div>
    </motion.header>
  )
}

export default Header

'use client'

import { useTranslations } from '@taxilkath/i18n/client'
import { usePathname } from '@taxilkath/i18n/routing'
import { cn } from '@taxilkath/utils'

import { HEADER_LINKS } from '@/config/links'

import Link from '../link'

const Navbar = () => {
  const pathname = usePathname()
  const t = useTranslations()

  return (
    <nav className='hidden md:block'>
      <ul className='flex gap-6'>
        {HEADER_LINKS.map((link) => {
          const isActive = link.href === pathname

          return (
            <li key={link.key} className='relative flex h-[60px] items-center justify-center'>
              <Link
                className={cn('rounded-sm px-4 py-2 text-base font-medium transition-colors', {
                  'text-muted-foreground hover:text-foreground': !isActive,
                  'text-foreground': isActive
                })}
                href={link.href}
              >
                {t(`layout.${link.key}`)}
              </Link>
              {isActive && (
                <>
                  <div className='bg-nav-link-indicator absolute bottom-0 left-1/2 h-px w-12 -translate-x-1/2' />
                  <div className='absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 rounded-[4px] bg-[rgb(255_122_151)] blur-sm dark:bg-[rgb(223_29_72)]' />
                </>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar

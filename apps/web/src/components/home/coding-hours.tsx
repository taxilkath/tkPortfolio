'use client'

import { useQuery } from '@tanstack/react-query'
import { flags } from '@taxilkath/env'
import { useTranslations } from '@taxilkath/i18n/client'
import { ClockIcon } from 'lucide-react'

import { orpc } from '@/orpc/client'

const CodingHours = () => {
  useQuery({
    ...orpc.stats.wakatime.queryOptions(),
    enabled: flags.stats
  })
  const t = useTranslations()

  return (
    <div className='shadow-feature-card flex flex-col gap-4 rounded-xl p-4 lg:p-5 transition-all duration-300 border border-transparent hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10'>
      <div className='flex items-center gap-2'>
        <ClockIcon className='size-[18px]' />
        <h2 className='text-sm'>{t('homepage.about-me.coding-hours')}</h2>
      </div>
      <div className='flex grow items-center justify-center text-2xl font-semibold'>5498</div>
    </div>
  )
}

export default CodingHours

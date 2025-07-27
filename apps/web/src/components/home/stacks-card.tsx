'use client'

import {  
  SiCloudflare,
  SiCss,
  SiDrizzle,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMarkdown,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiCypress,
  SiPnpm,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRadixui,
  SiReact,
  SiReactquery,
  SiRedis,
  SiSpotify,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiWakatime,
  SiYoutube,
  SiZod,
  SiOpenai,
  SiMongodb,
  SiDocker,
  SiExpress,
  SiSocketdotio
} from '@icons-pack/react-simple-icons'
import { useTranslations } from '@taxilkath/i18n/client'
import { Marquee } from '@taxilkath/ui'
import { ZapIcon } from 'lucide-react'

const StacksCard = () => {
  const t = useTranslations()

  return (
    <div className='shadow-feature-card flex h-60 flex-col gap-2 overflow-hidden rounded-xl p-4 lg:p-6 transition-all duration-300 border border-transparent hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10'>
      <div className='flex items-center gap-2'>
        <ZapIcon className='size-[18px]' />
        <h2 className='text-sm'>{t('homepage.about-me.stacks')}</h2>
      </div>
      <Marquee gap='20px' className='py-4' fade pauseOnHover>
        <SiHtml5 className='size-10' />
        <SiCss className='size-10' />
        <SiJavascript className='size-10' />
        <SiTypescript className='size-10' />
        <SiFigma className='size-10' />
        <SiTailwindcss className='size-10' />
        <SiNextdotjs className='size-10' />
        <SiReact className='size-10' />
        <SiRadixui className='size-10' />
        <SiFramer className='size-10' />
        <SiReactquery className='size-10' />
        <SiZod className='size-10' />
        <SiMongodb className='size-10' />
        <SiDocker className='size-10' />
        <SiExpress className='size-10' />
        <SiSocketdotio className='size-10' />
      </Marquee>
      <Marquee gap='20px' className='py-4' reverse fade pauseOnHover>
        <SiDrizzle className='size-10' />
        <SiPostgresql className='size-10' />
        <SiRedis className='size-10' />
        <SiVercel className='size-10' />
        <SiTurborepo className='size-10' />
        <SiPnpm className='size-10' />
        <SiNodedotjs className='size-10' />
        <SiGithub className='size-10' />
        <SiSpotify className='size-10' />
        <SiWakatime className='size-10' />
        <SiYoutube className='size-10' />
        <SiVitest className='size-10' />
        <SiCypress className='size-10' />
        <SiMysql className='size-10' />
        <SiOpenai className='size-10' />
        <SiMarkdown className='size-10' />
      </Marquee>
    </div>
  )
}

export default StacksCard
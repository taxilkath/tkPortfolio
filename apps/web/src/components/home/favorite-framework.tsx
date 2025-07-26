import { SiNextdotjs } from '@icons-pack/react-simple-icons'
import { useTranslations } from '@taxilkath/i18n/client'
import { HeartIcon } from 'lucide-react'

const FavoriteFramework = () => {
  const t = useTranslations()

  return (
    <div className='shadow-feature-card flex flex-col gap-4 rounded-xl p-4 lg:p-5 transition-all duration-300 border border-transparent hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10'>
      <div className='flex items-center gap-2'>
        <HeartIcon className='size-[18px]' />
        <h2 className='text-sm'>{t('homepage.about-me.fav-framework')}</h2>
      </div>
      <div className='flex items-center justify-center'>
        <SiNextdotjs size={48} className='text-zinc-800 dark:text-zinc-200' />
      </div>
    </div>
  )
}

export default FavoriteFramework

import {
  type IconType,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiX,
  SiYoutube
} from '@icons-pack/react-simple-icons'
import {
  BarChartIcon,
  FlameIcon,
  MonitorIcon,
  UserCircleIcon
} from 'lucide-react'

import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_X_URL,
  SITE_YOUTUBE_URL
} from '@/lib/constants'

type SocialLinks = Array<{
  href: string
  title: string
  icon: IconType
}>

export const HEADER_LINKS = [
  {
    icon: <BarChartIcon className='size-3.5' />,
    href: '/',
    key: 'home'
  },
  {
    icon: <FlameIcon className='size-3.5' />,
    href: '/projects',
    key: 'projects'
  },
  {
    icon: <UserCircleIcon className='size-3.5' />,
    href: '/about',
    key: 'about'
  },
  {
    icon: <MonitorIcon className='size-3.5' />,
    href: '/uses',
    key: 'uses'
  }
] as const

export const FOOTER_LINKS = [
  {
    id: 1,
    links: [
      { href: '/', key: 'home' },
      { href: '/about', key: 'about' },
      { href: '/projects', key: 'projects' },
      { href: '/uses', key: 'uses' }
    ]
  },
  {
    id: 2,
    links: [
      { href: 'https://links.yourwebsite.com', key: 'links' }
    ]
  },
  {
    id: 3,
    links: [
      { href: SITE_FACEBOOK_URL, key: 'facebook' },
      { href: SITE_INSTAGRAM_URL, key: 'instagram' },
      { href: SITE_GITHUB_URL, key: 'github' },
      { href: SITE_YOUTUBE_URL, key: 'youtube' }
    ]
  }
] as const

export const SOCIAL_LINKS: SocialLinks = [
  {
    href: SITE_GITHUB_URL,
    title: 'GitHub',
    icon: SiGithub
  },
  {
    href: SITE_FACEBOOK_URL,
    title: 'Facebook',
    icon: SiFacebook
  },
  {
    href: SITE_INSTAGRAM_URL,
    title: 'Instagram',
    icon: SiInstagram
  },
  {
    href: SITE_X_URL,
    title: 'X',
    icon: SiX
  },
  {
    href: SITE_YOUTUBE_URL,
    title: 'YouTube',
    icon: SiYoutube
  }
]

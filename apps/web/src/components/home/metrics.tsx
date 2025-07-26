'use client'

import { SiGithub, SiWakatime, SiYoutube } from '@icons-pack/react-simple-icons'
import { useQuery } from '@tanstack/react-query'
import { ArrowRightIcon, StarIcon } from 'lucide-react'

import Counter from '@/components/counter'
import Link from '@/components/link'
import { orpc } from '@/orpc/client'

type Card = {
    icon: React.ReactNode
    title: string
    link: string
    value: number | undefined
    linkText: string
    gradient: {
        startColor: string
        endColor: string
    }
    suffix?: string
}

const Metrics = () => {
    const youtubeQuery = useQuery(orpc.stats.youtube.queryOptions())
    const githubQuery = useQuery(orpc.stats.github.queryOptions())
    const wakatimeQuery = useQuery(orpc.stats.wakatime.queryOptions())

    const data: Card[] = [
        {
            title: 'Coding Hours',
            link: 'https://wakatime.com/@taxil',
            value: wakatimeQuery.data?.seconds
                ? Math.round(wakatimeQuery.data.seconds / 60 / 60)
                : undefined,
            icon: <SiWakatime className='text-[#0061ff]' />,
            linkText: 'WakaTime',
            gradient: {
                startColor: '#0061ff',
                endColor: '#6f7bf7'
            },
            suffix: 'hrs'
        },
        {
            title: 'YouTube Subscribers',
            link: 'https://www.youtube.com/@taxil',
            value: youtubeQuery.data?.subscribers,
            icon: <SiYoutube className='text-[#ff0000]' />,
            linkText: 'YouTube',
            gradient: {
                startColor: '#ff0000',
                endColor: '#ca1a1a'
            }
        },
        {
            title: 'YouTube Views',
            link: 'https://www.youtube.com/@taxil',
            value: youtubeQuery.data?.views,
            icon: <SiYoutube className='text-[#ff0000]' />,
            linkText: 'YouTube',
            gradient: {
                startColor: '#ff0000',
                endColor: '#ca1a1a'
            }
        },
        {
            title: 'GitHub Followers',
            link: 'https://github.com/taxil',
            value: githubQuery.data?.followers,
            icon: <SiGithub className='text-[#fee000]' />,
            linkText: 'GitHub',
            gradient: {
                startColor: '#fee000',
                endColor: '#ffce63'
            }
        },
        {
            title: 'GitHub Stars',
            link: 'https://github.com/taxil',
            value: githubQuery.data?.stars,
            icon: <StarIcon className='text-[#fee000]' />,
            linkText: 'GitHub',
            gradient: {
                startColor: '#fee000',
                endColor: '#ffce63'
            }
        }
    ]

  
}

export default Metrics 

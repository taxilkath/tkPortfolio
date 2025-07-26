'use client'

import {
    SiDrizzle,
    SiFigma,
    SiFirebase,
    SiGit,
    SiHtml5,
    SiJavascript,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiOpenai,
    SiPostgresql,
    SiPrisma,
    SiPython,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiVite
} from '@icons-pack/react-simple-icons'
import { Marquee } from '@taxilkath/ui'
import { Code2 } from 'lucide-react'

const skillsRow1 = [
    SiHtml5,
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiPython,
    SiNodedotjs
]
const skillsRow2 = [
    SiPostgresql,
    SiMysql,
    SiPrisma,
    SiDrizzle,
    SiFirebase,
    SiGit,
    SiVite,
    SiFigma,
    SiOpenai
]

export const SkillsCard = () => {
    return (
        // Updated styling for a wider, more elegant look
        <div className='w-full rounded-2xl border bg-card/80 p-6 shadow-lg backdrop-blur-md'>
            <div className='flex items-center gap-3'>
                <Code2 className='size-5 text-muted-foreground' />
            </div>
            <div className='mt-4 flex flex-col gap-4'>
                <Marquee gap='24px' className='py-4' fade pauseOnHover>
                    {skillsRow1.map((Icon, i) => (
                        <Icon key={i} className='size-10 text-muted-foreground transition-colors hover:text-primary' />
                    ))}
                </Marquee>
                <Marquee gap='24px' className='py-4' reverse fade pauseOnHover>
                    {skillsRow2.map((Icon, i) => (
                        <Icon key={i} className='size-10 text-muted-foreground transition-colors hover:text-primary' />
                    ))}
                </Marquee>
            </div>
        </div>
    )
}

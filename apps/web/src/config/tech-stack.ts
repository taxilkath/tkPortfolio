// file: web/src/config/tech-stack.ts

import type { IconType } from '@icons-pack/react-simple-icons'
import {
    SiNextdotjs,
    SiTypescript,
    SiPostgresql,
    SiDrizzle,
    SiMdx,
    SiTailwindcss,
    SiReact,
    SiVercel,
    SiElectron,
    SiMui,
    SiNginx,
    SiNodedotjs,
    
    SiClerk,
    SiRedis,
    SiMongodb,
    SiMongoose,
    SiExpress,
    SiHtml5,
    SiCss,
    SiGit,
    SiSwagger,
    SiOpenai,
    SiJavascript,
    SiMarkdown,
    SiBootstrap,
    SiMysql,
    SiJquery,
    SiEjs,
    SiSocketdotio,
    SiDocker
} from '@icons-pack/react-simple-icons'

export const TECH_CATEGORIES = {
    'Frontend': 'Frontend',
    'Backend': 'Backend',
    'Database': 'Database',
    'Styling': 'Styling',
    'Content': 'Content',
    'Deployment': 'Deployment',
    'DevOps': 'DevOps'
} as const

export type TechCategory = keyof typeof TECH_CATEGORIES

export type Tech = {
    name: string
    category: TechCategory
    logo: IconType // The type for react-icons components
}

// The 'name' must match the entry in your MDX file's techstack array.
// You can find any icon you need on the react-icons website.
export const TECHNOLOGIES: Tech[] = [
    { name: 'Next.js', category: 'Frontend', logo: SiNextdotjs },
    { name: 'React', category: 'Frontend', logo: SiReact },
    { name: 'Node.js', category: 'Backend', logo: SiNodedotjs },
    { name: 'Material-UI', category: 'Styling', logo: SiMui },
    { name: 'Nginx', category: 'Deployment', logo: SiNginx },
    { name: 'Typescript', category: 'Backend', logo: SiTypescript },
    { name: 'Clerk', category: 'Backend', logo: SiClerk },
    { name: 'OpenAI', category: 'Backend', logo: SiOpenai },
    { name: 'Git', category: 'Deployment', logo: SiGit },
    { name: 'GitHub', category: 'Deployment', logo: SiGit },
    { name: 'Swagger', category: 'Backend', logo: SiSwagger },
    { name: 'Redis', category: 'Backend', logo: SiRedis },
    { name: 'MongoDB', category: 'Database', logo: SiMongodb },
    { name: 'Mongoose', category: 'Database', logo: SiMongoose },   
    { name: 'CSS', category: 'Styling', logo: SiCss },
    { name: 'Javascript', category: 'Frontend', logo: SiJavascript },
    { name: 'HTML', category: 'Frontend', logo: SiHtml5 },
    { name: 'Markdown', category: 'Content', logo: SiMarkdown },
    { name: 'Bootstrap', category: 'Styling', logo: SiBootstrap },
    { name: 'Drizzle', category: 'Backend', logo: SiDrizzle },
    { name: 'PostgreSQL', category: 'Database', logo: SiPostgresql },
    { name: 'Tailwind CSS', category: 'Styling', logo: SiTailwindcss },
    { name: 'MDX', category: 'Content', logo: SiMdx },
    { name: 'Vercel', category: 'Deployment', logo: SiVercel },
    { name: 'Docker', category: 'DevOps', logo: SiDocker },
    { name: 'Electron', category: 'Frontend', logo: SiElectron },
    { name: 'Express', category: 'Backend', logo: SiExpress },
    { name: 'MySQL', category: 'Database', logo: SiMysql },
    { name: 'jQuery', category: 'Frontend', logo: SiJquery },
    { name: 'EJS', category: 'Frontend', logo: SiEjs },
    { name: 'Socket.IO', category: 'Backend', logo: SiSocketdotio }
]

// Create a map for efficient lookups
export const TECH_MAP: Map<string, Tech> = new Map(
    TECHNOLOGIES.map((tech) => [tech.name.toLowerCase(), tech])
)

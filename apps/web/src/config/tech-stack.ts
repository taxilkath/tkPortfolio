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
    SiDocker,
    SiRadixui,
    SiFramer,
    SiReactquery,
    SiVitest,
    SiTurborepo,
    SiPnpm,
    SiGithub,
    SiSpotify,
    SiWakatime,
    SiYoutube,
    SiZod,
    SiUpstash,
    SiSequelize,
    SiShadcnui,
    SiAxios,
    SiChartdotjs,
    SiVite,
    SiSupabase,
    SiLucide,
    SiPrisma
} from '@icons-pack/react-simple-icons'

export const TECH_CATEGORIES = {
    'Frontend': 'Frontend',
    'Backend': 'Backend',
    'Database': 'Database',
    'Styling': 'Styling',
    'Content': 'Content',
    'Deployment': 'Deployment',
    'Testing': 'Testing',
    'Tools': 'Tools',
    'APIs': 'APIs',
    'Animation': 'Animation',
    'State Management': 'State Management',
    'Validation': 'Validation',
    'HTTP Client': 'HTTP Client',
    'Email': 'Email',
    'Analytics': 'Analytics',
    'Desktop': 'Desktop'    
} as const

export type TechCategory = keyof typeof TECH_CATEGORIES

export type Tech = {
    name: string
    category: TechCategory
    logo: IconType | string // The type for react-icons components
}

// The 'name' must match the entry in your MDX file's techstack array.
// You can find any icon you need on the react-icons website.
export const TECHNOLOGIES: Tech[] = [
    // Core Frontend
    { name: 'React', category: 'Frontend', logo: SiReact },
    { name: 'Next.js', category: 'Frontend', logo: SiNextdotjs },
    { name: 'TypeScript', category: 'Frontend', logo: SiTypescript },
    { name: 'JavaScript', category: 'Frontend', logo: SiJavascript },
    { name: 'HTML', category: 'Frontend', logo: SiHtml5 },
    { name: 'CSS', category: 'Styling', logo: SiCss },
    
    // Styling & UI
    { name: 'Tailwind CSS', category: 'Styling', logo: SiTailwindcss },
    { name: 'Tailwind', category: 'Styling', logo: SiTailwindcss },
    { name: 'Material-UI', category: 'Styling', logo: SiMui },
    { name: 'Shadcn UI', category: 'Styling', logo: SiRadixui }, // Using Radix as closest match
    { name: 'Radix UI', category: 'Frontend', logo: SiShadcnui },
    { name: 'Bootstrap', category: 'Styling', logo: SiBootstrap },
    
    // Backend & Runtime
    { name: 'Node.js', category: 'Backend', logo: SiNodedotjs },
    { name: 'Express', category: 'Backend', logo: SiExpress },
    { name: 'Feathers.js', category: 'Backend', logo: "Feathers.js" }, // No specific icon
    
    // Databases & ORM
    { name: 'MySQL', category: 'Database', logo: SiMysql },
    { name: 'PostgreSQL', category: 'Database', logo: SiPostgresql },
    { name: 'MongoDB', category: 'Database', logo: SiMongodb },
    { name: 'Redis', category: 'Database', logo: SiRedis },
    { name: 'Redis (Upstash)', category: 'Database', logo: SiUpstash },
    { name: 'Sequelize', category: 'Database', logo: SiSequelize },
    { name: 'Mongoose', category: 'Database', logo: SiMongoose },
    { name: 'Drizzle', category: 'Database', logo: SiDrizzle },
    { name: 'Prisma', category: 'Database', logo: SiPrisma },
    { name: 'Zod', category: 'Database', logo: SiZod },
    
    // State Management & Data Fetching
    { name: 'TanStack Query', category: 'State Management', logo: SiReactquery },
    { name: 'React Query', category: 'State Management', logo: SiReactquery },
    { name: 'Zustand', category: 'State Management', logo: "SiZustand" },
    
    // HTTP & APIs
    { name: 'Axios', category: 'HTTP Client', logo: SiAxios },
    { name: 'OpenAI', category: 'APIs', logo: SiOpenai },
    { name: 'OpenAI API (gpt-4o-mini)', category: 'APIs', logo: SiOpenai },
    { name: 'OpenAI GPT-4o-mini', category: 'APIs', logo: SiOpenai },
    { name: 'Spotify API', category: 'APIs', logo: SiSpotify },
    { name: 'WakaTime API', category: 'APIs', logo: SiWakatime },
    { name: 'YouTube API', category: 'APIs', logo: SiYoutube },
    { name: 'GitHub API', category: 'APIs', logo: SiGithub },
    { name: 'RESTful APIs', category: 'APIs', logo: SiSwagger },
    
    // Build Tools & Bundlers
    { name: 'Vite', category: 'Tools', logo: SiVite },
    { name: 'Turborepo', category: 'Tools', logo: SiTurborepo },
    { name: 'pnpm', category: 'Tools', logo: SiPnpm },
    
    // Animation & Charts
    { name: 'Framer Motion', category: 'Animation', logo: SiFramer },
    { name: 'Chart.js', category: 'Styling', logo: SiChartdotjs },
    
    // Forms & Validation
    { name: 'Formik & React Hook Form', category: 'Styling', logo: SiReact }, // No specific icon
    { name: 'Yup', category: 'Validation', logo: SiReact }, // No specific icon
    { name: 'Zod', category: 'Validation', logo: SiZod },
    
    // Content & Editors
    { name: 'MDX', category: 'Content', logo: SiMdx },
    { name: 'Markdown', category: 'Content', logo: SiMarkdown },
    
    // Authentication & Services
    { name: 'Clerk', category: 'Backend', logo: SiClerk },
    { name: 'Supabase Auth', category: 'Backend', logo: SiSupabase },
    
    // Search & Analytics
    { name: 'Typesense', category: 'Backend', logo: "Typesense" },
    { name: 'Umami', category: 'Analytics', logo: "Umami" },    
    
    // DevOps & Deployment
    { name: 'Docker', category: 'Deployment', logo: SiDocker },
    { name: 'Nginx', category: 'Deployment', logo: SiNginx },
    { name: 'Vercel', category: 'Deployment', logo: SiVercel },
    
    // Testing & Quality
    { name: 'Vitest', category: 'Testing', logo: SiVitest },
    { name: 'husky', category: 'Tools', logo: "Husky" },
    { name: 'knip', category: 'Tools', logo: "Knip" }, // No specific icon
    
    // Desktop Development
    { name: 'Electron', category: 'Desktop', logo: SiElectron },
    { name: 'Electron Store', category: 'Desktop', logo: SiElectron },
    { name: 'Desktop App Architecture', category: 'Desktop', logo: SiElectron },
    
    // File Processing & Upload
    { name: 'Multer', category: 'Backend', logo: SiNodedotjs }, // No specific icon
    { name: 'Uppy', category: 'Backend', logo: SiNodedotjs }, // No specific icon
    { name: 'pdf-parse', category: 'Backend', logo: "pdf-parse" }, // No specific icon
    { name: 'mammoth', category: 'Backend', logo: "mammoth" }, // No specific icon
    { name: 'CKEditor', category: 'Frontend', logo: "CKEditor" },
    
    // Communication & Email
    { name: 'Nodemailer', category: 'Email', logo: SiNodedotjs }, // No specific icon
    { name: 'Socket.IO', category: 'Backend', logo: SiSocketdotio },
    { name: 'Real-Time Data Sync', category: 'Backend', logo: SiSocketdotio },
    
    // UI Libraries & Components
    { name: 'React Flow', category: 'Frontend', logo: "React Flow" },
    { name: 'Dnd Kit', category: 'Frontend', logo: "Dnd Kit" }, // No specific icon
    { name: 'Lucide React', category: 'Styling', logo: SiLucide },
    { name: 'jQuery', category: 'Frontend', logo: SiJquery },
    { name: 'EJS', category: 'Frontend', logo: SiEjs },
    
    // Development Tools
    { name: 'Git', category: 'Tools', logo: SiGit },
    { name: 'GitHub', category: 'Tools', logo: SiGithub },
    { name: 'Swagger', category: 'Backend', logo: SiSwagger },
    { name: 'Winston', category: 'Backend', logo: "Winston" } // No specific icon
]

// Create a map for efficient lookups
export const TECH_MAP: Map<string, Tech> = new Map(
    TECHNOLOGIES.map((tech) => [tech.name.toLowerCase(), tech])
)
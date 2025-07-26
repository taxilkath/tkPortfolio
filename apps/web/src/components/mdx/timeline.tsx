'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { type ReactNode, useRef, useState } from 'react'

import { BlurImage } from '@/components/ui/blur-image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@taxilkath/ui'
import { cn } from '@taxilkath/utils'

// Main Timeline Container (no changes)
export const Timeline = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            className='relative w-full'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.2 }}
        >
            <motion.div
                className='absolute left-0 top-0 -ml-px h-full w-[2px] origin-top bg-gradient-to-b from-primary/20 via-primary to-primary/20'
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
            <div className='relative flex flex-col gap-8'>{children}</div>
        </motion.div>
    )
}

// Updated Timeline Item with support for both work experience and education
export const TimelineItem = ({
    logoSrc,
    role,
    company,
    degree,
    university,
    dates,
    tech,
    children
}: {
    logoSrc: string
    // Work experience props (optional)
    role?: string
    company?: string
    tech?: string[]
    // Education props (optional)
    degree?: string
    university?: string
    // Common props
    dates?: string
    children: ReactNode
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => {
            setIsOpen(false)
        }, 200) // 200ms delay before closing
    }

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring' as const,
                stiffness: 100,
                damping: 15
            }
        }
    }

    // Determine if this is an education or work item
    const isEducation = degree && university
    const isWork = role && company

    return (
        <motion.div
            className='group relative pl-12'
            variants={itemVariants}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Animated Timeline Node */}
            <div className='absolute left-0 top-5 z-10 -ml-2.5'>
                <motion.div
                    className='flex size-5 items-center justify-center rounded-full border-2 border-primary bg-background overflow-hidden'
                    animate={{ scale: isOpen ? 1.2 : 1 }}
                >
                    <BlurImage
                        src={logoSrc}
                        width={16}
                        height={16}
                        alt={`${company || university} logo`}
                        className='size-3 rounded-full object-contain'
                    />
                </motion.div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className='absolute inset-0 rounded-full bg-primary/20'
                            initial={{ scale: 0 }}
                            animate={{ scale: 2.5 }}
                            exit={{ scale: 0 }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Card */}
            <div className='relative w-full'>
                <motion.div
                    className={cn('timeline-card', isOpen && 'timeline-card-hover-glow')}
                    animate={{ y: isOpen ? -4 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                    <div className='flex items-center gap-4 p-4'>
                        <BlurImage
                            src={logoSrc}
                            width={48}
                            height={48}
                            alt={`${company || university} logo`}
                            className='size-12 shrink-0 rounded-full bg-white/80 object-contain p-1'
                        />
                        <div className='flex-1 min-w-0'>
                            {isEducation ? (
                                <>
                                    <h3 className='flex items-center gap-2 text-lg font-bold text-foreground'>
                                        🎓
                                        {degree}
                                    </h3>
                                    <p className='text-sm font-semibold text-muted-foreground truncate'>{university}</p>
                                </>
                            ) : (
                                <>
                                    <h3 className='flex items-center gap-2 text-lg font-bold text-foreground'>
                                        <Briefcase className='size-4 text-primary' />
                                        {role}
                                    </h3>
                                    <p className='text-sm font-semibold text-muted-foreground truncate'>{company}</p>
                                </>
                            )}
                        </div>
                        {dates && (
                            <div className='ml-auto whitespace-nowrap text-xs text-muted-foreground/80 font-medium'>
                                {dates}
                            </div>
                        )}
                    </div>

                    {/* Drawer */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className='overflow-hidden'
                            >
                                <div className='border-t border-border/30 px-4 pb-4 pt-4'>
                                    <div className='prose prose-sm dark:prose-invert text-muted-foreground'>
                                        {children}
                                    </div>
                                    {tech && tech.length > 0 && (
                                        <div className='mt-4'>
                                            <h4 className='mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                                                Tech & Tools
                                            </h4>
                                            <div className='flex flex-wrap gap-2'>
                                                <TooltipProvider delayDuration={150}>
                                                    {tech.map((t) => (
                                                        <Tooltip key={t}>
                                                            <TooltipTrigger>
                                                                <div className='rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground'>
                                                                    {t}
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Used {t}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    ))}
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    )
}

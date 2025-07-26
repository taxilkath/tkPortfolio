'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'

type AnimatedSectionProps = HTMLMotionProps<'div'> & {
    children: React.ReactNode
    delay?: number
}

export const AnimatedSection = ({
    children,
    delay = 0,
    ...props
}: AnimatedSectionProps) => {
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay }}
            viewport={{ once: true }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

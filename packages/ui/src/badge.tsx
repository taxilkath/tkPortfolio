import { Slot } from '@radix-ui/react-slot'
import { cn } from '@taxilkath/utils'
import { cva, type VariantProps } from 'cva'

const badgeVariants = cva({
  base: [
    'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow]',
    'dark:aria-invalid:ring-destructive/40',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
    '[&>svg]:pointer-events-none [&>svg]:size-3'
  ],
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent',
      secondary:
        'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent',
      destructive:
        'bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 border-transparent text-white',
      outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
  }

const Badge = (props: BadgeProps) => {
  const { className, variant, asChild = false, ...rest } = props
  const Comp = asChild ? Slot : 'span'

  return <Comp data-slot='badge' className={cn(badgeVariants({ variant }), className)} {...rest} />
}

export { Badge, badgeVariants }

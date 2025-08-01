import { cn } from '@taxilkath/utils'
import { cva, type VariantProps } from 'cva'

const buttonVariants = cva({
  base: [
    'btn-text inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all',
    'dark:aria-invalid:ring-destructive/40',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4"
  ],
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs',
      destructive:
        'bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-xs text-white',
      outline:
        'bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 shadow-xs border',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs',
      ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: 'h-9 px-4 py-2 has-[>svg]:px-3',
      sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
      lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
      icon: 'size-9'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>

const Button = (props: ButtonProps) => {
  const { className, variant, size, type = 'button', ...rest } = props

  return (
    <button
      data-slot='button'
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...rest}
    />
  )
}

export { Button, buttonVariants }

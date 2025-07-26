import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cn } from '@taxilkath/utils'
import { XIcon } from 'lucide-react'

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>

const Sheet = (props: SheetProps) => <SheetPrimitive.Root data-slot='sheet' {...props} />

type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>

const SheetTrigger = (props: SheetTriggerProps) => (
  <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />
)

type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>

const SheetClose = (props: SheetCloseProps) => (
  <SheetPrimitive.Close data-slot='sheet-close' {...props} />
)

type SheetPortalProps = React.ComponentProps<typeof SheetPrimitive.Portal>

const SheetPortal = (props: SheetPortalProps) => (
  <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />
)

type SheetOverlayProps = React.ComponentProps<typeof SheetPrimitive.Overlay>

const SheetOverlay = (props: SheetOverlayProps) => {
  const { className, ...rest } = props

  return (
    <SheetPrimitive.Overlay
      data-slot='sheet-overlay'
      className={cn(
        'fixed inset-0 z-50 bg-black/50',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className
      )}
      {...rest}
    />
  )
}

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const SheetContent = (props: SheetContentProps) => {
  const { className, children, side = 'right', ...rest } = props

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot='sheet-content'
        className={cn(
          'bg-background fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out',
          'data-[state=open]:animate-in data-[state=open]:duration-500',
          'data-[state=closed]:animate-out data-[state=closed]:duration-300',
          side === 'right' &&
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' &&
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
          className
        )}
        {...rest}
      >
        {children}
        <SheetPrimitive.Close
          className={cn(
            'ring-offset-background rounded-xs absolute right-4 top-4 opacity-70 transition-opacity',
            'hover:opacity-100',
            'focus:ring-ring focus:outline-hidden focus:ring-2 focus:ring-offset-2',
            'disabled:pointer-events-none',
            'data-[state=open]:bg-secondary'
          )}
        >
          <XIcon className='size-4' />
          <span className='sr-only'>Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

type SheetHeaderProps = React.ComponentProps<'div'>

const SheetHeader = (props: SheetHeaderProps) => {
  const { className, ...rest } = props

  return (
    <div
      data-slot='sheet-header'
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...rest}
    />
  )
}

type SheetFooterProps = React.ComponentProps<'div'>

const SheetFooter = (props: SheetFooterProps) => {
  const { className, ...rest } = props

  return (
    <div
      data-slot='sheet-footer'
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...rest}
    />
  )
}

type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>

const SheetTitle = (props: SheetTitleProps) => {
  const { className, ...rest } = props

  return (
    <SheetPrimitive.Title
      data-slot='sheet-title'
      className={cn('text-foreground font-semibold', className)}
      {...rest}
    />
  )
}

type SheetDescriptionProps = React.ComponentProps<typeof SheetPrimitive.Description>

const SheetDescription = (props: SheetDescriptionProps) => {
  const { className, ...rest } = props

  return (
    <SheetPrimitive.Description
      data-slot='sheet-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...rest}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
}

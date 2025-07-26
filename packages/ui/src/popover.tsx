import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@taxilkath/utils'

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>

const Popover = (props: PopoverProps) => <PopoverPrimitive.Root data-slot='popover' {...props} />

type PopoverTriggerProps = React.ComponentProps<typeof PopoverPrimitive.Trigger>

const PopoverTrigger = (props: PopoverTriggerProps) => (
  <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />
)

type PopoverContentProps = React.ComponentProps<typeof PopoverPrimitive.Content>

const PopoverContent = (props: PopoverContentProps) => {
  const { className, align = 'center', sideOffset = 4, ...rest } = props

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot='popover-content'
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground origin-(--radix-popover-content-transform-origin) outline-hidden z-50 w-72 rounded-md border p-4 shadow-md',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          className
        )}
        {...rest}
      />
    </PopoverPrimitive.Portal>
  )
}

type PopoverAnchorProps = React.ComponentProps<typeof PopoverPrimitive.Anchor>

const PopoverAnchor = (props: PopoverAnchorProps) => (
  <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} />
)

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger }

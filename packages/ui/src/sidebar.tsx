'use client'

import { Slot } from '@radix-ui/react-slot'
import { cn } from '@taxilkath/utils'
import { cva, type VariantProps } from 'cva'
import { PanelLeftIcon } from 'lucide-react'
import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react'

import { Button } from './button'
import { useIsMobile } from './hooks/use-is-mobile'
import { Input } from './input'
import { Separator } from './separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './sheet'
import { Skeleton } from './skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

type SidebarContextProps = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps | null>(null)
SidebarContext.displayName = 'SidebarContext'

const useSidebar = () => {
  const context = use(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

type SidebarProviderProps = React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SidebarProvider = (props: SidebarProviderProps) => {
  const {
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...rest
  } = props
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  // eslint-disable-next-line @eslint-react/naming-convention/use-state -- internal state
  const [_open, _setOpen] = useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      // eslint-disable-next-line unicorn/no-document-cookie -- safe
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    globalThis.addEventListener('keydown', handleKeyDown)
    return () => globalThis.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed'

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot='sidebar-wrapper'
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
            className
          )}
          {...rest}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext>
  )
}

type SidebarProps = React.ComponentProps<'div'> & {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

const Sidebar = (props: SidebarProps) => {
  const {
    side = 'left',
    variant = 'sidebar',
    collapsible = 'offcanvas',
    className,
    children,
    ...rest
  } = props
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === 'none') {
    return (
      <div
        data-slot='sidebar'
        className={cn(
          'bg-sidebar text-sidebar-foreground w-(--sidebar-width) flex h-full flex-col',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...rest}>
        <SheetContent
          data-sidebar='sidebar'
          data-slot='sidebar'
          data-mobile='true'
          className='bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden'
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className='sr-only'>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className='flex size-full flex-col'>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className='text-sidebar-foreground group peer hidden md:block'
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot='sidebar'
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot='sidebar-gap'
        className={cn(
          'w-(--sidebar-width) relative bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
      />
      <div
        data-slot='sidebar-container'
        className={cn(
          'w-(--sidebar-width) fixed inset-y-0 z-10 hidden h-svh transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        {...rest}
      >
        <div
          data-sidebar='sidebar'
          data-slot='sidebar-inner'
          className='bg-sidebar group-data-[variant=floating]:border-sidebar-border flex size-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm'
        >
          {children}
        </div>
      </div>
    </div>
  )
}

type SidebarTriggerProps = React.ComponentProps<typeof Button>

const SidebarTrigger = (props: SidebarTriggerProps) => {
  const { className, onClick, ...rest } = props
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar='trigger'
      data-slot='sidebar-trigger'
      variant='ghost'
      size='icon'
      className={cn('size-7', className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...rest}
    >
      <PanelLeftIcon />
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  )
}

type SidebarRailProps = React.ComponentProps<'button'>

const SidebarRail = (props: SidebarRailProps) => {
  const { className, ...rest } = props
  const { toggleSidebar } = useSidebar()

  return (
    <button
      type='button'
      data-sidebar='rail'
      data-slot='sidebar-rail'
      aria-label='Toggle Sidebar'
      tabIndex={-1}
      onClick={toggleSidebar}
      title='Toggle Sidebar'
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear',
        'sm:flex',
        'hover:after:bg-sidebar-border hover:group-data-[collapsible=offcanvas]:bg-sidebar',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]',
        'group-data-[side=left]:-right-4',
        'group-data-[side=right]:left-0',
        'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        'in-data-[side=left]:cursor-w-resize',
        'in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize',
        '[[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className
      )}
      {...rest}
    />
  )
}

type SidebarInsetProps = React.ComponentProps<'main'>

const SidebarInset = (props: SidebarInsetProps) => {
  const { className, ...rest } = props

  return (
    <main
      data-slot='sidebar-inset'
      className={cn(
        'bg-background relative flex w-full flex-1 flex-col',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm',
        className
      )}
      {...rest}
    />
  )
}

type SidebarInputProps = React.ComponentProps<typeof Input>

const SidebarInput = (props: SidebarInputProps) => {
  const { className, ...rest } = props

  return (
    <Input
      data-slot='sidebar-input'
      data-sidebar='input'
      className={cn('bg-background h-8 w-full shadow-none', className)}
      {...rest}
    />
  )
}

type SidebarHeaderProps = React.ComponentProps<'div'>

const SidebarHeader = (props: SidebarHeaderProps) => {
  const { className, ...rest } = props

  return (
    <div
      data-slot='sidebar-header'
      data-sidebar='header'
      className={cn('flex flex-col gap-2 p-2', className)}
      {...rest}
    />
  )
}

type SidebarFooterProps = React.ComponentProps<'div'>

const SidebarFooter = (props: SidebarFooterProps) => {
  const { className, ...rest } = props

  return (
    <div
      data-slot='sidebar-footer'
      data-sidebar='footer'
      className={cn('flex flex-col gap-2 p-2', className)}
      {...rest}
    />
  )
}

type SidebarSeparatorProps = React.ComponentProps<typeof Separator>

const SidebarSeparator = (props: SidebarSeparatorProps) => {
  const { className, ...rest } = props

  return (
    <Separator
      data-slot='sidebar-separator'
      data-sidebar='separator'
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...rest}
    />
  )
}

type SidebarContentProps = React.ComponentProps<'div'>

const SidebarContent = (props: SidebarContentProps) => {
  const { className, ...rest } = props

  return (
    <div
      data-slot='sidebar-content'
      data-sidebar='content'
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className
      )}
      {...rest}
    />
  )
}

type SidebarGroupProps = React.ComponentProps<'div'>

const SidebarGroup = (props: SidebarGroupProps) => {
  const { className, ...rest } = props

  return (
    <div
      data-slot='sidebar-group'
      data-sidebar='group'
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...rest}
    />
  )
}

type SidebarGroupLabelProps = React.ComponentProps<'div'> & {
  asChild?: boolean
}

const SidebarGroupLabel = (props: SidebarGroupLabelProps) => {
  const { className, asChild = false, ...rest } = props
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      data-slot='sidebar-group-label'
      data-sidebar='group-label'
      className={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring outline-hidden flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium transition-[margin,opacity] duration-200 ease-linear',
        'focus-visible:ring-2',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        className
      )}
      {...rest}
    />
  )
}

type SidebarGroupActionProps = React.ComponentProps<'button'> & {
  asChild?: boolean
}

const SidebarGroupAction = (props: SidebarGroupActionProps) => {
  const { className, asChild = false, ...rest } = props
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='sidebar-group-action'
      data-sidebar='group-action'
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring outline-hidden absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...rest}
    />
  )
}

type SidebarGroupContentProps = React.ComponentProps<'div'>

const SidebarGroupContent = (props: SidebarGroupContentProps) => {
  const { className, ...rest } = props

  return (
    <div
      data-slot='sidebar-group-content'
      data-sidebar='group-content'
      className={cn('w-full text-sm', className)}
      {...rest}
    />
  )
}

type SidebarMenuProps = React.ComponentProps<'ul'>

const SidebarMenu = (props: SidebarMenuProps) => {
  const { className, ...rest } = props

  return (
    <ul
      data-slot='sidebar-menu'
      data-sidebar='menu'
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...rest}
    />
  )
}

type SidebarMenuItemProps = React.ComponentProps<'li'>

const SidebarMenuItem = (props: SidebarMenuItemProps) => {
  const { className, ...rest } = props

  return (
    <li
      data-slot='sidebar-menu-item'
      data-sidebar='menu-item'
      className={cn('group/menu-item relative', className)}
      {...rest}
    />
  )
}

const sidebarMenuButtonVariants = cva({
  base: [
    'peer/menu-button ring-sidebar-ring outline-hidden flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-[width,height,padding]',
    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
    'focus-visible:ring-2',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium',
    'data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground',
    'group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!',
    'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
    '[&>svg]:size-4 [&>svg]:shrink-0',
    '[&>span:last-child]:truncate'
  ],
  variants: {
    variant: {
      default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      outline:
        'bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]'
    },
    size: {
      default: 'h-8 text-sm',
      sm: 'h-7 text-xs',
      lg: 'group-data-[collapsible=icon]:p-0! h-12 text-sm'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

type SidebarMenuButtonProps = React.ComponentProps<'button'> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>

const SidebarMenuButton = (props: SidebarMenuButtonProps) => {
  const {
    asChild = false,
    isActive = false,
    variant = 'default',
    size = 'default',
    tooltip,
    className,
    ...rest
  } = props
  const Comp = asChild ? Slot : 'button'
  const { isMobile, state } = useSidebar()
  let tooltipClone = tooltip

  const button = (
    <Comp
      data-slot='sidebar-menu-button'
      data-sidebar='menu-button'
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...rest}
    />
  )

  if (!tooltipClone) {
    return button
  }

  if (typeof tooltipClone === 'string') {
    tooltipClone = {
      children: tooltipClone
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side='right'
        align='center'
        hidden={state !== 'collapsed' || isMobile}
        {...tooltipClone}
      />
    </Tooltip>
  )
}

type SidebarMenuActionProps = React.ComponentProps<'button'> & {
  asChild?: boolean
  showOnHover?: boolean
}

const SidebarMenuAction = (props: SidebarMenuActionProps) => {
  const { className, asChild = false, showOnHover = false, ...rest } = props
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='sidebar-menu-action'
      data-sidebar='menu-action'
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring outline-hidden absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        'peer-hover/menu-button:text-sidebar-accent-foreground',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        className
      )}
      {...rest}
    />
  )
}

type SidebarMenuBadgeProps = React.ComponentProps<'div'>

const SidebarMenuBadge = (props: SidebarMenuBadgeProps) => {
  const { className, ...rest } = props

  return (
    <div
      data-slot='sidebar-menu-badge'
      data-sidebar='menu-badge'
      className={cn(
        'text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums',
        'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...rest}
    />
  )
}

type SidebarMenuSkeletonProps = React.ComponentProps<'div'> & {
  showIcon?: boolean
}

const SidebarMenuSkeleton = (props: SidebarMenuSkeletonProps) => {
  const { className, showIcon = false, ...rest } = props
  // Random width between 50 to 90%.
  const width = `${Math.floor(Math.random() * 40) + 50}%`

  return (
    <div
      data-slot='sidebar-menu-skeleton'
      data-sidebar='menu-skeleton'
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...rest}
    >
      {showIcon && <Skeleton className='size-4 rounded-md' data-sidebar='menu-skeleton-icon' />}
      <Skeleton
        className='max-w-(--skeleton-width) h-4 flex-1'
        data-sidebar='menu-skeleton-text'
        style={
          {
            '--skeleton-width': width
          } as React.CSSProperties
        }
      />
    </div>
  )
}

type SidebarMenuSubProps = React.ComponentProps<'ul'>

const SidebarMenuSub = (props: SidebarMenuSubProps) => {
  const { className, ...rest } = props

  return (
    <ul
      data-slot='sidebar-menu-sub'
      data-sidebar='menu-sub'
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...rest}
    />
  )
}

type SidebarMenuSubItemProps = React.ComponentProps<'li'>

const SidebarMenuSubItem = (props: SidebarMenuSubItemProps) => {
  const { className, ...rest } = props

  return (
    <li
      data-slot='sidebar-menu-sub-item'
      data-sidebar='menu-sub-item'
      className={cn('group/menu-sub-item relative', className)}
      {...rest}
    />
  )
}

type SidebarMenuSubButtonProps = React.ComponentProps<'a'> & {
  asChild?: boolean
  size?: 'sm' | 'md'
  isActive?: boolean
}

const SidebarMenuSubButton = (props: SidebarMenuSubButtonProps) => {
  const { asChild = false, size = 'md', isActive = false, className, ...rest } = props
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot='sidebar-menu-sub-button'
      data-sidebar='menu-sub-button'
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring outline-hidden flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        'aria-disabled:pointer-events-none aria-disabled:opacity-50',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        '[&>svg]:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        '[&>span:last-child]:truncate',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...rest}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
}

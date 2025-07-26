import { Slot } from '@radix-ui/react-slot'
import { cn } from '@taxilkath/utils'
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

type BreadcrumbProps = React.ComponentProps<'nav'>

const Breadcrumb = (props: BreadcrumbProps) => (
  <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />
)

type BreadcrumbListProps = React.ComponentProps<'ol'>

const BreadcrumbList = (props: BreadcrumbListProps) => {
  const { className, ...rest } = props

  return (
    <ol
      data-slot='breadcrumb-list'
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5',
        className
      )}
      {...rest}
    />
  )
}

type BreadcrumbItemProps = React.ComponentProps<'li'>

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const { className, ...rest } = props

  return (
    <li
      data-slot='breadcrumb-item'
      className={cn('inline-flex items-center gap-1.5', className)}
      {...rest}
    />
  )
}

type BreadcrumbLinkProps = React.ComponentProps<'a'> & {
  asChild?: boolean
}

const BreadcrumbLink = (props: BreadcrumbLinkProps) => {
  const { className, asChild, ...rest } = props
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot='breadcrumb-link'
      className={cn('hover:text-foreground transition-colors', className)}
      {...rest}
    />
  )
}

type BreadcrumbPageProps = React.ComponentProps<'span'>

const BreadcrumbPage = (props: BreadcrumbPageProps) => {
  const { className, ...rest } = props

  return (
    <span
      data-slot='breadcrumb-page'
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn('text-foreground font-normal', className)}
      {...rest}
    />
  )
}

type BreadcrumbSeparatorProps = React.ComponentProps<'li'>

const BreadcrumbSeparator = (props: BreadcrumbSeparatorProps) => {
  const { children, className, ...rest } = props

  return (
    <li
      data-slot='breadcrumb-separator'
      role='presentation'
      aria-hidden='true'
      className={cn('[&>svg]:size-3.5', className)}
      {...rest}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

type BreadcrumbEllipsisProps = React.ComponentProps<'span'>

const BreadcrumbEllipsis = (props: BreadcrumbEllipsisProps) => {
  const { className, ...rest } = props

  return (
    <span
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      aria-hidden='true'
      className={cn('flex size-9 items-center justify-center', className)}
      {...rest}
    >
      <MoreHorizontalIcon className='size-4' />
      <span className='sr-only'>More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
}

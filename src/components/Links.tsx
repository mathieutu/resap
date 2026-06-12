'use client'

import type { ChildrenProp, ClassNameProp } from '@/types/react'
import classNames from 'classnames'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { primaryClassName, secondaryClassName } from './Buttons'

type Props = {
  href: string,
  activeClassName?: string,
  inactiveClassName?: string,
  exact?: boolean,
  scroll?: boolean,
  title?: string,
} & ClassNameProp & ChildrenProp

const InternalLink = ({
  href,
  children,
  className,
  activeClassName,
  inactiveClassName,
  exact,
  scroll,
  ...props
}: Props) => {
  const pathname = usePathname()

  const sanitizedHref = `/${href.replace(/^\//, '')}`

  const isActive = exact ? pathname === sanitizedHref : pathname?.startsWith(sanitizedHref)

  return (
    <NextLink
      href={sanitizedHref}
      scroll={scroll}
      {...props}
      className={classNames(className, isActive ? activeClassName : inactiveClassName)}
    >
      {children}
    </NextLink>
  )
}

export const Link = (props: Props) => {
  if (props.href.includes(':')) {
    return <a {...props} target="_blank" rel="nofollow noopener" />
  }

  return <InternalLink {...props} />
}

export const PrimaryLink = (props: Props) => (
  <Link {...props} className={classNames(primaryClassName, props.className)} />
)

export const SecondaryLink = (props: Props) => (
  <Link {...props} className={classNames(secondaryClassName, props.className)} />
)

import type { ButtonHTMLAttributes } from 'react'
import type { ClassNameProp } from '../types/react'
import classNames from 'classnames'

// eslint-disable-next-line react-refresh/only-export-components
export const primaryClassName = 'px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-default shadow-xs hover:bg-green-default focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-default sm:shrink-0 sm:inline-flex sm:items-center sm:w-auto'

type ButtonProps = ButtonHTMLAttributes<any> & { type: 'submit' | 'reset' | 'button' } & ClassNameProp

export const PrimaryButton = (props: ButtonProps) => (
  <button {...props} className={classNames(primaryClassName, props.className)} />
)

// eslint-disable-next-line react-refresh/only-export-components
export const secondaryClassName = 'w-full px-6 py-3 border border-green-default text-base font-medium rounded-md text-green-default bg-transparent hover:bg-green-default hover:text-white focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-green-default'

export const SecondaryButton = (props: ButtonProps) => (
  <button {...props} className={classNames(secondaryClassName, props.className)} />
)

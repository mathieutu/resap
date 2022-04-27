/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react'

// TODO - État hover, active, disabled, etc à gérer !

// eslint-disable-next-line max-len
export const primaryClassName = 'px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-default shadow-sm hover:bg-green-default focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-default sm:shrink-0 sm:inline-flex sm:items-center sm:w-auto'

type ButtonProps = ButtonHTMLAttributes<any> & { type: 'submit' | 'reset' | 'button' }

export const PrimaryButton = (props: ButtonProps) => (
  <button {...props} className={primaryClassName} />
)

// eslint-disable-next-line max-len
export const secondaryClassName = 'w-full px-6 py-3 border border-green-default text-base font-medium rounded-md text-green-default bg-transparent hover:bg-green-default hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-default'

export const SecondaryButton = (props: ButtonProps) => (
  <button {...props} className={secondaryClassName} />
)

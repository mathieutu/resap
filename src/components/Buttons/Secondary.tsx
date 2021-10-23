/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react'

// eslint-disable-next-line max-len
export const secondaryClassName = 'mt-3 w-full px-6 py-3 border border-green-default text-base font-medium rounded-md text-green-default bg-transparent hover:bg-green-default hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-default'

type ButtonProps = ButtonHTMLAttributes<any> & { type: 'submit' | 'reset' | 'button' }

export const SecondaryButton = (props: ButtonProps) => (
  <button {...props} className={secondaryClassName} />
)

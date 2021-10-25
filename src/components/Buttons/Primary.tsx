/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react'

// eslint-disable-next-line max-len
export const primaryClassName = 'mt-3 w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-default shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto'

type ButtonProps = ButtonHTMLAttributes<any> & { type: 'submit' | 'reset' | 'button' }

export const PrimaryButton = (props: ButtonProps) => (
  <button {...props} className={primaryClassName} />
)

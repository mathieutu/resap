import type { InputHTMLAttributes, ReactNode, Ref, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import classNames from 'classnames'

type FormFieldProps = {
  label: string,
  children: ReactNode,
  className?: string,
  name: string,
  required?: boolean,
  error?: string | boolean,
}

export const FormField = ({ label, children, className, name, required, error }: FormFieldProps) => (
  <div className={className}>
    <div className="flex justify-between">
      <label
        htmlFor={name}
        className={classNames(
          error && 'text-red-500',
          'block text-sm font-medium text-gray-700',
        )}
      >
        {label}
        {required && '*'}
      </label>
      {error && (
        <span className="text-sm text-red-500">
          {typeof error === 'string' ? error : 'Le champ est requis.'}
        </span>
      )}
    </div>
    <div className="mt-1">
      {children}
    </div>
  </div>
)

const baseInputClasses = 'py-3 px-4 block w-full shadow-xs focus:ring-blue-default focus:border-blue-default border border-gray-300 rounded-md'

type FormInputProps = {
  ref?: Ref<HTMLInputElement>,
  error?: boolean,
  className?: string,
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

export const FormInput = ({ error, className, ref, ...props }: FormInputProps) => (
  <input
    ref={ref}
    className={classNames(
      error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
      baseInputClasses,
      className,
    )}
    {...props}
  />
)

type FormTextareaProps = {
  ref?: Ref<HTMLTextAreaElement>,
  error?: boolean,
  className?: string,
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>

export const FormTextarea = ({ error, className, rows = 4, ref, ...props }: FormTextareaProps) => (
  <textarea
    ref={ref}
    rows={rows}
    className={classNames(
      error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
      baseInputClasses,
      className,
    )}
    {...props}
  />
)

type FormSelectProps = {
  ref?: Ref<HTMLSelectElement>,
  error?: boolean,
  className?: string,
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'>

export const FormSelect = ({ error, className, children, ref, ...props }: FormSelectProps) => (
  <select
    ref={ref}
    className={classNames(
      error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
      baseInputClasses,
      className,
    )}
    {...props}
  >
    {children}
  </select>
)

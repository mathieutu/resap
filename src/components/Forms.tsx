import { ReactNode, forwardRef, TextareaHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from 'react'
import classNames from 'classnames'

export const FormField = ({ label, children, className, name, required, error }: { label: string, children: ReactNode; className?: string, name: string, required?: boolean, error?: string | boolean }) => (
  <div className={className}>
    <div className="flex justify-between">
      <label
        htmlFor={name}
        className={classNames(
      error && 'text-red-500',
      'block text-sm font-medium text-gray-700',
    )}
      >
        {label}{required && '*'}
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

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  error?: boolean
  className?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, className, ...props }, ref) => (
    <input
      ref={ref}
      className={classNames(
        error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
        baseInputClasses,
        className,
      )}
      {...props}
    />
  ),
)

FormInput.displayName = 'FormInput'

interface FormTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  error?: boolean
  className?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ error, className, rows = 4, ...props }, ref) => (
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
  ),
)

FormTextarea.displayName = 'FormTextarea'

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  error?: boolean
  className?: string
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ error, className, children, ...props }, ref) => (
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
  ),
)

FormSelect.displayName = 'FormSelect'

import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import axios from 'axios'
import { ToastProvider, useToasts } from 'react-toast-notifications'

// @see https://www.emailregex.com
// eslint-disable-next-line no-control-regex
const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export type ContactFields = {
  message: string,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  organization: string,
}

const Form = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFields>()
  const { addToast } = useToasts()

  const onSubmit = async (contact: ContactFields) => {
    try {
      await axios.post('/api/contact', { contact })
      reset()
      addToast(
        'Votre message a été envoyé. Nous reviendrons vers vous dans les plus brefs délais.',
        { appearance: 'success' },
      )
    } catch (e) {
      addToast(
        'Nous n\'avons pu envoyer votre message en raison d\'une erreur technique. Merci de nous contacter par un autre moyen.',
        { appearance: 'error' },
      )
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-8">
      <div className="sm:col-span-6">
        <div className="flex justify-between">
          <label htmlFor="message" className={classNames(errors.message && 'text-red-500', 'block text-sm font-medium text-gray-700')}>
            Message
          </label>
          {errors.message && (
            <span className="text-sm text-red-500">
              Le champ est requis.
            </span>
          )}
        </div>
        <div className="mt-1">
          <textarea
            id="message"
            rows={4}
            className={classNames(errors.message && 'border-red-500 focus:ring-red-500 focus:border-red-500', 'py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md')}
            defaultValue=""
            {...register('message', { required: true })}
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Prénom
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="firstName"
            autoComplete="given-name"
            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            {...register('firstName')}
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Nom
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="lastName"
            autoComplete="family-name"
            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            {...register('lastName')}
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Téléphone
        </label>
        <div className="mt-1 ">
          <input
            type="tel"
            id="phone"
            autoComplete="tel"
            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            {...register('phone')}
          />
        </div>
      </div>
      <div className="sm:col-span-4">
        <div className="flex justify-between">
          <label htmlFor="email" className={classNames(errors.email && 'text-red-500', 'block text-sm font-medium text-gray-700')}>
            Email
          </label>
          {errors.email && (
            <span className="text-sm text-red-500">
              Merci de renseigner un email valide.
            </span>
          )}
        </div>
        <div className="mt-1">
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={classNames(errors.email && 'border-red-500 focus:ring-red-500 focus:border-red-500', 'py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md')}
            {...register('email', { pattern: emailRegexp })}
          />
        </div>
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
          Structure / Organisation
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="organization"
            autoComplete="organization"
            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            {...register('organization')}
          />
        </div>
      </div>
      <div className="sm:col-span-6">
        <p className="text-sm text-gray-500">
          Nous vous remercions de renseigner vos informations de contact si vous souhaitez que nous revenions vers vous.
          N&apos;hésitez pas à préciser dans le corps du message toute information utile au traitement de votre demande.
        </p>
      </div>
      <div className="sm:col-span-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {isSubmitting
            && <span aria-hidden="true" className="-ml-1 mr-3 w-5 h-5 border-2 border-transparent border-l-white rounded-full animate-spin" />}
          Envoyer
        </button>
      </div>
    </form>
  )
}

export const ContactFormSection = () => (
  <div className="py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
    <div className="relative max-w-xl mx-auto">
      <svg
        className="absolute left-full transform translate-x-1/2"
        width={404}
        height={404}
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
      </svg>
      <svg
        className="absolute right-full bottom-0 transform -translate-x-1/2"
        width={404}
        height={404}
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
      </svg>
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Nous contacter</h1>
        <p className="mt-4 text-lg leading-6 text-gray-500">
          Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus
          arcu.
        </p>
      </div>
      <div className="mt-12">
        <ToastProvider>
          <Form />
        </ToastProvider>
      </div>
    </div>
  </div>
)

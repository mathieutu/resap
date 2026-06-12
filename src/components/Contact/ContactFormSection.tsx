'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { sendContactEmail } from '@/services/mailer'
import { PrimaryButton } from '../Buttons'
import { FormField, FormInput, FormTextarea } from '../Forms'

// @see https://www.emailregex.com
// eslint-disable-next-line no-control-regex, regexp/no-dupe-characters-character-class
const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\v\f\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\v\f\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2}|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\v\f\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\v\f\x0E-\x7F])+)\])/

export type ContactFields = {
  message: string,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  organization: string,
  website?: string, // honeypot field
  formLoadedAt?: number, // timestamp when form was loaded
}

const Form = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFields>()
  const [formLoadedAt] = useState(() => Math.floor(Date.now() / 1000))

  const onSubmit = async (contact: ContactFields) => {
    try {
      // Send the form load timestamp to the server for validation
      await sendContactEmail({
        ...contact,
        formLoadedAt,
      })
      reset()
      toast.success(
        'Votre message a été envoyé. \n\nNous reviendrons vers vous dans les plus brefs délais.',
      )
    } catch {
      toast.error(
        'Nous n\'avons pas pu envoyer votre message en raison d\'une erreur technique. \n\nMerci de nous contacter par un autre moyen.',
      )
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="
        grid grid-cols-1 gap-y-6
        sm:grid-cols-6 sm:gap-x-8
      "
    >
      {/* Honeypot field - hidden with CSS to prevent bot detection */}
      <input
        type="text"
        {...register('website')}
        tabIndex={-1}
        autoComplete="off"
        placeholder="Website"
        className="pointer-events-none absolute left-[-9999px] opacity-0"
        aria-hidden="true"
      />

      <FormField className="sm:col-span-6" name="message" required error={errors.message && 'Le champ est requis.'} label="Message">
        <FormTextarea
          id="message"
          error={!!errors.message}
          defaultValue=""
          {...register('message', { required: true })}
        />
      </FormField>

      <FormField className="sm:col-span-3" name="firstName" required error={errors.firstName && 'Le champ est requis.'} label="Prénom">
        <FormInput
          type="text"
          id="firstName"
          autoComplete="given-name"
          {...register('firstName')}
        />
      </FormField>

      <FormField className="sm:col-span-3" name="lastName" required error={errors.lastName && 'Le champ est requis.'} label="Nom">
        <FormInput
          type="text"
          id="lastName"
          autoComplete="family-name"
          {...register('lastName')}
        />
      </FormField>

      <FormField className="sm:col-span-2" name="phone" required error={errors.phone && 'Le champ est requis.'} label="Téléphone">
        <FormInput
          type="tel"
          id="phone"
          autoComplete="tel"
          {...register('phone')}
        />
      </FormField>

      <FormField className="sm:col-span-4" name="email" required error={errors.email && 'Merci de renseigner un email valide.'} label="Email">
        <FormInput
          id="email"
          type="email"
          autoComplete="email"
          error={!!errors.email}
          {...register('email', { pattern: emailRegexp })}
        />
      </FormField>

      <FormField className="sm:col-span-6" name="organization" label="Structure / Organisation">
        <FormInput
          type="text"
          id="organization"
          autoComplete="organization"
          {...register('organization')}
        />
      </FormField>

      <div className="sm:col-span-6">
        <p className="text-sm text-gray-500">
          Nous vous remercions de renseigner vos informations de contact si vous souhaitez que nous revenions vers
          vous.
          N&apos;hésitez pas à préciser dans le corps du message toute information qui pourrait être utile au
          traitement de votre demande.
        </p>
      </div>

      <div className="sm:col-span-6">
        <PrimaryButton
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex w-full items-center justify-center rounded-md border
            border-transparent px-6 py-3 text-base font-medium shadow-xs
          "
        >
          {isSubmitting
            && (
              <span
                aria-hidden="true"
                className="
                  mr-3 -ml-1 size-5 animate-spin rounded-full border-2
                  border-transparent border-l-white
                "
              />
            )}
          Envoyer
        </PrimaryButton>
      </div>
    </form>
  )
}

export const ContactFormSection = () => (
  <div className="
    overflow-hidden px-4 py-16
    sm:px-6
    lg:px-8 lg:py-24
  "
  >
    <div className="relative mx-auto max-w-xl">
      <svg
        className="absolute left-full translate-x-1/2"
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
        className="absolute right-full bottom-0 -translate-x-1/2"
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
        <h1 className="
          text-3xl font-extrabold tracking-tight text-blue-default
          sm:text-4xl
        "
        >
          Nous contacter
        </h1>
        <p className="mt-4 text-lg/6 text-gray-500">
          Vous avez une remarque ou une question, n’hésitez pas à remplir le formulaire ci-dessous,
          les porteurs du projet RESAP vous répondront.
        </p>
      </div>
      <div className="mt-12">
        <Form />
      </div>
    </div>
  </div>
)

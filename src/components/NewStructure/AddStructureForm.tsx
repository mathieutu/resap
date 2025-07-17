'use client'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PrimaryButton } from '@/components/Buttons'
import { FormField, FormInput, FormTextarea, FormSelect } from '@/components/Forms'
import { types } from '@/data/structures_types'
import { createStructureInContentful } from '@/services/contentful-management'
import { sendNewStructureNotification } from '@/services/mailer'

// @see https://www.emailregex.com
// eslint-disable-next-line no-control-regex
const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export type AddStructureFields = {
  nom: string
  organisation: string
  type: string
  description: string
  adresse: string
  siteWeb: string
  email: string
  tel: string
  // Informations de contact pour la soumission
  contactFirstName: string
  contactLastName: string
  contactEmail: string
  contactPhone: string
  contactOrganization: string
  commentaires: string
}

export const AddStructureForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<AddStructureFields>()

  const onSubmit = async (data: AddStructureFields) => {
    try {
      const { url: contentfulUrl } = await createStructureInContentful({
        nom: data.nom,
        organisation: data.organisation,
        type: data.type,
        adresse: data.adresse,
        siteWeb: data.siteWeb,
        email: data.email,
        tel: data.tel,
        description: data.description,
      })

      await sendNewStructureNotification({
        ...data,
        contentfulUrl,
        contactName: `${data.contactFirstName} ${data.contactLastName}`,
      })

      reset()
      toast.success(
        'Votre proposition de structure a été envoyée avec succès. \n\nNous examinerons votre demande et vous contacterons si nécessaire.',
      )
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Une erreur s\'est produite lors de l\'envoi de votre proposition. \n\nMerci de réessayer ou de nous contacter directement.',
      )
    }
  }

  const structureTypes = Object.keys(types)

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-8">
      <div className="sm:col-span-6">
        {/* Informations sur la structure */}
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Informations sur la structure</h3>
            <p className="mt-1 text-sm text-gray-500">
              Veuillez fournir toutes les informations disponibles sur la structure que vous souhaitez ajouter.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-8">
            {/* Nom */}
            <FormField className="sm:col-span-full" name="nom" required error={errors.nom && 'Le nom de la structure est requis.'} label="Nom de la structure">
              <FormInput
                type="text"
                id="nom"
                error={!!errors.nom}
                {...register('nom', { required: true })}
              />
            </FormField>

            {/* Type */}
            <FormField className="sm:col-span-3" name="type" required error={errors.type && 'Le type de structure est requis.'} label="Type de structure">
              <FormSelect
                id="type"
                error={!!errors.type}
                {...register('type', { required: true })}
              >
                <option value="">Sélectionnez un type</option>
                {structureTypes.map((type) => (
                  <option key={type} value={type}>
                    {types[type as keyof typeof types].nom}
                  </option>
                  ))}
              </FormSelect>
            </FormField>

            <FormField className="sm:col-span-3" name="organisation" label="Organisation/Réseau">
              <FormInput
                type="text"
                id="organisation"
                {...register('organisation')}
              />
            </FormField>

            <FormField className="sm:col-span-full" name="description" label="Description">
              <FormTextarea
                id="description"
                {...register('description')}
              />
            </FormField>

            <FormField className="sm:col-span-full" name="adresse" required error={errors.adresse && 'L\'adresse est requise.'} label="Adresse complète">
              <FormInput
                type="text"
                id="adresse"
                error={!!errors.adresse}
                {...register('adresse', { required: true })}
              />
            </FormField>

            {/* Email */}
            <FormField className="sm:col-span-4" name="email" required error={errors.email && 'Merci de renseigner un email valide.'} label="Email">
              <FormInput
                type="email"
                id="email"
                error={!!errors.email}
                {...register('email', {
                    pattern: {
                      value: emailRegexp,
                      message: 'Format d\'email invalide',
                    },
                  })}
              />
            </FormField>

            {/* Téléphone */}
            <FormField className="sm:col-span-2" name="tel" label="Téléphone">
              <div className="mt-1">
                <FormInput
                  type="tel"
                  id="tel"
                  {...register('tel')}
                />
              </div>
            </FormField>

            {/* Site web */}
            <FormField className="sm:col-span-full" name="siteWeb" label="Site web">
              <div className="mt-1">
                <FormInput
                  type="url"
                  id="siteWeb"
                  {...register('siteWeb')}
                />
              </div>
            </FormField>
          </div>
        </div>
      </div>

      <div className="sm:col-span-6">
        <hr className="my-8" />
      </div>

      <div className="sm:col-span-6">
        {/* Informations de contact */}
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Vos informations de contact</h3>
            <p className="mt-1 text-sm text-gray-500">
              Ces informations nous permettront de vous recontacter si nous avons des questions sur votre proposition.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-8">
            {/* Prénom */}
            <FormField className="sm:col-span-3" name="contactFirstName" required error={errors.contactFirstName && 'Le prénom est requis.'} label="Prénom">
              <FormInput
                type="text"
                id="contactFirstName"
                autoComplete="given-name"
                error={!!errors.contactFirstName}
                {...register('contactFirstName', { required: true })}
              />
            </FormField>

            {/* Nom */}
            <FormField className="sm:col-span-3" name="contactLastName" required error={errors.contactLastName && 'Le nom est requis.'} label="Nom">
              <FormInput
                type="text"
                id="contactLastName"
                autoComplete="family-name"
                error={!!errors.contactLastName}
                {...register('contactLastName', { required: true })}
              />
            </FormField>

            {/* Email de contact */}
            <FormField className="sm:col-span-4" name="contactEmail" required error={errors.contactEmail && (errors.contactEmail.type === 'required' ? 'Le champ est requis.' : 'Merci de renseigner un email valide.')} label="Email">
              <FormInput
                type="email"
                id="contactEmail"
                autoComplete="email"
                error={!!errors.contactEmail}
                {...register('contactEmail', {
                required: true,
                pattern: {
                value: emailRegexp,
                message: 'Format d\'email invalide',
                },
              })}
              />
            </FormField>

            {/* Téléphone de contact */}
            <FormField className="sm:col-span-2" name="contactPhone" label="Téléphone">
              <FormInput
                type="tel"
                id="contactPhone"
                autoComplete="tel"
                {...register('contactPhone')}
              />
            </FormField>

            {/* Commentaires */}
            <FormField className="sm:col-span-6" name="commentaires" label="Commentaires supplémentaires">
              <FormTextarea
                id="commentaires"
                placeholder="Toute information supplémentaire qui pourrait nous aider à mieux comprendre votre proposition..."
                {...register('commentaires')}
              />
            </FormField>
          </div>
        </div>
      </div>

      <div className="sm:col-span-6">
        <PrimaryButton
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-xs text-base font-medium"
        >
          {isSubmitting
            && <span aria-hidden="true" className="-ml-1 mr-3 w-5 h-5 border-2 border-transparent border-l-white rounded-full animate-spin" />}
          {isSubmitting ? 'Envoi en cours...' : 'Proposer cette structure'}
        </PrimaryButton>
      </div>
    </form>
  )
}

'use server'

import { createOrUpdateLink, deleteLink, type LinkFormData } from '@/services/contentful-management'

export async function createLinkAction(linkData: LinkFormData) {
  try {
    const linkId = await createOrUpdateLink(linkData)
    return { success: true, linkId }
  } catch (error) {
    console.error('Erreur lors de la création du lien:', error)
    return { success: false, error: 'Erreur lors de la création du lien' }
  }
}

export async function updateLinkAction(linkData: LinkFormData) {
  try {
    const linkId = await createOrUpdateLink(linkData)
    return { success: true, linkId }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du lien:', error)
    return { success: false, error: 'Erreur lors de la mise à jour du lien' }
  }
}

export async function deleteLinkAction(linkId: string) {
  try {
    await deleteLink(linkId)
    return { success: true }
  } catch (error) {
    console.error('Erreur lors de la suppression du lien:', error)
    return { success: false, error: 'Erreur lors de la suppression du lien' }
  }
}

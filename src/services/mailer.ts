'use server'

import { Mailer } from 'nodemailer-react'
import { ContactEmail } from '@/components/Contact/ContactEmail'
import { NewStructureEmail, type NewStructureEmailParams } from '@/components/NewStructure/NewStructureEmail'
import type { ContactFields } from '@/components/Contact/ContactFormSection'

const { MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD } = process.env

if (!MAIL_HOST || !MAIL_PORT || !MAIL_USERNAME || !MAIL_PASSWORD) {
  throw new Error('Mail env vars needed (MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD).')
}
const mailer = Mailer({
  transport: {
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
  },
  defaults: {
    from: { name: 'Resap', address: 'noreply@resap.fr' },
  },
}, {
  ContactEmail,
  NewStructureNotification: NewStructureEmail,
})

export const sendContactEmail = async (contact: ContactFields) => mailer.send('ContactEmail', contact, { to: 'contact@resap.fr' })

export const sendNewStructureNotification = async (data: NewStructureEmailParams) => {
  mailer.send('NewStructureNotification', data, {
    to: 'contact@resap.fr',
  })
}

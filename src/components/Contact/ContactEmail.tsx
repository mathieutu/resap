import { Email } from 'nodemailer-react'
import { CSSProperties } from 'react'
import type { ContactFields } from './ContactFormSection'

const bodyStyle: CSSProperties = {
  boxSizing: 'border-box',
  fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'',
  WebkitTextSizeAdjust: 'none',
  height: '100%',
  lineHeight: '1.4',
  margin: 'auto',
  width: '100% !important',
} as const

export const ContactEmail: Email<ContactFields> = (contact) => ({
  subject: 'Un nouveau message de ReSaP !',
  body: (
    <body style={bodyStyle}>
      <h1 style={{ textAlign: 'center' }}>ReSaP</h1>
      <div>
        <p>Bonjour,</p>

        <p>Un nouveau message a été envoyé depuis le formulaire de contact de ReSap :</p>
        <p />
        <ul style={{padding: 0}}>
          {contact.firstName ? <li><b>Prénom</b> : {contact.firstName}</li> : null}
          {contact.lastName ? <li><b>Nom</b> : {contact.lastName}</li> : null}
          {contact.email ? (
            <li>
              <b>Email</b> : <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          ) : null}
          {contact.phone ? (
            <li>
              <b>Téléphone</b> : <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            </li>
          ) : null}
          {contact.organization ? <li><b>Structure</b> : {contact.organization}</li> : null}
          <div style={{ marginTop: '1em', whiteSpace: 'pre-line' }}>{contact.message}</div>
        </ul>
      </div>
    </body>
  ),
})

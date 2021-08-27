import { Email } from 'nodemailer-react'
import { CSSProperties } from 'react'
import type { ContactFields } from './ContactFormSection'

const bodyStyle: CSSProperties = {
  boxSizing: 'border-box',
  fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'',
  WebkitTextSizeAdjust: 'none',
  backgroundColor: '#edf2f7',
  color: '#718096',
  height: '100%',
  lineHeight: '1.4',
  margin: 'auto',
  paddingBottom: '16px',
  width: '100% !important',
  maxWidth: '600px',
} as const

const wrapperStyle: CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '1px 16px',
  borderRadius: '10px',
} as const

const messageStyle : CSSProperties = {
  borderRadius: '10px',
  border: 'solid 1px #edf2f7',
  padding: '1px 8px',
  whiteSpace: 'pre-line',
}

export const ContactEmail: Email<ContactFields> = (contact) => ({
  subject: 'Un nouveau message de ReSaP !',
  body: (
    <body style={bodyStyle}>
      <h1 style={{ textAlign: 'center' }}>ReSaP</h1>
      <div style={wrapperStyle}>
        <p>Bonjour,</p>

        <p>Un nouveau message a été envoyé depuis le formulaire de contact de ReSap :</p>
        <p />
        <ul>
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
          <li style={{ marginTop: '7px' }}><b>Message</b> : <div style={messageStyle}>{contact.message}</div></li>
        </ul>
      </div>
    </body>
  ),
})

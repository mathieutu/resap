import { CreateStructureData } from '@/services/contentful-management'
import { Email } from 'nodemailer-react'
import { CSSProperties } from 'react'

const bodyStyle: CSSProperties = {
  boxSizing: 'border-box',
  fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'',
  WebkitTextSizeAdjust: 'none',
  height: '100%',
  lineHeight: '1.4',
  margin: 'auto',
  width: '100% !important',
} as const

export type NewStructureEmailParams = CreateStructureData & {
  contentfulUrl: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  commentaires?: string
}

export const NewStructureEmail: Email<NewStructureEmailParams> = (structure) => ({
  subject: 'Nouvelle proposition de structure pour ReSaP !',
  body: (
    <body style={bodyStyle}>
      <h1 style={{ textAlign: 'center' }}>ReSaP</h1>
      <div>
        <p>Bonjour,</p>

        <p>Une nouvelle structure a été proposée pour être ajoutée à l&apos;annuaire RESAP :</p>
        <p />
        <ul style={{ padding: 0 }}>
          <li><b>Nom</b> : {structure.nom}</li>
          <li><b>Type</b> : {structure.type}</li>
          <li><b>Organisation</b> : {structure.organisation}</li>
          <li><b>Description</b> : {structure.description}</li>
          <li><b>Adresse</b> : {structure.adresse}</li>
        </ul>

        <p>Elle a été postée par :</p>
        <ul style={{ padding: 0 }}>
          <li><b>Nom</b> : {structure.contactName}</li>
          <li>
            <b>Email</b> : <a href={`mailto:${structure.contactEmail}`}>{structure.contactEmail}</a>
          </li>
          {structure.contactPhone ? (
            <li>
              <b>Téléphone</b> : <a href={`tel:${structure.contactPhone}`}>{structure.contactPhone}</a>
            </li>
          ) : null}
        </ul>

        {structure.commentaires ? (
          <div style={{ marginTop: '1em', whiteSpace: 'pre-line' }}>
            <b>Commentaires :</b><br />
            {structure.commentaires}
          </div>
          ) : null}

        <div style={{ marginTop: '1em' }}>
          <b>Pour éditer et publier la structure :</b> <a href={structure.contentfulUrl} style={{ color: '#2563eb' }}>Voir dans Contentful</a>
        </div>
      </div>
    </body>
  ),
})

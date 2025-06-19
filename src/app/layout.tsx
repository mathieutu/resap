import '@/assets/styles.css'
import { Dosis, IBM_Plex_Sans as IBMPlexSans } from 'next/font/google'

export const metadata = {
  title: {
    default: 'Ressources Santé et Précarité',
    template: '%s | Ressources Santé et Précarité',
  },
  description: "Dispositifs sociaux et médico-sociaux pour les professionnels de santé dans le but d'améliorer l'accès aux soins pour tous.",
  metadataBase: new URL('https://www.resap.fr'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Ressources Santé et Précarité',
    images: [
      {
        url: 'https://www.resap.fr/logo.svg',
        alt: 'Logo Ressources Santé et Précarité',
        type: 'image/svg',
      },
    ],
  },
  icons: {
    icon: '/logo.svg',
  },
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const dosis = Dosis({ weight: '700', subsets: ['latin'] })
const ibm = IBMPlexSans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}

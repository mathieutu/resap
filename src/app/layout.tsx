import '@/assets/styles.css'
import { Dosis, IBM_Plex_Sans as IBMPlexSans } from 'next/font/google'
import Script from 'next/script'

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

const analyticsEnabled = process.env.NODE_ENV === 'production'
  && (!process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV === 'production')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}

        {/* Privacy-friendly analytics by Plausible */}
        {analyticsEnabled && <Script async src="https://e.mathieutu.dev/js/pa-LnN_yHHAOj6u7LaW6VoIL.js" />}
        {analyticsEnabled && (
        <Script
          id="next-plausible-init"
          dangerouslySetInnerHTML={{
            __html: `
          window.plausible=window.plausible||function(){(plausible.q = plausible.q || []).push(arguments)},plausible.init=plausible.init||function(i){plausible.o = i || {}};
          plausible.init()
          `,
          }}
        />
)}

      </body>
    </html>
  )
}

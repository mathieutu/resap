import '../assets/styles.css'

import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { Analytics } from '@vercel/analytics/react'
import { PreviewAlert } from '../components/PreviewAlert'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <DefaultSeo
      additionalLinkTags={[{
        rel: 'icon',
        href: '/logo.svg',
      }]}
      titleTemplate="%s | Ressources Santé et Précarité"
      defaultTitle="Ressources Santé et Précarité"
      description="Dispositifs sociaux et médico-sociaux pour les professionnels de santé dans le but d'améliorer l'accès aux soins pour tous."
      canonical="https://www.resap.fr"
      openGraph={{
        type: 'website',
        locale: 'fr_FR',
        site_name: 'Ressources Santé et Précarité',
        images: [{
          url: 'https://www.resap.fr/logo.svg',
          alt: 'Logo Ressources Santé et Précarité',
          type: 'image/svg',
        }],
      }}
    />
    {pageProps.preview && <PreviewAlert />}
    <Component {...pageProps} />
    <Analytics />
  </>
)

export default MyApp

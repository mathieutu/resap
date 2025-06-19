import Image from 'next/image'
import LogoArs from '@/assets/images/partenaires/logo-ars.png'
import LogoGouv from '@/assets/images/partenaires/logo-gouv.png'
import { LogoFull } from '../Logos'
import { Link } from '../Links'

const socialIcons = [
  {
    name: 'Github',
    href: 'https://github.com/mathieutu/resap',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z" />
      </svg>
    ),
  },
]

const navigation = [
  { label: 'Mentions Légales', href: '/mentions' },
  { label: 'Qui sommes nous ?', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
]

export const Footer = () => (
  <footer className="bg-blue-default print:hidden" aria-labelledby="footer-heading">
    <h2 className="sr-only">
      Pied de page
    </h2>
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <LogoFull className="text-white w-20" />
      <div className="md:grid md:grid-cols-2 md:gap-8 mt-8">
        <div className="space-y-8">
          <p className="text-white text-base">
            Ce site se destine en première intention aux professionnels de santé, mais peut aussi être utile aux travailleurs sociaux, bénévoles et toutes personnes susceptibles d&apos;accompagner vers la santé une personne en situation de précarité.
          </p>
          <div className="flex space-x-6">
            {socialIcons.map((item) => (
              <Link key={item.name} href={item.href} className="text-white hover:text-green-default">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-12 md:mt-0">
          <ul className="md:text-right space-y-4">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-base text-white hover:text-green-default">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6 flex justify-between items-center flex-wrap gap-4">
        <p className="flex gap-8 items-center flex-wrap">
          <Image className="brightness-0 invert" height={40} src={LogoArs} alt="Logo ARS" />
          <Image className="brightness-0 invert" height={48} src={LogoGouv} alt="Logo gouvernement" />
        </p>
        <p className="text-base text-white">&copy; {new Date().getFullYear()} RESAP</p>
      </div>
    </div>
  </footer>
)

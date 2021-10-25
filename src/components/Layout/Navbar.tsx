import { Disclosure } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from '../Links'
import { Container } from './Container'
import { LogoBlue } from '../LogoBlue'

export const navigationEntries = [
  { name: 'Fiches pratiques', href: 'fiches' },
  { name: 'Annuaires', href: '#' },
  { name: 'Contact', href: 'contact' },
]

export const Navbar = () => (
  <Disclosure as="header" className="bg-white shadow print:hidden">
    {({ open }) => (
      <>
        <Container>
          <div className="flex justify-between h-16">
            <div className="flex px-2 lg:px-0">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <LogoBlue />
              </Link>
              <nav className="hidden lg:ml-6 lg:flex lg:space-x-8">
                {navigationEntries.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    activeClassName="border-indigo-500 text-gray-900"
                    inactiveClassName="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="lg:flex-1 flex items-center justify-center px-2  lg:justify-end">
              <label htmlFor="search" className="sr-only">
                Rechercher
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="w-full block pl-10 l-10  py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Recherchez parmis les fiches et structures"
                  type="search"
                  size={42}
                />
              </div>
            </div>
            <div className="flex items-center lg:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>
        </Container>

        <Disclosure.Panel className="lg:hidden">
          <nav className="pt-2 pb-3 space-y-1">
            {navigationEntries.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700"
                inactiveClassName="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
)

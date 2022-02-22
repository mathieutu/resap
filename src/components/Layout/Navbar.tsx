import { Popover, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { Link } from '../Links'
import { Container } from './Container'
import { useSearchFichesForm } from '../../utils/hooks'
import { LogoFull } from '../Logos'

export const navigationEntries = [
  { name: 'Fiches pratiques', href: 'fiches' },
  // { name: 'Annuaires', href: '#' },
  { name: 'Qui sommes-nous ?', href: 'a-propos' },
  { name: 'Nous contacter', href: 'contact' },
]

export const Navbar = () => {
  const { handleSubmit, onChange, value } = useSearchFichesForm()

  return (
    <Popover as="header" className="bg-white shadow print:hidden">
      {({ open }) => (
        <>
          <Container>
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <Link href="/" title="Page d'accueil" className="flex-shrink-0 flex items-center">
                  <LogoFull className="text-blue-default w-14" />
                </Link>
                <nav className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {navigationEntries.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      activeClassName="border-green-default text-blue-default"
                      inactiveClassName="border-transparent text-grey-default hover:border-green-default hover:text-blue-default"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <form onSubmit={handleSubmit} className="lg:flex-1 flex items-center justify-center px-2  lg:justify-end">
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
                    className="w-full block pl-10 l-10  py-2 border border-grey-default rounded-md leading-5 bg-white placeholder-grey-default focus:outline-none focus:placeholder-grey-default focus:ring-1 focus:ring-blue-default focus:border-blue-default sm:text-sm"
                    placeholder="Recherchez parmis les fiches et structures"
                    type="search"
                    size={42}
                    value={value}
                    onChange={onChange}
                  />
                </div>
              </form>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button
                  className="inline-flex items-center justify-center p-2 rounded-md text-blue-default hover:text-blue-default hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-default"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </Container>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10"
            >
              <div
                className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
              >
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <LogoFull className="text-blue-default" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-blue-default hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-default"
                    >
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigationEntries.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      activeClassName="bg-grey-light border-green-default text-blue-default"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-default hover:bg-grey-light"
                      inactiveClassName="text-grey-default"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

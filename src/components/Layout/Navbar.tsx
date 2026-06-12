'use client'

import { Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSearchFichesForm } from '@/utils/hooks'
import { Link } from '../Links'
import { LogoFull } from '../Logos'
import { Container } from './Container'

// eslint-disable-next-line react-refresh/only-export-components
export const navigationEntries = [
  { name: 'Fiches pratiques', href: 'fiches' },
  { name: 'Annuaire', href: 'annuaire' },
  { name: 'Qui sommes-nous ?', href: 'a-propos' },
  { name: 'Nous contacter', href: 'contact' },
]

export const Navbar = () => {
  const { handleSubmit, onChange, value } = useSearchFichesForm()

  return (
    <Popover
      as="header"
      className="
        bg-white shadow-sm
        print:hidden
      "
    >
      {({ open }) => (
        <>
          <Container>
            <div className="flex h-16 justify-between">
              <div className="
                flex px-2
                lg:px-0
              "
              >
                <Link
                  href="/"
                  title="Page d'accueil"
                  className="flex shrink-0 items-center"
                >
                  <LogoFull className="w-14 text-blue-default" />
                </Link>
                <nav className="
                  hidden
                  lg:ml-6 lg:flex lg:space-x-8
                "
                >
                  {navigationEntries.map(item => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="
                        inline-flex items-center border-b-2 px-1 pt-1 text-sm
                        font-medium
                      "
                      activeClassName="border-green-default text-blue-default"
                      inactiveClassName="border-transparent text-gray-default hover:border-green-default hover:text-blue-default"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <form
                onSubmit={handleSubmit}
                className="
                  flex items-center justify-center px-2
                  lg:flex-1 lg:justify-end
                "
              >
                <label htmlFor="search" className="sr-only">
                  Rechercher
                </label>
                <div className="relative">
                  <div className="
                    pointer-events-none absolute inset-y-0 left-0 flex
                    items-center pl-3
                  "
                  >
                    <MagnifyingGlassIcon className="size-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="
                      block w-full rounded-md border border-gray-default
                      bg-white py-2 pl-10 leading-5 placeholder-gray-default
                      focus:border-blue-default focus:placeholder-gray-default
                      focus:ring-1 focus:ring-blue-default focus:outline-hidden
                      sm:text-sm
                    "
                    placeholder="Recherchez parmi nos fiches"
                    type="search"
                    size={42}
                    value={value}
                    onChange={onChange}
                  />
                </div>
              </form>
              <div className="
                flex items-center
                lg:hidden
              "
              >
                {/* Mobile menu button */}
                <Popover.Button
                  className="
                    inline-flex items-center justify-center rounded-md p-2
                    text-blue-default
                    hover:bg-gray-100 hover:text-blue-default
                    focus:ring-2 focus:ring-blue-default focus:outline-hidden
                    focus:ring-inset
                  "
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block size-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block size-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </Container>

          <Transition
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="
                absolute inset-x-0 top-0 z-10 origin-top-right p-2 transition
                md:hidden
              "
            >
              <div
                className="
                  overflow-hidden rounded-lg bg-white shadow-md ring-1
                  ring-black/5
                "
              >
                <div className="flex items-center justify-between px-5 pt-4">
                  <div>
                    <LogoFull className="max-h-6 text-blue-default" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button
                      className="
                        inline-flex items-center justify-center rounded-md
                        bg-white p-2 text-blue-default
                        hover:bg-gray-100 hover:text-gray-500
                        focus:ring-2 focus:ring-blue-default
                        focus:outline-hidden focus:ring-inset
                      "
                    >
                      <span className="sr-only">Close main menu</span>
                      <XMarkIcon className="size-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {navigationEntries.map(item => (
                    <Link
                      key={item.name}
                      href={item.href}
                      activeClassName="bg-gray-light border-green-default text-blue-default"
                      className="
                        block rounded-md px-3 py-2 text-base font-medium
                        hover:bg-gray-light hover:text-blue-default
                      "
                      inactiveClassName="text-gray-default"
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

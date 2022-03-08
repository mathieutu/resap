import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { navigationEntries } from './Navbar'
import { Link } from '../Links'
import { PrimaryButton } from '../Buttons'
import { useSearchFichesForm } from '../../utils/hooks'
import { LogoFull, LogoIcon } from '../Logos'

const SearchForm = () => {
  const { handleSubmit, onChange, value } = useSearchFichesForm()

  return (
    <form onSubmit={handleSubmit} className="mt-3 sm:flex lg:w-3/4">
      <label htmlFor="search" className="sr-only">
        Rechercher par mots-clefs...
      </label>
      <div className="mt-1 flex rounded-md shadow-sm w-full flex-wrap gap-3">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="search"
            id="search"
            className="focus:ring-blue-default focus:border-blue-default block w-full rounded-md pl-10 py-2 text-base border-gray-default"
            placeholder="Rechercher par mots-clefs.."
            value={value}
            onChange={onChange}
          />
        </div>
        <PrimaryButton type="submit">Rechercher</PrimaryButton>
      </div>
    </form>
  )
}

export const HomeHeader = () => (
  <div className="relative bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <Popover>
        <div className="bg-white flex justify-between lg:px-8 pt-6 px-4 relative sm:px-6 z-30">
          <div>
            <nav
              className="relative flex items-center justify-between sm:h-10 lg:justify-start"
              aria-label="Global"
            >
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/" title="Page d'accueil">
                    <LogoFull className="text-blue-default w-14" />
                  </Link>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-blue-default hover:text-grey-default hover:bg-grey-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-default"
                    >
                      <span className="sr-only">Menu principal</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                {navigationEntries.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="font-medium text-grey-default hover:text-blue-default"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <div className="flex justify-end flex-wrap gap-4 hidden lg:block">
            <p className="flex gap-8 items-center flex-wrap">
              <img className="h-10" src="/partenaires/logo-ars.png" alt="Logo ARS" />
              <img className="h-12" src="/partenaires/logo-gouv.png" alt="Logo gouvernement" />
            </p>
          </div>
        </div>

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
                  <LogoFull className="text-blue-default w-14" />
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
                    className="block px-3 py-2 rounded-md text-base font-medium text-grey-default hover:text-blue-default hover:bg-grey-light"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <div className="relative lg:z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">

        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-blue-default sm:text-5xl md:text-6xl">
              <span className="block">Ressources <br />Santé et Précarité</span>{' '}
              <span className="block text-4xl text-green-default mt-4 ">Auvergne Rhône Alpes</span>
            </h1>
            <p
              className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              Ce site se veut être un outil pratique à destination des professionnels de santé.
              Par un système de mots clés, vous serez orientés vers des fiches thématiques.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <SearchForm />
            </div>
          </div>
          <div className="relative lg:right-0 px-1 pt-10 lg:hidden md:block">
            <div className="flex justify-center flex-wrap gap-4">
              <p className="flex gap-8 items-center flex-wrap">
                <img className="h-10" src="/partenaires/logo-ars.png" alt="Logo ARS" />
                <img className="h-12" src="/partenaires/logo-gouv.png" alt="Logo gouvernement" />
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div className="lg:absolute lg:right-0 lg:w-1/2 pl-10 -top-10 -bottom-10 hidden lg:block z-10">
      <LogoIcon className="h-full text-green-default" />
    </div>
  </div>
)

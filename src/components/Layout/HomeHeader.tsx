'use client'

import { Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import LogoArs from '@/assets/images/partenaires/logo-ars.png'
import LogoGouv from '@/assets/images/partenaires/logo-gouv.png'
import { useSearchFichesForm } from '@/utils/hooks'
import { PrimaryButton } from '../Buttons'
import { Link } from '../Links'
import { LogoFull, LogoIcon } from '../Logos'
import { navigationEntries } from './Navbar'

const SearchForm = () => {
  const { handleSubmit, onChange, value } = useSearchFichesForm()

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mt-3
        sm:flex
        lg:w-3/4
      "
    >
      <label htmlFor="search" className="sr-only">
        Rechercher par mots-clefs...
      </label>
      <div className="mt-1 flex w-full flex-wrap gap-3 rounded-md shadow-xs">
        <div className="
          relative flex grow items-stretch
          focus-within:z-10
        "
        >
          <div className="
            pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3
          "
          >
            <MagnifyingGlassIcon className="size-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="search"
            id="search"
            className="
              block w-full rounded-md border-gray-default py-2 pl-10 text-base
              focus:border-blue-default focus:ring-blue-default
            "
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
  <div className="relative overflow-hidden bg-white">
    <div className="mx-auto max-w-7xl">
      <Popover>
        <div className="
          relative z-30 flex justify-between bg-white px-4 pt-6
          sm:px-6
          lg:px-8
        "
        >
          <div>
            <nav
              className="
                relative flex items-center justify-between
                sm:h-10
                lg:justify-start
              "
              aria-label="Global"
            >
              <div className="
                flex shrink-0 grow items-center
                lg:grow-0
              "
              >
                <div className="
                  flex w-full items-center justify-between
                  md:w-auto
                "
                >
                  <Link href="/" title="Page d'accueil">
                    <LogoFull className="w-14 text-blue-default" />
                  </Link>
                  <div className="
                    -mr-2 flex items-center
                    md:hidden
                  "
                  >
                    <Popover.Button
                      className="
                        inline-flex items-center justify-center rounded-md
                        bg-white p-2 text-blue-default
                        hover:bg-gray-light hover:text-gray-default
                        focus:ring-2 focus:ring-blue-default
                        focus:outline-hidden focus:ring-inset
                      "
                    >
                      <span className="sr-only">Menu principal</span>
                      <Bars3Icon className="size-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="
                hidden
                md:ml-10 md:block md:space-x-8 md:pr-4
                lg:whitespace-nowrap
              "
              >
                {navigationEntries.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="
                      font-medium text-gray-default
                      hover:text-blue-default
                    "
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <div className="
            hidden
            lg:block
          "
          >
            <p className="relative flex flex-nowrap items-center gap-8">
              <Image height={40} src={LogoArs} alt="Logo ARS" />
              <Image height={48} src={LogoGouv} alt="Logo gouvernement" />
            </p>
          </div>
        </div>

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
                  <LogoFull className="w-14 text-blue-default" />
                </div>
                <div className="-mr-2">
                  <Popover.Button
                    className="
                      inline-flex items-center justify-center rounded-md
                      bg-white p-2 text-blue-default
                      hover:bg-gray-100 hover:text-gray-500
                      focus:ring-2 focus:ring-blue-default focus:outline-hidden
                      focus:ring-inset
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
                    className="
                      block rounded-md px-3 py-2 text-base font-medium
                      text-gray-default
                      hover:bg-gray-light hover:text-blue-default
                    "
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      <div className="
        relative bg-white pb-8
        sm:pb-16
        md:pb-20
        lg:z-10 lg:w-full lg:max-w-2xl lg:pb-28
        xl:pb-32
      "
      >
        <main className="
          mx-auto mt-10 max-w-7xl px-4
          sm:mt-12 sm:px-6
          md:mt-16
          lg:mt-20 lg:px-8
          xl:mt-28
        "
        >
          <div className="
            sm:text-center
            lg:text-left
          "
          >
            <h1 className="
              text-4xl font-extrabold tracking-tight text-blue-default
              sm:text-5xl
              md:text-6xl
            "
            >
              <span className="block">
                Ressources
                <br />
                Santé et Précarité
              </span>
              {' '}
              <span className="mt-4 block text-4xl text-green-default">Auvergne Rhône Alpes</span>
            </h1>
            <p
              className="
                mt-3 text-base text-gray-500
                sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg
                md:mt-5 md:text-xl
                lg:mx-0
              "
            >
              Ce site se veut être un outil pratique à destination des professionnels de santé.
              Par un système de mots clés, vous serez orientés vers des fiches thématiques.
            </p>
            <div className="
              mt-5
              sm:mt-8 sm:flex sm:justify-center
              lg:justify-start
            "
            >
              <SearchForm />
            </div>
          </div>
          <div className="
            relative px-1 pt-10
            md:block
            lg:right-0 lg:hidden
          "
          >
            <div className="flex flex-wrap justify-center gap-4">
              <p className="flex flex-wrap items-center gap-8">
                <Image height={40} src={LogoArs} alt="Logo ARS" />
                <Image height={48} src={LogoGouv} alt="Logo gouvernement" />
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div className="
      -inset-y-10 z-10 hidden pl-10
      lg:absolute lg:right-0 lg:block lg:w-1/2
    "
    >
      <LogoIcon className="h-full text-green-default" />
    </div>
  </div>
)

'use client'

import type { Fiche } from '@/types/models'
import { Transition } from '@headlessui/react'
import { not } from 'ramda'
import { useState } from 'react'
import { SecondaryButton } from '@/components/Buttons'
import { FloatingButtons } from '@/components/FloatingButtons'
import { Box } from '@/components/Layout/Box'
import { Container } from '@/components/Layout/Container'
import { HeaderFiche } from '@/components/Layout/HeaderFiche'
import { Link } from '@/components/Links'
import { StructuresList } from '@/components/Map/StructuresList'
import { Prose } from '@/components/Prose'
import { categories } from '@/data/categories'

const LinksCard = ({ links, title }: { title: string, links: Fiche['pourEnSavoirPlus'] }) => {
  if (!links?.length) {
    return null
  }

  return (
    <Box title={title}>
      {links.map(link => (
        <Link
          key={link.id}
          href={`/liens/${link.id}`}
          className="
            block py-3 text-blue-default
            hover:text-gray-600
          "
        >
          {link.titre}
        </Link>
      ))}
    </Box>
  )
}

export const ShowFiche = ({ fiche }: { fiche: Fiche }) => {
  const categorie = categories[fiche.categorie]

  const [showDetails, setShowDetails] = useState<boolean>(false)
  const toggleDetails = () => setShowDetails(not)

  return (
    <>
      <HeaderFiche fiche={fiche} categorie={categorie} />
      <div className="relative pb-12">
        <Container>
          <FloatingButtons className="
            absolute top-5
            xl:left-8
            2xl:top-20
          "
          />
          <div className="
            w-full py-10
            lg:py-20
          "
          >
            <h1 className="
              mt-10 text-3xl text-blue-default
              md:text-5xl
              lg:mt-0 lg:text-6xl
            "
            >
              {fiche.titre}
            </h1>
          </div>
          <div className="
            flex flex-wrap
            lg:-mx-4
          "
          >
            <div className="
              w-full pb-10
              lg:w-8/12 lg:px-4 lg:pb-20
              print:w-full
            "
            >
              <Prose html={fiche.resume} />
              <SecondaryButton
                type="button"
                className="
                  mx-auto my-5 block w-1/2
                  print:hidden
                "
                onClick={toggleDetails}
              >
                {showDetails ? 'Masquer les détails' : 'Afficher les détails'}
              </SecondaryButton>
              <Transition
                show={showDetails}
                enter="transition-opacity ease-linear duration-700"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                as="div"
              >
                <Prose html={fiche.contenu} />
                <SecondaryButton
                  type="button"
                  className="
                    mx-auto my-5 block w-1/2
                    print:hidden
                  "
                  onClick={toggleDetails}
                >
                  Masquer les détails
                </SecondaryButton>
              </Transition>
            </div>
            <div className="
              w-full space-y-10
              lg:w-4/12 lg:px-4
              print:hidden
            "
            >
              <LinksCard title="Quelques outils" links={fiche.outils} />
              <LinksCard title="Pour les patients" links={fiche.patients} />
              <LinksCard title="Pour aller plus loin" links={fiche.pourEnSavoirPlus} />
            </div>
            <div className="mt-10 w-full">
              {fiche.structures?.length ? <StructuresList structures={fiche.structures} /> : null}
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

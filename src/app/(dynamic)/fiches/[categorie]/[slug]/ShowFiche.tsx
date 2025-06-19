'use client'

import { Fiche } from '@/types/models'
import { HeaderFiche } from '@/components/Layout/HeaderFiche'
import { Container } from '@/components/Layout/Container'
import { FloatingButtons } from '@/components/FloatingButtons'
import { Prose } from '@/components/Prose'
import { SecondaryButton } from '@/components/Buttons'
import { Transition } from '@headlessui/react'
import { StructuresList } from '@/components/Map/StructuresList'
import { categories } from '@/data/categories'
import { useState } from 'react'
import { not } from 'ramda'
import { Box } from '@/components/Layout/Box'
import { Link } from '@/components/Links'

const LinksCard = ({ links, title }: { title: string, links: Fiche['pourEnSavoirPlus'] }) => {
  if (!links?.length) {
    return null
  }

  return (
    <Box title={title}>
      {links.map((link) => (
        <Link
          key={link.id}
          href={`/liens/${link.id}`}
          className="text-blue-default py-3 block hover:text-gray-600"
        >
          {link.titre}
        </Link>
      ))}
    </Box>
  )
}

export const ShowFiche = ({ fiche }: {fiche: Fiche}) => {
  const categorie = categories[fiche.categorie]

  const [showDetails, setShowDetails] = useState<boolean>(false)
  const toggleDetails = () => setShowDetails(not)

  return (
    <>
      <HeaderFiche fiche={fiche} categorie={categorie} />
      <div className="relative pb-12">
        <Container>
          <FloatingButtons className=" absolute top-5 2xl:top-20 xl:left-8" />
          <div className="w-full py-10 lg:py-20">
            <h1 className="mt-10 lg:mt-0 text-3xl md:text-5xl lg:text-6xl text-blue-default">{fiche.titre}</h1>
          </div>
          <div className="flex lg:-mx-4 flex-wrap">
            <div className="w-full print:w-full lg:w-8/12 lg:px-4 pb-10 lg:pb-20">
              <Prose html={fiche.resume} />
              <SecondaryButton type="button" className="print:hidden block my-5 w-1/2 mx-auto" onClick={toggleDetails}>
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
                <SecondaryButton type="button" className="print:hidden block my-5 w-1/2 mx-auto" onClick={toggleDetails}>
                  Masquer les détails
                </SecondaryButton>
              </Transition>
            </div>
            <div className="w-full lg:w-4/12 lg:px-4 print:hidden space-y-10">
              <LinksCard title="Quelques outils" links={fiche.outils} />
              <LinksCard title="Pour les patients" links={fiche.patients} />
              <LinksCard title="Pour aller plus loin" links={fiche.pourEnSavoirPlus} />
            </div>
            <div className="w-full mt-10">
              {fiche.structures?.length ? <StructuresList structures={fiche.structures} /> : null}
            </div>
          </div>
        </Container>
      </div>
    </>
)
}

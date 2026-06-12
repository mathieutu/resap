import type { ClassNameProp } from '../../types/react'
import { categories } from '../../data/categories'
import { CategorieCard } from '../Card/CategorieCard'
import { Headline } from '../Headline'
import { Link, PrimaryLink } from '../Links'

type Props = ClassNameProp

export const ThemeSection = ({ className }: Props) => (
  <div className={`
    ${className}
    bg-gray-light py-12
  `}
  >
    <div className="
      mx-auto max-w-7xl px-4
      sm:px-6
      lg:px-8
    "
    >
      <Headline
        tag="FICHES PRATIQUES"
        title="Nos différentes thématiques"
      >
        Retrouver pour chacune de ces thématiques, une multitude de fiches pratiques qui vous aideront à orienter
        et accompagner les patients.
      </Headline>
      <div className="mt-14">
        <div className="flex w-full flex-wrap justify-between">
          {Object.values(categories).map(categorie => (
            <Link
              key={categorie.name}
              href={categorie.href}
              className="
                group flex w-full
                md:w-6/12
                lg:w-2/12 lg:px-4
              "
            >
              <CategorieCard categorie={categorie} />
            </Link>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <PrimaryLink href="/fiches">Toutes nos fiches</PrimaryLink>
        </div>
      </div>
    </div>
  </div>
)

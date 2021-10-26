import { Headline } from '../Headline'
import { ClassNameProp } from '../../types/react'
import { categories } from '../../services/categories'
import { Link, PrimaryLink } from '../Links'
import { CategorieCard } from '../Card/CategorieCard'

type Props = ClassNameProp

export const ThemeSection = ({ className }: Props) => (
  <div className={`${className} py-12 bg-grey-light`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Headline
        tag="FICHES"
        title="Nos différentes thématique"
      >
        Lorem ipsum dolor sit amet consect adipisicing elit.Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
      </Headline>
      <div className="mt-10">
        <div className="flex flex-wrap justify-between w-full">
          {Object.values(categories).map((categorie) => (
            <Link key={categorie.name} href={categorie.href} className="w-full md:w-6/12 lg:w-2/12 lg:px-4 flex group">
              <CategorieCard categorie={categorie} />
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <PrimaryLink href="/fiches">Toutes nos fiches</PrimaryLink>
        </div>
      </div>
    </div>
  </div>
)

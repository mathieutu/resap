import { Headline, headlineProps } from '../Headline'
import { ClassNameProp } from '../../types/react'
import { categories } from '../../services/categories'
import { PrimaryButton } from '../Buttons/Primary'
import { Link } from '../Link'
import { CategorieCard } from '../Card/CategorieCard'

const headline: headlineProps = {
  title: '<h2>Nos différentes thématique</h2>',
  text: 'Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.',
  tag: 'FICHES',
}

type Props = ClassNameProp

export const ThemeSection = ({ className }: Props) => (
  <div className={`${className} py-12 bg-grey-light`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Headline
        tag={headline.tag}
        title={headline.title}
        text={headline.text}
      />
      <div className="mt-10">
        <div className="flex flex-wrap justify-between w-full">
          {Object.values(categories).map((categorie) => (
            <Link key={categorie.name} href={categorie.href} className="w-full md:w-6/12 lg:w-2/12 px-4 flex group">
              <CategorieCard categorie={categorie} />
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/fiches">
            <PrimaryButton type="button">Toutes nos fiches</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

import classNames from 'classnames'
import { Headline, headlineProps } from '../Headline'
import { ClassNameProp } from '../../types/react'
import { Link } from '../Link'
import { categories } from '../../services/categories'

const headline: headlineProps = {
  title: 'Nos différentes thématique',
  text: 'Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.',
  tag: '',
}

type Props = ClassNameProp

export const ThemeSection = ({ className }: Props) => (
  <div className={`${className} py-12 bg-white`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Headline
        tag={headline.tag}
        title={headline.title}
        text={headline.text}
      />
      <div className="mt-10">
        <ul className="mt-3 grid grid-rows-2 gap-5 sm:gap-6 grid-flow-col w-1/2 mx-auto">
          {Object.values(categories).map((categorie) => (
            <li key={categorie.name} className="col-span-1 flex shadow-sm rounded-md">
              <div
                className={classNames(
                  categorie.bgColor,
                  'flex-shrink-0 flex items-center justify-center p-4 text-white text-sm font-medium rounded-md',
                )}
              >
                <categorie.icon className="w-6" />
              </div>
              <div className="flex-1 flex items-center justify-between truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <Link href={categorie.href} className="text-gray-900 font-medium hover:text-gray-600">
                    {categorie.name}
                  </Link>
                  <p className="text-gray-500">{categorie.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)

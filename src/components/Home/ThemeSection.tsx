import classNames from 'classnames'
import {Headline, headlineProps} from '../Headline'
import {ClassNameProp} from '../../types/react'
import {categories} from '../../services/categories'
import {PrimaryButton} from "../Buttons/Primary";
import {Link} from "../Link";

const headline: headlineProps = {
  title: '<h2>Nos différentes thématique</h2>',
  text: 'Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.',
  tag: 'FICHES',
}

type Props = ClassNameProp

export const ThemeSection = ({className}: Props) => (
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
            <div key={categorie.name} className={"w-full md:w-6/12 lg:w-2/12 px-4 flex"}>
              <div className={"mb-6 w-full bg-white rounded-xl py-8 px-4 flex flex-col items-center "}>
                <categorie.icon className={classNames(categorie.textColor, "w-[75px] h-[75px]")}/>
                <span className={classNames(categorie.textColor, 'uppercase text-sm')}>
                {categorie.name}
              </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link href={"/fiches"}>
            <PrimaryButton>Toutes nos fiches</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

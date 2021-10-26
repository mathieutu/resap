import classNames from 'classnames'
import { Headline } from '../Headline'
import { ClassNameProp } from '../../types/react'

const features = [
  {
    name: 'Competitive exchange rates',
    description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    name: 'No hidden fees',
    description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    name: 'Transfers are instant',
    description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    name: 'Mobile notifications',
    description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
]

type Props = ClassNameProp

export const FeatureSection = ({ className }: Props) => (
  <div className={classNames(className, 'py-12')}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Headline
        tag="PRATIQUE"
        title="Une meilleure façon d’accèder à l’information"
      >
        Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
      </Headline>
      <div className="mt-10">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <p className="lg:ml-16 text-lg leading-6 font-medium text-black">{feature.name}</p>
              </dt>
              <dd className="mt-2 lg:ml-16 text-base text-grey-default">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </div>
)

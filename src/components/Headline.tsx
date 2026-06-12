import type { ChildrenProp, ClassNameProp } from '../types/react'
// TODO à reprendre ? (virer html et utiliser du jsx)
import classNames from 'classnames'

type HeadlineProps = { title: string, tag: string } & ClassNameProp & ChildrenProp

export const Headline = ({ title, children, tag, className }: HeadlineProps) => (
  <div className={classNames(className, 'lg:text-center')}>
    <span className="
      mb-12 block text-sm font-semibold tracking-wide text-gray-default
      uppercase
    "
    >
      {tag.toUpperCase()}
    </span>
    <h2
      className="
        mt-2 text-3xl/8 font-extrabold tracking-tight text-blue-default
        sm:text-4xl
      "
    >
      {title}
    </h2>
    <p className="
      mt-4 max-w-2xl text-xl text-blue-default
      lg:mx-auto
    "
    >
      {children}
    </p>
  </div>
)

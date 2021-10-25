/* eslint-disable react/no-danger */
// TODO à reprendre ? (virer html et utiliser du jsx)
import classNames from 'classnames'
import { ChildrenProp, ClassNameProp } from '../types/react'

type HeadlineProps = { title: string, tag: string } & ClassNameProp & ChildrenProp

export const Headline = ({ title, children, tag, className }: HeadlineProps) => (
  <div className={classNames(className, 'lg:text-center')}>
    <span className="text-sm text-grey-default font-semibold mb-12 block tracking-wide uppercase">{tag.toUpperCase()}</span>
    <h2
      className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-blue-default sm:text-4xl"
    >
      {title}
    </h2>
    <p className="mt-4 max-w-2xl text-xl text-blue-default lg:mx-auto">{children}</p>
  </div>
)

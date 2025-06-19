import classNames from 'classnames'
import { ChildrenProp, ClassNameProp } from '../../types/react'

type Props = { title: string, subTitle?: string, titleClassName?: string } & ClassNameProp & ChildrenProp

export const SimpleHeader = ({ title, subTitle, titleClassName = 'text-gray-900', className, children }: Props) => (
  <div className={classNames(' bg-white lg:bg-transparent lg:bg-linear-to-b lg:to-transparent lg:from-white', className)}>
    <div className="max-w-7xl mx-auto py-5 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        {subTitle
          ? <h2 className="text-base font-semibold text-gray-800 tracking-wide uppercase">{subTitle}</h2>
          : null}
        <h1 className={classNames(titleClassName, subTitle ? 'mt-1' : 'mt-7', 'text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl')}>
          {title}
        </h1>
        {children}
      </div>
    </div>
  </div>
)

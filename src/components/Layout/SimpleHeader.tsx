import classNames from 'classnames'
import { ChildrenProp, ClassNameProp } from '../../types/react'

type Props = { title: string, subTitle?: string, color?: string } & ClassNameProp & ChildrenProp

export const SimpleHeader = ({ title, subTitle, color = 'text-gray-900', className, children }: Props) => (
  <div className={classNames('bg-gradient-to-b from-transparent to-white', className)}>
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        {subTitle && <h2 className="text-base font-semibold text-gray-800 tracking-wide uppercase">{subTitle}</h2>}
        <h1 className={classNames(color, 'mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl')}>
          {title}
        </h1>
        {children}
      </div>
    </div>
  </div>
)

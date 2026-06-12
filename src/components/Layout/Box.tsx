import type { ChildrenProp, ClassNameProp } from '../../types/react'
import classNames from 'classnames'

type Props = { title: string } & ClassNameProp & ChildrenProp

export const Box = ({ title, className, children }: Props) => (
  <div className={classNames('shadow-lg bg-gray-light px-7 pt-10 pb-10 rounded-2xl divide-y divide-gray-300', className)}>
    <div className="
      pb-10 text-center text-lg font-bold text-blue-default uppercase
    "
    >
      <h3>{title}</h3>
    </div>
    {children}
  </div>
)

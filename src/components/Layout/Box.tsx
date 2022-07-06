import classNames from 'classnames'
import { ChildrenProp, ClassNameProp } from '../../types/react'

type Props = { title: string } & ClassNameProp & ChildrenProp

export const Box = ({ title, className, children }: Props) => (
  <div className={classNames('shadow-lg bg-gray-light px-7 pt-10 pb-10 rounded-2xl divide-y divide-gray-300', className)}>
    <div className="text-center text-lg text-blue-default font-bold pb-10 uppercase">
      <h3>{title}</h3>
    </div>
    {children}
  </div>
)

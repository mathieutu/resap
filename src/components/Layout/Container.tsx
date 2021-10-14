import classNames from 'classnames'
import { ChildrenProp, ClassNameProp } from '../../types/react'

type Props =  ClassNameProp & ChildrenProp

export const Container = ({ className, children }: Props) => (
  <div className={classNames('max-w-7xl mx-auto px-2 sm:px-4 lg:px-8', className)}>
    {children}
  </div>
)

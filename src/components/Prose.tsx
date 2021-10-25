/* eslint-disable react/no-danger */
import classNames from 'classnames'
import { ClassNameProp } from '../types/react'

type proseProps = { html: string } & ClassNameProp

export const Prose = ({ html, className }: proseProps) => (
  <div
    className={classNames(className, 'prose max-w-none')}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

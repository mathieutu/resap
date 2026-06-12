import type { ClassNameProp } from '../types/react'
import classNames from 'classnames'

type proseProps = { html: string } & ClassNameProp

export const Prose = ({ html, className }: proseProps) => (
  <div
    className={classNames(className, 'prose max-w-none')}
    // eslint-disable-next-line react/dom-no-dangerously-set-innerhtml
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

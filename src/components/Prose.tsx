/* eslint-disable react/no-danger */
import { ClassNameProp } from '../types/react'

type proseProps = { html: string } & ClassNameProp

export const Prose = ({ html, className }: proseProps) => (
  <div
    className={`prose max-w-none ${className}`}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

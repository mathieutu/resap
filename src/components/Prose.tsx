/* eslint-disable react/no-danger */
import { ClassNameProp } from '../types/react'
import classNames from "classnames";

type proseProps = { html: string } & ClassNameProp

export const Prose = ({ html, className }: proseProps) => (
  <div
    className={classNames(className, "prose max-w-none" )}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

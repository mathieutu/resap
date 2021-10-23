/* eslint-disable react/no-danger */
// TODO à reprendre ? (virer html et utiliser du jsx)
import { ClassNameProp } from '../types/react'
import classNames from "classnames";

export type headlineProps = { title: string, text: string, tag?: string } & ClassNameProp

export const Headline = ({ title, text, tag, className }: headlineProps) => (
  <div className={classNames(className, "lg:text-center")}>
    <span className="text-sm text-grey-default font-semibold mb-12 block tracking-wide uppercase">{tag}</span>
    <div
      dangerouslySetInnerHTML={{ __html: title }}
      className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-blue-default sm:text-4xl"
    />
    <p dangerouslySetInnerHTML={{ __html: text }} className="mt-4 max-w-2xl text-xl text-blue-default lg:mx-auto" />
  </div>
)

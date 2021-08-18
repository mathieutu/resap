/* eslint-disable react/no-danger */
import {ClassNameProp} from '../types/react'

export type headlineProps = { title: string, text: string, tag?: string } & ClassNameProp

export const Headline = ({title, text, tag, className}: headlineProps) => (
    <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">{tag}</h2>
        <p dangerouslySetInnerHTML={{__html: title}}
           className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        </p>
        <p dangerouslySetInnerHTML={{__html: text}} className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        </p>
    </div>
)

/* eslint-disable react/no-danger */
import {ClassNameProp} from '../../types/react'
import {Prose} from "../Prose";
import {PropsWithChildren} from "react";

export type simpleHeaderProps = { title: string, tag?: string, color?: string } & ClassNameProp & PropsWithChildren<any>

export const SimpleHeader = ({title, tag, color = "text-gray-900", className, ...props}: simpleHeaderProps) => (
    <div className={"bg-white " + className}>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
                {tag && <h2 className="text-base font-semibold text-gray-800 tracking-wide uppercase">{tag}</h2>}
                <Prose html={title} className={color + "mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl"}/>
                {props.children}
            </div>
        </div>
    </div>
)

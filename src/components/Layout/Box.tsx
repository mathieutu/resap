import { Fragment } from 'react';
import classNames from 'classnames'
import {ChildrenProp, ClassNameProp} from '../../types/react'
import {Url} from "../../types/models";
import {Link} from "../Link";

type Props = { title: string} & ClassNameProp & ChildrenProp

export const Box = ({title, className, children}: Props) => (
  <div className={classNames('shadow-lg bg-grey-light px-7 pt-10 pb-10 rounded-2xl', className)}>
    <div className="text-center text-lg text-blue-default font-bold pb-10" dangerouslySetInnerHTML={{__html: title}}/>
    <hr className={'pb-5'}/>
    {children}
  </div>
)

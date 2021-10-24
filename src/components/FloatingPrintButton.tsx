import {Print} from "./Icons/Print";
import {Layout} from "./Layout/Layout";
import classNames from "classnames";
import {ClassNameProp} from "../types/react";

export const FloatingPrintButton = ({className} : ClassNameProp) => (
  <div className={classNames(className, "print:hidden w-[50px] h-[50px] rounded-full bg-green-default flex items-center justify-center cursor-pointer")} onClick={() => window.print() }>
    <Print className={"text-white"}/>
  </div>
)

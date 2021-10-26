import classNames from 'classnames'
import { Print } from './Icons/Print'
import { ClassNameProp } from '../types/react'

export const FloatingPrintButton = ({ className } : ClassNameProp) => (
  <button
    type="button"
    className={classNames(className, 'print:hidden w-[50px] h-[50px] rounded-full bg-green-default flex items-center justify-center cursor-pointer')}
    onClick={() => window.print()}
  >
    <Print className="text-white" />
  </button>
)

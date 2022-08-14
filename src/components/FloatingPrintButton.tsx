import classNames from 'classnames'
import { Print } from './Icons/Print'
import { ClassNameProp } from '../types/react'

export const FloatingPrintButton = ({ className } : ClassNameProp) => (
  <button
    type="button"
    className={classNames('print:hidden w-12 h-12 rounded-full bg-green-default hover:bg-blue-default flex items-center justify-center cursor-pointer', className)}
    onClick={() => window.print()}
  >
    <Print className="text-white w-3/4" />
  </button>
)

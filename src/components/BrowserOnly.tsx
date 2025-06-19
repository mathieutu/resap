import type { JSX } from 'react'

const canUseDOM = (
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
)

export const BrowserOnly = ({ children }: { children: () => JSX.Element }): JSX.Element | null => (
  <div suppressHydrationWarning>{canUseDOM && children ? children() : null}</div>
)

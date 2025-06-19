'use client'

import { Fragment, ReactElement } from 'react'
import { useHits } from 'react-instantsearch-core'
import { BaseHit } from 'instantsearch.js'
import { ClassNameProp } from '@/types/react'

type Props<Hit extends BaseHit> =
  ClassNameProp
  & ({ renderHit: (hit: Hit) => ReactElement<any> } | { render: (hits: Hit[]) => ReactElement<any> })

export const SearchResults = <Hit extends BaseHit>({
  className,
  ...renderProps
}: Props<Hit>) => {
  const { items } = useHits<Hit>()

  if ('render' in renderProps) {
    return renderProps.render(items)
  }

  return (
    <ul className={className}>
      {items.map(hit => (
        <Fragment key={hit.objectID}>
          {renderProps.renderHit(hit)}
        </Fragment>
      ))}
    </ul>
  )
}

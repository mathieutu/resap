import { Fragment, ReactElement } from 'react'
import { useHits } from 'react-instantsearch-hooks'
import { BaseHit } from 'instantsearch.js'
import { ClassNameProp } from '../../types/react'

type Props<Hit extends BaseHit> = ClassNameProp & { renderHit: (hit: Hit) => ReactElement }

export const SearchResults = <Hit extends BaseHit>({ className, renderHit }: Props<Hit>) => {
  const { hits } = useHits<Hit>()

  return (
    <ul className={className}>
      {hits.map(hit => (
        <Fragment key={hit.objectID}>
          {renderHit(hit)}
        </Fragment>
      ))}
    </ul>
  )
}

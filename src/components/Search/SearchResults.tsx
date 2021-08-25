import { connectHits } from 'react-instantsearch-dom'
import type { HitsProvided } from 'react-instantsearch-core'
import { Fragment, ReactElement } from 'react'
import { ClassNameProp } from '../../types/react'

type Props<Hit> = HitsProvided<Hit> & ClassNameProp & {renderHit: (hit: Hit) => ReactElement}

export const SearchResults = connectHits(({ hits, className, renderHit }: Props<any>) => (
  <ul className={className}>
    {hits.map(hit => (
      <Fragment key={hit.objectID}>
        {renderHit(hit)}
      </Fragment>
    ))}
  </ul>
))

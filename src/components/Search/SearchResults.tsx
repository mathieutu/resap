import { Fragment, ReactElement } from 'react'
import { useHits } from 'react-instantsearch-hooks'
import { BaseHit } from 'instantsearch.js'
import { ClassNameProp } from '../../types/react'

type Props<Hit extends BaseHit> =
  ClassNameProp
  & ({ renderHit: (hit: Hit) => ReactElement } | { render: (hits: Hit[]) => ReactElement })

export const SearchResults = <Hit extends BaseHit>({
  className,
  ...renderProps
}: Props<Hit>) => {
  const { hits } = useHits<Hit>()

  if ('render' in renderProps) {
    return renderProps.render(hits)
  }

  return (
    <ul className={className}>
      {hits.map(hit => (
        <Fragment key={hit.objectID}>
          {renderProps.renderHit(hit)}
        </Fragment>
      ))}
    </ul>
  )
}

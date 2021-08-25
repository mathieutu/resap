import { InstantSearch, InstantSearchProps } from 'react-instantsearch-dom'
import { useRouter } from 'next/router'
import type { SearchState } from 'react-instantsearch-core'
import { ChildrenProp } from '../../types/react'
import { searchProps } from '../../services/algolia.browser'

type Props = ChildrenProp & Partial<InstantSearchProps>

export const SearchContext = ({ children, ...props }: Props) => {
  const router = useRouter() ?? {}

  const onSearchStateChange = ({ query }: SearchState) => {
    const { query: oldSearchQuery, ...nextRouterQuery } = router.query

    if (!query) return router.replace({ query: nextRouterQuery }, undefined, { scroll: false })

    return (
      router.replace({ query: { ...nextRouterQuery, query } }, undefined, { scroll: false, shallow: true })
    )
  }

  return (
    <InstantSearch {...searchProps} {...props} searchState={router.query} onSearchStateChange={onSearchStateChange}>
      {children}
    </InstantSearch>
  )
}

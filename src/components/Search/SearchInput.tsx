import { connectSearchBox } from 'react-instantsearch-dom'
import { InputHTMLAttributes, useEffect, useState } from 'react'
import type { SearchBoxProvided } from 'react-instantsearch-core'
import { useDebounce } from '../../utils/hooks'

type Props = InputHTMLAttributes<any> & SearchBoxProvided & { label: string }
export const SearchInput = connectSearchBox(({ label, refine, id = 'search', className, placeholder, currentRefinement }: Props) => {
  const [value, setValue] = useState(currentRefinement)
  const debouncedValue = useDebounce(value, 200)

  useEffect(() => {
    refine(debouncedValue)
  }, [debouncedValue])

  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type="search"
        id={id}
        placeholder={placeholder ?? label}
        className={className}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    </>
  )
})

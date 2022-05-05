import { InputHTMLAttributes, useEffect, useState } from 'react'
import { useSearchBox } from 'react-instantsearch-hooks'
import { useDebounce } from '../../utils/hooks'

type Props = InputHTMLAttributes<any> & { label: string }
export const SearchInput = ({
  label,
  id = 'search',
  className,
  placeholder,
}: Props) => {
  const {
    query,
    refine,
  } = useSearchBox()
  const [value, setValue] = useState(query)
  const debouncedValue = useDebounce(value, 200)

  useEffect(() => {
    refine(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    setValue(query)
  }, [query])

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
}

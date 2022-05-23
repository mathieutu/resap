import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'

export const useDebounce = <T>(value: T, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeOut = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timeOut)
  }, [value])

  return debouncedValue
}

export const useSearchFichesForm = () => {
  const router = useRouter()
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    return router.push(`/fiches?query=${value}`)
  }

  return {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    handleSubmit,
  }
}

export const usePrevious = <T>(value: T): T => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeOut = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timeOut)
  }, [value, delay])

  return debouncedValue
}

export const useSearchFichesForm = () => {
  const router = useRouter()
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.replace(`/fiches?query=${value}`).then(() => {
      if (router.pathname === '/fiches') {
        router.reload()
      }
    })
  }

  return {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    handleSubmit,
  }
}

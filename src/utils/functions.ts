export const debounce = <T extends Array<any>>(fn: (...args: T) => any, delay = 300) => {
  let timeoutId: NodeJS.Timeout

  return (...args: T) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
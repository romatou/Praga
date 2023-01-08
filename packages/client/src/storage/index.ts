const getItem = (key: string, isAuth?: boolean): string | null => {
  const item = localStorage.getItem(key)

  return item ? JSON.parse(item) : null
}

const setItem = <T = string>(key: string, value: T, isAuth?: boolean): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export { getItem, setItem }

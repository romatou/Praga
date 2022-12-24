const getItem = (key: string, isAuth: boolean): string | null => {
  // const item = isAuth ? sequelize.get({value}) : localStorage.getItem(key)
  const item = localStorage.getItem(key)

  return item ? JSON.parse(item) : null
}

const setItem = <T = string>(key: string, value: T, isAuth: boolean): void => {
  localStorage.setItem(key, JSON.stringify(value))
  // if (isAuth) {
  // sequelize.update({value})
  // } else {
  //   localStorage.setItem(key, JSON.stringify(value))
  // }
}

export { getItem, setItem }

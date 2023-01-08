import { getItem, setItem } from '../index'

export type SelectedTheme = 'dark' | 'light'

const key = 'theme'

const getThemeFromStorage = (isAuth?: boolean): SelectedTheme =>
  (getItem(key, isAuth) as SelectedTheme) ?? 'dark'

const setThemeToStorage = (theme: SelectedTheme, isAuth?: boolean): void =>
  setItem(key, theme, isAuth)

export { getThemeFromStorage, setThemeToStorage }

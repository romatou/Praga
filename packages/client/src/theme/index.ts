import { createTheme } from '@mui/material/styles'
import { useAppSelector } from '../store'
import { selectUserData } from '../store/slices/UserSlice'

const { selectedTheme } = useAppSelector(selectUserData)

const theme = createTheme({
  palette: {
    mode: selectedTheme,
    ...(selectedTheme === 'light'
      ? {
          primary: '#000000',
        }
      : {}),
  },
})

export default theme

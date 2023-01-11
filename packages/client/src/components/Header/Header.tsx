import { Container, Switch, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { changeUserTheme } from '../../store/actions/UserActionCreators'
import { selectUserData } from '../../store/slices/UserSlice'
import style from './style'

export default function Header() {
  const dispatch = useAppDispatch()
  const { selectedTheme, userData } = useAppSelector(selectUserData)

  const [checked, setChecked] = useState(false)

  const handleThemeChange = () => {
    if (userData.id) {
      dispatch(
        changeUserTheme({
          userId: userData.id,
          themeId: selectedTheme === 'dark' ? 2 : 1,
        })
      )
    }
    
    setChecked(prevChecked => !prevChecked)
  }

  useEffect(() => {
    setChecked(selectedTheme === 'dark')
  }, [selectedTheme])

  return (
    <Container component="header" sx={{ ...style.container }}>
      <Typography component="h1" variant="h3" sx={{ ...style.heading }}>
        <Link
          style={{
            color: 'inherit',
            textDecoration: 'inherit',
            textTransform: 'uppercase',
          }}
          to="/">
          Морской бой
        </Link>
      </Typography>
      {userData.id ? <Switch onChange={handleThemeChange} checked={checked} /> : null}
    </Container>
  )
}

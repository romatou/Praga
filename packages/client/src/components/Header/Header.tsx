import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './style'
import { Container, Switch, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleTheme, selectUserData } from '../../store/slices/UserSlice'

export default function Header() {
  const dispatch = useAppDispatch()
  const { selectedTheme } = useAppSelector(selectUserData)

  const [checked, setChecked] = useState(false)

  const handleThemeChange = () => {
    dispatch(toggleTheme(selectedTheme))
    setChecked(!checked)
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
      <Switch onChange={handleThemeChange} checked={checked} />
    </Container>
  )
}

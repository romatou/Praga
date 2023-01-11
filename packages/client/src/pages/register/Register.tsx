import React from 'react'
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { UserData } from '../../store/types'
import { useRegister } from '../../hooks/useRegister'

export default function Register() {
  const register = useRegister()

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const registerUser = {
      first_name: data.get('firstName'),
      second_name: data.get('secondName'),
      login: data.get('login'),
      email: data.get('email'),
      password: data.get('password'),
      phone: data.get('phone'),
    } as UserData
    register(registerUser)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          noValidate
          sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Имя"
            name="firstName"
            autoComplete="firstName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="secondName"
            label="Фамилия"
            name="secondName"
            autoComplete="secondName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Телефон"
            name="phone"
            autoComplete="phone"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="Логин"
            name="login"
            autoComplete="login"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            {' '}
            Создать аккаунт
          </Button>

          <Stack spacing={2} sx={{ textAlign: 'center' }}>
            <Typography>Уже есть аккаунт?</Typography>
            <Link
              to="/auth"
              style={{
                textDecoration: 'none',
                color: 'red',
              }}>
              Войти
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

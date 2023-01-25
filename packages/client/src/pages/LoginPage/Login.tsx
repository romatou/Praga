import { YandexIcon } from '@components/YandexIcon/YandexIcon'
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { fetchUser } from '@store/actions/UserActionCreators'
import { useAppDispatch } from '@store/index'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import { useServiceId } from '../../hooks/useServiceId'
import { useUser } from '../../hooks/useUser'
import { LoginData } from '../../store/types'

export default function Login() {
  const user = useUser()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const login = useLogin()
  const location = useServiceId()

  const selectedTheme = user.selectedTheme

  const YandexIdButton = styled(Button)({
    margin: '12px 0',
    color: selectedTheme === 'light' ? ' white' : ' black',
    width: '100%',
    backgroundColor: selectedTheme === 'light' ? ' black' : ' white',
    textTransform: 'none',
  })

  useEffect(() => {
    if (user.userData.id) {
      navigate('/game/start')
    }
    dispatch(fetchUser())
  }, [user.userData.id])

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const authData = {
      login: data.get('login'),
      password: data.get('password'),
    } as LoginData
    login(authData)
  }

  return (
    <Box color="primary">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoComplete="login"
              autoFocus
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
              Войти
            </Button>
            <Typography sx={{ textAlign: 'center' }}>или</Typography>
            <YandexIdButton
              onClick={() => location()}
              startIcon={<YandexIcon />}>
              Войти c Яндекс ID
            </YandexIdButton>
            <Stack spacing={1} sx={{ textAlign: 'center' }}>
              <Typography>Еще не зарегистрированы?</Typography>
              <Typography
                to="/register"
                style={{
                  textDecoration: 'none',
                  color: 'red',
                }}
                component={Link}>
                Создать аккаунт
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

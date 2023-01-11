import React, { useEffect } from 'react'
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { LoginData } from '../../store/types'
import { useLogin } from '../../hooks/useLogin'
import { useUser } from '../../hooks/useUser'
import { fetchUser } from '@store/actions/AuthActionCreators'
import { useAppDispatch } from '@store/index'
import { YandexIcon } from '@components/YandexIcon/YandexIcon'
import { useServiceId } from '../../hooks/useServiceId'

export default function Login() {
  const user = useUser()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const login = useLogin()
  const location = useServiceId()

  const YandexIdButton = styled(Button)({
    margin: '12px 0',
    color: ' white',
    width: '100%',
    height: '44px',
    backgroundColor: 'black',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'black',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
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
            <Typography
              sx={{ textAlign: 'center' }}>
              или
            </Typography>
            <YandexIdButton
              onClick={() => location()}
              startIcon={<YandexIcon/>}>
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

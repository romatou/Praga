import { Container, Box, TextField, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiService, SigninData } from "../../services/ApiService";

export default function Login() {

  const theme = createTheme({
    typography: {
      fontFamily: 'Roboto, sans-serif',
    }
  })

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    apiService.getAuth({
      login: data.get('login'),
      password: data.get('password'),
    } as SigninData);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">Вход</Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
              sx={{ mt: 3, mb: 2 }}
            > Войти
            </Button>
            <Stack spacing={2} sx={{ textAlign: 'center' }}>
              <Typography>Еще не зарегистрированы?</Typography>
              <Link to='/register' style={{ textDecoration: 'none', fontFamily: 'Roboto, sans-serif' }}>
                Создать аккаунт
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
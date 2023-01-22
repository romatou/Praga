import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Forum from './pages/forum/Forum'
import ForumDetail from './pages/forum/ForumDetail'
import GamePlay from './pages/game/GamePlay'
import GameResult from './pages/game/GameResult'
import GameStart from './pages/game/GameStart'
import Intro from './pages/intro/Intro'
import Login from './pages/LoginPage/Login'
import NotFound from './pages/not-found/NotFound'
import Profile from './pages/profile/Profile'
import Ranking from './pages/ranking'
import Register from './pages/register/Register'
import ServerError from './pages/server-error/ServerError'
import { useAppDispatch, useAppSelector } from './store'
import { fetchUser } from './store/actions/UserActionCreators'
import { selectUserData } from './store/slices/UserSlice'

function App() {
  const dispatch = useAppDispatch()
  const { selectedTheme } = useAppSelector(selectUserData)

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  const theme = createTheme({
    palette: {
      mode: selectedTheme,
      ...(selectedTheme === 'light'
        ? {
          // palette values for light mode
          primary: { main: '#000000' },
          secondary: { main: '#ffffff' },
        }
        : {
          // palette values for dark mode
          primary: { main: '#ffffff' },
          secondary: { main: '#000000' },
        }),
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path={'/'} element={<Intro />} />
        <Route path={'/auth'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/game/start'} element={<GameStart />} />
        <Route path={'/game/play'} element={<GamePlay />} />
        <Route path={'/game/result'} element={<GameResult />} />
        <Route path={'/forum'} element={<Forum />} />
        <Route path={'/forum/:id'} element={<ForumDetail />} />
        <Route path={'/ranking'} element={<Ranking />} />
        <Route path={'/500'} element={<ServerError />} />
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App

import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header'
import { createTheme } from '@mui/material/styles'
import Login from './pages/LoginPage/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import GameStart from './pages/game/GameStart'
import GamePlay from './pages/game/GamePlay'
import GameResult from './pages/game/GameResult'
import Intro from './pages/intro/Intro'
import Forum from './pages/forum/Forum'
import ForumDetail from './pages/forum/ForumDetail'
import Ranking from './pages/ranking'
import NotFound from './pages/not-found/NotFound'
import ServerError from './pages/server-error/ServerError'
import { useAppDispatch, useAppSelector } from './store'
import {  selectUserData } from './store/slices/UserSlice'
import { fetchUser } from './store/actions/UserActionCreators'

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
            neutral: { main: '#ffffff' },
          }
        : {
            // palette values for dark mode
            primary: { main: '#ffffff' },
            secondary: { main: '#000000' },
            neutral: { main: '#000000' },
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

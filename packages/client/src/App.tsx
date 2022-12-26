import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Button } from '@mui/material'

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
import { toggleTheme, selectUserData, getTheme } from '@store/slices/UserSlice'
import { fetchUser } from '@store/actions/UserActionCreators'
import { amber, deepOrange, grey } from '@mui/material/colors'

function App() {
  const dispatch = useAppDispatch()
  const { selectedTheme, userData } = useAppSelector(selectUserData)

  useEffect(() => {
    dispatch(fetchUser())
  
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
    
  }, [])

  useEffect(() => {
    dispatch(getTheme())
  }, [userData])

  const theme = createTheme({
    palette: {
      mode: selectedTheme,
      ...(selectedTheme === 'light'
        ? {
            // palette values for light mode
            primary: amber,
            divider: amber[200],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: '#f0f0f0',
              secondary: grey[500],
            },
          }),
    },
  })

  const handleThemeChange = () => {
  
 
    dispatch(toggleTheme(selectedTheme))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
      <Button onClick={handleThemeChange}>тема</Button>
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
      </main>
    </ThemeProvider>
  )
}

export default App

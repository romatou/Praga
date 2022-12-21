import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from '@pages/LoginPage/Login'
import Register from '@pages/register/Register'
import Profile from '@pages/profile/Profile'
import GameStart from '@pages/game/GameStart'
import GamePlay from '@pages/game/GamePlay'
import GameResult from '@pages/game/GameResult'
import Intro from '@pages/intro/Intro'
import Forum from '@pages/forum/Forum'
import ForumDetail from '@pages/forum/ForumDetail'
import Ranking from '@pages/ranking'
import NotFound from '@pages/not-found/NotFound'
import ServerError from '@pages/server-error/ServerError'
import { fetchUser } from '@store/actions/AuthActionCreators'
import { useAppDispatch } from './store'

function App() {
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     console.log(data)
  //   }

  //   fetchServerData()
  // }, [])
  return (
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
  )
}

export default App

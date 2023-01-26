import React, { useEffect, useState } from 'react'
import { Button, Box, Typography } from '@mui/material'
import { buttonStyles, imageStyles } from './styles'
import starBadge from '../../../assets/star-badge.png'
import winSound from '../../../assets/media/win.mp3'

export default function GameResult() {
  const [winSoundEffect, setWinSoundEffect] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    setWinSoundEffect(new Audio(winSound))
  }, [])

  useEffect(() => {
    if (winSoundEffect) {
      winSoundEffect.play()
    }

    return () => {
      if (winSoundEffect && winSoundEffect.currentTime !== 0) {
        winSoundEffect.pause();
        winSoundEffect.currentTime = 0
      }
    }
  }, [winSoundEffect])
  
  return (
    <>
      <Box sx={{ position: 'relative', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          sx={imageStyles}
          alt="победная звезда"
          src={starBadge}
        />
      </Box>
      <Typography
        component="h1"
        sx={{ fontSize: '32px', textAlign: 'center', marginBottom: '4rem' }}>
        Поздравляем с победой
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          variant="contained"
          href="/game/play"
          color="primary"
          sx={{ ...buttonStyles, marginRight: '1rem' }}>
          Играть снова
        </Button>
        <Button
          variant="contained"
          href="/profile"
          color="primary"
          sx={{ ...buttonStyles, marginRight: '1rem' }}>
          В профиль
        </Button>
        <Button variant="contained" sx={buttonStyles} href="/ranking" color="primary">
          Рейтинг
        </Button>
      </Box>
    </>
  )
}

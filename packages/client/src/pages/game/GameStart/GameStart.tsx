import { Box, Button, Container, Typography } from '@mui/material'

import MenuList from './MenuList'
import playWithUser from '../../../assets/play-with-user.svg'
import playWithComp from '../../../assets/play-with-comp.svg'
import {
  containerStyles,
  contentStyles,
  imgStyles,
  imagesStyles,
  startBtnStyles,
} from './styles'
import { useAuth } from '../../../hooks/useAuth'
import { useEffect } from 'react'

export default function GameStart() {
  const isAuth = useAuth()
  useEffect(() => {
    isAuth()
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={containerStyles}>
      <MenuList />
      <Box sx={contentStyles}>
        <Box sx={imagesStyles}>
          <Box
            component="img"
            src={playWithUser}
            alt="играть с другом"
            sx={imgStyles}
          />
          <Typography component="span" sx={{ fontSize: 32 }}>
            VS
          </Typography>
          <Box
            component="img"
            src={playWithComp}
            alt="играть с компьютером"
            sx={{
              ...imgStyles,
              padding: '24px',
            }}
          />
        </Box>
        <Button variant="contained" sx={startBtnStyles} href="/game/play">
          Начать игру
        </Button>
      </Box>
    </Container>
  )
}

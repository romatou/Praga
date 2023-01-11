import React, { useEffect } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import MenuList from './MenuList'
import {
  containerStyles,
  contentStyles,
  imgStyles,
  imagesStyles,
  startBtnStyles,
} from './styles'
import { useAuth } from '../../../hooks/useAuth'

import GroupIcon from '@mui/icons-material/Group'
import ComputerIcon from '@mui/icons-material/Computer'

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
          {/*  <Box
            component="img"
            src={playWithUser}
            alt="играть с другом"
            sx={imgStyles}
          /> */}
          <GroupIcon sx={{ fontSize: 180 }} />
          <Typography component="span" sx={{ fontSize: 32 }}>
            VS
          </Typography>
          <ComputerIcon sx={{ fontSize: 180 }} />
        </Box>
        <Button variant="contained" sx={startBtnStyles} href="/game/play">
          Начать игру
        </Button>
      </Box>
    </Container>
  )
}

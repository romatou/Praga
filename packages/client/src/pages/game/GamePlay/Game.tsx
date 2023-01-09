import React, { useState, useMemo, ReactElement, useEffect } from 'react'
import { buttonStyles, game, gameBoard, wrapButton, wrapShip } from './styles'
import { Container, Button, Box, Typography } from '@mui/material'
import cell1 from '../../../assets/cell1.svg'
import cell2 from '../../../assets/cell2.svg'
import cell3 from '../../../assets/cell3.svg'

import {
  generateShipsLayout,
  shipsSet,
  dimMatr,
  generateCoords,
  checkShipsLength3,
} from './helper'

import Board from './Board'
import { CellArgs } from './types'
import { useAuth } from '../../../hooks/useAuth'

const Game = (): ReactElement => {
  const [playerShips, setPlayerShips] = useState<CellArgs[][]>(
    generateShipsLayout(shipsSet, dimMatr)
  ) //создание корабликов
  const [compShips, setCompShips] = useState<CellArgs[][]>(
    generateShipsLayout(shipsSet, dimMatr)
  ) //создание корабликов
  const [gameIsFinished, setGameIsFinished] = useState<boolean>(false) //окончание игры

  const coords = useMemo(() => generateCoords(dimMatr), [])

  const restartGame = () => {
    //перезапуск
    document.location.reload()
    setPlayerShips(generateShipsLayout(shipsSet, dimMatr))
    setCompShips(generateShipsLayout(shipsSet, dimMatr))
    setGameIsFinished(prevGameIsFinished => !prevGameIsFinished)
  }
  const isAuth = useAuth()

  useEffect(() => {
    isAuth()
  }, [])

  useEffect(() => {
    if (checkShipsLength3(compShips)) {
      setCompShips(generateShipsLayout(shipsSet, dimMatr))
    }
  }, [compShips])

  useEffect(() => {
    if (checkShipsLength3(playerShips)) {
      setPlayerShips(generateShipsLayout(shipsSet, dimMatr))
    }
  }, [playerShips])

  const toggleFullScreen = () => {
    const tableGame = document.getElementById('tableGame')
    if (tableGame !== null) {
      if (tableGame.requestFullscreen) {
        tableGame.requestFullscreen()
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  return (
    <>
      <Container sx={{ ...game }}>
        <Box sx={{ ...gameBoard }}>
          <Box id="tableGame">
            <Board
              name="computer"
              nameBoard="поиск кораблей противника"
              compShips={compShips}
              gameIsFinished={gameIsFinished}
              coords={coords}
            />
            <Board
              name="player"
              nameBoard="расположение моих кораблей"
              playerShips={playerShips}
              gameIsFinished={gameIsFinished}
              coords={coords}
            />
          </Box>
          <Box sx={{ ...wrapButton }}>
            <Button
              onClick={restartGame}
              variant="contained"
              href="/game/play"
              sx={{ ...buttonStyles, marginTop: '3rem' }}>
              Играть снова
            </Button>
            <Button
              variant="contained"
              onClick={toggleFullScreen}
              sx={{ ...buttonStyles, marginTop: '1rem' }}>
              Полноэкранный режим
            </Button>
            <Button
              variant="contained"
              href="/profile"
              sx={{ ...buttonStyles, marginTop: '1rem' }}>
              В профиль
            </Button>
            <Button
              variant="contained"
              sx={{ ...buttonStyles, marginTop: '1rem' }}
              href="/ranking">
              Рейтинг
            </Button>
            <Box sx={{ ...wrapShip }}>
              <Box sx={{ display: 'flex', marginTop: '1rem' }}>
                <Box
                  component="img"
                  src={cell1}
                  alt="лодка"
                  sx={{ maxWidth: '4rem' }}
                />
                <Typography
                  component="p"
                  sx={{
                    textAlign: 'center',
                  }}>
                  одноклеточных по 3 штуки
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box
                  component="img"
                  src={cell2}
                  alt="яхта"
                  sx={{ maxWidth: '4rem' }}
                />
                <Typography
                  component="p"
                  sx={{
                    textAlign: 'center',
                  }}>
                  двухклеточных по 2 штуки
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box
                  component="img"
                  src={cell3}
                  alt="фрегат"
                  sx={{ maxWidth: '4rem' }}
                />
                <Typography
                  component="p"
                  sx={{
                    textAlign: 'center',
                  }}>
                  трехклеточных по 1 штуки
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Game

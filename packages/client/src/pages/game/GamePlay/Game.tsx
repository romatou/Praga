import HouseboatIcon from '@mui/icons-material/Houseboat'
import RowingIcon from '@mui/icons-material/Rowing'
import SailingIcon from '@mui/icons-material/Sailing'
import { Box, Button, Container, Typography } from '@mui/material'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { buttonStyles, game, gameBoard, wrapButton, wrapShip } from './styles'

import {
  checkShipsLength3,
  dimMatr,
  generateCoords,
  generateShipsLayout,
  shipsSet,
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
                <RowingIcon sx={{ width: '4rem', height: '4rem' }} />
                <Typography
                  component="p"
                  sx={{
                    textAlign: 'center',
                  }}>
                  одноклеточных по 3 штуки
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <HouseboatIcon sx={{ width: '4rem', height: '4rem' }} />
                <Typography
                  component="p"
                  sx={{
                    textAlign: 'center',
                  }}>
                  двухклеточных по 2 штуки
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <SailingIcon sx={{ width: '4rem', height: '4rem' }} />
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

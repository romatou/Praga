import { Box, Button, Container, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useOAuth } from '../../hooks/useOAuth'
import { fetchUser } from '../../store/actions/UserActionCreators'
import { useAppDispatch } from '../../store/index'

import styles from './styles'

export default function Intro() {
  
  const getOAuth = useOAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser())
    getOAuth()
  }, [])

  return (
    <Box sx={{ ...styles.page }}>
      <Container sx={{ height: '100vh' }}>
        <Box sx={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
          <Box
            sx={{
              ...styles.containerCentered,
              flexGrow: '2',
              alignItems: 'flex-start',
            }}>
            <Link to="/game/start" style={styles.link}>
              <Button
                sx={{ marginBottom: '1rem' }}
                variant="contained"
                size="large"
                color="secondary">
                Начать игру
              </Button>
            </Link>
            <Typography sx={{ color: 'black' }}>
              Для игры требуется регистрация
            </Typography>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          height: '100vh',
          ...styles.containerCentered,
        }}>
        <Box sx={{ ...styles.window }}>
          <Typography component="h2" sx={{ ...styles.heading }}>
            История игры
          </Typography>
          <Box
            sx={{
              ...styles.containerCentered,
              position: 'relative',
              padding: '2rem',
              top: 0,
              bottom: 0,
              margin: 'auto',
            }}>
            <Typography component="p" sx={{ textAlign: 'justify' }}>
              Считается, что игра Морской бой берет свое начало от французской
              игры L'Attaque, в которую играли во время Первой мировой войны,
              хотя параллели также были проведены с игрой Э.И. офицеров перед
              Первой мировой войной. Первой коммерческой версией игры была
              Salvo, изданная в 1931 году в США компанией Starex. Другие версии
              игры были напечатаны в 1930-х и 1940-х годах, в том числе Combat:
              The Battleship Game от Strathmore Company, Broadsides: A Game of
              Naval Strategy Милтона Брэдли и «Морской бой Мориса Л. Фридмана».
              Компания Strategy Games выпустила версию под названием Wings, в
              которой были изображены самолеты, летящие над Колизеем
              Лос-Анджелеса. Все эти ранние выпуски игры состояли из
              предварительно напечатанных листов бумаги.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: '100vh',
          ...styles.containerCentered,
        }}>
        <Box sx={{ ...styles.window }}>
          <Typography
            component="h2"
            sx={{
              ...styles.heading,
            }}>
            Правила
          </Typography>
          <Box
            sx={{
              ...styles.containerCentered,
              flexFlow: 'column',
              position: 'relative',
              padding: '2rem',
              margin: 'auto',
            }}>
            <Typography component="p" sx={{ textAlign: 'justify' }}>
              В игре принимают участие один игрок и компьютер. Корабли игрока
              располагаются рандомно. При этом корабли не должны соприкасаться,
              то есть расстояние между ними должно быть не менее одной клетки.
            </Typography>
            <Typography>
              Стрельба по мишеням ведется до первого промаха, то есть если игрок
              попал в корабль противника, он производит следующий выстрел, и
              только после его промаха ход переходит к компьютеру. На поле и на
              экране промах обозначается точкой, а попадание — красным крестом в
              квадрате. Каждый выстрел имеет свои координаты. Победитель тот,
              кто первым уничтожит все корабли противника.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Container>
        <Box sx={{ padding: '1rem 0' }} component="footer">
          <Typography sx={{ color: 'grey', fontSize: '14px' }}>
            Проект команды Praga курса Мидл-Фронтенд Разработчик
            Яндекс.Практикум 2022
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

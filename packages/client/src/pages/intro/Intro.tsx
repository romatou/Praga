import background from '@assets/landing-background.jpg'
import { Box, Container, Button, Typography } from '@mui/material'

export default function Intro() {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw',
        }}>
        <Container sx={{ height: '100vh' }}>
          <Box sx={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                padding: '3.5rem 1rem 0',
                letterSpacing: '15px',
                fontWeight: '500',
                wordSpacing: '20px',
                textTransform: 'uppercase',
              }}>
              Морской бой
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexGrow: '2',
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Button
                href="/register"
                sx={{ marginBottom: '1rem' }}
                variant="contained"
                size="large"
                color="primary">
                Начать игру
              </Button>
              <Typography>Для игры требуется регистрация</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            border: '2px solid #000',
            background: '#fff',
            boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)',
            width: '75%',
            height: 'auto',
            borderRadius: '6px',
            position: 'relative',
          }}>
          <Typography
            component="h2"
            sx={{
              background: '#000',
              borderRadius: '0 6px 6px 0',
              padding: '0.5rem 2rem',
              left: '-2px',
              color: '#fff',
              marginBottom: '2rem',
              display: 'inline-block',
              position: 'relative',
              top: '2rem',
            }}>
            История игры
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'lightgreen',
        }}>
        <Box
          sx={{
            border: '2px solid #000',
            background: '#fff',
            boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)',
            width: '75%',
            height: 'auto',
            borderRadius: '6px',
            position: 'relative',
          }}>
          <Typography
            component="h2"
            sx={{
              background: '#000',
              borderRadius: '0 6px 6px 0',
              padding: '0.5rem 2rem',
              left: '-2px',
              color: '#fff',
              marginBottom: '2rem',
              display: 'inline-block',
              position: 'relative',
              top: '2rem',
            }}>
            Правила
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
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
            <Typography
              component="p"
              sx={{
                textAlign: 'left',
                fontWeight: '300',
                fontSize: '14px',
                background: 'lightblue',
                padding: '1rem',
                margin: '1rem 0',
                borderRadius: '6px',
              }}>
              ❗️ Переставлять свои корабли после начала игры категорически
              запрещено.
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
    </>
  )
}

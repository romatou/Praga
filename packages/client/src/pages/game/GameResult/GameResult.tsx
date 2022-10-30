import { Button, Container, Box, Typography } from '@mui/material'
import { buttonStyles, containerStyles, imageStyles } from './styles'
import starBadge from '@assets/star-badge.png'
import ResultsTable from './ResultsTable'

export default function GameResult() {
  return (
    <Container sx={containerStyles}>
      <Box sx={{ position: 'relative', marginBottom: '2rem' }}>
        <Typography
          component="span"
          sx={{
            left: 0,
            alignItems: 'center',
            display: 'flex',
            right: 0,
            height: '100%',
            fontSize: '24px',
            fontWeight: 'bold',
            top: '-23px',
            justifyContent: 'center',
            position: 'absolute',
            margin: 'auto',
          }}>
          5
        </Typography>
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
      <ResultsTable />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          variant="contained"
          href="/game/play"
          sx={{ ...buttonStyles, marginRight: '1rem' }}>
          Играть снова
        </Button>
        <Button
          variant="contained"
          href="/profile"
          sx={{ ...buttonStyles, marginRight: '1rem' }}>
          В профиль
        </Button>
        <Button variant="contained" sx={buttonStyles} href="/ranking">
          Рейтинг
        </Button>
      </Box>
    </Container>
  )
}

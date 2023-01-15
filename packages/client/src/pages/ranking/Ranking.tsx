import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import avatarStub from '@assets/avatar-stub.svg'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { fetchLeaderboard } from '@store/actions/RatingActionCreators'
import { useAppDispatch } from '@store/index'
import { selectRatingData } from '@store/slices/RatingSlice'
import { useAuth } from '../../hooks/useAuth'
import { avatarContainer, container } from './styles'

export default function Ranking() {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const ratingData = selectRatingData()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const isAuth = useAuth()

  useEffect(() => {
    isAuth()
    dispatch(fetchLeaderboard())
  }, [])

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const tableData = useMemo(
    () =>
      [...ratingData]
        .sort((a, b) => b.data.score - a.data.score)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [ratingData, page, rowsPerPage]
  )

  return (
    <Box sx={container}>
      <Button
        variant="text"
        onClick={() => navigate('/game/start')}
        startIcon={<ArrowBackIcon />}
        sx={{ alignSelf: 'flex-start' }}>
        Назад
      </Button>
      <Typography component="h1" sx={{ fontWeight: 700, fontSize: '24px' }}>
        Таблица лидеров
      </Typography>
      {ratingData.length ? (
        <TableContainer
          sx={{ width: 650, margin: '40px auto' }}
          component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Место</TableCell>
                <TableCell align="center">Игрок</TableCell>
                <TableCell align="center">Побед</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map(({ data: { score, id, name } }, index) => (
                <TableRow key={id} sx={{ padding: '8px 0' }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center" sx={avatarContainer}>
                    <Box
                      component="img"
                      src={avatarStub}
                      alt="аватар"
                      sx={{ justifySelf: 'end' }}
                    />
                    <Box sx={{ justifySelf: 'start' }}>{name}</Box>
                  </TableCell>
                  <TableCell align="center">{score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, { label: 'Все', value: -1 }]}
                  colSpan={3}
                  count={ratingData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from} - ${to} из ${count}`
                  }
                  labelRowsPerPage={<span>Игроков на странице</span>}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Box>Пока никого нет, будь первым! :-)</Box>
      )}
    </Box>
  )
}

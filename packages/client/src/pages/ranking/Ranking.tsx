import { useEffect, useState } from 'react'
import {
  Box,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableFooter,
  TablePagination,
  Paper,
  Typography,
} from '@mui/material'
import avatarStub from '@assets/avatar-stub.svg'
import { useAppDispatch } from '@store/index'
import { fetchLeaderboard } from '@store/actions/RatingActionCreators'
import { selectRatingData } from '@store/slices/RatingSlice'

export default function Ranking() {
  const dispatch = useAppDispatch()
  const ratingData = selectRatingData()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
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

  return (
    <Box
      sx={{
        margin: '24px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
      }}>
      <Typography component="h1" sx={{ fontWeight: 700, fontSize: '24px' }}>
        Таблица лидеров
      </Typography>
      <TableContainer
        sx={{ width: 650, margin: '40px auto' }}
        component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Место</TableCell>
              <TableCell align="center">Игрок</TableCell>
              <TableCell align="right">Побед</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratingData
              .sort((a, b) => a.data.score - b.data.score)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ data: { score, id, name } }, index) => (
                <TableRow key={id} sx={{ padding: '8px 0' }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Box component="img" src={avatarStub} alt="аватар" />
                    <Box>{name}</Box>
                  </TableCell>
                  <TableCell align="right">{score}</TableCell>
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
                  from + ' - ' + to + ' из ' + count
                }
                labelRowsPerPage={<span>Игроков на странице</span>}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  )
}

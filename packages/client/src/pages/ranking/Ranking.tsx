import { useState } from 'react'
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

const rows = [
  { place: '1', player: { avatar: avatarStub, name: 'Игрок 1' }, score: '50' },
  { place: '2', player: { avatar: avatarStub, name: 'Игрок 2' }, score: '40' },
  { place: '3', player: { avatar: avatarStub, name: 'Игрок 3' }, score: '30' },
  { place: '4', player: { avatar: avatarStub, name: 'Игрок 4' }, score: '20' },
  { place: '5', player: { avatar: avatarStub, name: 'Игрок 5' }, score: '10' },
  { place: '6', player: { avatar: avatarStub, name: 'Игрок 5' }, score: '10' },
  { place: '7', player: { avatar: avatarStub, name: 'Игрок 5' }, score: '10' },
  { place: '8', player: { avatar: avatarStub, name: 'Игрок 5' }, score: '10' },
  { place: '9', player: { avatar: avatarStub, name: 'Игрок 5' }, score: '10' },
  { place: '10', player: { avatar: avatarStub, name: 'Игрок 5' }, score: '10' },
]

export default function Ranking() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ place, player: { avatar, name }, score }) => (
                <TableRow key={place} sx={{ padding: '8px 0' }}>
                  <TableCell>{place}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Box component="img" src={avatar} alt="аватар" />
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
                count={rows.length}
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

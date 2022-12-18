import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { tableStyles } from './styles'

function createData(category: string, score: string | number) {
  return { category, score }
}

const rows = [
  createData('Время игры', '7:35'),
  createData('Ваш рейтинг', 5),
  createData('Количество побед', 14),
  createData('Количество поражений', 5),
  createData('Игр сыграно', 19),
]

export default function ResultsTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{ marginBottom: '2rem', width: 'auto' }}>
      <Table sx={tableStyles} aria-label="simple table">
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.category}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

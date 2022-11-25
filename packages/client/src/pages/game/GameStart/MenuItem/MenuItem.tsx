import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import { itemStyles, linkStyles } from './styles'

interface MenuItemProps {
  title: string
  src: string
  alt: string
  to: string
}

export default function MenuItem({ title, src, alt, to }: MenuItemProps) {
  if (!to) return null

  return (
    <Box component="li" sx={itemStyles}>
      <Link to={to} style={linkStyles}>
        <Box component="img" {...{ src, alt }} />
        <Typography component="span">{title}</Typography>
      </Link>
    </Box>
  )
}

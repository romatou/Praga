import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import { itemStyles, linkStyles } from './styles'

interface MenuItemProps {
  title: string
  Icon: React.ReactNode
  to: string
}

export default function MenuItem({ title, Icon, to }: MenuItemProps) {
  if (!to) return null

  return (
    <Box component="li" bgcolor="primary.main" sx={itemStyles}>
      <Link to={to} style={linkStyles}>
        {Icon}
        <Typography color="secondary" component="span">
          {title}
        </Typography>
      </Link>
    </Box>
  )
}

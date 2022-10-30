import { CSSProperties } from 'react'

export const itemStyles = {
  width: '216px',
  borderRadius: '0px 6px 6px 0px',
  backgroundColor: 'white',
  boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.25)',
  transition: 'all .2s ease',
  '&:hover': {
    width: '248px',
  },
}

export const linkStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '16px',
  padding: '24px 32px',
  color: 'inherit',
  textDecoration: 'none',
}

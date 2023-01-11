import React from 'react'
import { Box } from '@mui/material'
<<<<<<< HEAD
import userIcon from '../../../../assets/user-icon.svg'
import chatIcon from '../../../../assets/chat-icon.svg'
import ratingIcon from '../../../../assets/rating-icon.svg'
import questionIcon from '../../../../assets/question-icon.svg'
// import exitIcon from '../../../../assets/exit-icon.svg'
=======
>>>>>>> main
import MenuItem from '../MenuItem'
import PersonIcon from '@mui/icons-material/Person'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import ForumIcon from '@mui/icons-material/Forum'
import LogoutIcon from '@mui/icons-material/Logout'

const links = [
<<<<<<< HEAD
  { title: 'Профиль игрока', src: userIcon, alt: 'профиль', to: '/profile' },
  { title: 'Форум', src: chatIcon, alt: 'сообщения', to: '/forum' },
  { title: 'Рейтинги', src: ratingIcon, alt: 'рейтинги', to: '/ranking' },
  { title: 'Помощь', src: questionIcon, alt: 'помощь', to: '/forum' },
=======
  {
    title: 'Профиль игрока',
    Icon: <PersonIcon sx={{ fontSize: 40 }} color="secondary" />,
    alt: 'профиль',
    to: '/profile',
  },
  {
    title: 'Форум',
    Icon: <ForumIcon sx={{ fontSize: 40 }} color="secondary" />,
    alt: 'форум',
    to: '/forum',
  },
  {
    title: 'Рейтинги',
    Icon: <StarOutlineIcon sx={{ fontSize: 40 }} color="secondary" />,
    alt: 'рейтинги',
    to: '/ranking',
  },
  {
    title: 'Выход',
    Icon: <LogoutIcon sx={{ fontSize: 40 }} color="secondary" />,
    alt: 'выход',
    to: '/',
  },
>>>>>>> main
]

export default function MenuList() {
  return (
    <Box
      component="ul"
      sx={{
        position: 'absolute',
        top: 64,
        left: 0,
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        cursor: 'pointer',
      }}>
      {links.map(props => (
        <MenuItem key={props.title} {...props} />
      ))}
    </Box>
  )
}

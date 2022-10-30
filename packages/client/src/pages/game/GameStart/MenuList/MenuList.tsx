import { Box } from '@mui/material'

import userIcon from '../../../../assets/user-icon.svg'
import chatIcon from '../../../../assets/chat-icon.svg'
import ratingIcon from '../../../../assets/rating-icon.svg'
import questionIcon from '../../../../assets/question-icon.svg'
import exitIcon from '../../../../assets/exit-icon.svg'
import MenuItem from '../MenuItem'

const links = [
  { title: 'Профиль игрока', src: userIcon, alt: 'профиль', to: '/profile' },
  { title: 'Сообщения', src: chatIcon, alt: 'сообщения', to: '/forum' },
  { title: 'Рейтинги', src: ratingIcon, alt: 'рейтинги', to: '/ranking' },
  { title: 'Помощь', src: questionIcon, alt: 'помощь', to: '/forum' },
  { title: 'Выход', src: exitIcon, alt: 'выход', to: '/' },
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

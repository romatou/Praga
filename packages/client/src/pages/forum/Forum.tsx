import * as RB from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

const forumData = [
  { name: 'Возможности игры', count: 10, id: 5 },
  { name: 'Баги', count: 4, id: 1 },
  { name: 'Идеи', count: 8, id: 2 },
  { name: 'Новости', count: 20, id: 3 },
  { name: 'Жалобы', count: 10, id: 4 },
]
const Item = styled(RB.Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '478px',
}))
const Forum = () => (
  <RB.Container
    maxWidth={false}
    sx={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
      background: '#D5D5D5',
    }}>
    <RB.Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <RB.Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        marginTop={4}>
        <RB.Grid item xs={12} sx={{ width: '478px' }} spacing={12}>
          <RB.Grid container>
            <RB.Grid item>Тема</RB.Grid>
            <RB.Grid item sx={{ marginLeft: 'auto' }}>
              Количество комментариев
            </RB.Grid>
          </RB.Grid>
        </RB.Grid>
        {forumData.map((it, i) => {
          return (
            <RB.Grid item xs={12} key={i}>
              <Item>
                <Link
                  to={'/forum/' + it.id}
                  style={{ color: 'inherit', textDecoration: 'none' }}>
                  <RB.Grid container>
                    <RB.Grid item>{it.name}</RB.Grid>
                    <RB.Grid item sx={{ marginLeft: 'auto' }}>
                      {it.count}
                    </RB.Grid>
                  </RB.Grid>
                </Link>
              </Item>
            </RB.Grid>
          )
        })}
      </RB.Grid>
    </RB.Container>
  </RB.Container>
)

export default Forum

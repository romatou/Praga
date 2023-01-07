<<<<<<< HEAD
import React, { useEffect, useCallback } from 'react'
=======
import React from 'react'
>>>>>>> origin/feature/TEA-40-OAuth
import * as RB from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import ModalThemeNew from '../../components/ModalThemeNew'
import { useAppDispatch, useAppSelector } from '../../store/index'
import {
  getTopics,
  createTopic
} from '../../store/actions/ForumActionCreators'
import { selectForumData } from '../../store/slices/ForumSlice'
import {
  forumThemeType
} from './types'

const Item = styled(RB.Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '478px',
}))
const Forum = () => {
  const dispatch = useAppDispatch()
  const { topics, comments, error, status } = useAppSelector(selectForumData)

  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    dispatch(getTopics())
  }, [])
  const onSubmitSaveTheme = useCallback((value: forumThemeType) => {
    dispatch(createTopic(value)).then(function() {
      return dispatch(getTopics());
    })
  }, [])

  return (
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
          spacing={2}
          marginTop={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
          >
          <RB.Grid item xs={12} sx={{ width: '478px' }} spacing={12}>
            <RB.Grid 
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
            >
              <RB.Grid item>Тема</RB.Grid>
              <RB.Grid item sx={{ marginLeft: 'auto' }}>
                <RB.Button
                  variant="text"
                  size="small"
                  sx={{
                    marginTop: 1,
                  }}
                  onClick={() => setOpen(true)}>
                  Создать тему
                </RB.Button>
              </RB.Grid>
            </RB.Grid>  
          </RB.Grid>
          {status !== 'FETCH_FULFILLED' ? (
              <RB.CircularProgress />
            ) : (
              <>
                {topics?.map(({ title, description, id }) => (
                  <RB.Grid item xs={12} key={id}>
                    <Item>
                      <Link
                        to={'/forum/' + id}
                        style={{ color: 'inherit', textDecoration: 'none' }}>
                        <RB.Grid container>
                          <RB.Tooltip title={description}>
                            <RB.Grid item>{title}</RB.Grid>
                          </RB.Tooltip>
                        </RB.Grid>
                      </Link>
                    </Item>
                  </RB.Grid>
                ))}
              </>
            )}
        </RB.Grid>
      </RB.Container>
      {<ModalThemeNew
          isopen={open}
          handleClose={handleClose}
          onSubmitTheme={onSubmitSaveTheme}
        />}
    </RB.Container>
  )
}

export default Forum

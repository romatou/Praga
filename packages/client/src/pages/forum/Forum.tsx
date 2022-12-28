import React, { useEffect, useCallback } from 'react'
import * as RB from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import ModalThemeNew from '../../components/ModalThemeNew'
import { useForm, FormProvider } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store/index'
import {
  getTopics,
  createTopic
} from '../../store/actions/ForumActionCreators'

import { selectForumData } from '../../store/slices/ForumSlice'
import {
  forumThemeType
} from './types'

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
const Forum = () => {
  const dispatch = useAppDispatch()
  const { topics, comments, error, status } = useAppSelector(selectForumData)
  
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  dispatch(getTopics())
  dispatch(createTopic({title: '111', description: '222'}))
  

  const methods = useForm<forumThemeType>({
    defaultValues: {
      title: '',
      description: ''
    },
    mode: 'onBlur',
  })
  const { register, handleSubmit } = methods

  useEffect(() => {
    methods.reset({
      title: '',
      description: ''
    })
  }, [])

  /*const onSubmitPassword = useCallback((value: forumThemeType) => {
    dispatch(createTopic(value))
  }, [])*/

  const onSubmitPassword = (value: forumThemeType) => {
    dispatch(createTopic(value))
  }

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
        <RB.Button
          variant="text"
          size="small"
          sx={{
            marginTop: 1,
          }}
          onClick={() => setOpen(true)}>
          Создать тему
        </RB.Button>
        <FormProvider {...methods}>
          <form onSubmit={(event) => console.log(event.target)}>
            <RB.Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}>
              <RB.Grid item xs={12}>
                  <RB.TextField
                    type="text"
                    {...register('title')}
                    label="Название"
                    size="small"
                  />
                </RB.Grid>
                <RB.Grid item xs={12}>
                  <RB.TextField
                    type="text"
                    {...register('description')}
                    label="Описание"
                    size="small"
                  />
                </RB.Grid>
              <RB.Grid item xs={12}>
                <LoadingButton
                  size="small"
                  type="submit"
                  variant="outlined"
                  loadingIndicator="Загрузка…">
                  Сохранить
                </LoadingButton>
              </RB.Grid>
            </RB.Grid>
          </form>
        </FormProvider>
        <RB.Grid
          container
          spacing={2}
          marginTop={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
          >
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
      {<ModalThemeNew
          isopen={open}
          handleClose={handleClose}
          onSubmitTheme={onSubmitPassword}
        />}
    </RB.Container>
  )
}

export default Forum

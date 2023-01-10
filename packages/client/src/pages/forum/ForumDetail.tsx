import React, { useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as RB from '@mui/material'
import CardMessange from '../../components/CardMessange'
import { useForm, FormProvider } from 'react-hook-form'
import { getTopics } from '@store/actions/ForumActionCreators'
import { useAppDispatch, useAppSelector } from '@store/index'
import { selectForumData } from '@store/slices/ForumSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

type QuizParams = {
  id?: string
}

const ForumDetail = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { topics, comments, error, status } = useAppSelector(selectForumData)
  const { id } = useParams<QuizParams>()

  const methods = useForm({
    defaultValues: {
      messange: '',
    },
    mode: 'onBlur',
  })
  const { register, handleSubmit } = methods
  const onSubmitMessange = useCallback((value: { messange: string }) => {
    console.log(value)
  }, [])

  useEffect(() => {
    methods.reset({
      messange: '',
    })
    dispatch(getTopics())
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
        <RB.Button
        variant="text"
        onClick={() => navigate('/forum')}
        startIcon={<ArrowBackIcon />}>
        Назад
      </RB.Button>

      <RB.Container sx={{ display: 'flex', flexDirection: 'column' }}>
        <RB.Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          marginTop={4}>
          <RB.Grid item xs={12} sx={{ width: '478px' }} spacing={12}>
            <RB.Grid
              container
              spacing={2}
              sx={{ height: '60vh', overflow: 'auto' }}>
              {status !== 'FETCH_FULFILLED' ? (
                <RB.CircularProgress />
              ) : (
                <>
                  {topics?.map(topic => {
                    if (topic.id === +id) {
                      return (
                        <RB.Grid container direction="column">
                          <RB.Grid item marginBottom={3}>
                            <RB.Typography variant="h4" component="h1">
                              {' '}
                              {topic.title}
                            </RB.Typography>
                          </RB.Grid>
                          <RB.Grid item marginBottom={2}>
                            <RB.Typography variant="subtitle2">
                              Дата публикации: {topic.createdAt}
                            </RB.Typography>
                          </RB.Grid>
                          <RB.Grid item>
                            <RB.Typography variant="subtitle1">
                              {' '}
                              {topic.description}
                            </RB.Typography>
                          </RB.Grid>
                        </RB.Grid>
                      )
                    }
                  })}
                </>
              )}
            </RB.Grid>
            <RB.Grid item xs={12} sx={{ width: '478px' }} position="fixed">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitMessange)}>
                  <RB.Grid
                    container
                    spacing={2}
                    marginTop={4}
                    sx={{ width: '478px' }}>
                    <RB.Grid item xs={12}>
                      <RB.Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div">
                        Отправить сообщение
                      </RB.Typography>
                    </RB.Grid>
                    <RB.Grid item xs={12}>
                      <RB.Paper
                        component="form"
                        sx={{ p: '2px 4px', alignItems: 'center' }}>
                        <RB.InputBase {...register('messange')} />
                      </RB.Paper>
                    </RB.Grid>
                    <RB.Grid item xs={12}>
                      <RB.Button
                        type="submit"
                        variant="contained"
                        size="small"
                        color="inherit">
                        Отправить
                      </RB.Button>
                    </RB.Grid>
                  </RB.Grid>
                </form>
              </FormProvider>
            </RB.Grid>
          </RB.Grid>
        </RB.Grid>
      </RB.Container>
    </RB.Container>
  )
}

export default ForumDetail

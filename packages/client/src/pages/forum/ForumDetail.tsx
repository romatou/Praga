import React, { useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import * as RB from '@mui/material'
import CardMessange from '../../components/CardMessange'
import { useForm, FormProvider } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store/index'
import {
  getComments,
  createComment
} from '../../store/actions/ForumActionCreators'
import { selectForumData } from '../../store/slices/ForumSlice'
import {
  fetchUser,
} from '../../store/actions/ProfileActionCreators'
import { selectProfileData } from '../../store/slices/ProfileSlice'


type QuizParams = {
  id: string
}

const ForumDetail = () => {
  const { id } = useParams<QuizParams>()
  const dispatch = useAppDispatch()
  const { topics, comments, error, status } = useAppSelector(selectForumData)
  const { userData } = useAppSelector(selectProfileData)
  const methods = useForm({
    defaultValues: {
      comment: '',
    },
    mode: 'onBlur',
  })
  const { register, handleSubmit, reset } = methods
  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  useEffect(() => {
    dispatch(getComments({ id: Number(id) }))
  }, [])
  
  const onSubmitMessange = useCallback((value: { comment: string }) => {
    dispatch(createComment({
      parentId: null,
      topicId: Number(id),
      userId: userData.id,
      userLogin: userData.login,
      comment: value.comment})).then(function() {
        return dispatch(getComments({ id: Number(id) }));
    })
    reset()
  }, [])

  useEffect(() => {
    methods.reset({
      comment: '',
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
                      {comments?.length ? (
                        <>
                          {comments?.map((comment) => {
                            return (
                              <RB.Grid item xs={12} key={comment.id}>
                                <CardMessange
                                  name={comment.userLogin}
                                  text={comment.comment}
                                  data={comment.createdAt}
                                />
                              </RB.Grid>
                            )
                          })}
                        </>
                      ) : (
                        <RB.Grid item xs={12}>
                          <RB.Alert severity="info">
                              Комментарии не найдены
                          </RB.Alert>
                        </RB.Grid>
                      )}
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
                        <RB.InputBase {...register('comment')} />
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

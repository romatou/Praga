import React, { useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import * as RB from '@mui/material'
import CardMessange from '../../components/CardMessange'
import FormMessange from '../../components/FormSendMess'
import { useAppDispatch, useAppSelector } from '../../store/index'
import {
  getComments
} from '../../store/actions/ForumActionCreators'
import { selectForumData } from '../../store/slices/ForumSlice'
import {
  fetchUser,
} from '../../store/actions/ProfileActionCreators'


type QuizParams = {
  id: string
}

const ForumDetail = () => {
  const { id } = useParams<QuizParams>()
  const dispatch = useAppDispatch()
  const { comments, status } = useAppSelector(selectForumData)

  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  useEffect(() => {
    dispatch(getComments({ id: Number(id) }))
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
              sx={{ height: '70vh', overflow: 'auto' }}>
                {status !== 'FETCH_FULFILLED' ? (
                    <RB.CircularProgress />
                  ) : (
                    <>
                      {comments?.length ? (
                        <>
                          {comments?.filter(item => item.parent_id === null).map((comment) => {
                            return (
                              <RB.Grid item xs={12} key={comment.id}>
                                <CardMessange
                                  comment={comment}
                                  childComment={comments?.filter(it=> it.parent_id === comment.id)}
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
              <FormMessange 
                  parentId={null}
                  topicId={Number(id)}
              />
            </RB.Grid>
          </RB.Grid>
        </RB.Grid> 
      </RB.Container>
    </RB.Container>
  )
}

export default ForumDetail

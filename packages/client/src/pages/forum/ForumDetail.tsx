import React, { useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import * as RB from '@mui/material'
import CardMessange from '../../components/CardMessange'
import FormMessange from '../../components/FormSendMess'
import { useAppDispatch, useAppSelector } from '../../store/index'
import {
  getComments,
  getTopics,
  getLikes,
} from '../../store/actions/ForumActionCreators'
import { selectForumData } from '../../store/slices/ForumSlice'
import { selectProfileData } from '../../store/slices/ProfileSlice'
import { fetchUser } from '../../store/actions/ProfileActionCreators'

type QuizParams = {
  id: string
}

const ForumDetail = () => {
  const { id } = useParams<QuizParams>()
  const dispatch = useAppDispatch()
  const { topics, likes, comments, status } = useAppSelector(selectForumData)
  const { userData } = useAppSelector(selectProfileData)

  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  useEffect(() => {
    if (userData.id > 0) {
      dispatch(getComments({ id: Number(id) }))
      dispatch(getTopics())
      dispatch(getLikes({ id: userData.id }))
    }
  }, [userData])

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
          <RB.Typography variant="h5" component="div">
            {topics?.find(item => item.id === Number(id))?.title}
          </RB.Typography>
          <RB.Grid item xs={12} sx={{ width: '478px' }} spacing={12}>
            <RB.Grid
              container
              spacing={2}
              sx={{ height: '65vh', overflow: 'auto' }}>
              {status !== 'FETCH_FULFILLED' ? (
                <RB.CircularProgress />
              ) : (
                <>
                  {comments?.length ? (
                    <>
                      {comments
                        ?.filter(item => item.parent_id === null)
                        .map(comment => {
                          return (
                            <RB.Grid item xs={12} key={comment.id}>
                              <CardMessange
                                like={
                                  likes?.find(
                                    it => it.comment_id === comment.id
                                  )?.isLike
                                }
                                comment={comment}
                                childComment={comments?.filter(
                                  it => it.parent_id === comment.id
                                )}
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
              <FormMessange parentId={null} topicId={Number(id)} />
            </RB.Grid>
          </RB.Grid>
        </RB.Grid>
      </RB.Container>
    </RB.Container>
  )
}

export default ForumDetail

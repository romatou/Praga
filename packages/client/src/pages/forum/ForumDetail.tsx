import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import * as RB from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CardMessange from '../../components/CardMessange'
import FormMessange from '../../components/FormSendMess'
import {
  getComments,
  getLikes,
  getTopics
} from '../../store/actions/ForumActionCreators'
import { fetchUser } from '../../store/actions/UserActionCreators'
import { useAppDispatch, useAppSelector } from '../../store/index'
import { selectForumData } from '../../store/slices/ForumSlice'
import { selectUserData } from '../../store/slices/UserSlice'

type QuizParams = {
  id?: string
}

const ForumDetail = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { topics, likes, comments, status } = useAppSelector(selectForumData)
  const { id } = useParams<QuizParams>()
  const { userData } = useAppSelector(selectUserData)

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
    <RB.Container maxWidth={false}>
      <RB.Grid container>
        <RB.Grid item xs={5}>
          <RB.Button
            variant="text"
            onClick={() => navigate('/forum')}
            startIcon={<ArrowBackIcon />}>
            Назад
          </RB.Button>
        </RB.Grid>
        <RB.Grid item xs={7}>
          <RB.Typography variant="h5" component="div">
            {topics?.find(item => item.id === Number(id))?.title}
          </RB.Typography>
        </RB.Grid>
      </RB.Grid>
      <RB.Container sx={{ display: 'flex', flexDirection: 'column' }}>
        <RB.Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          marginTop={1}>
          <RB.Grid item xs={12} sx={{ width: '478px' }}>
            <RB.Grid
              container
              spacing={2}
              sx={{ height: '55vh', overflow: 'auto' }}>
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

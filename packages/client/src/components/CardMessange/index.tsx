import React from 'react'
import * as RB from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useAppDispatch, useAppSelector } from '../../store/index'
import { selectForumData } from '../../store/slices/ForumSlice'
import { selectUserData } from '../../store/slices/UserSlice'
import FormMessange from '../FormSendMess'
import { Comment } from '../../store/types'
import { createLike } from '../../store/actions/ForumActionCreators'
interface Props {
  like: boolean | undefined
  comment: Comment
  childComment: Comment[]
}

const CardMessange = (props: Props) => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selectForumData)
  const { userData } = useAppSelector(selectUserData)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const addLike = (value: boolean) => {
    dispatch(
      createLike({
        isLike: value,
        commentId: props.comment.id,
        userId: userData.id,
        userLogin: userData.login,
      })
    )
  }

  const data = new Date(Date.parse(props.comment.createdAt))
  const countComment =
    props.childComment?.length > 0 ? '(' + props.childComment?.length + ')' : ''
  return (
    <RB.Card sx={{ maxWidth: 478 }}>
      <RB.CardHeader
        avatar={
          <RB.Avatar aria-label="recipe">
            <ImageIcon />
          </RB.Avatar>
        }
        title={props.comment.user_login}
        subheader={props.comment.createdAt}
      />
      <RB.CardContent>
        <RB.Typography variant="body2" color="text.secondary">
          {props.comment.comment}
        </RB.Typography>
      </RB.CardContent>
      <RB.CardActions>
        {!props.comment.parent_id ? (
          <RB.Button size="small" onClick={handleOpen}>
            {!open ? 'Комментарии ' + countComment : 'Скрыть комментарии'}
          </RB.Button>
        ) : null}
        <RB.Typography
          variant="caption"
          color="inherit"
          sx={{ marginLeft: 'auto' }}>
          <RB.IconButton
            aria-label="add to favorites"
            color={props.like ? 'error' : undefined}
            onClick={() => addLike(!props.like)}>
            <FavoriteIcon />
          </RB.IconButton>
        </RB.Typography>
      </RB.CardActions>
      {open ? (
        status !== 'FETCH_FULFILLED' ? (
          <RB.CircularProgress />
        ) : (
          <>
            <RB.Divider />
            <RB.CardContent>
              {props.childComment?.length ? (
                <RB.List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}>
                  {props.childComment?.map(comment => {
                    return (
                      <>
                        <RB.CardHeader
                          avatar={
                            <RB.Avatar aria-label="recipe">
                              <ImageIcon />
                            </RB.Avatar>
                          }
                          title={comment.user_login}
                          subheader={comment.createdAt}
                        />
                        <RB.CardContent>
                          <RB.Typography variant="body2" color="text.secondary">
                            {comment.comment}
                          </RB.Typography>
                        </RB.CardContent>
                        <RB.Divider variant="inset" component="li" />
                      </>
                    )
                  })}
                </RB.List>
              ) : (
                <RB.Grid item xs={12}>
                  <RB.Alert severity="info">Комментарии не найдены</RB.Alert>
                </RB.Grid>
              )}
              <FormMessange
                parentId={props.comment.id}
                topicId={props.comment.topic_id}
              />
            </RB.CardContent>
          </>
        )
      ) : null}
    </RB.Card>
  )
}

export default CardMessange

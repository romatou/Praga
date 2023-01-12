import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import * as RB from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store/index'
import {
  getComments,
  createComment,
} from '../../store/actions/ForumActionCreators'
import { selectUserData } from '../../store/slices/UserSlice'

interface Props {
  parentId: number | null
  topicId: number
}

const FormMessange = (props: Props) => {
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector(selectUserData)
  const methods = useForm({
    defaultValues: {
      comment: '',
    },
    mode: 'onBlur',
  })
  const { register, handleSubmit, reset } = methods
  const onSubmitMessange = useCallback((value: { comment: string }) => {
    dispatch(
      createComment({
        parentId: props.parentId,
        topicId: props.topicId,
        userId: userData.id,
        userLogin: userData.login,
        comment: value.comment,
      })
    ).then(function () {
      return dispatch(getComments({ id: props.topicId }))
    })
    reset()
  }, [])
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitMessange)}>
        <RB.Grid container spacing={2} marginTop={1}>
          <RB.Grid item xs={12}>
            <RB.Typography gutterBottom variant="subtitle2" component="div">
              Отправить сообщение
            </RB.Typography>
          </RB.Grid>
          <RB.Grid item xs={8}>
            <RB.Paper
              component="form"
              sx={{ p: '2px 4px', alignItems: 'center' }}>
              <RB.InputBase {...register('comment')} />
            </RB.Paper>
          </RB.Grid>
          <RB.Grid
            item
            xs={4}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center">
            <RB.Button
              type="submit"
              variant="outlined"
              size="small"
              color="inherit">
              Отправить
            </RB.Button>
          </RB.Grid>
        </RB.Grid>
      </form>
    </FormProvider>
  )
}

export default FormMessange

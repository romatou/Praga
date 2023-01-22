import * as RB from '@mui/material'
import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  createComment,
  getComments
} from '../../store/actions/ForumActionCreators'
import { useAppDispatch, useAppSelector } from '../../store/index'
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
    ).then(function() {
      return dispatch(getComments({ id: props.topicId }))
    })
    reset()
  }, [])
  return (
    <FormProvider {...methods}>
      <RB.Box component="form" onSubmit={handleSubmit(onSubmitMessange)}>
        <RB.Grid container spacing={2} marginTop={1}>
          <RB.Grid item xs={12}>
            <RB.Typography gutterBottom variant="subtitle2" component="div">
              Отправить сообщение
            </RB.Typography>
          </RB.Grid>
          <RB.Grid item xs={8}>
            <RB.Paper sx={{ p: '4px 6px', alignItems: 'center' }}>
              <RB.InputBase
                sx={{ width: '100%', height: '100%' }}
                {...register('comment')}
              />
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
      </RB.Box>
    </FormProvider>
  )
}

export default FormMessange

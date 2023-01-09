import  {useCallback } from 'react'
import * as RB from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store/index'
import {
  getComments,
  createComment
} from '../../store/actions/ForumActionCreators'
import { selectProfileData } from '../../store/slices/ProfileSlice'

interface Props {
    parentId: number | null
    topicId: number
 }

const FormMessange = (props: Props) => {
    const dispatch = useAppDispatch()
    const { userData } = useAppSelector(selectProfileData)
    const methods = useForm({
        defaultValues: {
        comment: '',
        },
        mode: 'onBlur',
    })
    const { register, handleSubmit, reset } = methods
    const onSubmitMessange = useCallback((value: { comment: string }) => {
        dispatch(createComment({
            parentId: props.parentId,
            topicId: props.topicId,
            userId: userData.id,
            userLogin: userData.login,
            comment: value.comment})).then(function() {
                return dispatch(getComments({ id: props.topicId }));
            })
        reset()
    }, [])
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitMessange)}>
                <RB.Grid
                    container
                    spacing={2}
                    marginTop={4}>
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
    )
}

export default FormMessange

import React, { useCallback, useEffect } from 'react'
import * as RB from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { passwordType } from '../../pages/profile/types'

const ModalPassword = (props: any) => {
  const methods = useForm<passwordType>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    mode: 'onBlur',
  })
  const { register, handleSubmit, reset } = methods

  useEffect(() => {
    methods.reset({
      oldPassword: '',
      newPassword: '',
    })
  }, [])

  return (
    <RB.Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <RB.Dialog open={props.isopen} onClose={props.handleClose}>
        <RB.DialogTitle>Изменить пароль</RB.DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(props.onSubmitPassword)}>
            <RB.DialogContent>
              <RB.Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <RB.Grid item xs={12}>
                  <RB.TextField
                    type="text"
                    {...register('oldPassword')}
                    label="Текущий пароль"
                    size="small"
                  />
                </RB.Grid>
                <RB.Grid item xs={12}>
                  <RB.TextField
                    type="text"
                    {...register('newPassword')}
                    label="Новый пароль"
                    size="small"
                  />
                </RB.Grid>
              </RB.Grid>
            </RB.DialogContent>
            <RB.DialogActions>
              <RB.Button size="small" type="submit" onClick={props.handleClose}>
                Сохранить
              </RB.Button>
            </RB.DialogActions>
          </form>
        </FormProvider>
      </RB.Dialog>
    </RB.Container>
  )
}

export default ModalPassword

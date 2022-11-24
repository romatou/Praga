import React, { useEffect, useCallback } from 'react'
import * as RB from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useForm, FormProvider } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '@store/index'
import {
  editProfileData,
  editAvatar,
  editPasswordData,
  fetchUser,
} from '@store/actions/ProfileActionCreators'
import { selectProfileData } from '@store/slices/ProfileSlice'
import { showAlert, AlertProps } from '@store/slices/AlertSlice'

import {
  TYPES_ALERT,
  TYPES_ALERT_MESS,
  InputLabel,
  userType,
  passwordType,
} from './types'
import { RequestDataState } from '../../store/types'

import ModalPassword from '../../components/ModalPassword'
import AlertMessage from '../../components/Alert'

const Profile = () => {
  const dispatch = useAppDispatch()
  const { userData, requestData } = useAppSelector(selectProfileData)

  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  useEffect(() => {
    getAlert(requestData.editAvatar, 'Аватар: ')
  }, [requestData.editAvatar])
  useEffect(() => {
    getAlert(requestData.editUser, 'Профиль: ')
  }, [requestData.editUser])
  useEffect(() => {
    getAlert(requestData.editPassword, 'Пароль: ')
  }, [requestData.editPassword])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const getAlert = (request: RequestDataState, messange: string) => {
    if (request.status) {
      dispatch(
        showAlert({
          text: (messange + TYPES_ALERT_MESS[request.status]) as AlertProps,
          type: TYPES_ALERT[request.status] as AlertProps,
        })
      )
    }
  }
  const onSubmitAvatar = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const payload = evt.target.files
      const image = payload && payload[0]
      if (image !== null) {
        const formData = new FormData()
        console.log(image)
        formData.append('avatar', image)
        dispatch(editAvatar(formData))
      }
    },
    []
  )
  const onSubmitFormData = useCallback(async (value: userType) => {
    dispatch(editProfileData(value))
  }, [])

  const onSubmitPassword = useCallback((value: passwordType) => {
    dispatch(editPasswordData(value))
  }, [])

  useEffect(() => {
    if (userData) {
      reset({
        display_name: userData.display_name,
        email: userData.email,
        first_name: userData.first_name,
        login: userData.login,
        phone: userData.phone,
        second_name: userData.second_name,
      })
    }
  }, [userData])

  const methods = useForm<userType>({
    defaultValues: userData || {},
    mode: 'onBlur',
  })
  const { register, handleSubmit, reset } = methods

  return (
    <RB.Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <RB.IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        sx={{
          width: 140,
          alignSelf: 'center',
          marginBottom: 4,
        }}>
        <input
          data-testid="avatar"
          id="avatar"
          name="avatar"
          hidden
          accept="image/*"
          type="file"
          onChange={onSubmitAvatar}
        />

        <RB.Avatar
          sx={{ width: 120, height: 120 }}
          alt="avatar"
          src={
            'https://ya-praktikum.tech/api/v2/resources' +
            (userData?.avatar ?? '')
          }
        />
      </RB.IconButton>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitFormData)}>
          <RB.Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            {(Object.keys(userData) as Array<keyof typeof userData>)
              .sort((a, b) => a.localeCompare(b))
              .map((key, i) => {
                if (key !== 'id' && key !== 'avatar' && key !== 'status') {
                  return (
                    <RB.Grid item xs={12} key={i}>
                      <RB.TextField
                        {...register(key)}
                        data-testid={key}
                        type="text"
                        name={key}
                        label={InputLabel[key]}
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <RB.InputAdornment position="start"></RB.InputAdornment>
                          ),
                        }}
                      />
                    </RB.Grid>
                  )
                }
              })}
            <RB.Grid item xs={12}>
              <LoadingButton
                size="small"
                type="submit"
                variant="outlined"
                loading={requestData.editUser.status === 'IN_PROGRESS'}
                loadingIndicator="Загрузка…">
                Сохранить
              </LoadingButton>
            </RB.Grid>
          </RB.Grid>
        </form>
      </FormProvider>
      <RB.Button
        variant="text"
        size="small"
        sx={{
          marginTop: 1,
        }}
        onClick={handleClickOpen}>
        Изменить пароль
      </RB.Button>
      <ModalPassword
        isopen={open}
        handleClose={handleClose}
        onSubmitPassword={onSubmitPassword}
      />
      <AlertMessage />
    </RB.Container>
  )
}

export default Profile

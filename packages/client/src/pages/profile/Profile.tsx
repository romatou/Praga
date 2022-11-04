import React, { useEffect, useState, useCallback } from 'react';
import * as RB from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { useForm, FormProvider} from 'react-hook-form';

import { editAvatarApi, editProfile, editPassword, getUser, userType, passwordType } from '../../services/UserService';
import ModalPassword from '../../components/ModalPassword';
import InstantMessage  from '../../components/Alert';

const Profile = () => {
  const [alert, setAlert] = useState(
    {
      error: false,
      message: '',
      status: ''
    }
  )
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [appState, setAppState] = useState(
    {
      user: {
        avatar: '',
        display_name: '',
        email: '',
        first_name: '',
        id: '',
        login: '',
        phone: '',
        second_name: ''
      }
    }
  )
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseModal = () => {
    setAlert({error: false, message: '', status: ''})
  };
  const onSubmitAvatar = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const payload = evt.target.files
    const image = payload && payload[0]
    if (image !== null) {
      const formData = new FormData();
      console.log(image)
      formData.append('avatar', image);
      editAvatarApi(formData)
        .then(() => {
          getUserData()
          setAlert({error: true, message: 'Аватар изменен', status: 'success'})
        })
        .catch(() => {
          setAlert({error: true, message: 'Ошибка', status: 'error'})
        });
      setLoading(false)
    }
  }, [])
  const onSubmitFormData = useCallback((value: userType) => {
    setLoading(true)
    editProfile(value)
      .then(() => {
        getUserData()
        setAlert({error: true, message: 'Сохранено', status: 'success'})
      })
      .catch(() => {
        setAlert({error: true, message: 'Ошибка', status: 'error'})
      });
    setLoading(false)
  }, [])

  const onSubmitPassword = useCallback((value: passwordType) => {
    setLoading(true)
    editPassword(value)
      .then(() => {
        setAlert({error: true, message: 'Сохранено', status: 'success'})
      })
      .catch(() => {
        setAlert({error: true, message: 'Ошибка', status: 'error'})
      });
    setLoading(false)
  }, [])

  const getUserData = () => {
    setLoading(true)
    getUser()
    .then((resp) => {
      const getUser = resp.data;
      setAppState({user: getUser});
    })
    .catch(() => {
      setAlert({error: true, message: 'Ошибка в получении данных', status: 'error'})
    });
    setLoading(false)
  }
  useEffect(() => {
    getUserData()
  }, []);

  useEffect(() => {
    if (appState.user) {
        reset({
            display_name: appState.user.display_name,
            email: appState.user.email,
            first_name: appState.user.first_name,
            login: appState.user.login,
            phone: appState.user.phone,
            second_name: appState.user.second_name
        })
    }
  }, [appState.user]); 

  const methods = useForm<userType>();
  const { register, handleSubmit, reset  } = methods;

  return (
      <RB.Container sx={{ display: 'flex', flexDirection: 'column' }}>
        <RB.IconButton
          color='primary'
          aria-label='upload picture'
          component='label'
          sx={{
            width: 140,
            alignSelf: 'center',
            marginBottom: 4
          }}
          disabled={loading}
        >
          <input id='avatar' name='avatar' hidden accept='image/*' type='file' onChange={onSubmitAvatar} />

          <RB.Avatar
            sx={{ width: 120, height: 120 }}
            alt='avatar'
            src={'https://ya-praktikum.tech/api/v2/resources' + (appState.user?.avatar ?? '')}
          />
        </RB.IconButton>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitFormData)}>
            <RB.Grid
              container
              direction='column'
              justifyContent='center'
              alignItems='center'
              spacing={2}
            >
              <RB.Grid item xs={12}>
                <RB.TextField
                  type='text'
                  {...register('first_name', { value: appState.user?.first_name })}
                  label={(appState.user?.first_name !== null) ? '':'Имя'}
                  value={appState.user?.first_name}
                  onChange={e => setAppState((prevState) => (
                    {user: {...prevState.user, first_name: e.target.value}, loading: false}
                  ))}
                  size='small'
                />
              </RB.Grid>
              <RB.Grid item xs={12}>
                <RB.TextField
                  type='text'
                  {...register('second_name')}
                  name='second_name'
                  label={(appState.user?.second_name !== null) ? '':'Фамилия'}
                  value={appState.user?.second_name}
                  onChange={e => setAppState((prevState) => (
                    {user: {...prevState.user, second_name: e.target.value}, loading: false}
                  ))}
                  size='small'
                />
              </RB.Grid>
              <RB.Grid item xs={12}>
                <RB.TextField
                  type='text'
                  {...register('display_name')}
                  name='display_name'
                  label={(appState.user?.display_name !== null) ? '':'Имя в чате'}
                  value={(appState.user?.display_name === null) ? '': appState.user?.display_name}
                  onChange={e => setAppState((prevState) => (
                    {user: {...prevState.user, display_name: e.target.value}, loading: false}
                  ))}
                  size='small'
                />
              </RB.Grid>
              <RB.Grid item xs={12}>
                <RB.TextField
                  type='text'
                  {...register('email')}
                  name='email'
                  label={(appState.user?.email !== null) ? '':'Email'}
                  value={appState.user?.email}
                  onChange={e => setAppState((prevState) => (
                    {user: {...prevState.user, email: e.target.value}, loading: false}
                  ))}
                  size='small'
                />
              </RB.Grid>
              <RB.Grid item xs={12}>
                <RB.TextField
                  type='text'
                  {...register('login')}
                  name='login'
                  label={(appState.user?.login !== null) ? '':'Логин'}
                  value={appState.user?.login}
                  onChange={e => setAppState((prevState) => (
                    {user: {...prevState.user, login: e.target.value}, loading: false}
                  ))}
                  size='small'
                />
              </RB.Grid>
              <RB.Grid item xs={12}>
                <RB.TextField
                  type='text'
                  {...register('phone')}
                  name='phone'
                  label={(appState.user?.phone !== null) ? '':'Телефон'}
                  value={appState.user?.phone}
                  onChange={e => setAppState((prevState) => (
                    {user: {...prevState.user, phone: e.target.value}, loading: false}
                  ))}
                  size='small'
                />
              </RB.Grid>
              <RB.Grid item xs={12}>
                <LoadingButton
                  size='small'
                  type='submit'
                  variant='outlined'
                  loading={loading}
                  loadingIndicator="Загрузка…"
                >
                  Сохранить
                </LoadingButton>
              </RB.Grid>
              {/*inputForm.map((inp: any, i) => {
                return (
                  <RB.Grid item xs={12} key={i}>
                    <RB.TextField
                      /*{...register(item.name, {
                        pattern: /[A-Za-z]{3}/
                      })}*/ //для валидации если нужно будет
                      /*type='text'
                      name={inp.name}
                      label={inp.label}
                      value={appState.user[inp.name]}
                    />
                  </RB.Grid>
                )
              })*/}
            </RB.Grid>
          </form>
        </FormProvider>
        <RB.Button 
          variant='text'
          size='small'
          sx={{
            marginTop: 1
          }}
          onClick={handleClickOpen}
        >
            Изменить пароль
        </RB.Button>
        <ModalPassword isopen={open} handleClose={handleClose} onSubmitPassword={onSubmitPassword}/>
        <InstantMessage message = {alert.message} severity={alert.status} open={alert.error} handleClose={handleCloseModal}/>
      </RB.Container>
  )
}

export default Profile

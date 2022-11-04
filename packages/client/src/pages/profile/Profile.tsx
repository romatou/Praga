import React, { useEffect, useState, useCallback } from 'react';
import * as RB from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { useForm, FormProvider} from 'react-hook-form';

import { editAvatarApi, editProfile, editPassword, getUser, userType, passwordType } from '../../services/UserService';
import ModalPassword from '../../components/ModalPassword';
import InstantMessage  from '../../components/Alert';

const inputForm = [
  {name: 'first_name', label: 'Имя'},
  {name: 'second_name', label: 'Фамилия'},
  {name: 'display_name', label: 'Имя в чате'},
  {name: 'email', label: 'Почта'},
  {name: 'phone', label: 'Телефон'},
  {name: 'login', label: 'Логин'}
]

const Profile = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = React.useState(false);
  const [appState, setAppState] = useState(
    {
      loading: false,
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
  
  const onSubmitAvatar = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setAppState({loading: true, user: appState.user})
    const payload = evt.target.files
    const image = payload && payload[0]
    if (image !== null) {
      const formData = new FormData();
      console.log(image)
      formData.append('avatar', image);
      editAvatarApi(formData)
    }
  }, [])
  const onSubmitFormData = useCallback(async (value: userType) => {
    await editProfile(value)
      .then((resp) => {
        getUserData()
        setMessage('Сохранено')
        setStatus('success')
        setError(true); 
      })
      .catch((error) => {
        setMessage('Ошибка')
        setStatus('error')
        setError(true); 
      });
  }, [])

  const onSubmitPassword = useCallback(async (value: passwordType) => {
    await editPassword(value)
      .then((resp) => {
        setMessage('Сохранено')
        setStatus('success')
        setError(true); 
      })
      .catch((error) => {
        setMessage('Ошибка')
        setStatus('error')
        setError(true); 
      });
  }, [])

  const getUserData = () => {
    getUser()
    .then((resp) => {
      const getUser = resp.data;
      setAppState({
        loading: false,
        user: getUser
      });
    })
    .catch((error) => {
      setMessage('Ошибка в получении данных')
      setStatus('error')
      setError(true); 
    });
  }
  useEffect(() => {
    setAppState({loading: true, user: appState.user})
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
              <RB.Grid item xs={12}>
                <LoadingButton
                  size='small'
                  type='submit'
                  variant='outlined'
                >
                  Сохранить
                </LoadingButton>
              </RB.Grid>
              <RB.Grid item xs={12}>
                <RB.Button 
                  variant='text'
                  size='small'
                  onClick={handleClickOpen}
                >
                    Изменить пароль
                </RB.Button>
                <ModalPassword isopen={open} handleClose={handleClose} onSubmitPassword={onSubmitPassword}/>
              </RB.Grid>
            </RB.Grid>
          </form>
        </FormProvider>
      {error ?  <InstantMessage message = {message} severity={status}/> : `` }
      </RB.Container>
  )
}

export default Profile

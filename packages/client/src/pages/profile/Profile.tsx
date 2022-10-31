import React, { useCallback, useEffect } from 'react';
import * as RB from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { useForm, FormProvider, Controller } from 'react-hook-form';

const inputForm = [
  {name: 'firstName', label: 'Имя'},
  {name: 'secondName', label: 'Фамилия'},
  {name: 'displayName', label: 'Имя в чате'},
  {name: 'email', label: 'Почта'},
  {name: 'phone', label: 'Телефон'},
  {name: 'login', label: 'Логин'}
]

const Profile = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const methods = useForm();
  const { register, handleSubmit } = methods;
  return (
      <RB.Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
          <input hidden accept='image/*' type='file' /*onChange={""}*/ />

          <RB.Avatar
            sx={{ width: 120, height: 120 }}
           // src={}
          />
        </RB.IconButton>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <RB.Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {inputForm.map((item, i) => {
                return (
                  <RB.Grid item xs={12} key={i}>
                    <RB.TextField
                      /*{...register(item.name, {
                        pattern: /[A-Za-z]{3}/
                      })}*/ //для валидации если нужно будет
                      type='text'
                      name={item.name}
                      label={item.label}
                    />
                  </RB.Grid>
                )
              })}
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
                  variant="text"
                  size='small'
                  onClick={handleClickOpen}
                >
                    Изменить пароль
                </RB.Button>
                <RB.Dialog open={open} onClose={handleClose}>
                  <RB.DialogTitle>Изменить пароль</RB.DialogTitle>
                  <FormProvider {...methods}>
                    <RB.DialogContent>
                      <RB.DialogContentText>
                        {}
                      </RB.DialogContentText>
                      <RB.Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <RB.Grid item xs={12}>
                          <RB.TextField
                            type='text'
                            name='oldPassword'
                            label='Текущий пароль'
                          />
                        </RB.Grid>
                        <RB.Grid item xs={12}>
                          <RB.TextField
                            type='text'
                            name='newPassword'
                            label='Новый пароль'
                          />
                        </RB.Grid>
                      </RB.Grid>
                    </RB.DialogContent>
                    <RB.DialogActions>
                      <RB.Button onClick={handleClose}>Сохранить</RB.Button>
                    </RB.DialogActions>
                  </FormProvider>
                </RB.Dialog>
              </RB.Grid>
            </RB.Grid>
          </form>

        </FormProvider>
      </RB.Box>
  )
}

export default Profile

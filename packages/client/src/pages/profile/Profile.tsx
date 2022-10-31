import React, { useCallback, useEffect } from 'react';
import { Grid, IconButton, Box, Avatar, TextField } from '@mui/material';
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
  const methods = useForm();
  const { register, handleSubmit } = methods;
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <IconButton
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

          <Avatar
            //title={MENU_ITEMS.profile.title}
            sx={{ width: 120, height: 120 }}
           // src={ENDPOINTS.RESOURCES + (user?.avatar ?? '')}
          />
        </IconButton>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {inputForm.map((item) => {
                return (
                  <Grid item xs={12}>
                    <Controller
                      name={item.name}
                      control={methods.control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type='text'
                          name={item.name}
                          label={item.label}
                        />
                      )}
                    />
                  </Grid>
                )
              })}
              <Grid item xs={12}>
                <LoadingButton
                  size='small'
                  type='submit'
                  variant='outlined'
                >
                  Сохранить
                </LoadingButton>
              </Grid>
            </Grid>
          </form>

        </FormProvider>
      </Box>
  )
}

export default Profile

import { useEffect } from 'react'
import * as RB from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { forumThemeType } from '../../pages/forum/types'

const ModalThemeNew = (props: any) => {
  const methods = useForm<forumThemeType>({
    defaultValues: {
      title: '',
      description: ''
    },
    mode: 'onBlur',
  })
  const { register, handleSubmit } = methods

  useEffect(() => {
    methods.reset({
      title: '',
      description: ''
    })
  }, [])

  return (
    <RB.Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <RB.Dialog open={props.isopen} onClose={props.handleClose}>
        <RB.DialogTitle>Создать тему</RB.DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(props.onSubmitTheme)}>
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
                    {...register('title')}
                    label="Название"
                    size="small"
                  />
                </RB.Grid>
                <RB.Grid item xs={12}>
                  <RB.TextField
                    type="text"
                    {...register('description')}
                    label="Описание"
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

export default ModalThemeNew

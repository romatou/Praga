import { useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import * as RB from '@mui/material'
import CardMessange from '../../components/CardMessange'
import { useForm, FormProvider } from 'react-hook-form'

const forumData = [
  {
    id: '5',
    mess: [
      {
        id: '1',
        name: 'Дмитрий',
        text: 'Проверка текста5',
        data: '16.02.12 16:40',
      },
      {
        id: '2',
        name: 'Алексей',
        text: 'Проверка текста25',
        data: '16.02.12 16:46',
      },
      {
        id: '3',
        name: 'Дмитрий',
        text: 'Проверка текста35',
        data: '16.02.12 16:49',
      },
      {
        id: '4',
        name: 'Дмитрий',
        text: 'Проверка текста35',
        data: '16.02.12 16:49',
      },
      {
        id: '5',
        name: 'Дмитрий',
        text: 'Проверка текста35',
        data: '16.02.12 16:49',
      },
    ],
  },
  {
    id: '4',
    mess: [
      {
        id: '1',
        name: 'Дмитрий',
        text: 'Проверка текста4',
        data: '16.02.12 16:40',
      },
      {
        id: '2',
        name: 'Алексей',
        text: 'Проверка текста24',
        data: '16.02.12 16:46',
      },
      {
        id: '3',
        name: 'Дмитрий',
        text: 'Проверка текста34',
        data: '16.02.12 16:49',
      },
    ],
  },
  {
    id: '3',
    mess: [
      {
        id: '1',
        name: 'Дмитрий',
        text: 'Проверка текста3',
        data: '16.02.12 16:40',
      },
      {
        id: '2',
        name: 'Алексей',
        text: 'Проверка текста23',
        data: '16.02.12 16:46',
      },
      {
        id: '3',
        name: 'Дмитрий',
        text: 'Проверка текста33',
        data: '16.02.12 16:49',
      },
    ],
  },
  {
    id: '2',
    mess: [
      {
        id: '1',
        name: 'Дмитрий',
        text: 'Проверка текста2',
        data: '16.02.12 16:40',
      },
      {
        id: '2',
        name: 'Алексей',
        text: 'Проверка текста22',
        data: '16.02.12 16:46',
      },
      {
        id: '3',
        name: 'Дмитрий',
        text: 'Проверка текста32',
        data: '16.02.12 16:49',
      },
    ],
  },
  {
    id: '1',
    mess: [
      {
        id: '1',
        name: 'Дмитрий',
        text: 'Проверка текста1',
        data: '16.02.12 16:40',
      },
      {
        id: '2',
        name: 'Алексей',
        text: 'Проверка текста21',
        data: '16.02.12 16:46',
      },
      {
        id: '3',
        name: 'Дмитрий',
        text: 'Проверка текста31',
        data: '16.02.12 16:49',
      },
    ],
  },
]
type QuizParams = {
  id: string
}

const ForumDetail = () => {
  const { id } = useParams<QuizParams>()
  const methods = useForm({
    defaultValues: {
      messange: '',
    },
    mode: 'onBlur',
  })
  const { register, handleSubmit } = methods
  const onSubmitMessange = useCallback((value: { messange: string }) => {
    console.log(value)
  }, [])

  useEffect(() => {
    methods.reset({
      messange: '',
    })
  }, [])

  return (
    <RB.Container
      maxWidth={false}
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        background: '#D5D5D5',
      }}>
      <RB.Container sx={{ display: 'flex', flexDirection: 'column' }}>
        <RB.Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          marginTop={4}>
          <RB.Grid item xs={12} sx={{ width: '478px' }} spacing={12}>
            <RB.Grid
              container
              spacing={2}
              sx={{ height: '60vh', overflow: 'auto' }}>
              {forumData
                .find(item => item.id === id)
                ?.mess.map((item, i) => {
                  return (
                    <RB.Grid item xs={12} key={i}>
                      <CardMessange
                        name={item.name}
                        text={item.text}
                        data={item.data}
                      />
                    </RB.Grid>
                  )
                })}
            </RB.Grid>
            <RB.Grid item xs={12} sx={{ width: '478px' }} position="fixed">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitMessange)}>
                  <RB.Grid
                    container
                    spacing={2}
                    marginTop={4}
                    sx={{ width: '478px' }}>
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
                        <RB.InputBase {...register('messange')} />
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
            </RB.Grid>
          </RB.Grid>
        </RB.Grid>
      </RB.Container>
    </RB.Container>
  )
}

export default ForumDetail

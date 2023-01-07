<<<<<<< HEAD
import { fetchUser, register } from '../store/actions/AuthActionCreators'
=======
import {  register } from '../store/actions/AuthActionCreators'
>>>>>>> origin/feature/TEA-40-OAuth
import { useAppDispatch } from '../store/index'
import { UserData } from '../store/types'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (data: UserData) => {
    dispatch(register(data)).then(res => {
      if (res.payload.id) {
        navigate('/')
      }
    })
  }
}

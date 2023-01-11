import { fetchUser } from '../store/actions/UserActionCreators'
import { login } from '../store/actions/AuthActionCreators'
import { useAppDispatch } from '../store/index'
import { LoginData } from '../store/types'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (data: LoginData) => {
    dispatch(login(data)).then(res => {
      if (res.payload === 'OK') {
        navigate('/game/start'), dispatch(fetchUser())
      }
    })
  }
}

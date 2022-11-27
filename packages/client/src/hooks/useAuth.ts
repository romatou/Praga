import { fetchUser } from '@store/actions/AuthActionCreators'
import { useAppDispatch } from '@store/index'
import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const user = useUser()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return () => {
    user.id
      ? navigate('/game/start')
      : dispatch(fetchUser()).then(res => {
          if (res.type === 'auth/fetch/rejected') {
            return navigate('/auth')
          }
        })
  }
}

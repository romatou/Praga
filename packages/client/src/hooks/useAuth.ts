import { fetchUser } from '../store/actions/UserActionCreators'
import { useAppDispatch } from '../store/index'
import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const user = useUser()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  return () => {
    user.userData.id
      ? navigate('/game/start')
      : dispatch(fetchUser()).then(res => {
        if (res.type === '/user/fetchUser/rejected') {
          return navigate('/auth')
        }
      })
  }
}

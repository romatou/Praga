import { fetchUser } from '../store/actions/UserActionCreators'
import { useAppDispatch } from '../store/index'
import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const user = useUser()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  return () => {
    if (!user.id) {
      dispatch(fetchUser()).then(res => {
        if (res.type === 'auth/fetch/rejected') {
          return navigate('/auth')
        }
      })
    }
    return
  }
}

import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { fetchUser } from '../store/actions/UserActionCreators'
import { useAppDispatch } from '../store/index'

export const useAuth = () => {
  const user = useUser()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return () => {
    if (!user.userData?.id) {
      dispatch(fetchUser()).then(res => {
        if (res.type === '/user/fetchUser/rejected') {
          return navigate('/auth')
        }
      })
    }
    return
  }
}

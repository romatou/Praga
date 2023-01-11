import { selectUserData } from '../store/slices/UserSlice'
import { useAppSelector } from '../store/index'

export const useUser = () => {
  const user = useAppSelector(selectUserData)
  return user
}

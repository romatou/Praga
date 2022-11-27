import { useAppSelector } from '@store/index'

export const useUser = () => {
  const { user } = useAppSelector(state => state.auth)
  return user
}

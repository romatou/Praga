import { useAppSelector } from "@store/index"

export const useAuth = () => {
  const { isAuth } = useAppSelector((state => state.auth));
  return isAuth;
}
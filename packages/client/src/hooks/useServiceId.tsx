import { getServiceId } from '@store/actions/AuthActionCreators'
import { useAppDispatch } from '@store/index'

export const REDIRECT_URI = 'https://battleship-prague.ya-praktikum.tech'
export const useServiceId = () => {
  const dispatch = useAppDispatch()
  return () => {
    dispatch(getServiceId()).then(res => {
      if (res.payload.service_id) {
        document.location = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.payload.service_id}&redirect_uri=${REDIRECT_URI}`
      }
    })
  }
}

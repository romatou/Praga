import { getServiceId } from '@store/actions/AuthActionCreators'
import { useAppDispatch } from '@store/index'

export const REDIRECT_URI = 'http://battleship-prague.ya-praktikum.tech'
export const useServiceId = () => {
  const dispatch = useAppDispatch()
  return () => {
    dispatch(getServiceId()).then(res => {
      console.log(res)
      if (res.payload.service_id) {
        document.location = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${res.payload.service_id}&redirect_uri=${REDIRECT_URI}`
      }
    })
  }
}

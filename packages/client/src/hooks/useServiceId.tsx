import { getServiceId } from '../store/actions/AuthActionCreators'
import { useAppDispatch } from '../store/index'
import { DB_URL } from 'services/BaseApi'

export const useServiceId = () => {
  const dispatch = useAppDispatch()
  const REDIRECT_URI = DB_URL

  return () => {
    dispatch(getServiceId()).then(res => {
      if (res.payload.service_id) {
        document.location = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.payload.service_id}&redirect_uri=${REDIRECT_URI}`
      }
    })
  }
}

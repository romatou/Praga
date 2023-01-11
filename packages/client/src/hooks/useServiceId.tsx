import { getServiceId } from '@store/actions/AuthActionCreators'
import { useAppDispatch } from '@store/index'

export const useServiceId = () => {
  const dispatch = useAppDispatch()
  const REDIRECT_URI = 'http://localhost:3001'
  // const REDIRECT_URI =`http://localhost:${__CLIENT_PORT__}`
  return () => {
    dispatch(getServiceId()).then(res => {
      if (res.payload.service_id) {
        document.location = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.payload.service_id}&redirect_uri=${REDIRECT_URI}`
      }
    })
  }
}

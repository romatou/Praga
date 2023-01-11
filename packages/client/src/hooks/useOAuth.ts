import { fetchUser, oauthYandex } from '../store/actions/AuthActionCreators'
import { useAppDispatch } from '../store/index'
import { OauthData } from '../store/types'

export const useOAuth = () => {
  const REDIRECT_URI = 'http://localhost:3001'
  const dispatch = useAppDispatch()
  const url = document.location.href
  const code = url.split('=').pop()
  return () => {
    if (/code/.test(url)) {
      dispatch(
        oauthYandex({
          code: code,
          redirect_uri: REDIRECT_URI,
        } as OauthData)
      ).then(res => {
        if (res.payload === 'OK') {
          dispatch(fetchUser())
        }
      })
    }
}
}

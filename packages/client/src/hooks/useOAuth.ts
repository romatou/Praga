import { DB_URL } from '../services/BaseApi'
import { oauthYandex, fetchUser } from '../store/actions/AuthActionCreators'
import { useAppDispatch } from '../store/index'
import { OauthData } from '../store/types'

export const useOAuth = () => {
  try {
    const REDIRECT_URI = DB_URL
    const dispatch = useAppDispatch()

    const url = document?.location.href 
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
  } catch (e) {
    console.log(e)
  }
}

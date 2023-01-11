import location from 'location-href'
import { REDIRECT_URI } from '../services/BaseApi'
import { fetchUser, oauthYandex } from '../store/actions/AuthActionCreators'
import { useAppDispatch } from '../store/index'
import { OauthData } from '../store/types'

export const useOAuth = () => {
  try {
    const dispatch = useAppDispatch()

    const url = location()

    if (url) {
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
  } catch (e) {
    console.log(e)
  }
}

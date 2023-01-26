import { fetchUser, oauthYandex } from '../store/actions/AuthActionCreators'
import { useAppDispatch } from '../store/index'
import { OauthData } from '../store/types'
import { REDIRECT_URI } from './useServiceId'
import location from 'location-href'

export const useOAuth = () => {
  const dispatch = useAppDispatch()
  const url = location()
  const token = url.split('code=').pop()
  return () => {
    if (/code/.test(url)) {
      dispatch(
        oauthYandex({
          code: token,
          redirect_uri: REDIRECT_URI,
        } as OauthData)
      )
        .then(res => {
          if (res.payload === 'OK') {
            dispatch(fetchUser())
          }
        })
    }
    return
  }
}

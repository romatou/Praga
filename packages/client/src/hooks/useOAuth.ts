import { fetchUser, oauthYandex } from '../store/actions/AuthActionCreators'
import { useAppDispatch } from '../store/index'
import { OauthData } from '../store/types'
import { REDIRECT_URI } from './useServiceId'

export const useOAuth = () => {

  const dispatch = useAppDispatch()
  const url = document.location.href
  const token = url.split('token=').pop()
  return () => {
    if (/token/.test(url)) {
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


// export const useOAuth = () => {
//   console.log('oauth')

//   const dispatch = useAppDispatch()
//   const url = document.location.href
//   const token = url.split('token=').pop()
//   return () => {
//     if (/token/.test(url)) {
//       dispatch(
//         oauthYandex({
//           code: token,
//           redirect_uri: REDIRECT_URI,
//         } as OauthData)
//       )
//         .then(res => {
//           if (res.payload === 'OK') {
//             dispatch(fetchUser())
//           }
//         })
//     }
//     return
//   }
// }

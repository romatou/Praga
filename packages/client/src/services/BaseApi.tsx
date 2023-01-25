import axios from 'axios'
const isClient = () => typeof window !== 'undefined'
const getLocationOrigin = (): string => location.origin
const HOST = isClient() ? getLocationOrigin() : ''
export const YA_URL_API = `${HOST}/yandex-api` 
const DB_URL_API = `${HOST}/api`

export const axiosInstance = axios.create({
  baseURL: YA_URL_API,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
  withCredentials: true,
})

export const axiosInstanceDB = axios.create({
  baseURL: DB_URL_API,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
  withCredentials: true,

})

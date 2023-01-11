import axios from 'axios'
const http = 'https://ya-praktikum.tech/api/v2'
const isClient = () => typeof window !== 'undefined'
const getLocationOrigin = (): string => location.origin
const HOST = isClient() ? getLocationOrigin() : ''
const DB_URL_API = `${HOST}/api`

export const axiosInstance = axios.create({
  baseURL: http,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
  withCredentials: true,
})

export const axiosInstanceDB = axios.create({
  baseURL: DB_URL_API,
  headers: { 'Content-Type': 'application/json' },
})

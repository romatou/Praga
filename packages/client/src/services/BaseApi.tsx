import axios from 'axios'
const http = 'https://ya-praktikum.tech/api/v2'
// const isClient = () => typeof window !== 'undefined'
// const getLocationOrigin = (): string => location.origin
// const HOST = isClient() ? getLocationOrigin() : '';
const DB_URL_API = 'http://localhost:3001/api'
export const REDIRECT_URI = 'http://localhost:3000'

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

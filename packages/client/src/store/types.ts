export enum StatusLoading {
  SUCCESS = 'SUCCESS',
  IN_PROGRESS = 'IN_PROGRESS',
  ERROR = 'ERROR',
}
export interface RequestDataState<T = Record<string, any>> {
  data?: T
  status: StatusLoading
  errorMessage: string
}

export type RequestData = Record<string, RequestDataState>

export interface RankingResponse {
  data: {
    id: number
    name: string
    avatar: string
    score: number
  }
}

export interface Ranking {
  id: number
  name: string
  avatar: string
  score: number
}
export interface User {
  avatar: string
  display_name: string
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
  status: string
}

export interface UserRequest {
  avatar?: string
  id?: number
  status?: string
  display_name: string
  email: string
  first_name: string
  login: string
  phone: string
  second_name: string
}
export interface Avatar {
  avatar: FormData
}

export interface PassWord {
  oldPassword: string
  newPassword: string
}

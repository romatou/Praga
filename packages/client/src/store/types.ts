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
  id?: number
  name: string
  avatar?: string
  score: number
}

export interface UserData {
  id?: number
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar?: string
  display_name?: string
}
export interface LoginData {
  login: string
  password: string
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

export type Topic = {
  user_id: number
  title: string
  description?: string
  id: number
}

export type Comment = {
  id: number
  createdAt: string
  topic_id: number
  parent_id: number | null
  user_id: number
  user_login: string
  comment: string
}

export type Like = {
  user_id: number
  comment_id: number
  isLike: boolean
}
export interface ForumState {
  topics: Topic[]
  comments: Comment[]
  likes: Like[]
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}
export interface OauthData {
  code: string
  redirect_uri: string
}

export interface OauthData {
  code: string
  redirect_uri: string
}


export type SelectedTheme = 'dark' | 'light'

export type UserDataWithTheme = {
  user: User
  userTheme: SelectedTheme
}

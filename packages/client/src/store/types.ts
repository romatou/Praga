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

export type TForumState = {
  forum: TForum | null
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}

export type TForum = TTopic[]

export type TTopic = {
  id: number
  authorId: number
  text: string
  createdAt: string
  comments?: TThread[]
}

export type TForumRequest = {
  quantity?: number //Количество топиков
  start?: number //Номер первого топика (отсортированы по created_at)
}

export type TForumResponse = {
  topics: TForum[]
}

export type TThread = {
  id: number
  authorId: number
  text: string
  createdAt: string
  answers?: TAnswer[]
}

export type TThreadRequest = {
  topic: number //Тема для которой нужны комментарии
  quantity?: number //Количество комментариев
  start?: number //Номер первого комментария (отсортированы по created_at)
}

export type TThreadResponse = {
  threads: {
    authorId: number
    text: string
    createdAt: string
  }[]
}

export type TThreadByIdRequest = {
  id: number
  topicId: number
}

export type TAnswer = {
  id: number
  authorId: number
  text: string
  createdAt: string
}

export type TAnswerRequest = {
  thread: number
  quantity: number
  start: number
}

export type TCreateTopicRequest = {
  authorId: number
  text: string
}
export type TCreateTopicResponse = { id: number }

export type TGetTopicByIdRequest = { id: number }
export type TGetTopicByIdResponse = {
  authorId: number
  text: string
  createdAt: string
}

export type TCreateThreadRequest = {
  authorId: number
  topicId: number
  text: string
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

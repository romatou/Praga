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

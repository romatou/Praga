export enum StatusLoading {
  SUCCESS = 'SUCCESS',
  IN_PROGRESS = 'IN_PROGRESS',
  ERROR = 'ERROR',
}
export interface RequestDataState<T = Record<string, unknown>> {
  data?: T
  status: StatusLoading
  errorMessage: string
}

export type FetchingKey = 'addToLeaderboard' | 'getLeaderboard'

export type RequestData = Record<FetchingKey, RequestDataState>

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

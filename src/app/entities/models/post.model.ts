// interface
export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

export interface IPostsResponse {
  data: IPost[]
  total: number
}

export interface IGetPostsParams {
  page?: number
  limit?: number
}

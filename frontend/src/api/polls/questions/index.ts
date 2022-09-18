/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    query?: {
      /** Number of results to return per page. */
      limit?: number | undefined
      /** The initial index from which to return the results. */
      offset?: number | undefined
    } | undefined

    status: 200
    resBody: Types.PaginatedQuestionDetailList
  }

  post: {
    status: 201
    resBody: Types.QuestionDetail
    reqFormat: FormData
    reqBody: Types.QuestionDetailRequest
  }
}

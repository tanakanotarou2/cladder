/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    query?: {
      /** Number of results to return per page. */
      limit?: number | undefined
      /** The initial index from which to return the results. */
      offset?: number | undefined
    } | undefined

    status: 200
    resBody: Types.PaginatedChoiceList
  }

  post: {
    status: 201
    resBody: Types.Choice
    reqFormat: FormData
    reqBody: Types.ChoiceRequest
  }
}

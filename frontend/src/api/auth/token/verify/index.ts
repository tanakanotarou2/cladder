/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  /**
   * Takes a token and indicates if it is valid.  This view provides no
   * information about a token's fitness for a particular use.
   */
  post: {
    status: 200
    reqFormat: FormData
    reqBody: Types.TokenVerifyRequest
  }
}

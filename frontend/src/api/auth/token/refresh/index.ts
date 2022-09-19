/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  /**
   * Takes a refresh type JSON web token and returns an access type JSON web
   * token if the refresh token is valid.
   */
  post: {
    status: 200
    resBody: Types.TokenRefresh
    reqFormat: FormData
    reqBody: Types.TokenRefreshRequest
  }
}

/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /**
   * Takes a set of user credentials and returns an access and refresh JSON web
   * token pair to prove the authentication of those credentials.
   */
  post: {
    status: 200
    resBody: Types.TokenObtainPair
    reqFormat: FormData
    reqBody: Types.TokenObtainPairRequest
  }
}

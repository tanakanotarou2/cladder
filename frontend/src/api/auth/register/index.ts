/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** ユーザー登録 */
  post: {
    status: 200
    resBody: Types.UserDetail
    reqFormat: FormData
    reqBody: Types.RegisterUserRequest
  }
}

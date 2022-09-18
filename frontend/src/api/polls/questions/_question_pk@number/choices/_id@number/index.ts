/* eslint-disable */
import type * as Types from '../../../../../@types'

export type Methods = {
  get: {
    status: 200
    resBody: Types.Choice
  }

  patch: {
    status: 200
    resBody: Types.Choice
    reqFormat: FormData
    reqBody: Types.PatchedChoiceRequest
  }

  delete: {
    status: 204
  }
}

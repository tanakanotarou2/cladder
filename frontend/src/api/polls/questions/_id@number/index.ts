/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    status: 200
    resBody: Types.QuestionDetail
  }

  patch: {
    status: 200
    resBody: Types.Question
    reqFormat: FormData
    reqBody: Types.PatchedQuestionUpdateRequest
  }

  /** Questionデータを削除します */
  delete: {
    status: 204
  }
}

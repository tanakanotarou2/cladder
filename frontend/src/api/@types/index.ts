/* eslint-disable */
export type Choice = {
  id: number
  choice_text: string
  votes: number
  question: number
}

export type ChoiceRequest = {
  choice_text: string
}

export type PaginatedChoiceList = {
  count?: number | undefined
  next?: string | null | undefined
  previous?: string | null | undefined
  results?: Choice[] | undefined
}

export type PaginatedQuestionDetailList = {
  count?: number | undefined
  next?: string | null | undefined
  previous?: string | null | undefined
  results?: QuestionDetail[] | undefined
}

export type PatchedChoiceRequest = {
  choice_text?: string | undefined
}

export type PatchedQuestionUpdateRequest = {
  pub_date?: string | undefined
  question_text?: string | undefined
}

export type Question = {
  id: number
  question_text: string
  pub_date: string
}

export type QuestionDetail = {
  id: number
  choice_set: Choice[]
  question_text: string
  pub_date: string
}

export type QuestionDetailRequest = {
  choice_set: ChoiceRequest[]
  question_text: string
  pub_date: string
}

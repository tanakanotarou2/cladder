/* eslint-disable */
export type PaginatedUserList = {
  count?: number | undefined
  next?: string | null | undefined
  previous?: string | null | undefined
  results?: User[] | undefined
}

export type SetPassword = {
  new_password: string
  current_password: string
}

export type SetPasswordRequest = {
  new_password: string
  current_password: string
}

export type TokenObtainPair = {
  access: string
  refresh: string
}

export type TokenObtainPairRequest = {
  username: string
  password: string
}

export type TokenRefresh = {
  access: string
}

export type TokenRefreshRequest = {
  refresh: string
}

export type TokenVerifyRequest = {
  token: string
}

export type User = {
  email?: string | undefined
  id: number
  /** この項目は必須です。半角アルファベット、半角数字、@/./+/-/_ で150文字以下にしてください。 */
  username: string
}

export type UserCreate = {
  email?: string | undefined
  /** この項目は必須です。半角アルファベット、半角数字、@/./+/-/_ で150文字以下にしてください。 */
  username: string
  id: number
}

export type UserCreateRequest = {
  email?: string | undefined
  /** この項目は必須です。半角アルファベット、半角数字、@/./+/-/_ で150文字以下にしてください。 */
  username: string
  password: string
}

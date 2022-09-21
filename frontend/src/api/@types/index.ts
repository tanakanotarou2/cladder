/* eslint-disable */
export type CSRFResponse = {
  csrfToken: string
}

export type LoginRequest = {
  username?: string | undefined
  email?: string | undefined
  password: string
}

/** ログインレスポンス */
export type LoginResponse = {
  user: UserDetail

  /** アクセストークンの有効期限 */
  accessTokenExpiration: string
  /** リフレッシュトークンの有効期限 */
  refreshTokenExpiration: string
}

export type PingResponse = {
  result: string
}

export type RefreshTokenResponse = {
  /** 新しいトークンの有効期限 */
  accessTokenExpiration: string
}

export type RestAuthDetail = {
  detail: string
}

export type UserDetail = {
  id: number
  /** この項目は必須です。半角アルファベット、半角数字、@/./+/-/_ で150文字以下にしてください。 */
  username: string
  firstName?: string | undefined
  lastName?: string | undefined
  profileIcon?: string | null | undefined
}

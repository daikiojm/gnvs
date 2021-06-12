export type Env = {
  GITHUB_OAUTH_CLIENT_ID: string
  GITHUB_OAUTH_CLIENT_SECRET: string
  GITHUB_OAUTH_REDIRECT_URI: string
}

export type ErrorResponse = {
  message: string
}

export type AuthenticateRequest = {
  code: string
}

export type AuthenticateResponse = {
  accessToken: string
}

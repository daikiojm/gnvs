import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios, { AxiosResponse } from 'axios'
import FormData from 'form-data'

const githubOauthAccessTokenUrl = 'https://github.com/login/oauth/access_token'

type Env = {
  GITHUB_OAUTH_CLIENT_ID: string
  GITHUB_OAUTH_CLIENT_SECRET: string
  GITHUB_OAUTH_REDIRECT_URI: string
}

type ErrorResponse = {
  message: string
}

type AuthenticateRequest = {
  code: string
}

type AuthenticateResponse = {
  accessToken: string
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const {
    GITHUB_OAUTH_CLIENT_ID: clientId,
    GITHUB_OAUTH_CLIENT_SECRET: clientSecret,
    GITHUB_OAUTH_REDIRECT_URI: redirectUrl,
  } = process.env as Env

  if (!clientId || !clientSecret || !redirectUrl) {
    serverErrorResponse(response)
  }

  const { code = '' } = request.query as AuthenticateRequest

  if (!code) {
    requestErrorResponse(response)
  }

  const accessTokenResponse = await axios.post<string>(
    githubOauthAccessTokenUrl,
    buildFormData(clientId, clientSecret, redirectUrl, code)
  )
  successResponse<AuthenticateResponse>(
    response,
    buildResponse(accessTokenResponse)
  )

  // try {
  //   const accessTokenResponse = await axios.post<string>(
  //     githubOauthAccessTokenUrl,
  //     {
  //       body,
  //     }
  //   )
  //   // eslint-disable-next-line no-console
  //   console.log(accessTokenResponse)
  //   successResponse<AuthenticateResponse>(
  //     response,
  //     buildResponse(accessTokenResponse)
  //   )
  // } catch (e) {
  //   // eslint-disable-next-line no-console
  //   console.log(e)
  //   // eslint-disable-next-line no-console
  //   console.log(JSON.stringify(e))
  //   throw e
  //   // serverErrorResponse(response)
  // }
}

function serverErrorResponse(res: VercelResponse) {
  res.status(500).json(buildErrorResponse('Server error'))
}

function requestErrorResponse(res: VercelResponse) {
  res.status(400).json(buildErrorResponse('Request error'))
}

function successResponse<R = any>(res: VercelResponse, body: R) {
  res.status(200).json(body)
}

function buildFormData(
  clientId: string,
  clientSecret: string,
  redirectUrl: string,
  code: string
): FormData {
  const params = {
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_url: redirectUrl,
  }
  const formData = new FormData()
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return formData
}

function buildErrorResponse(message: string): ErrorResponse {
  return {
    message,
  }
}

function buildResponse(
  accessTokenResponse: AxiosResponse<string>
): AuthenticateResponse {
  const { data: paramsString } = accessTokenResponse
  const params = new URLSearchParams(paramsString)
  const accessToken = params.get('access_token')
  if (!accessToken) {
    throw new Error('access_token not found')
  }

  return {
    accessToken,
  }
}

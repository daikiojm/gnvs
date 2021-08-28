import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios, { AxiosResponse } from 'axios'
import FormData from 'form-data'

import { Env, AuthenticateResponse, AuthenticateRequest } from '../lib/types'
import {
  serverErrorResponse,
  requestErrorResponse,
  successResponse,
} from '../lib/apiHelpter'

const githubOAuthAccessTokenUrl = 'https://github.com/login/oauth/access_token'

export default async (request: VercelRequest, response: VercelResponse) => {
  const {
    GITHUB_OAUTH_CLIENT_ID: clientId,
    GITHUB_OAUTH_CLIENT_SECRET: clientSecret,
    GITHUB_OAUTH_REDIRECT_URI: redirectUrl,
  } = process.env as Env

  if (!clientId || !clientSecret || !redirectUrl) {
    return serverErrorResponse(response)
  }

  const { code = '' } = request.query as AuthenticateRequest

  if (!code) {
    return requestErrorResponse(response)
  }

  try {
    const formdata = buildFormData(clientId, clientSecret, redirectUrl, code)
    const accessTokenResponse = await axios.post<string>(
      githubOAuthAccessTokenUrl,
      formdata,
      {
        headers: {
          'content-type': 'multipart/form-data',
          ...formdata.getHeaders(),
        },
      }
    )

    return successResponse<AuthenticateResponse>(
      response,
      buildResponse(accessTokenResponse)
    )
  } catch {
    return serverErrorResponse(response)
  }
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

function buildResponse(
  accessTokenResponse: AxiosResponse<string>
): AuthenticateResponse {
  const { data: paramsString } = accessTokenResponse
  const params = new URLSearchParams(paramsString)

  const error = params.get('error')
  const accessToken = params.get('access_token')
  if (!accessToken) {
    throw new Error(error || 'access_token not found')
  }

  return {
    accessToken,
  }
}

import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
import FormData from 'form-data'

const githubOauthAccessTokenUrl = 'https://github.com/login/oauth/access_token'

export default async (request: VercelRequest, response: VercelResponse) => {
  const {
    GITHUB_OAUTH_CLIENT_ID: clientId,
    GITHUB_OAUTH_CLIENT_SECRET: clientSecret,
    GITHUB_OAUTH_REDIRECT_URI: redirectUrl,
  } = process.env as {
    GITHUB_OAUTH_CLIENT_ID: string
    GITHUB_OAUTH_CLIENT_SECRET: string
    GITHUB_OAUTH_REDIRECT_URI: string
  }
  if (!clientId || !clientSecret || !redirectUrl) {
    serverErrorResponse(response)
  }

  const { code = '' } = request.body as { code: string }
  if (!code) {
    requestErrorResponse(response)
  }

  const data = new FormData()
  data.append('client_id', clientId)
  data.append('client_secret', clientSecret)
  data.append('code', code)
  data.append('redirect_url', redirectUrl)

  const accessTokenResponse = await axios.post(githubOauthAccessTokenUrl, {
    body: data,
  })
  response.status(200).send(accessTokenResponse)
}

function serverErrorResponse(res: VercelResponse) {
  res.status(500).send('error')
}

function requestErrorResponse(res: VercelResponse) {
  res.status(400).send('error')
}

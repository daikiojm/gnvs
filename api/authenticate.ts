import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

const githubOauthAccessTokenUrl = 'https://github.com/login/oauth/access_token'

export default async (request: VercelRequest, response: VercelResponse) => {
  const { code = '' } = request.body as { code: string }
  if (!code) {
    errorResponse(response)
  }

  const data = new FormData()
  data.append('client_id', '')
  data.append('client_secret', '')
  data.append('code', code)
  data.append('redirect_url', '')

  const accessTokenResponse = await axios.post(githubOauthAccessTokenUrl, {
    body: data,
  })
  response.status(200).send(accessTokenResponse)
}

function errorResponse(res: VercelResponse) {
  res.status(400).send('error')
}

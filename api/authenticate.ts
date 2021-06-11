import { VercelRequest, VercelResponse } from '@vercel/node'
import ky from 'ky-universal'

const githubOauthAccessTokenUrl = 'https://github.com/login/oauth/access_token'

export default async (request: VercelRequest, response: VercelResponse) => {
  const { code = '' } = request.body as { code: string }

  const data = new FormData()
  data.append('client_id', '')
  data.append('client_secret', '')
  data.append('code', code)
  data.append('redirect_url', '')

  const accessTokenResponse = await ky.post(githubOauthAccessTokenUrl, {
    body: data,
  })
  response.status(200).send(accessTokenResponse)
}

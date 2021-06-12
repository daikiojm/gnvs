import axios from 'axios'

import { AuthenticateResponse } from '@/lib/types'

export function useGithubAuth() {
  const openGithubAuthLink = () => {
    const {
      VITE_APP_GITHUB_OAUTH_CLIENT_ID: clientId,
      VITE_APP_GITHUB_OAUTH_REDIRECT_URI: redirectUri,
    } = import.meta.env
    const linkUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`

    window.location.href = linkUrl
  }

  const authenticate = async (code: string) => {
    const authenticateResponse = await axios.get<AuthenticateResponse>(
      '/api/authenticate',
      { params: { code } }
    )

    return authenticateResponse.data.accessToken
  }

  return {
    openGithubAuthLink,
    authenticate,
  }
}

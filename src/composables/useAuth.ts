import axios from 'axios'
import { useLocalStorage } from '@vueuse/core'

import { AuthenticateResponse } from '@/lib/types'

const accessTokenLocalStorageKey = 'github-oauth-access-token'

const authorizeLink = (clientId: string, redirectUri: string) =>
  `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`

const authenticatePath = '/api/authenticate'

export function useAuth() {
  const storedToken = useLocalStorage<string | null>(
    accessTokenLocalStorageKey,
    null
  )

  const authorize = () => {
    const {
      VITE_APP_GITHUB_OAUTH_CLIENT_ID: clientId,
      VITE_APP_GITHUB_OAUTH_REDIRECT_URI: redirectUri,
    } = import.meta.env
    const linkUrl = authorizeLink(clientId, redirectUri)

    window.location.href = linkUrl
  }

  const authenticate = async (code: string) => {
    const authenticateResponse = await axios.get<AuthenticateResponse>(
      authenticatePath,
      { params: { code } }
    )

    const token = authenticateResponse.data.accessToken
    storedToken.value = token
    return token
  }

  const isAuthenticated = () => !!storedToken.value

  const revokeAuthenticated = () => {
    storedToken.value = null
  }

  return {
    isAuthenticated,
    authorize,
    authenticate,
    revokeAuthenticated,
  }
}

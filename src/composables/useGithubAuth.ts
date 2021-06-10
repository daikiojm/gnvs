export function useGithubAuth() {
  const openGithubAuthLink = () => {
    const {
      VITE_APP_GITHUB_OAUTH_CLIENT_ID: clientId,
      VITE_APP_GITHUB_OAUTH_REDIRECT_URI: redirectUri,
    } = import.meta.env
    const linkUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`

    window.open(linkUrl)
  }

  return {
    openGithubAuthLink,
  }
}

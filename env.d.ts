interface ImportMetaEnv {
  readonly VITE_APP_GITHUB_OAUTH_CLIENT_ID: string
  readonly VITE_APP_GITHUB_OAUTH_REDIRECT_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

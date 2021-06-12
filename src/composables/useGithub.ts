import axios from 'axios'
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods'
import { useLocalStorage } from '@vueuse/core'

const githubApiBasePath = 'https://api.github.com'

const accessTokenLocalStorageKey = 'github-oauth-access-token'

type SearchParameters = RestEndpointMethodTypes['search']['code']['parameters']
type SearchResponse = RestEndpointMethodTypes['search']['code']['response']

export type SearchResult = {
  countA: number
  countB: number
}

export function useGithub() {
  const storedToken = useLocalStorage<string>(accessTokenLocalStorageKey, null)

  const searchCode = async (
    params: SearchParameters
  ): Promise<SearchResponse['data']> => {
    const path = `${githubApiBasePath}/search/code`
    const { data } = await axios.get<SearchResponse['data']>(path, {
      headers: {
        Authorization: `token ${storedToken.value}`,
        accept: 'application/vnd.github.v3+json',
      },
      params: {
        ...params,
        q: encodeURIComponent(params.q),
      },
    })

    return data
  }

  const search = async (
    wordA: string,
    wordB: string
  ): Promise<SearchResult> => {
    const [{ total_count: countA }, { total_count: countB }] =
      await Promise.all([
        searchCode({ q: wordA, per_page: 10 }),
        searchCode({ q: wordB, per_page: 10 }),
      ])

    return {
      countA,
      countB,
    }
  }

  return {
    search,
    searchCode,
  }
}

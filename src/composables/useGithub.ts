import axios from 'axios'
import { reactive, computed } from 'vue'
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods'
import { get, toRefs, useLocalStorage } from '@vueuse/core'

const githubApiBasePath = 'https://api.github.com'

const accessTokenLocalStorageKey = 'github-oauth-access-token'

type SearchParameters = RestEndpointMethodTypes['search']['code']['parameters']
type SearchResponse = RestEndpointMethodTypes['search']['code']['response']

export type SearchResult = {
  countA: number
  countB: number
}

type State = {
  searchLoading: boolean
  resultRows: SearchResponse['data'][]
}

export function useGithub() {
  const storedToken = useLocalStorage<string | null>(
    accessTokenLocalStorageKey,
    null
  )

  const state = reactive<State>({
    searchLoading: false,
    resultRows: [],
  })

  const counts = computed<SearchResult>(() => {
    return {
      countA: state.resultRows.length > 0 ? state.resultRows[0].total_count : 0,
      countB: state.resultRows.length > 0 ? state.resultRows[1].total_count : 0,
    }
  })

  const searchCode = async (
    params: SearchParameters
  ): Promise<SearchResponse['data']> => {
    const path = `${githubApiBasePath}/search/code`
    try {
      const { data } = await axios.get<SearchResponse['data']>(path, {
        headers: {
          Authorization: `token ${get(storedToken)}`,
          accept: 'application/vnd.github.v3+json',
        },
        params: {
          ...params,
          q: encodeURIComponent(params.q),
        },
      })

      return data
    } catch {
      return [] as unknown as SearchResponse['data']
    }
  }

  const search = async (wordA: string, wordB: string): Promise<void> => {
    try {
      state.searchLoading = true
      const [resultA, resultB] = await Promise.all([
        searchCode({ q: wordA, per_page: 10 }),
        searchCode({ q: wordB, per_page: 10 }),
      ])

      state.resultRows = [resultA, resultB]
    } finally {
      state.searchLoading = false
    }
  }

  return {
    ...toRefs(state),
    counts,
    search,
    searchCode,
  }
}

import axios from 'axios'
import { reactive, computed } from 'vue'
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods'
import { toRefs, useLocalStorage } from '@vueuse/core'

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
  resultRaws: SearchResponse['data'][]
}

export function useGithub() {
  const storedToken = useLocalStorage<string>(accessTokenLocalStorageKey, null)

  const state = reactive<State>({
    searchLoading: false,
    resultRaws: [],
  })

  const counts = computed<SearchResult>(() => {
    return {
      countA: state.resultRaws.length > 0 ? state.resultRaws[0].total_count : 0,
      countB: state.resultRaws.length > 1 ? state.resultRaws[1].total_count : 0,
    }
  })

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

  const search = async (wordA: string, wordB: string): Promise<void> => {
    try {
      state.searchLoading = true
      const [resultA, resultB] = await Promise.all([
        searchCode({ q: wordA, per_page: 10 }),
        searchCode({ q: wordB, per_page: 10 }),
      ])

      state.resultRaws = [resultA, resultB]
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

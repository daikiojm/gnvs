<template>
  <div class="flex flex-col">
    <h3 class="text-center text-2xl mb-2 font-bold mt-10">gnvs</h3>
    <div class="flex justify-center">
      <router-link
        class="bg-light-300 py-2 px-2 border rounded border-light-800 flex"
        to="/authenticate"
        >Continue Auth</router-link
      >
    </div>
    <div class="flex px-10 mt-4">
      <SearchInput v-model="nameA" placeholder="word A" />
      <SearchInput v-model="nameB" placeholder="word B" />
    </div>
    <div class="flex items-center">
      <SearchButton @search="handleSubmit" />
    </div>
    <p class="mt-10 mx-auto">{{ counts }}</p>
    <div class="flex justify-center">
      <div
        v-for="(rows, index) in resultRows"
        :key="index"
        class="mt-10 mx-auto w-1/2"
      >
        <SearchResult :results="rows" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { get } from '@vueuse/core'

import SearchInput from '~/components/SearchInput.vue'
import SearchButton from '~/components/SearchButton.vue'
import SearchResult from '~/components/SearchResult.vue'
import { useGithub } from '~/composables/useGithub'

export default defineComponent({
  components: {
    SearchInput,
    SearchButton,
    SearchResult,
  },
  setup() {
    const nameA = ref<string>('')
    const nameB = ref<string>('')

    const { search, counts, resultRows } = useGithub()

    const handleSubmit = async () => {
      await search(get(nameA), get(nameB))
    }

    return {
      nameA,
      nameB,
      counts,
      resultRows,
      handleSubmit,
    }
  },
})
</script>

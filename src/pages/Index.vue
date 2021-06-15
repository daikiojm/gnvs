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
      <input
        v-model="nameA"
        type="text"
        placeholder="word A"
        class="
          bg-gray-200
          appearance-none
          border-2 border-gray-200
          rounded
          w-full
          py-2
          px-4
          text-gray-700
          leading-tight
          focus:outline-none
          focus:bg-white
          focus:border-purple-500
          focus:outline-none
          focus:bg-white
          focus:border-purple-500
          mr-2
        "
      />
      <input
        v-model="nameB"
        type="text"
        placeholder="word B"
        class="
          bg-gray-200
          appearance-none
          border-2 border-gray-200
          rounded
          w-full
          py-2
          px-4
          text-gray-700
          leading-tight
          focus:outline-none focus:bg-white focus:border-purple-500
          ml-2
        "
      />
    </div>
    <div class="flex items-center">
      <button
        class="
          shadow
          bg-purple-500
          hover:bg-purple-400
          focus:shadow-outline focus:outline-none
          text-white
          font-bold
          py-2
          px-4
          mx-auto
          mt-4
          rounded
        "
        type="button"
        @click="handleSubmit"
      >
        Search
      </button>
    </div>
    <p class="mt-10 mx-auto">{{ counts }}</p>
    <p class="mt-10 mx-auto">{{ resultRaws }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useGithub } from '~/composables/useGithub'

export default defineComponent({
  setup() {
    const nameA = ref<string>('')
    const nameB = ref<string>('')

    const { search, counts, resultRaws } = useGithub()

    const handleSubmit = async () => {
      await search(nameA.value, nameB.value)
    }

    return {
      nameA,
      nameB,
      counts,
      resultRaws,
      handleSubmit,
    }
  },
})
</script>

<template>
  <h3 class="text-center text-2xl mb-2 font-bold mt-10">gnvs</h3>
  <div class="flex justify-center">
    <button
      class="bg-light-300 py-2 px-2 border rounded border-light-800 flex"
      @click="handleAuthButtonClick"
    >
      <GithubIcon class="mr-2" />
      Continue with GitHub
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import GithubIcon from './components/GithubIcon.vue'

export default defineComponent({
  components: {
    GithubIcon,
  },
  setup() {
    const handleAuthButtonClick = () => {
      // eslint-disable-next-line no-alert
      alert('not implemented')
    }

    return {
      handleAuthButtonClick,
    }
  },
})
</script>

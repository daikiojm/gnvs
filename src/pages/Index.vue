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
import { computed, defineComponent, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import GithubIcon from '~/components/GithubIcon.vue'
import { useGithubAuth } from '~/composables/useGithubAuth'
import { useLogger } from '~/composables/useLogger'

export default defineComponent({
  components: {
    GithubIcon,
  },
  setup() {
    const route = useRoute()
    const logger = useLogger()
    const codeFromQuery = computed<string>(
      () => (route.query as { code: string }).code
    )
    const { openGithubAuthLink } = useGithubAuth()

    const handleAuthButtonClick = () => {
      openGithubAuthLink()
    }

    watch(codeFromQuery, () => {
      logger.info('codeFromQuery')
    })

    onMounted(() => {
      logger.info(route.query)
    })

    return {
      handleAuthButtonClick,
    }
  },
})
</script>

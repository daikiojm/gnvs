<template>
  <h3 class="text-center text-2xl mb-2 font-bold mt-10">gnvs</h3>
  <div class="flex justify-center">
    <button
      class="bg-light-300 py-2 px-2 flex"
      @click.prevent="handleAuthButtonClick"
    >
      <GithubIcon class="mr-2" />
      Continue with GitHub
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from '@vueuse/core'

import GithubIcon from '~/components/GithubIcon.vue'
import { useAuth } from '~/composables/useAuth'

export default defineComponent({
  components: {
    GithubIcon,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { authorize, authenticate } = useAuth()

    const codeFromQuery = computed<string>(
      () => (route.query as { code: string }).code
    )

    const handleAuthButtonClick = () => authorize()

    onMounted(async () => {
      const code = get(codeFromQuery)
      if (!code) {
        return
      }

      const token = await authenticate(code)
      if (token) {
        router.push('/')
      }
    })

    return {
      handleAuthButtonClick,
    }
  },
})
</script>

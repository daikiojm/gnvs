<template>
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
    @click.prevent="handleSubmit"
  >
    Search
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['search'],
  setup(_, { emit }) {
    const handleSubmit = () => {
      emit('search')
    }

    return {
      handleSubmit,
    }
  },
})
</script>

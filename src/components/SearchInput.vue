<template>
  <input
    v-model="value"
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
    type="text"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const value = useVModel(props, 'modelValue', emit)

    return {
      value,
    }
  },
})
</script>

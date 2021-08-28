<template>
  <ul>
    <li
      v-for="(row, index) in results.items"
      :key="index"
      class="overflow-hidden"
    >
      <figure class="bg-gray-100 rounded-xl p-4 m-4">
        <p>
          <span>Repository: </span>
          <a :href="row.repository.html_url" target="_blank">{{
            row.repository.full_name
          }}</a>
        </p>
        <p>
          <span>File: </span>
          <a :href="row.html_url" target="_blank">{{ row.name }}</a>
        </p>
      </figure>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    results: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

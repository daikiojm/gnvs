<template>
  <h3 class="text-center text-2xl mb-2 font-bold mt-10">gnvs</h3>
  <div class="flex justify-center">
    <p class="bg-light-300 py-2 px-2 border rounded border-light-800 flex">
      Hello
    </p>
    <router-link to="/authenticate">Continue Auth</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

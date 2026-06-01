<script setup>
import NavBar from './App/NavBar.vue'
const emit = defineEmits(['bookmarkCreated'])

const handleBookmarkCreated = () => {
  emit('bookmarkCreated')
}
</script>

<template>
  <div class="relative min-h-screen w-screen bg-gray-200 flex flex-col">
    <div class="w-full">
      <NavBar @bookmarkCreated="handleBookmarkCreated" />
    </div>
    <div class="flex-1 px-3 sm:px-6 bg-gray-100">
      <slot></slot>
    </div>
  </div>
</template>

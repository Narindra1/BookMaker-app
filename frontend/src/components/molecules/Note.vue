<script setup>
const stats = [
  { value: '250', label: 'Bookmarks' },
  { value: '10', label: 'Favoris' },
  { value: '25', label: 'Visited' },
]
</script>

<template>
  <div class="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-6">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="flex flex-col gap-1 border border-gray-100 text-xl rounded-2xl px-3 py-1 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <p class="text-gray-800 font-semibold tracking-tight">{{ stat.value }}</p>

      <div class="flex items-center gap-2 text-gray-600 mb-1">
        <span>{{ stat.label }}</span>
      </div>
    </div>
  </div>
</template>

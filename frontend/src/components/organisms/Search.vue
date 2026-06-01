<script setup>
const props = defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
  activeFilter: {
    type: String,
    default: 'recently-added',
  },
})

const emit = defineEmits(['update:searchQuery', 'update:activeFilter'])

const filters = [
  { key: 'recently-added', label: 'Recently Added', color: 'blue' },
  { key: 'favorites', label: 'Favorites', color: 'pink' },
  { key: 'most-visited', label: 'Most Visited', color: 'green' },
]

const colorMap = {
  blue: {
    active: 'border-blue-500 text-blue-500 bg-blue-50',
    inactive: 'border-gray-100 text-gray-400',
  },
  pink: {
    active: 'border-pink-500 text-pink-500 bg-pink-50',
    inactive: 'border-gray-100 text-gray-400',
  },
  green: {
    active: 'border-green-500 text-green-500 bg-green-50',
    inactive: 'border-gray-100 text-gray-400',
  },
}
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center px-4 pt-6 gap-4">
    <!-- Barre de recherche -->
    <div
      class="flex items-center gap-2 text-gray-500 border border-pink-500 rounded-xl p-2 w-full sm:w-auto"
    >
      <span>
        <i class="fa-solid fa-magnifying-glass text-iconeSearch"></i>
      </span>
      <input
        type="text"
        :value="searchQuery"
        @input="emit('update:searchQuery', $event.target.value)"
        class="focus:outline-none focus:border-none focus:ring-0 text-xl w-full"
        placeholder="Search /Ctrl + K"
      />
    </div>

    <!-- Filtres -->
    <div class="flex flex-wrap items-center gap-3">
      <p class="text-gray-500 text-lg hidden sm:block">Trié par :</p>
      <div class="flex flex-wrap gap-2">
        <p
          v-for="filter in filters"
          :key="filter.key"
          @click="emit('update:activeFilter', filter.key)"
          class="cursor-pointer border rounded-2xl px-3 py-2 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
          :class="
            activeFilter === filter.key
              ? colorMap[filter.color].active
              : colorMap[filter.color].inactive
          "
        >
          {{ filter.label }}
        </p>
      </div>
    </div>
  </div>
</template>

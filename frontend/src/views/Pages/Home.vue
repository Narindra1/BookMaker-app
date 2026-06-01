<script setup>
import { ref, onMounted, computed } from 'vue'

import AppLayout from '@/views/Layout/AppLayout.vue'
import Search from '@/components/organisms/Search.vue'
import Card from '@/components/organisms/Card.vue'
import { getBookmarks } from '@/services/bookmarkService'

const bookmarks = ref([])
const searchQuery = ref('')
const activeFilter = ref('recently-added')

const fetchBookmarks = async () => {
  try {
    const response = await getBookmarks()
    if (response.status) {
      bookmarks.value = response.data
    } else {
      console.log('Failed to fetch bookmarks')
    }
  } catch (error) {
    console.error(error)
  }
}

const filteredBookmarks = computed(() => {
  let result = [...bookmarks.value]

  // Filtre recherche
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      (b) => b.title.toLowerCase().includes(q) || b.url.toLowerCase().includes(q),
    )
  }

  // Filtre favoris
  if (activeFilter.value === 'favorites') {
    result = result.filter((b) => b.isFavourite)
  }

  // Tri
  if (activeFilter.value === 'recently-added') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else if (activeFilter.value === 'most-visited') {
    result.sort((a, b) => b.visitCount - a.visitCount)
  } else if (activeFilter.value === 'favorites') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return result
})

onMounted(() => {
  fetchBookmarks()
})
</script>

<template>
  <AppLayout @bookmarkCreated="fetchBookmarks">
    <Search v-model:searchQuery="searchQuery" v-model:activeFilter="activeFilter" />
    <Card :bookmarks="filteredBookmarks" />
  </AppLayout>
</template>

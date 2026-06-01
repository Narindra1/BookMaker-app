<script setup>
import { onMounted, watch, ref } from 'vue'
import { deleteBookmark, updateBookmark } from '@/services/bookmarkService'
import { formatDate } from '@/services/formatageDate'
import { getBookmarkColor } from '@/services/color'
import EditBookmarkModal from './EditBookmarkModal.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const showEdit = ref(false)
const selectedBookmark = ref(null)
const localBookmarks = ref([])
const props = defineProps({
  bookmarks: {
    type: Array,
    required: true,
  },
})
// onMounted(() => {
//   localBookmarks.value = props.bookmarks
//   console.log('Bookmarks in Card component:', localBookmarks.value)
// })

watch(
  () => props.bookmarks,
  (newBookmarks) => {
    localBookmarks.value = newBookmarks
  },
  { immediate: true },
)

const handleDeleteBookmark = async (id) => {
  try {
    const { status } = await deleteBookmark(id)
    if (status) {
      localBookmarks.value = localBookmarks.value.filter((bookmark) => bookmark._id !== id)
      toast.success('Bookmark deleted successfully')
    } else {
      toast.error('Failed to delete bookmark')
    }
  } catch (error) {
    console.error('Error deleting bookmark:', error)
    toast.error('Runtime error')
  }
}
function openEdit(bookmark) {
  selectedBookmark.value = bookmark
  showEdit.value = true
}
const handleUpdateBookmark = async (id, updatedData) => {
  try {
    const { status } = await updateBookmark(id, updatedData) //40s
    if (status) {
      const index = localBookmarks.value.findIndex((b) => b._id === updatedData._id)
      if (index !== -1) {
        localBookmarks.value[index] = { ...localBookmarks.value[index], ...updatedData }
      }
      toast.success('Bookmark updated successfully')
    } else {
      toast.error('Failed to update bookmark')
    }
  } catch (error) {
    console.error('Error updating bookmark:', error)
    toast.error('runtime error')
  }
}
</script>

<template>
  <div class="px-4 pt-4">
    <div
      class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto"
      style="height: calc(100vh - 200px)"
    >
      <div
        v-for="(item, index) in localBookmarks"
        :key="item._id"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 sm:px-5 py-3.5 hover:bg-gray-50 transition-colors group cursor-pointer"
        :class="index !== localBookmarks.length - 1 ? 'border-b border-gray-100' : ''"
      >
        <!-- Ligne principale : icône + titre + actions mobile -->
        <div class="flex items-center gap-3 sm:contents w-full">
          <!-- Favicon (première lettre du title) -->
          <div
            :class="[getBookmarkColor(index).bg, getBookmarkColor(index).text]"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-semibold flex-shrink-0"
          >
            {{ item.title.charAt(0) }}
          </div>

          <!-- title + url -->
          <div class="flex-1 min-w-0">
            <p class="text-gray-800 text-base sm:text-lg font-medium truncate">{{ item.title }}</p>
            <a
              :href="item.url"
              class="text-gray-400 text-xs sm:text-sm truncate block max-w-full"
              >{{ item.url }}</a
            >
          </div>

          <!-- Actions : visibles en permanence sur mobile (à droite), au survol sur sm+ -->
          <div
            class="flex items-center gap-1 text-gray-400 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0 sm:hidden"
          >
            <button class="hover:text-blue-600 p-1.5" @click="openEdit(item)">
              <i class="fa-solid fa-pen text-sm"></i>
            </button>
            <button class="hover:text-red-600 p-1.5" @click="handleDeleteBookmark(item._id)">
              <i class="fa-solid fa-trash text-sm"></i>
            </button>
            <a :href="item.url" target="_blank" class="hover:text-gray-600 p-1.5">
              <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Ligne secondaire sur mobile : badges -->
        <div class="flex items-center gap-2 pl-11 sm:hidden flex-wrap">
          <!-- category -->
          <span
            v-if="item.category"
            class="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500"
          >
            {{ item.category }}
          </span>
          <!-- isFavourite -->
          <i
            class="fa-heart text-xs"
            :class="item.isFavourite ? 'fa-solid text-pink-500' : 'fa-regular text-gray-300'"
          ></i>
          <!-- visitCount -->
          <span class="text-xs text-gray-400">
            <i class="fa-solid fa-eye text-xs mr-1"></i>{{ item.visitCount }}
          </span>
        </div>

        <!-- Colonnes sm+ uniquement -->
        <!-- category -->
        <span
          class="hidden sm:inline text-sm px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 flex-shrink-0"
        >
          {{ item.category }}
        </span>

        <!-- isFavourite -->
        <i
          class="fa-heart flex-shrink-0 text-sm hidden sm:block"
          :class="item.isFavourite ? 'fa-solid text-pink-500' : 'fa-regular text-gray-300'"
        ></i>

        <!-- visitCount -->
        <span class="text-sm text-gray-400 flex-shrink-0 w-12 text-right hidden md:block">
          <i class="fa-solid fa-eye text-sm mr-1"></i>{{ item.visitCount }}
        </span>

        <!-- createdAt -->
        <span class="text-sm text-gray-400 flex-shrink-0 hidden lg:block">
          {{ formatDate(item.createdAt) }}
        </span>

        <!-- Actions sm+ : au survol -->
        <div
          class="hidden sm:flex items-center gap-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        >
          <button class="hover:text-blue-600 p-1" @click="openEdit(item)">
            <i class="fa-solid fa-pen text-sm"></i>
          </button>
          <button class="hover:text-red-600 p-1" @click="handleDeleteBookmark(item._id)">
            <i class="fa-solid fa-trash text-sm"></i>
          </button>
          <a :href="item.url" target="_blank" class="hover:text-gray-500 p-1">
            <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
          </a>
        </div>

        <EditBookmarkModal
          :isOpen="showEdit"
          :bookmark="selectedBookmark"
          @close="showEdit = false"
          @save="handleUpdateBookmark(selectedBookmark._id, $event)"
        />
      </div>
      <!-- <div
        class="flex gap-5 items-center justify-center border-t-1 border-gray-100 text-lg py-3 bg-white text-pink-500 hover:text-red-600 cursor-pointer"
      >
        <p>View All</p>
        <i class="fa-solid fa-arrow-right"></i>
      </div> -->
    </div>
  </div>
</template>
<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

.overflow-y-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>

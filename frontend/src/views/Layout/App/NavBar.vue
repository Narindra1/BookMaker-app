<script setup>
import CreateBookmarkModal from '@/components/organisms/CreateBookmarkModal.vue'
import { createBookmark } from '@/services/bookmarkService'
import { useToast } from 'vue-toastification'

import { ref } from 'vue'
const showCreate = ref(false)
const showMobileMenu = ref(false)
const emit = defineEmits(['bookmarkCreated'])
const handleCreateBookmark = async (data) => {
  try {
    const { status } = await createBookmark(data)

    if (status) {
      emit('bookmarkCreated')
      showCreate.value = false
      useToast().success('Bookmark created successfully')
    } else {
      useToast().error('Failed to create bookmark')
    }
  } catch (error) {
    console.error('Error creating bookmark:', error)
  }
}
</script>
<template>
  <div class="bg-gray-150 border-b border-gray-200">
    <!-- Main navbar row -->
    <div class="p-4 flex items-center justify-between">
      <!-- Left: logo + nav links -->
      <div class="left navbar flex items-center gap-6 px-2">
        <div
          class="bg-pink-500 p-3 rounded-xl text-xl text-gray-200 flex items-center flex-shrink-0"
        >
          <i class="fa-regular fa-bookmark"></i>
        </div>
        <!-- Nav links: hidden on mobile -->
        <div class="hidden md:flex gap-8 items-center">
          <a
            href="/"
            class="group relative flex gap-3 items-center px-2 py-1 text-gray-500 hover:text-pink-500 transition"
          >
            <i class="fa-solid fa-house"></i>
            <p class="text-xl">Home</p>
            <span
              class="absolute left-0 -top-1 h-[2px] w-0 bg-pink-500 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            href="/"
            class="group relative flex gap-3 items-center px-2 py-1 text-gray-500 hover:text-pink-500 transition"
          >
            <i class="fa-solid fa-bookmark"></i>
            <p class="text-xl">All bookmarks</p>
            <span
              class="absolute left-0 -top-1 h-[2px] w-0 bg-pink-500 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            href="/"
            class="group relative flex gap-3 items-center px-2 py-1 text-gray-500 hover:text-pink-500 transition"
          >
            <i class="fa-solid fa-trash-can"></i>
            <p class="text-xl">Bin</p>
            <span
              class="absolute left-0 -top-1 h-[2px] w-0 bg-pink-500 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
        </div>
      </div>

      <!-- Right: actions -->
      <div class="right navbar flex items-center gap-3 sm:gap-6">
        <!-- Add bookmark button: full text on sm+, icon only on mobile -->
        <button
          @click="showCreate = true"
          class="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-medium px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-colors active:scale-95"
        >
          <i class="fa-solid fa-plus text-base"></i>
          <span class="hidden sm:inline text-base">Add bookmark</span>
        </button>

        <CreateBookmarkModal
          :isOpen="showCreate"
          @close="showCreate = false"
          @save="handleCreateBookmark"
        />

        <!-- Avatar -->
        <div
          class="flex items-center text-sm gap-2 text-gray-500 border border-pink-500 p-2 rounded-full"
        >
          <i class="fa-regular fa-user"></i>
        </div>

        <!-- Hamburger: visible on mobile only -->
        <button
          @click="showMobileMenu = !showMobileMenu"
          class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 transition"
        >
          <i class="fa-solid" :class="showMobileMenu ? 'fa-xmark' : 'fa-bars'"></i>
        </button>
      </div>
    </div>

    <!-- Mobile menu dropdown -->
    <div
      v-if="showMobileMenu"
      class="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-3 bg-white"
    >
      <a
        href="/"
        class="flex gap-3 items-center px-2 py-2 text-gray-500 hover:text-pink-500 transition rounded-lg hover:bg-gray-50"
      >
        <i class="fa-solid fa-house"></i>
        <p class="text-lg">Home</p>
      </a>
      <a
        href="/"
        class="flex gap-3 items-center px-2 py-2 text-gray-500 hover:text-pink-500 transition rounded-lg hover:bg-gray-50"
      >
        <i class="fa-solid fa-bookmark"></i>
        <p class="text-lg">All bookmarks</p>
      </a>
      <a
        href="/"
        class="flex gap-3 items-center px-2 py-2 text-gray-500 hover:text-pink-500 transition rounded-lg hover:bg-gray-50"
      >
        <i class="fa-solid fa-trash-can"></i>
        <p class="text-lg">Bin</p>
      </a>
    </div>
  </div>
</template>

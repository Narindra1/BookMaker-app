<script setup>
import { ref } from 'vue'

defineProps({ isOpen: Boolean })
const emit = defineEmits(['close', 'save'])

const categories = ['Design', 'UI/UX', 'Productivity', 'Inspiration', 'Tools']

const form = ref({
  title: '',
  url: '',
  category: '',
  isFavourite: false,
})

function save() {
  if (!form.value.title || !form.value.url) return
  emit('save', { ...form.value })
  emit('close')
  // Reset
  form.value = { title: '', url: '', category: '', isFavourite: false }
}
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div
      class="bg-white rounded-2xl border border-gray-100 w-full max-w-md mx-4 sm:mx-0 overflow-hidden"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
            <i class="fa-solid fa-bookmark text-pink-500 text-sm"></i>
          </div>
          <div>
            <p class="text-xl font-medium text-gray-800">New bookmark</p>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="w-7 h-7 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-300"
        >
          <i class="fa-solid fa-xmark text-sm"></i>
        </button>
      </div>

      <!-- Fields -->
      <div class="px-5 py-4 flex flex-col gap-4">
        <!-- Title -->
        <div>
          <label class="text-lg text-gray-600 mb-1.5 flex items-center gap-1">
            <i class="fa-solid fa-i-cursor text-sm"></i> Title
            <span class="text-red-400">*</span>
          </label>
          <input
            v-model="form.title"
            type="text"
            placeholder=""
            class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400"
          />
        </div>

        <!-- URL -->
        <div>
          <label class="text-lg text-gray-600 mb-1.5 flex items-center gap-1">
            <i class="fa-solid fa-link text-sm"></i> URL
            <span class="text-red-400">*</span>
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400"></span>
            <input
              v-model="form.url"
              type="text"
              placeholder=""
              class="w-full border border-gray-200 rounded-xl pl-14 pr-3 py-2 text-sm outline-none focus:border-pink-400"
            />
          </div>
        </div>

        <!-- Category -->
        <div>
          <label class="text-lg text-gray-600 mb-1.5 flex items-center gap-1">
            <i class="fa-solid fa-tag text-sm"></i> Category
          </label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="cat in categories"
              :key="cat"
              @click="form.category = cat"
              :class="
                form.category === cat
                  ? 'bg-pink-50 text-pink-600 border-pink-300'
                  : 'bg-gray-50 text-gray-500 border-gray-200'
              "
              class="text-xs px-3 py-1 my-2 rounded-full border cursor-pointer transition-colors"
            >
              {{ cat }}
            </span>
          </div>
          <input
            v-model="form.category"
            type="text"
            class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400"
          />
        </div>

        <!-- Toggle favori -->
        <div
          class="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
        >
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-heart text-pink-400"></i>
            <div>
              <p class="text-lg font-medium text-gray-700">Add to favorites</p>
            </div>
          </div>
          <button
            @click="form.isFavourite = !form.isFavourite"
            :class="form.isFavourite ? 'bg-pink-500' : 'bg-gray-200'"
            class="w-9 h-5 rounded-full relative transition-colors"
          >
            <span
              :class="form.isFavourite ? 'left-4' : 'left-0.5'"
              class="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all"
            ></span>
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex gap-2 px-5 py-4 border-t border-gray-100">
        <button
          @click="$emit('close')"
          class="flex-1 text-lg py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          @click="save"
          :disabled="!form.title || !form.url"
          class="flex-1 items-center text-lg py-2 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:bg-pink-200 text-white font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <i class="fa-solid fa-plus text-sm"></i> Create
        </button>
      </div>
    </div>
  </div>
</template>

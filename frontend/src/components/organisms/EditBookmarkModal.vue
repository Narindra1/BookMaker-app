<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  bookmark: Object,
})
const emit = defineEmits(['close', 'save'])

const form = ref({ title: '', url: '', category: '', isFavourite: false })

// Met à jour le form quand le bookmark change
watch(
  () => props.bookmark,
  (val) => {
    if (val) form.value = { ...val }
  },
  { immediate: true },
)

function save() {
  emit('save', { ...form.value })
  emit('close')
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
          <div
            class="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-medium text-lg"
          >
            {{ form.title.charAt(0).toUpperCase() }}
          </div>
          <div>
            <p class="text-lg font-medium text-gray-800">Edit bookmark</p>
            <p class="text-base text-gray-400">{{ form.url }}</p>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="w-7 h-7 rounded-lg bHeaorder border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200"
        >
          <i class="fa-solid fa-xmark text-sm"></i>
        </button>
      </div>

      <!-- Fields -->
      <div class="px-5 py-4 flex flex-col gap-4">
        <div>
          <label class="text-lg text-gray-700 mb-1.5 block">Title</label>
          <input
            v-model="form.title"
            type="text"
            class="w-full border border-gray-200 rounded-xl px-3 py-2 text-base outline-none focus:border-pink-400"
          />
        </div>

        <!-- URL non modifiable -->
        <div>
          <label class="text-lg text-gray-700 mb-1.5 block"> URL </label>
          <input
            :value="form.url"
            type="text"
            disabled
            class="w-full border border-gray-100 rounded-xl px-3 py-2 text-base bg-gray-50 text-gray-400"
          />
        </div>

        <div>
          <label class="text-lg text-gray-700 mb-1.5 block">Category</label>
          <input
            v-model="form.category"
            type="text"
            class="w-full border border-gray-200 rounded-xl px-3 py-2 text-base outline-none focus:border-pink-400"
          />
        </div>

        <!-- Toggle favori -->
        <div
          class="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
        >
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-heart text-pink-400"></i>
            <div>
              <p class="text-lg font-medium text-gray-700">Favourite</p>
              <p class="text-base text-gray-500">Ajouter aux favoris</p>
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
          Annuler
        </button>
        <button
          @click="save"
          class="flex-1 text-lg py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-medium"
        >
          <i class="fa-solid fa-check text-lg mr-1"></i> Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

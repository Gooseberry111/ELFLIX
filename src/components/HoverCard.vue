<template>
  <div
    class="absolute top-0 left-0 w-[320px] bg-[#181818] rounded-lg overflow-hidden shadow-2xl"
  >
    <img
      :src="movie.image"
      :alt="movie.title"
      class="w-full h-45 object-cover"
    />

    <div class="p-4">
      <div class="flex justify-between items-center mb-4">
        <div class="flex gap-2">
          <button
            class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
          >
            ▶
          </button>

          <button
            class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center"
          >
            +
          </button>

          <button
            class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center"
          >
            👍
          </button>
        </div>

        <button
          class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center"
        >
          ▼
        </button>
      </div>

      <div class="flex gap-3 text-sm mb-3">
        <span class="text-green-500 font-semibold"> 98% Match </span>

        <span>2025</span>

        <span class="border border-gray-500 px-1 text-xs"> HD </span>
      </div>

      <p class="text-sm text-gray-300">Action • Adventure • Drama</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movie: Object,
});
</script>

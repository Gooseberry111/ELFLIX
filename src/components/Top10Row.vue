<script setup>
import { ref } from "vue";
import Top10Card from "./Top10Card.vue";

defineProps({
  title: String,
  movies: Array,
});

const rowRef = ref(null);

const scrollLeft = () => {
  rowRef.value.scrollBy({ left: -600, behavior: "smooth" });
};

const scrollRight = () => {
  rowRef.value.scrollBy({ left: 600, behavior: "smooth" });
};
</script>

<template>
  <section class="relative px-4 md:px-12 mt-1 mb-8 group">
    <h2 class="text-base font-semibold mb-2 text-white">{{ title }}</h2>

    <!-- Left Arrow -->
    <button
      @click="scrollLeft"
      class="absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/80"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <!-- Cards -->
    <div
      ref="rowRef"
      class="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth"
      style="padding-bottom: 16px"
    >
      <Top10Card
        v-for="(movie, index) in movies.slice(0, 10)"
        :key="movie.id"
        :movie="movie"
        :index="index"
      />
    </div>

    <!-- Right Arrow -->
    <button
      @click="scrollRight"
      class="absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/80"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { IMG_BASE } from "../composables/useMovies";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  movie: Object,
  index: Number,
});

const cardRef = ref(null);
const showDetails = ref(false);
let hoverTimer = null;

const handleEnter = () => {
  hoverTimer = setTimeout(() => {
    showDetails.value = true;
  }, 400);
};

const handleLeave = () => {
  clearTimeout(hoverTimer);
  showDetails.value = false;
};
</script>

<template>
  <div
    ref="cardRef"
    class="relative shrink-0 flex items-center cursor-pointer"
    style="width: 200px"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @click="router.push('/movie/' + movie.id)"
  >
    <!-- Big Number -->
    <div
      :class="index === 9 ? 'text-[100px]' : 'text-[160px]'"
      class="font-black leading-none select-none"
      style="
        color: transparent;
        -webkit-text-stroke: 3px #444;
        margin-right: -24px;
        z-index: 0;
        font-family: sans-serif;
      "
    >
      {{ index + 1 }}
    </div>

    <!-- Card Image -->
    <div
      :class="[
        'relative transition-all duration-300 z-10',
        showDetails ? 'scale-110' : 'scale-100',
      ]"
      style="width: 120px; shrink: 0"
    >
      <img
        :src="
          movie.poster_path
            ? IMG_BASE + movie.poster_path
            : 'https://via.placeholder.com/120x180?text=No+Image'
        "
        :alt="movie.title || movie.name"
        class="w-full rounded-md object-cover"
        style="aspect-ratio: 2/3"
      />
    </div>
  </div>
</template>

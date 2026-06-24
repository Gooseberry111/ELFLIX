<script setup>
import { computed, ref } from "vue";
import { IMG_BASE } from "../composables/useMovies";
import { useRouter } from "vue-router";
import { Play, Plus, ThumbsUp, ChevronDown, X } from "lucide-vue-next";
import { useMyList } from "../composables/useMyList";

const { isInList, toggleList } = useMyList();
const router = useRouter();

const props = defineProps({
  movie: Object,
  title: String,
  image: String,
  index: Number,
  total: Number,
});

const showDetails = ref(false);
const cardRef = ref(null);
const popupStyle = ref({});
let hoverTimer = null;

// Detect touch device
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

const matchScore = computed(() => {
  if (!props.movie?.vote_average) return "N/A";
  return Math.round(props.movie.vote_average * 10);
});

const releaseYear = computed(() => {
  const date = props.movie?.release_date || props.movie?.first_air_date;
  if (!date) return "N/A";
  return date.slice(0, 4);
});

const handleEnter = () => {
  // Skip hover popup on touch devices
  if (isTouchDevice) return;

  hoverTimer = setTimeout(() => {
    const rect = cardRef.value.getBoundingClientRect();
    const popupWidth = rect.width * 1.8;

    let left = rect.left + rect.width / 2 - popupWidth / 2;
    if (left < 16) left = 16;
    if (left + popupWidth > window.innerWidth - 16) {
      left = window.innerWidth - popupWidth - 16;
    }

    const estimatedHeight = 280;
    let top = rect.top + rect.height / 2 - estimatedHeight / 2;

    if (top < 70) top = 70;
    if (top + estimatedHeight > window.innerHeight - 16) {
      top = window.innerHeight - estimatedHeight - 16;
    }

    popupStyle.value = {
      position: "fixed",
      top: `${top}px`,
      left: `${left}px`,
      width: `${popupWidth}px`,
      zIndex: 9999,
    };

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
    class="relative shrink-0 cursor-pointer"
    style="width: calc(100% / 6 - 4px); min-width: 140px"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @click="router.push('/movie/' + movie.id)"
  >
    <!-- Base card — portrait poster, no title overlay -->
    <div class="relative w-full">
      <img
        :src="
          image
            ? IMG_BASE + image
            : 'https://via.placeholder.com/300x450?text=No+Image'
        "
        :alt="title"
        class="w-full aspect-[2/3] object-cover rounded-sm"
      />
    </div>

    <!-- Teleport popup to body -->
    <Teleport to="body">
      <Transition name="popup">
        <div
          v-if="showDetails"
          :style="popupStyle"
          class="shadow-2xl rounded-md overflow-hidden cursor-pointer"
          @click="router.push('/movie/' + movie.id)"
          @mouseenter="showDetails = true"
          @mouseleave="handleLeave"
        >
          <!-- Popup uses backdrop image for cinematic feel -->
          <img
            :src="
              movie.backdrop_path
                ? IMG_BASE + movie.backdrop_path
                : image
                  ? IMG_BASE + image
                  : 'https://via.placeholder.com/300x170?text=No+Image'
            "
            :alt="title"
            class="w-full object-cover"
            style="height: 140px"
          />

          <!-- Details Panel -->
          <div class="bg-[#181818] px-3 pt-3 pb-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <button
                  class="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition"
                  @click.stop="router.push('/movie/' + movie.id)"
                >
                  <Play :size="14" fill="black" />
                </button>
                <button
                  class="w-9 h-9 rounded-full border-2 text-white flex items-center justify-center transition"
                  :class="
                    isInList(movie.id)
                      ? 'border-white bg-white/20'
                      : 'border-gray-500 hover:border-white'
                  "
                  @click.stop="toggleList(movie)"
                >
                  <Plus v-if="!isInList(movie.id)" :size="16" />
                  <X v-else :size="14" />
                </button>
                <button
                  class="w-9 h-9 rounded-full border-2 border-gray-500 text-white flex items-center justify-center hover:border-white transition"
                  @click.stop
                >
                  <ThumbsUp :size="14" />
                </button>
              </div>
              <button
                class="w-9 h-9 rounded-full border-2 border-gray-500 text-white flex items-center justify-center hover:border-white transition"
                @click.stop="router.push('/movie/' + movie.id)"
              >
                <ChevronDown :size="16" />
              </button>
            </div>

            <div class="flex items-center gap-2 text-xs mb-2">
              <span class="text-green-500 font-bold"
                >{{ matchScore }}% Match</span
              >
              <span class="text-gray-300">{{ releaseYear }}</span>
              <span
                class="border border-gray-500 px-1 text-gray-400 text-[10px]"
                >HD</span
              >
            </div>

            <p class="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
              {{ movie.overview }}
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.popup-enter-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.popup-leave-active {
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;
}
.popup-enter-from {
  transform: scale(0.9);
  opacity: 0;
}
.popup-enter-to {
  transform: scale(1);
  opacity: 1;
}
.popup-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>

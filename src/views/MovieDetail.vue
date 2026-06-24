<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMovies, BACKDROP_BASE, IMG_BASE } from "../composables/useMovies";
import Navbar from "../components/Navbar.vue";
import MovieRow from "../components/MovieRow.vue";
import { Play, Plus, X } from "lucide-vue-next";
import { ChevronLeft } from "lucide-vue-next";
import { useMyList } from "../composables/useMyList.js";

const route = useRoute();
const router = useRouter();
const { fetchMovies } = useMovies();
const { isInList, toggleList } = useMyList();
const movie = ref(null);
const similar = ref([]);

const fetchMovieDetail = async (id) => {
  const API_KEY = import.meta.env.VITE_TMDB_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
  );
  movie.value = await res.json();
};
const trailer = ref(null);
const showTrailer = ref(false);

const fetchTrailer = async (id) => {
  const API_KEY = import.meta.env.VITE_TMDB_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`,
  );
  const data = await res.json();
  const yt = data.results?.find(
    (v) =>
      v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
  );
  if (yt) trailer.value = yt.key;
};

onMounted(async () => {
  const id = route.params.id;
  if (!id) {
    router.push("/");
    return;
  }
  await fetchMovieDetail(id);
  await fetchTrailer(id);
  similar.value = await fetchMovies(`/movie/${id}/similar?`);
});

watch(
  () => route.params.id,
  async (newId) => {
    if (!newId) return;
    movie.value = null;
    similar.value = [];
    trailer.value = null;
    showTrailer.value = false;
    await fetchMovieDetail(newId);
    await fetchTrailer(newId);
    similar.value = await fetchMovies(`/movie/${newId}/similar?`);
  },
);

const runtime = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
};
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-white">
    <Navbar />
    <button
      @click="router.back()"
      class="fixed top-20 left-6 z-40 bg-black/60 hover:bg-black/90 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm transition backdrop-blur-sm"
    >
      <ChevronLeft :size="18" /> Back
    </button>

    <div v-if="movie">
      <!-- Backdrop -->
      <div
        class="relative h-[70vh] bg-cover bg-center"
        :style="{
          backgroundImage: `url(${BACKDROP_BASE + movie.backdrop_path})`,
        }"
      >
        <div class="absolute inset-0 bg-black/50"></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"
        ></div>
      </div>

      <!-- Details -->
      <div class="px-12 -mt-32 relative z-10 flex gap-10">
        <!-- Poster -->
        <img
          :src="IMG_BASE + movie.poster_path"
          :alt="movie.title"
          class="w-52 rounded-lg shadow-2xl shrink-0 hidden md:block"
        />

        <!-- Info -->
        <div class="flex flex-col justify-end pb-4">
          <h1 class="text-5xl font-bold mb-4">{{ movie.title }}</h1>

          <!-- Metadata row -->
          <div class="flex items-center gap-4 text-sm mb-4">
            <span class="text-green-500 font-semibold text-base">
              {{
                movie.vote_average
                  ? Math.round(movie.vote_average * 10)
                  : "N/A"
              }}% Match
            </span>
            <span>{{ movie.release_date?.slice(0, 4) }}</span>
            <span
              v-if="movie.runtime"
              class="border border-gray-500 px-2 py-0.5"
            >
              {{ runtime(movie.runtime) }}
            </span>
            <span class="border border-gray-500 px-2 py-0.5 text-xs">HD</span>
          </div>

          <!-- Overview -->
          <p class="text-gray-300 max-w-2xl mb-6 leading-relaxed">
            {{ movie.overview }}
          </p>

          <!-- Genres -->
          <div class="flex gap-2 flex-wrap mb-6">
            <span
              v-for="genre in movie.genres"
              :key="genre.id"
              class="border border-gray-500 px-3 py-1 rounded-full text-sm text-gray-300"
            >
              {{ genre.name }}
            </span>
          </div>

          <!-- Buttons -->
          <div class="flex gap-4">
            <button
              @click="showTrailer = true"
              class="bg-white text-black px-8 py-2 rounded font-semibold hover:bg-gray-200 flex items-center gap-2 transition"
            >
              <Play :size="18" fill="black" /> Play Trailer
            </button>
            <button
              @click="toggleList(movie)"
              class="bg-gray-500/70 px-8 py-2 rounded hover:bg-gray-400/70 flex items-center gap-2 transition"
            >
              <Plus v-if="!isInList(movie.id)" :size="18" />
              <X v-else :size="18" />
              {{ isInList(movie.id) ? "Remove from List" : "My List" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Similar Movies -->
      <div class="mt-16">
        <MovieRow
          v-if="similar.length"
          title="More Like This"
          :movies="similar"
        />
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="flex items-center justify-center h-screen">
      <p class="text-gray-400 text-xl animate-pulse">Loading...</p>
    </div>
    <!-- Trailer Modal -->
    <Transition name="fade">
      <div
        v-if="showTrailer && trailer"
        class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        @click.self="showTrailer = false"
      >
        <div class="relative w-full max-w-4xl mx-4">
          <button
            @click="showTrailer = false"
            class="absolute -top-10 right-0 text-white hover:text-gray-300 flex items-center gap-2 text-sm"
          >
            <X :size="18" /> Close
          </button>
          <div class="aspect-video w-full">
            <iframe
              :src="`https://www.youtube.com/embed/${trailer}?autoplay=1`"
              class="w-full h-full rounded-lg"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

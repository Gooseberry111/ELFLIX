<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMovies, IMG_BASE } from "../composables/useMovies";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

const route = useRoute();
const router = useRouter();
const { fetchMovies } = useMovies();

const results = ref([]);
const loading = ref(false);
const query = ref(route.query.q || "");

const search = async (q) => {
  if (!q) return;
  loading.value = true;
  results.value = await fetchMovies(`/search/movie?query=${q}&`);
  loading.value = false;
};

onMounted(() => search(query.value));

// Re-search if the query changes in the URL
watch(
  () => route.query.q,
  (newQ) => {
    query.value = newQ;
    search(newQ);
  },
);
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-white">
    <Navbar />

    <div class="px-12 pt-32">
      <h2 class="text-2xl font-semibold mb-8">
        Results for
        <span class="text-white font-bold">"{{ query }}"</span>
      </h2>

      <!-- Loading -->
      <div
        v-if="loading"
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div
          v-for="n in 12"
          :key="n"
          class="bg-gray-800 rounded-md h-44 animate-pulse"
        ></div>
      </div>

      <!-- Results Grid -->
      <div
        v-else-if="results.length"
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div
          v-for="movie in results"
          :key="movie.id"
          class="cursor-pointer group"
          @click="router.push('/movie/' + movie.id)"
        >
          <div class="relative overflow-hidden rounded-md">
            <img
              :src="
                movie.poster_path
                  ? IMG_BASE + movie.poster_path
                  : 'https://via.placeholder.com/500x281?text=No+Image'
              "
              :alt="movie.title"
              class="w-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-md"
            ></div>
          </div>
          <p
            class="text-sm mt-2 text-gray-300 group-hover:text-white transition truncate"
          >
            {{ movie.title }}
          </p>
        </div>
      </div>

      <!-- No Results -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-32 text-gray-400"
      >
        <p class="text-2xl mb-2">No results found</p>
        <p class="text-sm">Try a different title or keyword</p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useMyList } from "../composables/useMyList";
import { IMG_BASE } from "../composables/useMovies";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { X } from "lucide-vue-next";

const router = useRouter();
const { myList, removeFromList } = useMyList();
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-white">
    <Navbar />

    <div class="px-12 pt-32">
      <h2 class="text-3xl font-bold mb-8">My List</h2>

      <!-- Empty state -->
      <div
        v-if="myList.length === 0"
        class="flex flex-col items-center justify-center py-32 text-gray-400"
      >
        <p class="text-2xl mb-2">Your list is empty</p>
        <p class="text-sm mb-6">Add movies and shows to watch later</p>
        <button
          @click="router.push('/')"
          class="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          Browse Elflix
        </button>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="movie in myList"
          :key="movie.id"
          class="cursor-pointer group relative"
        >
          <div
            class="relative overflow-hidden rounded-md"
            @click="router.push('/movie/' + movie.id)"
          >
            <img
              :src="
                movie.poster_path
                  ? IMG_BASE + movie.poster_path
                  : 'https://via.placeholder.com/300x170?text=No+Image'
              "
              :alt="movie.title || movie.name"
              class="w-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-md"
            ></div>
          </div>

          <!-- Remove button -->
          <button
            @click="removeFromList(movie.id)"
            class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
          >
            <X :size="14" />
          </button>

          <p
            class="text-sm mt-2 text-gray-300 group-hover:text-white transition truncate"
          >
            {{ movie.title || movie.name }}
          </p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

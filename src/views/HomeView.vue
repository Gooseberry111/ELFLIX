<script setup>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import HeroBanner from "../components/HeroBanner.vue";
import MovieRow from "../components/MovieRow.vue";
import { useMovies, BACKDROP_BASE } from "../composables/useMovies";
import Footer from "../components/Footer.vue";
import SkeletonRow from "../components/SkeletonRow.vue";
import Top10Row from "../components/Top10Row.vue";

const { fetchMovies } = useMovies();

const trending = ref([]);
const topRated = ref([]);
const actionMovies = ref([]);
const comedyMovies = ref([]);
const horrorMovies = ref([]);
const romanceMovies = ref([]);
const documentaries = ref([]);
const tvShows = ref([]);
const heroMovie = ref(null);
const loading = ref(true);

onMounted(async () => {
  const [
    trendingData,
    topRatedData,
    actionData,
    comedyData,
    horrorData,
    romanceData,
    docsData,
    tvData,
  ] = await Promise.all([
    fetchMovies("/trending/movie/week?"),
    fetchMovies("/movie/top_rated?"),
    fetchMovies("/discover/movie?with_genres=28&"),
    fetchMovies("/discover/movie?with_genres=35&"),
    fetchMovies("/discover/movie?with_genres=27&"),
    fetchMovies("/discover/movie?with_genres=10749&"),
    fetchMovies("/discover/movie?with_genres=99&"),
    fetchMovies("/trending/tv/week?"),
  ]);

  trending.value = trendingData;
  topRated.value = topRatedData;
  actionMovies.value = actionData;
  comedyMovies.value = comedyData;
  horrorMovies.value = horrorData;
  romanceMovies.value = romanceData;
  documentaries.value = docsData;
  tvShows.value = tvData;
  heroMovie.value = trendingData[0];
  loading.value = false;
});
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-white overflow-x-hidden">
    <Navbar />

    <!-- Hero Skeleton -->
    <div v-if="loading" class="relative h-[80vh] bg-gray-800 animate-pulse">
      <div class="absolute bottom-20 left-12 flex flex-col gap-4">
        <div class="h-12 w-96 bg-gray-700 rounded"></div>
        <div class="h-4 w-80 bg-gray-700 rounded"></div>
        <div class="h-4 w-72 bg-gray-700 rounded"></div>
        <div class="flex gap-4 mt-2">
          <div class="h-10 w-24 bg-gray-700 rounded"></div>
          <div class="h-10 w-24 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Real Hero -->
    <HeroBanner
      v-else-if="heroMovie"
      :title="heroMovie.title"
      :overview="heroMovie.overview"
      :image="BACKDROP_BASE + heroMovie.backdrop_path"
      :movieId="heroMovie.id"
    />

    <!-- Skeletons while loading -->
    <template v-if="loading">
      <SkeletonRow v-for="n in 8" :key="n" />
    </template>

    <!-- Real content -->
    <template v-else>
      <MovieRow title="Trending Now" :movies="trending" />
      <Top10Row title="Top 10 Movies Today" :movies="trending" />
      <MovieRow title="Popular TV Shows" :movies="tvShows" />
      <MovieRow title="Top Rated" :movies="topRated" />
      <MovieRow title="Action Movies" :movies="actionMovies" />
      <MovieRow title="Comedy" :movies="comedyMovies" />
      <MovieRow title="Horror" :movies="horrorMovies" />
      <MovieRow title="Romance" :movies="romanceMovies" />
      <MovieRow title="Documentaries" :movies="documentaries" />
    </template>

    <Footer />
  </div>
</template>

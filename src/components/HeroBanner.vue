<script setup>
import { Play, Info } from "lucide-vue-next";
import { useRouter } from "vue-router";

defineProps({
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
</script>

<template>
  <section
    class="relative h-[85vh] flex items-center bg-cover bg-top"
    :style="{ backgroundImage: `url(${image})` }"
  >
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-black/20"></div>

    <!-- Left fade gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent"
    ></div>

    <!-- Bottom fade -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141414] to-transparent"
    ></div>

    <!-- Content -->
    <div class="relative z-10 px-12 pb-16 pt-24 max-w-2xl">
      <h1
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-3 drop-shadow-lg leading-tight"
      >
        {{ title }}
      </h1>

      <p
        class="text-sm md:text-base text-gray-200 mb-6 leading-relaxed line-clamp-3 drop-shadow"
      >
        {{ overview }}
      </p>

      <div class="flex flex-wrap gap-3">
        <button
          class="bg-white text-black px-6 md:px-8 py-2.5 rounded font-bold text-sm md:text-base hover:bg-gray-200 transition flex items-center gap-2"
        >
          <Play :size="20" fill="black" /> Play
        </button>

        <button
          @click="router.push('/movie/' + movieId)"
          class="bg-gray-500/70 text-white px-6 md:px-8 py-2.5 rounded font-semibold text-sm md:text-base hover:bg-gray-400/70 transition flex items-center gap-2 backdrop-blur-sm"
        >
          <Info :size="20" /> More Info
        </button>
      </div>
    </div>
  </section>
</template>

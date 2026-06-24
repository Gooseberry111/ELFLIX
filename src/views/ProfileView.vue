<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const profiles = [
  { name: "Ella", color: "#e50914", emoji: ":)" },
  { name: "Mr PK", color: "#2563eb", emoji: "^_^" },
  { name: "Sadiq", color: "#16a34a", emoji: "^o^" },
  { name: "Kids", color: "#f59e0b", emoji: "*_*", kids: true },
];

const selectProfile = (profile) => {
  localStorage.setItem("elflix-profile", JSON.stringify(profile));
  router.push("/");
};
</script>

<template>
  <div
    class="min-h-screen bg-[#141414] flex flex-col items-center justify-center text-white"
  >
    <!-- Logo -->
    <div class="text-red-600 text-4xl font-black mb-16 tracking-tight">
      ELFLIX
    </div>

    <h1 class="text-4xl md:text-5xl font-medium mb-12">Who's watching?</h1>

    <!-- Profiles -->
    <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
      <div
        v-for="profile in profiles"
        :key="profile.name"
        class="flex flex-col items-center gap-3 cursor-pointer group"
        @click="selectProfile(profile)"
      >
        <!-- Avatar -->
        <div class="relative">
          <div
            class="w-32 h-32 rounded-md flex items-center justify-center text-5xl transition-all duration-200 group-hover:ring-4 group-hover:ring-white"
            :style="{ backgroundColor: profile.color }"
          >
            {{ profile.emoji }}
          </div>
          <!-- Kids badge -->
          <div
            v-if="profile.kids"
            class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded font-bold tracking-wide"
          >
            KIDS
          </div>
        </div>
        <p class="text-gray-400 group-hover:text-white transition text-sm mt-1">
          {{ profile.name }}
        </p>
      </div>

      <!-- Add Profile -->
      <div class="flex flex-col items-center gap-3 cursor-pointer group">
        <div
          class="w-32 h-32 rounded-md bg-gray-700/40 border-2 border-transparent flex items-center justify-center transition-all duration-200 group-hover:bg-gray-600/40 group-hover:ring-4 group-hover:ring-white"
        >
          <span class="text-5xl text-gray-400 group-hover:text-white">+</span>
        </div>
        <p class="text-gray-400 group-hover:text-white transition text-sm">
          Add Profile
        </p>
      </div>
    </div>

    <!-- Manage Profiles -->
    <button
      class="border border-gray-500 text-gray-400 hover:text-white hover:border-white px-8 py-2 text-sm tracking-widest uppercase transition"
    >
      Manage Profiles
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { Search, Bell, ChevronDown, Menu, X } from "lucide-vue-next";

const router = useRouter();
const scrolled = ref(false);
const searchOpen = ref(false);
const searchQuery = ref("");
const menuOpen = ref(false);
const searchInput = ref(null);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const toggleSearch = async () => {
  searchOpen.value = !searchOpen.value;
  if (searchOpen.value) {
    await nextTick();
    searchInput.value?.focus();
  }
};

const handleSearch = () => {
  const q = searchQuery.value.trim();
  if (!q) return;
  searchQuery.value = "";
  searchOpen.value = false;
  router.push(`/search?q=${encodeURIComponent(q)}`);
};

const navigate = (path) => {
  menuOpen.value = false;
  router.push(path);
};
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500',
      scrolled || menuOpen ? 'bg-black' : 'bg-transparent',
    ]"
  >
    <!-- Left side -->
    <div class="flex items-center gap-8">
      <!-- Logo -->
      <div
        class="text-red-600 text-3xl font-bold tracking-wide cursor-pointer"
        @click="navigate('/home')"
      >
        ELFLIX
      </div>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-6 text-sm">
        <a
          @click="navigate('/home')"
          class="hover:text-gray-300 transition cursor-pointer"
          >Home</a
        >
        <a href="#" class="hover:text-gray-300 transition">Series</a>
        <a href="#" class="hover:text-gray-300 transition">Films</a>
        <a href="#" class="hover:text-gray-300 transition">Games</a>
        <a href="#" class="hover:text-gray-300 transition">New & Popular</a>
        <a
          @click="navigate('/mylist')"
          class="hover:text-gray-300 transition cursor-pointer"
          >My List</a
        >
      </div>
    </div>

    <!-- Right side -->
    <div class="flex items-center gap-4">
      <!-- Search -->
      <div class="flex items-center gap-2">
        <form @submit.prevent="handleSearch" class="flex items-center">
          <transition name="expand">
            <input
              v-if="searchOpen"
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Search titles..."
              class="bg-black/80 border border-white text-white text-sm px-3 py-1.5 rounded outline-none w-40 md:w-52 placeholder-gray-400"
            />
          </transition>
        </form>
        <button
          type="button"
          @click="toggleSearch"
          class="text-white hover:text-gray-300 transition"
        >
          <Search :size="20" />
        </button>
      </div>

      <!-- Bell - hidden on mobile -->
      <button class="hidden md:block text-white hover:text-gray-300 transition">
        <Bell :size="20" />
      </button>

      <!-- Avatar - hidden on mobile -->
      <div class="hidden md:flex items-center gap-1 cursor-pointer group">
        <div
          class="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-sm font-bold"
        >
          E
        </div>
        <ChevronDown
          :size="16"
          class="text-white transition-transform duration-300 group-hover:rotate-180"
        />
      </div>

      <!-- Hamburger - only on mobile -->
      <button
        class="md:hidden text-white hover:text-gray-300 transition"
        @click="menuOpen = !menuOpen"
      >
        <X v-if="menuOpen" :size="24" />
        <Menu v-else :size="24" />
      </button>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <transition name="slide-down">
    <div
      v-if="menuOpen"
      class="fixed top-16 left-0 w-full bg-black z-40 flex flex-col px-6 py-6 gap-6 text-sm md:hidden"
    >
      <a
        @click="navigate('/')"
        class="hover:text-gray-300 transition cursor-pointer"
        >Home</a
      >
      <a href="#" class="hover:text-gray-300 transition">Series</a>
      <a href="#" class="hover:text-gray-300 transition">Films</a>
      <a href="#" class="hover:text-gray-300 transition">Games</a>
      <a href="#" class="hover:text-gray-300 transition">New & Popular</a>
      <a
        @click="navigate('/mylist')"
        class="hover:text-gray-300 transition cursor-pointer"
        >My List</a
      >

      <!-- Bell and Avatar in mobile menu -->
      <div class="flex items-center gap-4 pt-4 border-t border-gray-800">
        <Bell :size="20" />
        <div
          class="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-sm font-bold"
        >
          E
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition:
    width 0.3s ease,
    opacity 0.3s ease;
}
.expand-enter-from,
.expand-leave-to {
  width: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  width: 13rem;
  opacity: 1;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

<template>
  <section class="px-4 md:px-12 mt-8">
    <!-- Title placeholder -->
    <div class="h-6 w-40 bg-gray-700 rounded animate-pulse mb-5"></div>

    <!-- Cards -->
    <div class="flex gap-1 overflow-hidden py-10">
      <SkeletonCard v-for="n in 8" :key="n" />
    </div>
  </section>
</template>

<script setup>
import SkeletonCard from "./SkeletonCard.vue";
</script>

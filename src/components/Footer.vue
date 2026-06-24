<template>
  <footer class="bg-[#141414] text-gray-400 px-12 py-16 mt-16">
    <!-- Social Icons -->
    <div class="flex gap-5 mb-6">
      <a href="#" class="hover:text-white transition">
        <Facebook :size="24" />
      </a>
      <a href="#" class="hover:text-white transition">
        <Instagram :size="24" />
      </a>
      <a href="#" class="hover:text-white transition">
        <Twitter :size="24" />
      </a>
      <a href="#" class="hover:text-white transition">
        <Youtube :size="24" />
      </a>
    </div>

    <!-- Links Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
      <div class="flex flex-col gap-3">
        <a href="#" class="hover:text-white transition">Audio Description</a>
        <a href="#" class="hover:text-white transition">Investor Relations</a>
        <a href="#" class="hover:text-white transition">Legal Notices</a>
      </div>
      <div class="flex flex-col gap-3">
        <a href="#" class="hover:text-white transition">Help Center</a>
        <a href="#" class="hover:text-white transition">Jobs</a>
        <a href="#" class="hover:text-white transition">Cookie Preferences</a>
      </div>
      <div class="flex flex-col gap-3">
        <a href="#" class="hover:text-white transition">Gift Cards</a>
        <a href="#" class="hover:text-white transition">Terms of Use</a>
        <a href="#" class="hover:text-white transition"
          >Corporate Information</a
        >
      </div>
      <div class="flex flex-col gap-3">
        <a href="#" class="hover:text-white transition">Media Center</a>
        <a href="#" class="hover:text-white transition">Privacy</a>
        <a href="#" class="hover:text-white transition">Contact Us</a>
      </div>
    </div>

    <!-- Service Code -->
    <button
      class="border border-gray-600 text-sm px-4 py-2 mb-6 hover:text-white transition"
    >
      Service Code
    </button>

    <!-- Copyright -->
    <p class="text-xs">
      © {{ new Date().getFullYear() }} Elflix. All rights reserved.
    </p>
  </footer>
</template>

<script setup>
import { Facebook, Instagram, Twitter, Youtube } from "lucide-vue-next";
</script>

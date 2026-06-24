<script setup>
import { ref, watch, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const stage = ref("enter");
const lettersVisible = ref([]);
const letters = ["E", "L", "F", "L", "I", "X"];
const shaking = ref(false);
const timers = [];

onUnmounted(() => {
  timers.forEach(clearTimeout);
});

const startExperience = () => {
  if (stage.value !== "enter") return;

  stage.value = "animating";

  const audio = new Audio("/sounds/tadum.m4a");
  audio.volume = 1.0;
  audio.play();

  letters.forEach((_, i) => {
    timers.push(
      setTimeout(() => {
        lettersVisible.value.push(i);
      }, i * 150),
    );
  });

  // Shake after letters land
  timers.push(
    setTimeout(
      () => {
        shaking.value = true;
      },
      letters.length * 150 + 300,
    ),
  );

  // Go to profiles after animation
  timers.push(
    setTimeout(
      () => {
        stage.value = "done";
      },
      letters.length * 150 + 1500,
    ),
  );
};

// Navigate to profiles when animation is done
watch(
  () => stage.value,
  (val) => {
    if (val === "done") {
      router.push("/profiles");
    }
  },
);
</script>

<template>
  <!-- ENTER SCREEN -->
  <button
    v-if="stage === 'enter'"
    class="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 cursor-pointer w-full"
    @click="startExperience"
  >
    <div class="flex flex-col items-center gap-3 animate-pulse">
      <div
        class="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-white fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <p class="text-gray-400 text-sm tracking-widest uppercase">
        Click to enter
      </p>
    </div>
  </button>

  <!-- SPLASH ANIMATION -->
  <div
    v-else-if="stage === 'animating'"
    class="fixed inset-0 flex items-center justify-center bg-black z-50"
  >
    <div :class="['flex items-end gap-1', shaking ? 'shake' : '']">
      <span
        v-for="(letter, i) in letters"
        :key="i"
        :class="[
          'font-black text-red-600 transition-all',
          lettersVisible.includes(i)
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full',
        ]"
        :style="{
          fontSize: '60px',
          letterSpacing: '-2px',
          fontFamily: 'Arial Black, sans-serif',
          transitionDuration: '0.5s',
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          textShadow: lettersVisible.includes(i)
            ? '0 0 40px rgba(229,9,20,0.6)'
            : 'none',
        }"
      >
        {{ letter }}
      </span>
    </div>
  </div>

  <!-- MAIN APP -->
  <RouterView v-else />
</template>

<style scoped>
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(-8px);
  }
  30% {
    transform: translateX(8px);
  }
  45% {
    transform: translateX(-6px);
  }
  60% {
    transform: translateX(6px);
  }
  75% {
    transform: translateX(-3px);
  }
  90% {
    transform: translateX(3px);
  }
  100% {
    transform: translateX(0);
  }
}

.shake {
  animation: shake 0.5s ease;
}

.logo-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.logo-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.logo-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>

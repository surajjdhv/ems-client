<script setup lang="ts">
const props = defineProps(['subtitle', 'title', 'customClasses'])
</script>

<template>
  <!-- ====== Forms Section Start -->
  <div class="min-h-screen flex flex-wrap items-center bg-white dark:bg-boxdark">
    <div class="hidden w-full border-stroke dark:border-strokedark md:border-r-2 md:block md:w-1/2">
      <div class="md:p-12.5 xl:p-17.5 text-center">
        <router-link class="mb-5.5 inline-block" to="/">
          <img class="hidden dark:block" src="@/assets/images/logo/logo.svg" alt="Logo" />
          <img class="dark:hidden" src="@/assets/images/logo/logo-dark.svg" alt="Logo" />
        </router-link>

        <p class="font-medium 2xl:px-20">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
        </p>

        <span class="mt-15 inline-block">
          <img src="@/assets/images/illustration/login-illustration.svg" alt="illustration" />
        </span>
      </div>
    </div>
    <div class="w-full md:w-1/2">
      <div class="w-full px-4 sm:px-12.5 xl:px-17.5">
        <span class="mb-1.5 block font-medium">{{ props.subtitle }}</span>
        <h2 class="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          {{ props.title }}
        </h2>

        <slot></slot>
      </div>
    </div>
  </div>
  <!-- ====== Forms Section End -->
</template>

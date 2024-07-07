<script setup lang="ts">
const props = defineProps(['label', 'type', 'placeholder'])
const emits = defineEmits(['onBlur'])
const model = defineModel()
</script>

<template>
  <div class="relative mb-10">
    <label class="mb-2.5 block font-medium text-black dark:text-white">{{ props.label }}</label>
    <div class="relative mb-2.5">
      <input
        :type="props.type"
        :placeholder="props.placeholder"
        v-model="model"
        @blur="emits('onBlur')"
        class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
      />

      <span class="absolute right-4 top-4">
        <slot></slot>
      </span>
    </div>
    <div class="absolute w-full pl-6 pr-10 text-red">
      <slot name="error"></slot>
    </div>
  </div>
</template>

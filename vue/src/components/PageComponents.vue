<template>
    <!-- inherit -->
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            {{ title }}
          </h1>
        </div>
      </header>     
      <slot name="header"></slot>

      <slot name="ali"></slot>
      <slot>for show the remaining elements when invoking PageComponent</slot>
    <!-- inherit -->
</template>
<script setup>
const props=defineProps({
    title:String
});
</script>
<template>
    <div class="bg-red-500 text-white rounded pl-12 pr-4">
        <slot></slot>
        <span @click="errors =''" class="relative top-[-90px] left-[-40px] pl-2 w-11 h-11 items-center flex justify-items rounded-full transition-colors cursur-pointer hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>            
          </span>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>

</style>
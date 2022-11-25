<template>
        <div class="rounded-2xl bg-yellow-300 flex flex-col pb-4 mx-2 shadow-md hover:bg-grey-50">
          <img :src="survey.image_url" alt="non image" class="rounded-2xl relative w-full h-48 object-cover">
          <div class="grid grid-cols-3 animate-fade-in-down" style="animation-delay:0.8s">
            <div class="titles order-2 lg:order-2">
              <h4 class="mt-4 text-2xl font-bold lg:order-2">{{survey.title}}</h4>
              <small v-html="survey.description" class="overflow-hidden flex-1 text-gray-500"></small>
            </div>
            <div class="view-slug order-1 lg:order-1 mt-7">
              <a :href="`/view/survey/${survey.slug}`" target="_blank" 
              class="p-1 hover:bg-gray-300 ml-2 h-8 w-8 flex items-center justify-center rounded-full border transparent text-sm text-indigo-500 focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                </svg>                
              </a>
            </div>
          </div>
          <br class="m-4">
          <div class="grid grid-cols-2 px-4 gap-10">
              <router-link :to="{name:'SurveyView',params:{id : survey.id}}"
              class="order-1
              py-2 mx-1
              text-sm rounded-md text-white 
              bg-indigo-600 hover:bg-indigo-400 hover:text-white
              focus:ring-5 focus:ring-offset-1 focus:ring-indigo-800"
              >
              Edit
              </router-link>
              <button @click="emit('delete',servey)"
              class="order-2
              py-2 mx-1 border-0
              text-sm rounded-md text-white 
              bg-red-600 hover:bg-red-400 
              focus:ring-4 focus:ring-offset-1 focus:ring-red-800"
              >Delete</button>
          </div>
        </div>

</template>

<script setup>
const {survey}=defineProps({
    survey: Object
});
const emit = defineEmits(['delete']);
</script>

<style>

</style>
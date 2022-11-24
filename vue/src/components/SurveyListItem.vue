<template>
        <div
        class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-grey-50 h-470px] bg-floralwhite-100">
          <img :src="survey.image_url" alt="" class="w-full h-48 object-cover">
          <h4 class="mt-4 text-lg font-bold">{{survey.title}}</h4>
          <div v-html="survey.description" class="overflow-hidden flex-1"></div>
          <hr class="m-4">
          <div class="justify-between items-center">
              <router-link :to="{name:'SurveyView',params:{id : survey.id}}"
              class="inline-block
              py-2 px-4 w-16
              border boreder-transparent 
              text-sm rounded-md text-white 
              bg-indigo-600 hover:bg-indigo-300 
              focus:ring-4 focus:ring-offset-1 focus:ring-indigo-800"
              >
              Edit
              </router-link>
              <div class="flex items-center">
                <a :href="`/view/survey/${survey.slug}`"
                target="_blank" class="h-8 w-8 flex items-center justify-center rounded-full border border transparent text-sm text-indigo-500 focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                </svg>                
                </a>
                <button
                @click="emit('delete',servey)"
                class="inline-block
                ml-14 py-2 px-4 w-20
                border boreder-transparent 
                text-sm rounded-md text-white 
                bg-red-600 hover:bg-red-300 
                focus:ring-4 focus:ring-offset-1 focus:ring-red-800"
                >Delete</button>
              </div>
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
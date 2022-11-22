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
              >Edit</router-link>
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

</template>

<script setup>
const {survey}=defineProps({
    survey: Object
});
const emit = defineEmits(['delete']);
</script>

<style>

</style>
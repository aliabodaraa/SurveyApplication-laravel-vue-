<template>
    <!-- inherit -->
    <PageComponents title="Survey-title">
      <template slot:header v-slot:header>You overwriting the slot header in  survey v-slot:header
        <div class="py-2 px-3">
            <h6 class="text-3xl font-bold text-grey-900">
              <router-link :to="{name:'SurveyCreate'}" class="inline-block py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="float-left w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>Add New Servey         
              </router-link>
            </h6>
        </div>
      </template>
      <div v-if="surveys" class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 mt-5 bg-dark-400">
        <div v-for="survey in surveys" :key="survey.id" 
        class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-grey-50 h-470px] bg-floralwhite-100">
          <img :src="survey.image" alt="" class="w-full h-48 object-cover">
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
              @click="deleteServey(servey)"
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
      <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 mt-5 bg-dark-400">
      </div>
    </PageComponents>
    
    <!-- inherit -->
    </template>
    <script setup>
     import PageComponents from "../components/PageComponents.vue";
     import store from "../store";
     import { computed } from "vue";
    //const surveys=computed(()=>{return store.state.surveys}) //it is true but why we use computed
     const surveys=store.state.surveys; //also true

     console.log(surveys)
     function deleteServey(){
      if(confirm("Are You Sure You Want To Delete This Survey ? Operation Can't Be Undone !!")){
        
      }
     }
     
     </script>
    <style scoped>
    
    
    </style>
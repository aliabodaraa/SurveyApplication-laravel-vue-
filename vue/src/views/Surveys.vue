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
      <div v-if="surveys.loading" class="flex justify-center">Loading ...</div>
      <div v-else>
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 mt-5 bg-dark-400">
              <SurveyListIem 
              v-for="(survey,index) in surveys.data" 
              :key="survey.id" 
              :survey="survey"
              @delete="deleteServey(survey)"
              class="opacity-0 animate-fade-in-down"
              :style="{animationDelay: `${index *0.8}s`}"
              />
          </div>
          <div class="flex justify-center mt-5">
            <nav class="relative z-0 inline-flex justify-center rounded-md shadow-sm" aria-label="Pagination">
              <a v-for="(link,i) of surveys.links" 
              :key="i" 
              :disabled="!link.url"
              v-html="link.label"
              href="#"
              @click="getForPage($event,link)"
              aria-current="page"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
              :class="[
                link.active ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600':'bg-white border-gray-300 text-gray-500 hover:bg-grey-50',
                i===0 ?'rounded-l-md':'',
                i==surveys.links.length-1 ?'rounded-r-md':'',
              ]"
              ></a>
            </nav>
          </div>
      </div>
      <!-- <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 mt-5 bg-dark-400">
      </div> -->
    </PageComponents>
    
    <!-- inherit -->
    </template>
    <script setup>
      import SurveyListIem from "../components/SurveyListItem.vue";
     import PageComponents from "../components/PageComponents.vue";
     import store from "../store";
     import { computed } from "vue";
    const surveys=computed(()=>{return store.state.surveys;}) //it is true but why we use computed

     console.log(surveys)
     function deleteServey(survey){
      if(confirm("Are You Sure You Want To Delete This Survey ? Operation Can't Be Undone !!")){
        store.dispatch('deleteSurvey',survey.id).then(()=>{
          store.dispatch('getSurveys');
        });
      }
     }
     

     //get all surveys from DB
     
     store.dispatch('getSurveys');


     function getForPage(ev,link){
      ev.preventDefault();//to prevent next button when current page is the last to scroll to the top of page
      
      if(!link.url || link.active){
        return;
      }
      store.dispatch('getSurveys',{url:link.url});
     }
     </script>
    <style scoped>
    
    
    </style>
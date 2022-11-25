<template>

<!-- inherit -->
<PageComponents title="Dashboard-title">
    <template slot:header v-slot:header>You overwriting the slot header in dashboard v-slot:header </template>
    aaaaaaa




    <div v-if="loading" class="flex justify-center">Loading ...</div>
    <div v-else class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-gray-700">
        <div class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2 animate-fade-in-down" style="animation-delay:0.1s">
            <h3 class="text-2xl font-semibold">Total Surveys</h3>
            <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
                {{ data.totalSurveys }}
            </div>
        </div>
        <div class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 animate-fade-in-down" style="animation-delay:0.2s">
            <h3 class="text-2xl font-semibold">Total Answers</h3>
            <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
                {{ data.totalAnswers }}
            </div>
        </div>
        <div class="bg-white shadow-md p-3 row-span-2 order-3 lg:order-1 animate-fade-in-down" style="animation-delay:0.3s">
            <h3 class="text-2xl font-semibold">Latest Surveys</h3>
            <img :src="data.latestSurvey.image_url" alt="latestSurvey image" class="w-[240px] mx-auto">
            <div class="text-xl font-semibold flex-1 flex items-center justify-center">
                {{ data.latestSurvey.title }}
            </div>
            <div class="flex justify-between text-sm mb-1">
                <div>Upload Date :</div>
                <div>{{ data.latestSurvey.created_at }}</div>
            </div>
            <div class="flex justify-between text-sm mb-3">
                <div>Answers :</div>
                <div>{{ data.totalAnswers }}</div>
            </div>
            <div class="flex justify-between">
                <router-link 
                :to='{name:"SurveyView",params:{id:data.latestSurvey.id}}'
                class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Edit Survey &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>                      
                </router-link>
                <button class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    View Answers &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>                      
                </button>
            </div>
        </div>
        <div class="bg-white shadow-md p-3 row-span-2 order-4 lg:order-3 animate-fade-in-down" style="animation-delay:0.4s">
            <div class="flex justify-between items-center mb-3 px-2">
                <h3 class="text-2xl font-semibold">Latest Answers</h3>
                <a href="javascript:void(0)" 
                class="text-sm text-blue-500 hover:decoration-blue-500">
                    View All
                </a>
            </div>
            <a href="#"
            v-for="answer of data.latestAnswers" :key="answer.id" class="block p-2 hover:by-gray-100/90">
                <div class="font-semibold">
                    {{ answer.survey.title }}
                </div>
                <small>
                    Answer Made At :
                    <i class="font-semibold">
                        {{answer.end_date}}
                    </i>
                </small>
            </a>
        </div>
    </div>

<!-- <pre>{{loading}}</pre>
<pre>{{data}}</pre> -->

</PageComponents>

<!-- inherit -->
    
</template>
<script setup>
 import PageComponents from "../components/PageComponents.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const loading = computed(() => store.state.dashboard.loading);
const data = computed(() => store.state.dashboard.data);
console.log("aaaaa",data.value.latestSurvey);
store.dispatch("getDashboardData");
 </script>
<style scoped>


</style>
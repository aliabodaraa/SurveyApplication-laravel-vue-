<template>
    <div class="p-5 px-8">
        <div v-if="loading" class="flex justify-center">Loading ...</div>
        <form v-else class="container mx-auto"
        @submit.prevent="submitSurvey">
            <div class="grid grid-cols-6 items-center">
                <div class="mr-4">
                    <img :src="survey.image_url" alt="survey image">
                </div>
                <div class="col-span-5">
                    <h1 class="text-3xl mb-3">{{survey.title}}</h1>
                    <p class="text-gray-500 text-sm" v-html="survey.description"></p>
                </div>
            </div>
            <div v-if="surveyFinished" class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto">
                <div class="text-xl mb-3 font-semibold">
                    Thank you for participating in this survey
                </div>
                <button @click="submitAnotherResponse" type="button" class="inline-flex justify-center py-2 px-4
                border border-transparent shadow-sm text-sm
                font-medium rounded-md text-white bg-gray-600 
                hover:bg-gray-800 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-gray-500">
                    Submit Another Response
                </button>
            </div>
            <div v-else>
                <hr class="my-3">
                <div v-for="(question,ind) of survey.questions" :key="question.id">
                    <QuestionViewer
                    v-model="answers[question.id]"
                    :question="question"
                    :index="ind"
                    />
                </div>
<h1>-- {{ answers }} --</h1><br>
                <button type="submit" 
                class="inline-flex justify-center py-2 px-4
                 border border-transparent shadow-sm text-sm
                 font-medium rounded-md text-white bg-indigo-600 
                 hover:bg-indigo-800 focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
            </div>


        </form>
        
        
        
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import QuestionViewer from '../components/viewer/QuestionViewer.vue';

const store=useStore();
const route=useRoute();

const loading=computed(()=>store.state.currentSurvey.loading);
const survey=computed(()=>store.state.currentSurvey.data);
const surveyFinished=ref(false);
const answers=ref({});

store.dispatch("getSurveyBySlug",route.params.slug);
function submitSurvey(){
    //console.log(JSON.stringify(answers.value,undefined,2));
    store.dispatch("saveSurveyAnswer",
        {   surveyId:survey.value.id,
            answers:answers.value
        }).then((response)=>{
            if(response.status === 201){//successfully saved the answers in DB
                surveyFinished.value=true;
            }
        });
}
function submitAnotherResponse(){//reset the form
    answers.value={};
    surveyFinished.value=false;
}
</script>

<style lang="scss" scoped>

</style>
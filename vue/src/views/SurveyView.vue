<template>
    <PageComponents>
        <template v-slot:header>
            <div class="flex items-center ml-6 justify-between">
                <h1 class="text-3xl font-bold text-grey-900">
                    {{ route.params.id ? model.title :"Create a Survey" }}
                </h1>
            </div>
        </template>
       <!-- {{ model }} -->
        <!-- <pre>{{model}}</pre> -->
        <div v-if="surveyLoading" class="flex justify-center">Loading ...</div>
        <form v-else @submit.prevent="saveSurvey" >
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey fields -->
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- Image -->
                    <div>
                        <label class="block text-sm font-medium text-grey-700">
                            Image
                        </label>
                        <div class="mt-1 flex items-center">
                                <img v-if="model.image_url" 
                                :src="model.image_url" 
                                :alt="model.title"
                                class="w-80 h-40 object-cover rounded" />
                                <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-grey-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                </span>
                                <button type="button" class="relative 
                                overflow-hidden ml-5 
                                bg-blue-200 py-2 px-3 
                                boreder border-grey-300 rounded-md 
                                shadow-sm text-sm leading-4 font-medium 
                                text-grey-700 hover:bg-blue-100 hover:border-blue-200 
                                focus:outline-none focus:ring-2 
                                focus:ring-offset-2 
                                focus:ring-indigo-500">
                                <input type="file"
                                @change="onImageChoose"
                                name="" 
                                class="absolute left-0 top-0 right-0 bottom-0 
                                opacity-0 cursor-pointer">
                                Change</button>
                        </div>
                    </div>
                    <!-- / Image -->
                    <!--  Title -->
                    <div>
                        <label for="title" class="block text-sm font-medium text-grey-700">Title</label>
                        <input type="text" name="title" id="title" v-model="model.title" autocomplete="survey_title"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-grey-300 rounded-md">
                    </div>
                    <!-- / Title -->
                    <!--  Description -->
                    <div>
                        <label for="description" class="block text-sm font-medium text-grey-700">description</label>
                        <textarea name="description" id="description" v-model="model.description" autocomplete="survey_description"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-grey-300 rounded-md"></textarea>
                    </div>
                    <!-- / Description -->
                    <!--  Expire_Date -->
                    <div>
                        <label for="expire_date" class="block text-sm font-medium text-grey-700">expire_date</label>
                        <input type="date" name="expire_date" id="expire_date" v-model="model.expire_date" autocomplete="survey_expire_date"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-grey-300 rounded-md">
                    </div>
                    <!-- / Expire_Date -->
                    <!--  Status -->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input type="checkbox" name="status" id="status" v-model="model.status" autocomplete="survey_status"
                            class="focus:ring-indigo-500 
                            focus:border-indigo-500 border-grey-500 
                            h-4 w-4 text-indigo-600
                            rounded">
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="status" class="block text-sm font-medium text-grey-700">Active</label>
                        </div>
                    </div>
                    <!-- / Status -->                
                </div>
                <!--Questions  -->
                <div class="px-4 py-5 bg-white space-y-6 cm:p-6">
                    <h3 class="text-2xl font-semibold flex items-center justify-between">
                        Questions
                        <!-- Add New Qujestion -->
                        <button type="button" 
                        @click="addQuestion()" 
                        class="flex bg-green-700 items-center text-sm py-1 px-4 rounded-sm 
                        text-white bg-green-700 hover:bg-green-400">
                        Add Questions
                        </button>
                    </h3>
                    <div v-if="!model.questions.length" class="text-center text-grey-600">
                        You don't have any questions created
                    </div>
                    <div v-else :key="question.id" v-for="(question,index) in model.questions">
                    <QuestionEditor 
                        :question="question" 
                        :index="index" 
                        @change="questionChange"
                        @addQuestion="addQuestion"
                        @deleteQuestion="deleteQuestion"
                        />
                    </div>
                </div>
  
                <!-- /Questions  -->
            <!-- / Survey fields -->
            <div class="px-4 py-3 bg-grey-50 text-right sm:px-6">
                <button type="submit" class="bg-yellow-200 py-2 px-3 
                boreder border-yellow-300 rounded-md 
                shadow-sm text-sm leading-4 font-medium 
                text-yellow-700 hover:bg-yellow-200 hover:border-yellow-50
                focus:outline-none focus:ring-2 
                focus:ring-offset-2 
                focus:ring-yellow-500">Save</button>
            </div>
            </div>
        </form>
            
    </PageComponents>
  </template>
  <script setup>
    import PageComponents from "../components/PageComponents.vue";
    import QuestionEditor from "../components/editor/QuestionEditor.vue";
    import store from "../store";
    import { useRoute, useRouter } from "vue-router";
    import { computed, ref, watch } from "vue";
    import { v4 as uuidv4 } from "uuid";
    const route=useRoute();
    const router =useRouter();
    const surveyLoading = computed(()=> store.state.currentSurvey.loading)
    //create empty survey
    let model=ref({
        //id:uuidv4(),
        title:'',
        status:false,
        description:null,
        image:null,
        image_url:null,
        expire_date:null,
        questions:[],
    });
    watch(//two params
        () => store.state.currentSurvey.data,//when the previous changes run the following
        (newVal,oldVal) => {
            model.value={
                ...JSON.parse(JSON.stringify(newVal)),//use Json.parse and json.stringify that to avoid any reference changed in the future
                status:newVal.status !== "draft",
            };
        }
    );
    if(route.params.id){
        console.log(typeof route.params.id);
        store.dispatch('getSurvey',route.params.id);
    }
    function addQuestion(index){
        const newQuestion={
        id:uuidv4(),
        type:"text",
        question:"",
        description:null,
        data:{},
    };
    //Array.splice(start, removeCount, newItem, newItem, newItem, ...)
    model.value.questions.splice(index,0,newQuestion);
    }
    function deleteQuestion(question){
        model.value.questions = model.value.questions
        .filter((q) => q.id != question.id);
    }
    function questionChange(question){
        model.value.questions = model.value.questions
        .map((q) => {
            if(q.id === question.id){
                //it can be done with return question only
                //but to avoid any kind of reference changes in the future i'm going 
                //to wrap question inside json stringify and json parse
                return JSON.parse(JSON.stringify(question));
            }
            return q;
        });
    }
    function saveSurvey(){
            store.dispatch("saveSurvey", model.value)
            .then((id)=>{
                router.push({
                    name:"SurveyView",
                    params:{id : parseInt(id)}
                });
        });
    }

    function onImageChoose(ev){
        const file =ev.target.files[0];
        const reader = new FileReader(file);//convert the image selected image with base64 via "reader.result" value
        reader.onload = ()=>{
            //console.log(file,reader);
            //console.log(reader.result);//result of encoding with base64 //
            //the field to send on backend and apply validations
            model.value.image = reader.result;//result of encoding with base64 //for sending to backend
            //the field to display here
            model.value.image_url = reader.result;//result of encoding with base64 //for displaying in frontend only
        };

        reader.readAsDataURL(file);//?? Why

    }
  </script>
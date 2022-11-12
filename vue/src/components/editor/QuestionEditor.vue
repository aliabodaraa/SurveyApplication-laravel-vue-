<template>
<div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">
        {{ index + 1 }} - {{ model.question }}
    </h3>

    <div class="flex items-center">
        <!-- Add new question -->
            <button type="button" @click="addQuestion()" class="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                Add 
            </button>
        <!-- /Add new question -->
        <!-- Delete question -->
            <button type="button" @click="deleteQuestion()" class="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg> 
                Delete 
            </button>             
        <!-- /Delete question -->
    </div>
</div>
<!-- Question Index -->
<div class="grid gap-2 grid-cols-12">
    <!-- Question -->
    <div class="mt-3 col-span-9">
        <label :for="'question_text_' + model.data" 
                class="float-left block text-sm font-medium text-grey-700">
                Question Text :
        </label>
        <input type="text" 
                :name="'question_text_' + model.data" 
                :id="'question_text_' + model.data"
                v-model="model.question"
                @change="dataChange"
                class="w-full mt-1 
                focus:ring-yellow-500
                focus:border-yellow-500
                block
                shadow-sm
                sm:text-sm
                border-gery-300
                rounded-md" />
            <!-- @change="dataChange" in pervious input to be up-to-date with the value of parent text for question -->
    </div>
    <!-- Question -->
    <!-- Question Type -->
    <div class="mt-3 col-span-3">
        <label for="question_type" class="float-left block text-sm font-medium text-grey-700">
            Select Question Type :
        </label>
        <select name="question_type" 
                id="question_type"
                v-model="model.type"
                @change="typeChange"
                class="w-full mt-1 
                focus:ring-yellow-500
                focus:border-yellow-500
                block
                shadow-sm
                sm:text-sm
                border-gery-300
                rounded-md">
            <option v-for="type in questionTypes" :key="type" :value="type">
                {{ upperCaseFirst(type) }}
            </option>
        </select>
    </div>
    <!-- /Question Type -->
</div>
    <!-- Question Description -->
    <div class="mt-3 col-span-12">
        <label for="question_type" class="float-left block text-sm font-medium text-grey-700">
            Description :
        </label>
        <textarea :name="'question_description_' + model.id" 
                :id="'question_description_' + model.id" 
                v-model="model.description"
                @change="dataChange"
                class="w-full mt-1 
                focus:ring-yellow-500
                focus:border-yellow-500
                block
                shadow-sm
                sm:text-sm
                border-gery-300
                rounded-md" />
                <!-- @change="dataChange" in pervious input to be up-to-date with the value of parent text for question -->
    </div>
    <!-- /Question Description -->
    <!-- Data in Question -->
<div>
    <div v-if="shouldHaveOptions()" class="mt-2">
        <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
            Options
            <!-- Add A New Option -->
            <button type="button" @click="addOption()"
            class="flex items-center 
            text-xs py-1 px-2 
            rounded-sm text-white bg-yellow-600 
            hover:bg-yellow-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
                Add Option
            </button>
            <!--  / Add A New Option -->
        </h4>
        <div v-if="!model.data.options.length"
            class="text-xs text-grey-600 text-center py-3">
            You don't Have Any Options
        </div>
        <!-- Option List -->
            <div v-else v-for="(option,index) in model.data.options"
            :key="option.uuid"
            class="flex items-center mb-1 gap-5">
            <span class="w-6 text-sm">{{index+1}}</span>
            <input type="text" 
            v-model="option.text"
            @change="dataChange"
            class="w-full mt-1 
            focus:ring-yellow-500
            focus:border-yellow-500
            block
            shadow-sm
            sm:text-sm
            border-gery-300
            rounded-md" />
            <!-- Delete Option -->
                <button type="button" @click="removeOption(option)" class="flex hover:bg-red-600 hover:border-red-600 focus:bg-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg> 
                    Delete 
                </button> 
            </div>
 
            <!-- / Delete Option -->
        <!-- / Option List -->
    </div>
</div>
    <!-- / Data in Question -->
    <hr class="my-6">
<!-- /Question -->
</template>

<script setup>
    import { v4 as uuidv4 } from "uuid";
    import { computed, ref } from 'vue';
    import store from "../../store";
    const props=defineProps(
        {
         question:Object,
         index:Number
        }
        );
    const emit = defineEmits(['change','addQuestion','deleteQuestion']);
    //Re-create the whole Questions data to avoid unintentional reference change
    const model = ref(JSON.parse(JSON.stringify(props.question)));
    //Get QuestionType from vuex
const questionTypes = computed(() => store.state.questionTypes);

function upperCaseFirst(str){
    return str.charAt(0).toUpperCase()+str.slice(1);
}
function getOptions(){
    return model.value.data.options;
}
function setOptions(options){
    model.value.data.options = options;
}
function addOption(){
    setOptions([...getOptions(),{uuid:uuidv4(),text:"new"}]);
    dataChange();
}
//Remove Option
function removeOption(opt1){
    setOptions(getOptions().filter((opt2) => opt2 !=opt1));
    dataChange();
}
function shouldHaveOptions(){
    return ["select","radio","checkbox"].includes(model.value.type);
}
function typeChange(){
    if(shouldHaveOptions()){
        setOptions(getOptions() || []);
    }
    dataChange();
}
//Emit the data change
function dataChange(){
    const data=JSON.parse(JSON.stringify(model.value));//i use parse and stringify because  i dont need to lose the date the latest witll take a clone from model.value
    if(! shouldHaveOptions()){
            delete data.data.options;
    }
    this.$emit('change', data);
}
function addQuestion(){
    emit('addQuestion', props.index + 1);
}
function deleteQuestion(){
    emit('deleteQuestion', props.question);
}
</script>

<style lang="scss" scoped>

</style>
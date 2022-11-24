<template>
    <div>
        <fieldset class="mb-4">
            <div>
                <legend class="text-base font-medium text-gray-900">
                    Q{{ index+1 }}- {{ question.question }}
                </legend>
                <p class="text-gray-500 text-sm">
                    {{ question.description }}
                </p>
            </div>
            <div class="mb-4">
                <div v-if="question.type ==='select'">
                    <select 
                    :value="modelValue"
                    @change="emitForVModelUpdate('update:modelValue',$event.target.value)"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md 
                    shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text:sm">
                        <option value="">please select</option>
                        <option v-for="option in question.data.options" 
                        :key="option.uuid" 
                        :value="option.text">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
                <div v-else-if="question.type ==='radio'">
                    <div v-for="option of question.data.options"
                    :key="option.uuid" class="flex items-center">
                        <input type="radio" 
                        :id="option.uuid" 
                        :name="'question'+question.id"
                        :value="option.text"
                        @change="emitForVModelUpdate('update:modelValue',$event.target.value)"
                        />
                        <label for="option.uuid" class="ml-3 block text-sm font-medium text-gray-700">
                            {{ option.text }}
                        </label>
                    </div>
                </div>
                <div v-else-if="question.type ==='checkbox'">
                    <div v-for="(option,ind) of question.data.options"
                    :key="option.uuid" class="flex items-center">
                        <input
                        :id="option.uuid"
                        v-model="model[option.text]"
                        type="checkbox"
                        @change="onCheckboxChange"
                        class="focus:ring-indigo-500 h-4 2-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label for="option.uuid" class="ml-3 block text-sm font-medium text-gray-700">
                            {{ option.text }}
                        </label>
                    </div>
                </div>
                <div v-else-if="question.type ==='text'">
                    <input
                    type="text" 
                    class="mt-1 focus:ring-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    @change="emitForVModelUpdate('update:modelValue',$event.target.value)"
                    :value="modelValue"
                    />
                </div>
                <div v-else-if="question.type ==='textarea'">
                    <textarea
                    class="mt-1 focus:ring-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    @change="emitForVModelUpdate('update:modelValue',$event.target.value)"
                    :value="modelValue"
                    cols="30" rows="10"></textarea>
                </div>
            </div>
        </fieldset>
        <hr class="mb-4">
        {{ model }}
</div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const {question,index,modelValue} = defineProps({
    question:Object,
    index:Number,
    modelValue:[String, Array]//String Or Array
});
const emitForVModelUpdate=defineEmits(["update:modelValue"]);//twoWayBindingUsingV-model
let model;
if(question.type ==="checkbox"){
    model = ref({});
    //`of` like foreach in laranel
    //whereas `in` loop on  0:{},1:{} then detect 0 and 1

    //initilize the model of false values for all options in select input
    for(let option of question.data.options){
        let x=option.text;
        model.value[x]=false;
    }
}
function onCheckboxChange($event){
    const selectedOptions=[];
    for(let keyText in model.value){
        if(model.value[keyText]===true)
            selectedOptions.push(keyText);
    }
    emitForVModelUpdate("update:modelValue", selectedOptions);
}
</script>
<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div>
          <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Login">
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign In to your account</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            <router-link :to="{name:'Register'}" class="font-medium text-indigo-600 hover:text-indigo-500">go to Register page</router-link>
          </p>
        </div>
        <!--learn style p-0 flex text-sm text-red-500 hover:bg-indigo-100 -->
        <form class="mt-8 space-y-6" @submit="login">
          <Alert v-if="Object.keys(errors).length" class="grid text-sm">
            <span class="mt-[40px] px-2 text-left justify-center">
              <div v-for="(field,ind) of Object.keys(errors)" :key="ind">
                <div v-for="(error,indx) of errors[field] || []" :key="indx">
                * {{error}}
                </div>
              </div>
            </span>
          </Alert>
          <input type="hidden" name="remember" value="true">
          <div class="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              v-model="user.email"
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password"
               name="password"
               type="password"
               autocomplete="current-password"
               required
               v-model="user.password"
               class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password">
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                v-model="user.remember"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>    
          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
            </div>
          </div>
          <div>
            <button type="submit" 
            class="group relative flex w-full justify-center 
            rounded-md border border-transparent 
            bg-indigo-600 py-2 px-4 text-sm font-medium 
            text-white hover:bg-indigo-700 focus:outline-none 
            focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            :class="{'cursor-not-allowed':loadingBtn,'hover:bg-indigo-500':loadingBtn}">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <!-- Heroicon name: mini/lock-closed -->
                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
              </span>
              <svg v-if="loadingBtn" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
</template>
<script setup>
//import {lockClosedIcon  } from "@heroicons/vue/solid";
import Alert from '../components/Alert.vue'
import store from "../store";
import {useRouter} from 'vue-router';
import { ref } from "vue";
const router=useRouter();
const user={
  email:"",
  password:"",
  remember:false
};

const loadingBtn=ref(false);
const errors=ref('');
 function login(e){
  e.preventDefault();
  loadingBtn.value=true;
  store.dispatch('login',user)
  .then((res)=>{
    loadingBtn.value=false;
    router.push({name:"Dashboard"});
  }).catch((err)=>{
    loadingBtn.value=false;
    errors.value = "err.response.data.errors";
    });
}
</script>
<style scoped>


</style>
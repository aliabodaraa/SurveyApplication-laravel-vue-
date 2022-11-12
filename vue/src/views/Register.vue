<template>

        <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div class="w-full max-w-md space-y-8">
            <div>
              <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Register">
              <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up to your account</h2>
              <p class="mt-2 text-center text-sm text-gray-600">
                <router-link :to="{name:'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">go to login page</router-link>
              </p>
            </div>
            <form class="mt-8 space-y-3" @submit="register">
              <div v-if="errMssg" class="static p-6 bg-red-500 text-white rounded">
                <span @click="errMssg =''" class="float-right relative top-5 left-5 pl-2 w-11 h-11 items-center flex justify-items rounded-full transition-colors cursur-pointer hover:bg-[rgba(0,0,0,0.2)]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>            
                </span>
                {{ errMssg }}
              </div>
              <input type="hidden" name="remember" value="true">
              <div class="-space-y-px rounded-md shadow-sm">
                <div>
                  <label for="name" class="sr-only">Full Name</label>
                  <input id="name" name="name" type="text" autocomplete="name" v-model="user.name"
                   class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Full Name">
                </div>
                <div>
                  <label for="email-address" class="sr-only">Email address</label>
                  <input id="email-address" name="email" type="email" autocomplete="email" v-model="user.email"
                   class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address">
                </div>
                <div>
                  <label for="password" class="sr-only">Password</label>
                  <input id="password" name="password" type="password" autocomplete="current-password" v-model="user.password"
                   class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password">
                </div>
                <div>
                  <label for="password_confirmation" class="sr-only">Password_Confirmation</label>
                  <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password_confirmation" v-model="user.password_confirmation"
                   class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password_Confirmation">
                </div>
              </div>
        
              <div class="flex items-center justify-between">
                <!-- <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                  <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                </div> -->
        
                <div class="text-sm">
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                </div>
              </div>
        
              <div>
                <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <!-- Heroicon name: mini/lock-closed -->
                    <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
</template>
<script setup>
//import { LockClosedIcon } from "@hero/vue/solid";
//import store from '../store';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import { ref } from 'vue';
const router=useRouter();
const store=useStore();
const user={
  name:'',
  email:'',
  password:'',
  password_confirmation:''
}
let errMssg=ref('');
function register(e){
  e.preventDefault();
   store.dispatch('register',user)//return Promise after call the function register from actions in store file
  .then((res)=>{
    console.log(res,"register successfully");
    router.push({name:'Dashboard'});
  }).catch((err)=>{
      if(err.response.data.errors['name'])
        err.response.data.errors['name'].forEach((er) => {
              errMssg.value+=er+"\n";
        });
      else if(err.response.data.errors['email'])
        err.response.data.errors['email'].forEach((er) => {
                errMssg.value+=er+"\n";
        });
      else if(err.response.data.errors['password'])
        err.response.data.errors['password'].forEach((er) => {
                errMssg.value+=er+"\n";
        });
      else
        err.response.data.errors['password_confirmation'].forEach((er) => {
                errMssg.value+=er+"\n";
        });
});
}

</script>
<!-- <script>
  //import { LockClosedIcon } from "@hero/vue/solid";
  //import { computed } from 'vue';
  import {useRouter} from 'vue-router';
  import {useStore} from 'vuex';
  const user={
    name:'',
    email:'',
    password:'',
    password_confirmation:''
  };
  export default {
    name: "Register",
    setup(){
      const store = useStore();
      const router=useRouter();
      function register(e){
        e.preventDefault();
        store.dispatch('register',user)//return Promise after call the function register from actions in store file
        .then((res)=>{console.log(res);router.push({name:'Dashboard'})});
      }
      return{
        register};
    }
  }
</script> -->
<style scoped>


</style>
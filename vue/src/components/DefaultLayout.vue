<template>
<div class="min-h-full">
  DefaultLayout
      <nav class="bg-gray-800">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-300">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                      </svg>
                    </div>
                    <div class="hidden md:block">
                      <div class="ml-10 flex items-baseline space-x-4">
                        <div v-if="user.token">
                          <router-link 
                            v-for="x in navigationAuth" 
                            :key="x.id"
                            :to="x.to" 
                            class="text-gray-300 hover:bg-gray-700 hover:text-white p-4" 
                            active-class="bg-gray-900 text-white">
                            {{x['to']['name']}}
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 v-show="showList">{{mssg}}</h1>
                  <div class="hidden md:block">
                      <div class="ml-4 flex items-center md:ml-6">
                        <button type="button" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span class="sr-only">View notifications</span>
                          <!-- Heroicon name: outline/bell -->
                          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                          </svg>
                        </button>
            
                        <!-- Profile dropdown -->
                          <div class="relative ml-3">
                            <div>
                              <button @click="showList=!showList" type="button" class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                              </button>
                            </div>
                            <div v-if="showList" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                              <a @click="logout" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                              <a class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Profile</a>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div class="-mr-2 flex md:hidden">
                    <!-- Mobile menu button -->
                    <button type="button" class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                      <span class="sr-only">Open main menu</span>
                      <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>

                    </button>
                  </div>
            </div>
          </div> 
          <div class="user-name bg-yellow-100" >{{ user.data.name }}</div>
          <!-- <div class="vbv" style="background-color:red">{{ user.data.name }}</div> -->
          <!-- {{ user.name }} -->
          <!-- Mobile menu, showList/hide based on menu state. -->
          <div class="md:hidden" id="mobile-menu">
                <div v-if="user.token" class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                      <router-link 
                      v-for="x in navigationAuth" 
                      :key="x.id"
                      :to="x.to" 
                      class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" 
                      active-class="bg-gray-900 text-white">
                      {{x['to']['name']}}
                    </router-link>
                </div>
                <div class="border-t border-gray-700 pt-4 pb-3">
                    <div class="flex items-center px-5">
                      <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                      </div>
                      <div class="ml-3">
                        <div class="text-base font-medium leading-none text-white">{{ user.data.name }}</div>
                        <div class="text-sm font-medium leading-none text-gray-400">{{ user.data.email }}</div>
                      </div>
                      <button type="button" class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span class="sr-only">View notifications</span>
                        <!-- Heroicon name: outline/bell -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                      </button>
                    </div>
                    <div class="mt-3 space-y-1 px-2">
                      <a @click="logout"  class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-red-500">Sign out</a>
                    </div>
                </div>
          </div>
      </nav>
</div>     
<Notification/>

      <!-- inherit Dashboard or survey according to defination routes -->
<router-view/>
</template>
<script setup>
import Notification from "../components/Notification.vue";
import { ref } from "vue";
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from "vue-router";
  let showList =ref(Boolean);
  showList.value=false;

  const navigationAuth=[
  {name:"Dashboard",to:{name:"Dashboard"}},
  {name:"Surveys",to:{name:"Surveys"}}
  ];
  // const navigationGuest=[
  //   {name:"Register",to:{name:"Register"}},
  //   {name:"Login",to:{name:"Login"}}
  //   ];
      const store = useStore();
      const router = useRouter();
       function logout() {
        store.dispatch('logout').then(()=>{
          //console.log("in Default");
          router.push({name:'Login'});
        }).catch((err)=>{
          console.log("Error"+err)
        });
      };
      function profile() {

      };
      //let user= computed(()=>store.state.user);
      const user=ref('');
      user.value=store.state.user;
      console.log("HELLddddddddO",user.value.data.name);
      console.log("TOOOOOOOOOOOOOOOOOOOOOOO",user.value.token);
      console.log(sessionStorage.getItem('TOKEN'));

      let mssg =ref('');
      mssg.value="Hello "+user.value.data.email;
  </script>
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import AuthLayout from './components/DefaultLayout.vue';import DefaultLayout from './components/DefaultLayout.vue';
</script>

<template>
    <!-- <router-view></router-view> -->
    <!-- <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <div class="main w-full absolute top-0 right-0">
    <router-view></router-view>
  </div>
  <!-- <h1 style="color:green">{{ user['data']['name'] }} Root mapState</h1>
  <h1 style="color:blue">{{ getData }} Root mapGetters</h1>
  <h2 style="color:red">{{this.$store.commit('changeName',{new_name:'Asem Dribati'})}} change the name via mutation</h2>
  <h2 style="color:red">{{this.$store.dispatch('changeName1')}}change the name via action</h2> -->
</template>
<!-- <script>
  import {mapState,mapGetters, mapMutations, mapActions} from "vuex"
  export default {
    computed:{
      ...mapState(['user']),
      ...mapGetters(['getData']),      
      ...mapMutations(['changeName']),
      ...mapActions(['changeName1']),
    },methods:{
//or here
//...mapMutations(['changeName']),
    }
  }
</script> -->
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<template>
    <div v-if="notification.show" 
    class="animate-fade-in-down fixed 
    w-[400px] right-0 top-13 p-4 text-white z-10"
    :class="[notification.type ==='success' ?' bg-emerald-500':'bg-red-500']">
        {{ notification.message }}
    </div>
</template>

<script setup>
import PageComponents from "../components/Notification.vue";

import { computed } from 'vue';
import { useStore } from 'vuex';
const store=useStore();
const notification=computed(()=>store.state.notification);
</script>

<style>

</style>
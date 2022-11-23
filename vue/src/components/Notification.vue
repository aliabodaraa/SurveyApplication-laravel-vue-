<template>
    <div v-if="notification.show" 
    class="animate-fade-in-down fixed 
    w-[300px] right-0 bottom-3 py-2 px-4 text-white"
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
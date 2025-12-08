<template>
  <div class="d-flex vh-100 bg-dark text-light flex-column">
    <div class="p-3 border-bottom border-secondary">
      <SideBar>
        <BOrchestrator />
        <ChatBox />
      </SideBar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BOrchestrator } from 'bootstrap-vue-next';
import ChatBox from '../components/ChatBox.vue';
import SideBar from '../components/SideBar.vue';
</script>

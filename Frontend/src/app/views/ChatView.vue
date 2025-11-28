<template>
  <BOrchestrator />
  <div class="p-4">
  <CreateFileSearchStore />
  <SelectSearchStore />
  <UploadToFileStore />
  </div>
  <div class="p-4">
    <ChatBox />
  </div>
</template>

<script setup lang="ts">
import { BOrchestrator } from 'bootstrap-vue-next';
import CreateFileSearchStore from '../components/CreateFileSearchStore.vue';
import SelectSearchStore from '../components/SelectSearchStore.vue';
import UploadToFileStore from '../components/UploadToFileStore.vue';
import ChatBox from '../components/ChatBox.vue';
</script>

<template>
  <div class="d-flex flex-column bg-dark text-light flex-grow-1" style="height: 90%;">
    <!-- Chat list -->
    <div ref="chatScreen" class="overflow-auto p-3 bg-black">
      <div v-for="msg in messages" :key="msg.id"
        class="mb-3 p-3 rounded bg-secondary d-flex flex-column break-word pre-wrap" style="max-width: 70%;"
        :class="{ 'ms-auto text-end': msg.sender === 'user' }">
        {{ msg.text }}
      </div>
    </div>
  </div>
  <!-- Input -->
  <div class="input-group p-3 bg-dark border-top border-secondary" style="height: 10%;">
    <input v-model="question" @keyup.enter="send" type="text" class="form-control bg-black text-dark border-secondary"
      placeholder="Type your question..." />
    <button @click="send" class="btn btn-primary">Send</button>
  </div>
</template>

<script setup lang="ts">
import { useChatBot } from '../composable/useChatBot.script';

const { messages, send, question, chatScreen } = useChatBot();
</script>
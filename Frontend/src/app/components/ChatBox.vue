<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="msg in messages" :key="msg.id" class="message">
        <strong>{{ msg.sender }}:</strong> {{ msg.text }}
      </div>
    </div>
    <input v-model="question" @keyup.enter="send" placeholder="Nhập câu hỏi..." />
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import router from '@/app/router';
const messages = ref<{ id: number; sender: string; text: string }[]>([]);
const question = ref("");

const send = async () => {
  if (!question.value.trim()) return;

  const userMessage = {
    id: Date.now(),
    sender: "User",
    text: question.value,
  };
  messages.value.push(userMessage);

  try {
    const currentFileSearchStore = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('currentFileSearchStore='))
      ?.replace('currentFileSearchStore=', '') || '';

    const data = {
      data: {
        questionText: question.value,
        fileSearchStoreName: currentFileSearchStore
      },
      timestamp: Date.now()
    }

    const response = await router.post("qa/ask", data);

    const botMessage = {
      id: Date.now() + 1,
      sender: "Bot",
      text: response.data.data.responseText,
    };
    messages.value.push(botMessage);
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    question.value = "";
  }
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.messages {
  padding: 10px;
  background: #f6f6f6;
  height: 400px;
  overflow-y: auto;
  border-radius: 6px;
}

.message {
  margin-bottom: 10px;
}
</style>

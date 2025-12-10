<template>
    <div>
        <div>
            <ul class="list-group">
                <li v-for="sessionChat in sessionChats" :key="sessionChat.id" @click="changeSessionChat(sessionChat.id)"
                    class="list-group-item d-flex justify-content-center align-items-center bg-secondary text-light border-0">
                    <BButton class="truncate-btn">{{ sessionChat.sessionName }}</BButton>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getUserSessionChats } from '@/utilities/getUserSessionChats';

const { sessionChats } = await getUserSessionChats();
function changeSessionChat(sessionChat: string) {
    document.cookie = `currentSessionChat=${sessionChat}; path=/`;
    window.location.reload();
}
</script>

<style scoped>
.truncate-btn {
    display: inline-block;
    max-width: 150px;
    /* tùy chỉnh */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
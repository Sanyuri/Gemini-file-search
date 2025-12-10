import router from "@/app/router";
import type { SessionChat } from "@/models/entities/sessionChat";
import { ref } from "vue";

export async function getUserSessionChats() {
    const sessionChats = ref<SessionChat[]>([])

    try {
        const response = await router.get('/users/session-chats');
        if (response.status === 200 && response.data.data) {
            sessionChats.value = response.data.data;
        }
    } catch (error) {
        console.error("Error fetching session chats:", error);
    }
    return {
        sessionChats
    }
}
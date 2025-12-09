import type { Ask } from "@/models/entities/ask";
import { getCurrentSearchStore } from "@/utilities/getCurrentSearchStore";
import { getCurrentSessionChat } from "@/utilities/getCurrentSessionChat";
import { getCurrentUser } from "@/utilities/getCurrentUser";
import { ref, nextTick } from "vue";
import router from "../router";
import { ApiRequest } from "@/models/interfaces/apiRequest";
import type { Answer } from "@/models/entities/asnwer";

const chatScreen = ref<HTMLElement | null>(null);

export function useChatBot() {
    const messages = ref<{ id: string; sender: string; text: string }[]>([]);
    const question = ref("");


    const send = async () => {
        if (!question.value.trim()) return;
        const fileSearchStoreName = getCurrentSearchStore();
        const sessionChatId = getCurrentSessionChat();
        const currentUser = await getCurrentUser();

        const userMessage: Ask = {
            questionText: question.value,
            fileSearchStoreName: fileSearchStoreName,
            sessionChatId: sessionChatId,
            userId: currentUser ? currentUser.id : null
        }

        messages.value.push({ id: Date.now().toString(), sender: "user", text: question.value });

        await nextTick();
        scrollToBottom();

        question.value = "";

        const response = await router.post("qa/ask", new ApiRequest<Ask>(userMessage));

        const botReply = response.data.data as Answer;

        messages.value.push({ id: botReply.id, sender: "bot", text: botReply.chatHistory });

        await nextTick();
        scrollToBottom();
    }
    return {
        messages,
        question,
        send,
        chatScreen
    };
}

export function scrollToBottom() {
    if (chatScreen.value) {
        chatScreen.value.scrollTop = chatScreen.value.scrollHeight;
    }
}

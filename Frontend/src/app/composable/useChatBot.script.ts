import type { Ask } from "@/models/entities/ask";
import { getCurrentSearchStore } from "@/utilities/getCurrentSearchStore";
import { getCurrentSessionChat } from "@/utilities/getCurrentSessionChat";
import { getCurrentUser } from "@/utilities/getCurrentUser";
import { ref, nextTick } from "vue";
import router from "../router";
import { ApiRequest } from "@/models/interfaces/apiRequest";
import type { Answer } from "@/models/entities/asnwer";
import type { get } from "http";

const chatScreen = ref<HTMLElement | null>(null);

export async function useChatBot() {
    const messages = ref<{ id: string; sender: string; text: string, source: string }[]>([]);
    const question = ref("");

    const isAuthenticated = document.cookie
        .split("; ")
        .find((row) => row.startsWith("isAuthenticated="))
        ?.split("=")[1] === "true";
    if (isAuthenticated) {
        await getChatHistory(messages);
    }

    const send = async () => {
        if (!question.value.trim()) return;
        const fileSearchStoreName = getCurrentSearchStore();
        const sessionChatId = getCurrentSessionChat();
        const currentUser = await getCurrentUser();

        const userMessage: Ask = {
            questionText: question.value,
            fileSearchStoreName: fileSearchStoreName,
            sessionChatId: sessionChatId,
            userId: currentUser ? currentUser.data?.id : undefined
        }

        messages.value.push({ id: Date.now().toString(), sender: "user", text: question.value, source: "" });

        await nextTick();
        scrollToBottom();

        question.value = "";

        const response = await router.post("qa/ask", new ApiRequest<Ask>(userMessage));

        const botReply = response.data.data as Answer;

        messages.value.push({ id: botReply.id, sender: "bot", text: botReply.chatHistory, source: botReply.sourceUrls.join(", ") });

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

export async function getChatHistory(messages: ReturnType<typeof ref<{ id: string; sender: string; text: string }[]>>) {
    const sessionChatId = getCurrentSessionChat();
    const data = {
        data: {
            sessionChatId: sessionChatId
        },
        timestamp: Date.now()
    }
    const response = await router.post(`/users/chat-histories`, data);

    const chatHistories = response.data.data as Answer[];

    messages.value = chatHistories
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((answer) => ({ id: answer.id, sender: answer.createdBy, text: answer.chatHistory, source: answer.sourceUrls ? answer.sourceUrls.join(", ") : "" }));
}

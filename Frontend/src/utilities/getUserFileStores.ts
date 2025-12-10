import { ref } from "vue"
import router from "@/app/router"
import type { FileSearchStore } from "@/models/entities/fileSearchStore";

export async function getUserFileStores() {
    const fileStores = ref<FileSearchStore[]>([])
    try {
        const response = await router.get('/users/file-stores');
        if (response.status === 200 && response.data.data) {
            fileStores.value = response.data.data;
        }
    } catch (error) {
        console.error("Error fetching file search stores:", error);
    }
    return {
        fileStores
    }
}
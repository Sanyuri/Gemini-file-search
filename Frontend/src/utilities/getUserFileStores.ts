import { ref } from "vue"
import router from "@/app/router"
import type { FileSearchStore } from "@/models/entities/fileSearchStore";

export async function getUserFileStores() {
    const fileStores = ref<FileSearchStore[]>([])
    const loading = ref(false)
    const load = async () => {
        try {
            loading.value = true
            const response = await router.get('/users/file-stores');
            if (response.status === 200 && response.data.data) {
                fileStores.value = response.data.data;
            }
        } catch (error) {
            console.error("Error fetching file search stores:", error);
        } finally {
            loading.value = false
        }
    }
    await load()
    return {
        fileStores,
        loading,
        load
    }
}
import { ref } from "vue"
import router from "../router"

export function useDeleteFileSearchStore(storeId: string | undefined) {
    const loading = ref(false)

    const deleteFileSearchStore = async () => {
        try {
            loading.value = true
            if (storeId) {
                await router.delete(`file-store/delete-store`, {
                    params: {
                        storeName: storeId
                    }
                })
                alert("File search store deleted successfully")
            }
        } catch (error) {
            console.error("Failed to delete file search store:", error)
        } finally {
            loading.value = false
            window.location.reload()
        }
    }

    return {
        deleteFileSearchStore,
        loading
    }
}   
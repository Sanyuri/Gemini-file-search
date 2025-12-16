import { ref } from "vue"
import router from "../router"

export function useDeleteFile(fileId: string | undefined) {
    const loading = ref(false)
    const deleteFile = async () => {
        try {
            loading.value = true
            await router.delete("file-store/delete-file", {
                params: {
                    fileName: fileId
                }
            })
            alert("File deleted successfully")
        } catch (error) {
            console.error("Failed to delete file:", error)
        } finally {
            loading.value = false
        }
    }
    return {
        deleteFile,
        loading
    }
}

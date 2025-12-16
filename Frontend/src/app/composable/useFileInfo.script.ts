import { ref } from "vue"
import router from "../router"
import type { File } from "@/models/entities/file"

export function useFileInfo(fileId: string) {
    const loading = ref(false)
    const modal = ref(false)
    const fileInfo = ref<File | null>(null)
    const getFileInfo = async (fileId: string | undefined) => {
        modal.value = !modal.value
        try {
            loading.value = true
            const fileInfoResponse = await router.get("file-store/file-info", {
                params:
                {
                    fileName: fileId
                }
            })
            fileInfo.value = fileInfoResponse.data.data as File
        } catch (error) {
            console.error("Failed to fetch file info:", error)
        }
    }
    return {
        getFileInfo,
        loading,
        modal,
        fileInfo
    }
}
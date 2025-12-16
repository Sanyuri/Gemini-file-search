import type { FileSearchStoreResponse } from '@/models/entities/fileSearchStore'
import { ref } from 'vue'
import router from '../router'
import type { File } from '@/models/entities/file'

export function useFileSearchStoreDetail(storeId: string) {
    const fileSearchStoreDetail = ref<FileSearchStoreResponse | null>(null)
    const pageToken = ref<string | undefined>(undefined)
    const pageSize = ref<number>(10)
    const modal = ref(false)
    const loading = ref(false)
    const files = ref<File[]>([])
    const getFileSearchStoreDetail = async () => {
        modal.value = true
        try {
            loading.value = true
            const storeInfoResponse = await router.get("file-store/store-info", { params: { storeName: storeId } })
            fileSearchStoreDetail.value = storeInfoResponse.data.data as FileSearchStoreResponse

            const filesResponse = await router.get("file-store/list-files", {
                params:
                {
                    storeName: storeId,
                    pageSize: pageSize.value,
                    pageToken: pageToken.value
                }
            })

            files.value = filesResponse.data.data.items as File[]
        } catch (error) {
            console.error("Failed to fetch file search store detail:", error)
        } finally {
            loading.value = false
        }
    }
    return {
        modal,
        getFileSearchStoreDetail,
        fileSearchStoreDetail,
        files,
        loading,
        pageSize,
        pageToken
    }
}

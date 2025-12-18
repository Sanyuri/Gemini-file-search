import { ref } from 'vue'
import router from '@/app/router'
import type { ApiResponse } from '@/models/interfaces/apiResponse'
import type { FileSearchStoreResponse } from '@/models/entities/fileSearchStore'
import { getCurrentSearchStore } from '@/utilities/getCurrentSearchStore'
import { getCurrentUser } from '@/utilities/getCurrentUser'

export function useCreateFileSearchStore() {

    const modal = ref(false)

    const storeName = ref('')

    const onSubmit = async (e: Event) => {
        e.preventDefault()

        try {
            const currentUser = await getCurrentUser()
            const data = {
                data: {
                    storeName: storeName.value,
                    userId: currentUser?.data?.id
                },
                timestamp: Date.now()
            }
            const response = await router.post('/file-store/create-store', data)

            if (response.status === 200) {
                const apiResponse = response.data as ApiResponse<FileSearchStoreResponse>
                if (apiResponse.data) {
                    const currentFileSearchStore = getCurrentSearchStore()
                    if (!currentFileSearchStore) {
                        document.cookie = `currentFileSearchStore=${apiResponse.data.id}; path=/`
                    }

                    alert(`File search store "${apiResponse.data.displayName}" has been created successfully.`)
                }
            }
        } catch (error) {
            console.error("Error creating file search store:", error);
        }
        // Add logic to create the file search store
        modal.value = false
    }
    return {
        modal,
        storeName,
        onSubmit
    }
}
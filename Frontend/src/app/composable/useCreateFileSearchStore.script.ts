import { ref } from 'vue'
import router from '@/app/router'
import type { ApiResponse } from '@/models/interfaces/apiResponse'
import type { FileSearchStore } from '@/models/entities/fileSearchStore'
import { getCurrentSearchStore } from '@/utilities/getCurrentSearchStore'

export function useCreateFileSearchStore() {

    const modal = ref(false)

    const storeName = ref('')

    const onSubmit = async (e: Event) => {
        e.preventDefault()

        try {
            const data = {
                data: {
                    storeName: storeName.value
                },
                timestamp: Date.now()
            }
            const response = await router.post('/file-store/create-store', data)

            if (response.status === 200) {
                const apiResponse = response.data as ApiResponse<FileSearchStore>
                if (apiResponse.data) {
                    const existingStores = document.cookie
                        .split('; ')
                        .filter(cookie => cookie.startsWith('fileSearchStores='))
                        .map(cookie => cookie.replace('fileSearchStores=', ''))
                        .flatMap(cookieValue => cookieValue ? cookieValue.split(',') : [])

                    existingStores.push(apiResponse.data.name)
                    document.cookie = `fileSearchStores=${existingStores.join(',')}`

                    const currentFileSearchStore = getCurrentSearchStore()
                    if (!currentFileSearchStore) {
                        document.cookie = `currentFileSearchStore=${apiResponse.data.name}; path=/`
                    }

                    alert(`File search store "${apiResponse.data.name}" has been created successfully.`)
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
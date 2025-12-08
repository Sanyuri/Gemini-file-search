import { ref } from 'vue'
import router from '@/app/router'

export function useUploadToFileStore() {
    const files = ref<null | File[]>(null)
    const modal = ref(false)
    const loading = ref(false)

    const onSubmit = async (e: Event) => {
        e.preventDefault()

        if (!files.value || files.value.length === 0) {
            alert("No files selected for upload.")
            return
        }

        const formData = new FormData()
        for (const file of files.value) {
            formData.append('files', file)
        }

        const storeName = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('currentFileSearchStore='))
            ?.replace('currentFileSearchStore=', '')

        if (!storeName) {
            alert("Please select a file search store before uploading files.")
            return
        }

        formData.append('storeName', storeName)

        loading.value = true
        try {
            const response = await router.post('/file-store/upload-files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            alert(`Upload Response: ${response.data.message}`)
            modal.value = false
        } catch (error) {
            console.error("Error uploading files:", error)
        } finally {
            loading.value = false
        }
    }

    return {
        files,
        modal,
        loading,
        onSubmit
    }
}

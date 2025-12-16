import { ref } from "vue"

export function useSelectFileSearchStore() {
    const modal = ref(false)

    const changeFileStore = (fileStoreId: string,fileStoreName: string, e: Event) => {
        e.preventDefault()

        document.cookie = `currentFileSearchStore=${fileStoreId}; path=/`
        alert(`File search store has been changed to: ${fileStoreName}`)
        modal.value = false
    }
    return {
        modal,
        changeFileStore
    }
}
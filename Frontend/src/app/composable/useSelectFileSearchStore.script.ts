import { ref } from "vue"

export function useSelectFileSearchStore() {
    const modal = ref(false)

    const changeFileStore = (fileStoreId: string, e: Event) => {
        e.preventDefault()

        document.cookie = `currentFileSearchStore=${fileStoreId}; path=/`
        alert(`File search store has been changed to: ${fileStoreId}`)

        modal.value = false
    }
    return {
        modal,
        changeFileStore
    }
}
import { ref } from "vue"

export function useSelectFileSearchStore() {
    const modal = ref(false)

    const currentStore = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('currentFileSearchStore='))
        ?.replace('currentFileSearchStore=', '') || ''

    const existingStores = document.cookie
        .split('; ')
        .filter(cookie => cookie.startsWith('fileSearchStores='))
        .map(cookie => cookie.replace('fileSearchStores=', ''))
        .flatMap(cookieValue => cookieValue ? cookieValue.split(',') : [])

    const options = existingStores.map(store => ({ value: store, text: store }))

    const selected = ref(currentStore)

    const onSubmit = (e: Event) => {
        e.preventDefault()

        document.cookie = `currentFileSearchStore=${selected.value}`
        alert(`File search store has been changed to: ${selected.value}`)

        modal.value = false
    }
    return {
        modal,
        options,
        selected,
        onSubmit
    }
}
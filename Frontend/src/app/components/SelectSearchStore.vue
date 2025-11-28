<template>
    <BButton @click="modal = !modal"> Select file search store </BButton>
    <BModal v-model="modal" title="Select file search store" no-footer>
        <BForm @submit="onSubmit">
            <BFormGroup label="Select Store" label-for="select-store">
                <BFormSelect id="select-store" v-model="selected" :options="options" required></BFormSelect>
                <BBFormGroup>
                    <BButton type="submit" variant="primary">Change File Store</BButton>
                    <BButton variant="secondary" @click="modal = false">Cancel</BButton>
                </BBFormGroup>
            </BFormGroup>
        </BForm>
    </BModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
    alert(`Current file search store changed to: ${selected.value}`)

    modal.value = false
}
</script>
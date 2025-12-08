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
import { useSelectFileSearchStore } from '../composable/useSelectFileSearchStore.script';
const { modal, selected, options, onSubmit } = useSelectFileSearchStore();
</script>
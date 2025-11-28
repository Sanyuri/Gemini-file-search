<template>
    <BButton @click="modal = !modal"> Upload to File Store </BButton>
    <BModal v-model="modal" title="Upload to File Store" no-footer>
        <BForm @submit="onSubmit">
            <BFormGroup label="Select Files" label-for="file-input">
                <BFormFile v-model="files" multiple />
                <div class="mt-3">
                    Files: <strong>{{files?.map((file) => file.name).join(', ') || 'No files selected'}}</strong>
                </div>
            </BFormGroup>
            <BBFormGroup>
                <BButton type="submit" variant="primary">Upload Files</BButton>
                <BButton variant="secondary" @click="modal = false">Cancel</BButton>
            </BBFormGroup>
        </BForm>
    </BModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/app/router'

const files = ref<null | File[]>(null)

const modal = ref(false)
const onSubmit = async (e: Event) => {
    e.preventDefault()

    if (!files.value || files.value.length === 0) {
        console.warn("No files selected for upload.");
        return;
    }

    const formData = new FormData();
    for (const file of files.value) {
        formData.append('files', file);
    }

    const storeName = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('currentFileSearchStore='))
        ?.replace('currentFileSearchStore=', '');

    if (!storeName) {
        console.error("No file search store selected.");
        return;
    }

    formData.append('storeName', storeName);

    try {
        const response = await router.post('/file-store/upload-files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        alert(`Upload Response: ${response.data.message}`);
        modal.value = false;
    } catch (error) {
        console.error("Error uploading files:", error);
    }
}
</script>
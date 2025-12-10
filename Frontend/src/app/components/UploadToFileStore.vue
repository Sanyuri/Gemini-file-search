<template>
    <BButton @click="modal = !modal" class="d-flex justify-content-center align-items-center"> Upload to File Store </BButton>

    <BModal v-model="modal" title="Upload to File Store" no-footer>
        <BForm @submit="onSubmit">
            <BFormGroup label="Select Files" label-for="file-input">
                <BFormFile v-model="files" multiple />
                <div class="mt-3">
                    Files:
                    <strong>{{files?.map(f => f.name).join(', ') || 'No files selected'}}</strong>
                </div>
            </BFormGroup>

            <BFormGroup>
                <BButton type="submit" variant="primary" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    {{ loading ? 'Uploading...' : 'Upload Files' }}
                </BButton>

                <BButton variant="secondary" @click="modal = false" :disabled="loading">
                    Cancel
                </BButton>
            </BFormGroup>
        </BForm>
    </BModal>
</template>

<script setup lang="ts">
import { useUploadToFileStore } from '../composable/useUploadToFileStore.script';
const { modal, files, loading, onSubmit } = useUploadToFileStore();
</script>

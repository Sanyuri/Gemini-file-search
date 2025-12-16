<template>
    <BButton variant="danger" @click="onDelete" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        {{ loading ? 'Deleting...' : 'Delete' }}
    </BButton>
</template>
<script setup lang="ts">
import { useDeleteFile } from '../composable/useDeleteFile.script';
const fileId = defineProps<{ fileId: string }>()
const { deleteFile, loading } = useDeleteFile(fileId.fileId);

const emit = defineEmits<{
    (e: 'deleted'): void;
}>();

const onDelete = async () => {
    await deleteFile();
    emit('deleted');
};
</script>
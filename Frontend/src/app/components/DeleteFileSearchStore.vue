<template>
    <BButton variant="danger" @click="onDelete" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        {{ loading ? 'Deleting...' : 'Delete' }}
    </BButton>
</template>

<script setup lang="ts">
import { useDeleteFileSearchStore } from '../composable/useDeleteFileSearchStore.script';
const storeId = defineProps<{ storeId: string }>()
const { deleteFileSearchStore, loading } = useDeleteFileSearchStore(storeId.storeId);
const emit = defineEmits<{
    (e: 'deleted'): void;
}>();
const onDelete = async () => {
    await deleteFileSearchStore();
    emit('deleted');
};
</script>
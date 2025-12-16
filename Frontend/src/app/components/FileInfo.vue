<template>
    <BButton size="sm" variant="info" @click="getFileInfo(fileId.fileId)">
        Detail
    </BButton>
    <BModal v-model="modal" title="File Details" no-footer no-header-close size="lg">
        <div class="p-3 row">
            <div class="col-6">
                <strong>Created time: </strong>{{ new Date(fileInfo?.createTime!).toLocaleDateString() }}
            </div>
            <div class="col-6 text-end">
                <strong>Last updated: </strong>{{ new Date(fileInfo?.updateTime!).toLocaleDateString() }}
            </div>
        </div>
        <div class="p-3 row">
            <div class="col-6">
                <strong>File Name: </strong>{{ fileInfo?.displayName }}
            </div>
            <div class="col-6 text-end">
                <strong>Type: </strong>{{ fileInfo?.mimeType }}
            </div>
        </div>
        <div class="p-3 row">
            <div class="col-6">
                <strong>State: </strong>{{ fileInfo?.state }}
            </div>
            <div class="col-6 text-end">
                <strong>Size: </strong>{{ (Number(fileInfo?.sizeBytes) / 1024 / 1024).toFixed(2) }} MB
            </div>
        </div>
        <BCardFooter v-if="loading">
            <DeleteFile :fileId="fileId.fileId" @deleted="onFileDeleted"/>
            <BButton variant="primary" @click="modal = false">Close</BButton>
        </BCardFooter>
    </BModal>

</template>
<script setup lang="ts">
import type { BCardFooter } from 'bootstrap-vue-next';
import { useFileInfo } from '../composable/useFileInfo.script';
import DeleteFile from './DeleteFile.vue';
const fileId = defineProps<{ fileId: string }>()
const { getFileInfo, loading, modal, fileInfo } = useFileInfo(fileId.fileId);

const onFileDeleted = () => {
    modal.value = false;
};

</script>
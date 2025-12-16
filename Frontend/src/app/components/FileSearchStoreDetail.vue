<template>
    <BButton @click="getFileSearchStoreDetail" variant="info">Details</BButton>
    <BModal v-model="modal" title="File Search Store Details" no-footer no-header-close size="xl">
        <div class="p-3 row">
            <div class="col-6">
                <strong>Created time: </strong>{{ new Date(fileSearchStoreDetail?.createTime!).toLocaleDateString() }}
            </div>
            <div class="col-6 text-end">
                <strong>Last updated: </strong>{{ new Date(fileSearchStoreDetail?.updateTime!).toLocaleDateString() }}
            </div>
        </div>
        <BTable :items="files" :fields="fields" :busy="loading" small>
            <template #cell(displayName)="data">
                {{ data.item.displayName }}
            </template>

            <template #cell(sizeBytes)="data">
                {{ (Number(data.item.sizeBytes) / 1024 / 1024).toFixed(2) }} MB
            </template>

            <template #cell(createTime)="data">
                {{ new Date(data.item.createTime).toLocaleDateString() }}
            </template>

            <template #cell(updateTime)="data">
                {{ new Date(data.item.updateTime).toLocaleDateString() }}
            </template>
            <template #cell(actions)="data">
                <div class="d-flex justify-content-center gap-2">
                    <FileInfo :fileId="data.item.id!" />
                    <DeleteFile :fileId="data.item.id!" @deleted="onFileDeleted" />
                </div>
            </template>
        </BTable>
        <div class="d-flex justify-content-end my-2">
            <BPagination v-if="files.length === pageSize" :per-page="pageSize" :value="pageToken"
                @change="getFileSearchStoreDetail" />
        </div>
    </BModal>
</template>
<script setup lang="ts">
import { useFileSearchStoreDetail } from '../composable/useFileSearchStoreDetail.script';
import DeleteFile from './DeleteFile.vue';
import FileInfo from './FileInfo.vue';
const storeId = defineProps<{ storeId: string }>()
const { modal, getFileSearchStoreDetail, fileSearchStoreDetail, files, loading, pageSize, pageToken } = useFileSearchStoreDetail(storeId.storeId);

const fields = [
    { key: "displayName", label: "File Name" },
    { key: "sizeBytes", label: "Size (MB)" },
    { key: "mimeType", label: "Mime Type" },
    { key: "createTime", label: "Create Time" },
    { key: "updateTime", label: "Update Time" },
    { key: "actions", label: "Action", class: "text-center" }
];

const onFileDeleted = async () => {
    await getFileSearchStoreDetail();
};
</script>
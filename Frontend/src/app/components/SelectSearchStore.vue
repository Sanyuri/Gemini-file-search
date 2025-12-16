<template>
    <BButton @click="modal = !modal" class="d-flex justify-content-center align-items-center w-100"> File search store
    </BButton>
    <BModal v-model="modal" title="File search store" no-footer no-header-close>
        <div>
            <ul class="list-group d-flex overflow-auto flex-grow-1" style="max-height: 400px;">
                <li v-for="store in fileStores" :key="store.id"
                    class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-light border-0">
                    <div>{{ store.name }}</div>
                    <div>
                        <FileSearchStoreDetail :store-id="store.id" />
                        <BButton variant="success" @click="changeFileStore(store.id, store.name, $event)">Change File
                            Store
                        </BButton>
                        <DeleteFileSearchStore :store-id="store.id"
                            @deleted="fileStores = fileStores.filter(s => s.id !== store.id)" />
                    </div>
                </li>

            </ul>
        </div>
    </BModal>
</template>

<script setup lang="ts">
import { getUserFileStores } from '../../utilities/getUserFileStores';
import { useSelectFileSearchStore } from '../composable/useSelectFileSearchStore.script';
import DeleteFileSearchStore from './DeleteFileSearchStore.vue';
import FileSearchStoreDetail from './FileSearchStoreDetail.vue';
const { fileStores } = await getUserFileStores();
const { modal, changeFileStore } = useSelectFileSearchStore();

</script>
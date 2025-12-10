<template>
    <BButton @click="modal = !modal" class="d-flex justify-content-center align-items-center w-100"> File search store
    </BButton>
    <BModal v-model="modal" title="File search store" no-footer no-header-close>
        <div>
            <ul class="list-group d-flex overflow-auto flex-grow-1" style="max-height: 400px;">
                <li v-for="store in fileStores" :key="store.id"
                    class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-light border-0">
                    <div>{{ store.name }}</div>
                    <BButton variant="info" @click="changeFileStore(store.id, $event)">Change File Store
                    </BButton>
                </li>

            </ul>
        </div>
    </BModal>
</template>

<script setup lang="ts">
import { getUserFileStores } from '../../utilities/getUserFileStores';
import { useSelectFileSearchStore } from '../composable/useSelectFileSearchStore.script';
const { fileStores } = await getUserFileStores();
const { modal, changeFileStore } = useSelectFileSearchStore();
</script>
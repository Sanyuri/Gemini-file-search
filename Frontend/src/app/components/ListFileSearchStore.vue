<template>
    <div>
        <div>
            <ul class="list-group">
                <li v-for="store in fileStores" :key="store.id" @click="changeFileStore"
                    class="list-group-item d-flex justify-content-center align-items-center bg-secondary text-light border-0">
                    <BButton>{{ store.name }}</BButton>
                </li>

            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getUserFileStores } from '../../utilities/getUserFileStores';
const { fileStores } = await getUserFileStores();
const changeFileStore = () => {
    alert('Change File Store - to be implemented');
}
</script>
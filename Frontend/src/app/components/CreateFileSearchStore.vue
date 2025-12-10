<template>
  <BButton @click="modal = !modal" class="d-flex justify-content-center align-items-center"> Create File Search Store </BButton>
  <BModal v-model="modal" title="Create File Search Store" no-footer>
    <BForm @submit="onSubmit">
      <BFormGroup label="Store Name" label-for="store-name">
        <BFormInput id="store-name" v-model="storeName" required placeholder="Enter store name"></BFormInput>
      </BFormGroup>
      <BFormGroup>
        <BButton type="submit" variant="primary">Create Store</BButton>
        <BButton variant="secondary" @click="modal = false">Cancel</BButton>
      </BFormGroup>
    </BForm>
  </BModal>
</template>


<script setup lang="ts">
import { useCreateFileSearchStore } from '../composable/useCreateFileSearchStore.script';
const { modal, storeName, onSubmit } = useCreateFileSearchStore();
</script>
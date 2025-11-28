<template>
  <BButton @click="modal = !modal"> Create File Search Store </BButton>
  <BModal v-model="modal" title="Create File Search Store" no-footer>
    <BForm @submit="onSubmit">
      <BFormGroup label="Store Name" label-for="store-name">
        <BFormInput id="store-name" v-model="storeName" required placeholder="Enter store name"></BFormInput>
      </BFormGroup>
      <BBFormGroup>
        <BButton type="submit" variant="primary">Create Store</BButton>
        <BButton variant="secondary" @click="modal = false">Cancel</BButton>
      </BBFormGroup>
    </BForm>
  </BModal>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import router from '@/app/router'
import type { ApiResponse } from '@/domain/interfaces/apiResponse'

const modal = ref(false)

const storeName = ref('')

const onSubmit = async (e: Event) => {
  e.preventDefault()

  try{
    const data = {
      data: {
        storeName: storeName.value
      },
      timestamp: Date.now()
    }
    const response = await router.post('/file-store/create-store', data)

    if(response.status === 200){
      const apiResponse = response.data as ApiResponse<string>
      if (apiResponse.data) {
        const existingStores = document.cookie
          .split('; ')
          .filter(cookie => cookie.startsWith('fileSearchStores='))
          .map(cookie => cookie.replace('fileSearchStores=', ''))
          .flatMap(cookieValue => cookieValue ? cookieValue.split(',') : [])
      
        existingStores.push(apiResponse.data)
        
        document.cookie = `fileSearchStores=${existingStores.join(',')}`
      }
    }
  }catch(error){
    console.error("Error creating file search store:", error);
  }
  // Add logic to create the file search store
  modal.value = false
}

</script>
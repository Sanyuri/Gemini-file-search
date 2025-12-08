<template>
  <div class="d-flex flex-row w-100" style="height: 95vh; overflow: hidden;">
    <!-- Sidebar -->
    <div :class="[
      'bg-secondary text-light p-3 transition',
      collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
    ]">
      <BButton size="sm" variant="dark" class="mb-3 w-100" @click="collapsed = !collapsed">
        ☰
      </BButton>

      <div v-if="!collapsed">
        <nav class="d-flex flex-column">
          <CreateFileSearchStore />
          <SelectSearchStore />
          <UploadToFileStore />
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-grow-1 p-3 overflow-hidden">
      <slot />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import SelectSearchStore from './SelectSearchStore.vue'
import CreateFileSearchStore from './CreateFileSearchStore.vue'
import UploadToFileStore from './UploadToFileStore.vue'

const collapsed = ref(false)
</script>

<style scoped>
.sidebar-expanded {
  width: 220px;
  transition: width 0.3s ease;
}

.sidebar-collapsed {
  width: 60px;
  transition: width 0.3s ease;
  overflow: hidden;
}

.transition {
  transition: width 0.3s ease;
}
</style>

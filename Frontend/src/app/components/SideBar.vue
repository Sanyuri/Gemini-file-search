<template>
  <div class="d-flex flex-row w-100" style="height: 95vh; overflow: hidden;">

    <!-- Sidebar -->
    <div :class="[
      'bg-secondary text-light p-3 transition d-flex flex-column',
      collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
    ]">

      <!-- Toggle button -->
      <BButton size="sm" variant="dark" class="mb-3 w-100" @click="collapsed = !collapsed">
        ☰
      </BButton>

      <!-- Middle menu -->
      <div class="flex-grow-1 overflow-auto">
        <div v-if="!collapsed">
          <nav class="d-flex flex-column">
            <CreateFileSearchStore />
            <SelectSearchStore />
            <UploadToFileStore />
          </nav>
        </div>
      </div>

      <!-- User control at bottom -->
      <div class="mt-auto pt-3 border-top">
        <div v-if="collapsed">
          <!-- collapsed: chỉ hiện icon -->
          <BButton size="sm" variant="dark" class="w-100 p-1">
            👤
          </BButton>
        </div>
        <div v-else>
          <BDropdown text="👤" variant="dark" class="w-100 p-1">
            <div v-if="!authStatus">
              <BDropdownItem>
                <Login />
              </BDropdownItem>
              <BDropdownItem>
                <Register />
              </BDropdownItem>
            </div>
            <div v-else>
              <BDropdownItem @click="onLogout">
                Logout
              </BDropdownItem>
            </div>
          </BDropdown>
        </div>
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
import Login from './Login.vue'
import Register from './Register.vue'
import { useLogout } from '../composable/useLogout.script'

const collapsed = ref(false)
const { onLogout } = useLogout()

const authStatus = document.cookie.split('; ').find(row => row.startsWith('isAuthenticated='))?.split('=')[1]
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

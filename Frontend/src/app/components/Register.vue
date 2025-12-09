<template>
    <div @click="modal = !modal">Register</div>
    <BModal v-model="modal" title="Register" no-footer>
        <BForm @submit="onSubmit">
            <BFormGroup label="Email" label-for="emailRegister">
                <BFormInput id="emailRegister" v-model="email" required placeholder="Enter your email"></BFormInput>
            </BFormGroup>
            <BFormGroup label="Password" label-for="passwordRegister">
                <BFormInput id="passwordRegister" type="password" v-model="password" required
                    placeholder="Enter your password">
                </BFormInput>
            </BFormGroup>
            <BFormGroup>
                <BButton type="submit" variant="primary">Register</BButton>
            </BFormGroup>
        </BForm>
    </BModal>
</template>
<script setup lang="ts">
import { useRegister } from '../composable/useRegister.script';
const { modal, email, password, onSubmit } = useRegister();
</script>
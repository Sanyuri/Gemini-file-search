<template>
    <div @click="modal = !modal">Login</div>
    <BModal v-model="modal" title="Login" no-footer>
        <BForm @submit="onSubmit">
            <BFormGroup label="Email" label-for="emailLogin">
                <BFormInput id="emailLogin" v-model="email" required placeholder="Enter your email"></BFormInput>
            </BFormGroup>
            <BFormGroup label="Password" label-for="passwordLogin">
                <BFormInput id="passwordLogin" type="password" v-model="password" required
                    placeholder="Enter your password">
                </BFormInput>
            </BFormGroup>
            <BFormGroup>
                <BButton type="submit" variant="primary">Login</BButton>
            </BFormGroup>
        </BForm>
    </BModal>
</template>
<script setup lang="ts">
import { useLogin } from '../composable/useLogin.script';
const { modal, email, password, onSubmit } = useLogin();

</script>
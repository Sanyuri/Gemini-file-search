import { ref } from "vue";
import router from "@/app/router";

export function useLogin() {

    const modal = ref(false)
    const email = ref('')
    const password = ref('')

    const onSubmit = async (e: Event) => {
        e.preventDefault()
        try {
            const data = {
                data: {
                    email: email.value,
                    password: password.value
                },
                timestamp: Date.now()
            }

            const response = await router.post('/users/login', data)

            if (response.status === 200) {
                const token = response.data.data
                document.cookie = `accessToken=${token}; path=/; secure; HttpOnly; SameSite=Strict`
                document.cookie = `isAuthenticated=true; path=/`
                alert("Login successful!")
                window.location.reload()
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please check your credentials and try again.")
        }
        modal.value = false
    }
    return {
        modal,
        email,
        password,
        onSubmit
    }
}
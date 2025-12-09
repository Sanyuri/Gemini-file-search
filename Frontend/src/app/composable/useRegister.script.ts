import { ref } from "vue"
import router from "../router"

export function useRegister() {

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

            const response = await router.post('/users/register', data)

            if (response.status === 200) {
                alert("Registration successful! You can now log in.")
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed. Please try again.")
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
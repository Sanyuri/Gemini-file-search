import router from "@/app/router";

export async function getCurrentUser() {
    try {
        const currentUser = await router.get('/users/profile');
        return currentUser.data.data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}
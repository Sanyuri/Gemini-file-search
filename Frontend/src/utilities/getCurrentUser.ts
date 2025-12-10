import router from "@/app/router";
import type { User } from "@/models/entities/user";
import type { ApiResponse } from "@/models/interfaces/apiResponse";

export async function getCurrentUser() {
    try {
        const currentUser = await router.get('/users/profile');
        if (currentUser.status === 200) {
            const userResponse = currentUser.data as ApiResponse<User>;
            return userResponse;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}
import router from "@/app/router";
import type { User } from "@/models/entities/user";

export async function getCurrentUser() {
    // const accessToken = document.cookie
    //     .split("; ")
    //     .find((row) => row.startsWith("accessToken="))
    //     ?.split("=")[1] || "";

    // const response = await router.post("/user/me", {}, {
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`
    //     }
    // });
    // return response.data.data as User;
}
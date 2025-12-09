import router from "../router"

export function useLogout() {
    const onLogout = async () => {
        await router.post('/users/logout')
        document.cookie = 'isAuthenticated=; Max-Age=0; path=/'
        // reload the page to reflect logged-out state
        window.location.reload()
    }
    return {
        onLogout,
    }
}
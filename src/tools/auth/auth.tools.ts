import useAuthStore from "../../stores/authStore.ts";

function isAuthenticated(): boolean {
    const data = useAuthStore.getState().authData;
    return data !== null;
}

export { isAuthenticated }
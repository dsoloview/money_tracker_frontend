import useAuthStore from "../stores/authStore.ts";

const useUserState = () => {
    const user = useAuthStore(state => state.authData?.user);

    if (!user) {
        throw new Error('User is not authenticated');
    }
    
    return user;
}

export default useUserState;
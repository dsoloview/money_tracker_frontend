import axios from "axios";
import useAuthStore, {AuthState} from "../stores/authStore.ts";

function instance() {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    const token = getToken();

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL as string,
        headers: headers,
    });
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject({
                data: error.response.data,
                status: error.response.status
            });
        });

    return instance;
}


function getToken(): string | undefined {
    let token: string | undefined;

    token = useAuthStore.getState().authData?.access_token;

    if (token === undefined) {
        const localStorageToken = localStorage.getItem('authStore');
        if (localStorageToken) {
            const parsedData: AuthState = JSON.parse(localStorageToken);

            token = parsedData.authData?.access_token
        }
    }

    return token;
}

export default instance;
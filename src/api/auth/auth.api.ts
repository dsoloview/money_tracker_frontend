import {useMutation} from "@tanstack/react-query";
import {IAuthResponse} from "../../models/response.model.ts";
import {toast} from "react-toastify";
import useAuthStore from "../../stores/authStore.ts";
import {IError} from "../../models/error.model.ts";

type LoginData = {
    email: string;
    password: string;

}
async function login(data: LoginData) {
    const response =  await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const errorResponse = await response.json();
        throw {
            data: errorResponse,
            status: response.status
        }
    }

    return response.json();
}

const useLogin = () => {
    return useMutation<IAuthResponse, IError<LoginData>, LoginData, unknown>({
        mutationFn: login,
        onSuccess: (response) => {
            useAuthStore.setState({authData: response})
            toast.success('Login successful')
        },
        onError: (error) => {
            toast.error(error.data.message)
        }
    })
}

export { useLogin };
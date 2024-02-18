import {useMutation} from "@tanstack/react-query";
import {IAuthResponse} from "../../../models/response.model.ts";
import {toast} from "react-toastify";
import useAuthStore from "../../../stores/authStore.ts";
import {IError} from "../../../models/error.model.ts";
import api from "../../api.ts";

type LoginData = {
    email: string;
    password: string;

}
async function login(data: LoginData) {
    const response = await api.post('auth/login', data);
    return response.data;
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
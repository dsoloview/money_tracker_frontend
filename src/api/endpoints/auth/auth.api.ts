import {useMutation} from "@tanstack/react-query";
import {IAuthResponse, ISuccessResponse} from "../../../models/response.model.ts";
import {toast} from "react-toastify";
import useAuthStore from "../../../stores/authStore.ts";
import {IError} from "../../../models/error.model.ts";
import api from "../../api.ts";
import {ILoginData, IRegisterData} from "../../../models/request.model.ts";
import queryClient from "../../queryClient.api.ts";

async function login(data: ILoginData) {
    const response = await api().post('auth/login', data);
    return response.data;
}

async function register(data: IRegisterData) {
    const response = await api().post('auth/register', data);
    return response.data;
}

async function logout() {
    const response = await api().post('auth/logout');
    return response.data;
}

const useLogin = () => {
    return useMutation<IAuthResponse, IError<ILoginData>, ILoginData, unknown>({
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

const useRegister = () => {
    return useMutation<IAuthResponse, IError<IRegisterData>, IRegisterData, unknown>({
        mutationFn: register,
        onSuccess: (response) => {
            useAuthStore.setState({authData: response})
            toast.success('Registered successful')
        },
        onError: (error) => {
            toast.error(error.data.message)
        }
    })
}

const useLogout = () => {
    return useMutation<ISuccessResponse, IError<unknown>>({
        mutationFn: logout,
        onSuccess: () => {
            toast.success('Logout successful')
            queryClient.clear()
        },
        onError: (error) => {
            toast.error(error.data.message)
        }
    })
}

export {useLogin, useRegister, useLogout};
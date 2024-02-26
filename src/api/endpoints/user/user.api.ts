import {useMutation} from "@tanstack/react-query";
import {IError} from "../../../models/error.model.ts";
import {IParamRequest, IUpdatePasswordRequest, IUpdateUserRequest} from "../../../models/request.model.ts";
import {toast} from "react-toastify";
import {IUser} from "../../../models/user.model.ts";
import api from "../../api.ts";
import useAuthStore from "../../../stores/authStore.ts";
import {ISuccessResponse} from "../../../models/response.model.ts";

const useUpdateUser = () => {
    return useMutation<IUser, IError<IUpdateUserRequest>, IParamRequest<IUpdateUserRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().patch(`users/${request.id}`, request.data);
            return response.data.data;
        },
        onSuccess: (response) => {
            useAuthStore.getState().setUser(response)
            toast.success('User updated')
        },
        onError: (error) => {
            toast.error(error.data.message)
        }
    })
}

const useUpdatePassword = () => {
    return useMutation<ISuccessResponse, IError<IUpdatePasswordRequest>, IParamRequest<IUpdatePasswordRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().patch(`users/${request.id}/password`, request.data);
            return response.data;
        },
        onSuccess: () => {
            toast.success('User password updated')
        },
        onError: (error) => {
            toast.error(error.data.message)
        }
    })
}

export {useUpdateUser, useUpdatePassword};
import {useMutation, useSuspenseQuery} from "@tanstack/react-query";
import {IError} from "../../../models/error.model.ts";
import {IParamRequest, IUpdatePasswordRequest, IUpdateUserRequest} from "../../../models/request.model.ts";
import {toast} from "react-toastify";
import {IUser} from "../../../models/user.model.ts";
import api from "../../api.ts";
import {IResponse, ISuccessResponse} from "../../../models/response.model.ts";
import queryClient from "../../queryClient.api.ts";

const useUpdateUser = () => {
    return useMutation<IUser, IError<IUpdateUserRequest>, IParamRequest<IUpdateUserRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().patch(`users/${request.id}`, request.data);
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user']})
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

const useGetUser = (userId: number) => {
    return useSuspenseQuery<IResponse<IUser>>({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await api().get(`users/${userId}`);
            return response.data;
        },
    })
}

export {useUpdateUser, useGetUser, useUpdatePassword};
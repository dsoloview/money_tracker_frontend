import {useMutation} from "@tanstack/react-query";
import api from "../../api.ts";
import {toast} from "react-toastify";
import {ISuccessResponse} from "../../../models/response.model.ts";
import {IError} from "../../../models/error.model.ts";
import useAuthStore from "../../../stores/authStore.ts";
import queryClient from "../../queryClient.api.ts";
import {IAccount, IAccountCreateUpdateRequest} from "../../../models/account.model.ts";
import {IParamRequest} from "../../../models/request.model.ts";

const useDeleteAccount = () => {
    return useMutation<ISuccessResponse, IError<unknown>, number, unknown>({
        mutationFn: async (accountId) => {
            const response = await api().delete(`accounts/${accountId}`);
            return response.data.data;
        },
        onSuccess: () => {
            toast.success('Account was deleted successfully')
            const userId = useAuthStore.getState().authData?.user.id
            if (userId) {
                queryClient.invalidateQueries({queryKey: ['userAccounts', userId]})
                queryClient.invalidateQueries({queryKey: ['user']})
            }
        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

const useUpdateAccount = () => {
    return useMutation<IAccount, IError<IAccountCreateUpdateRequest>, IParamRequest<IAccountCreateUpdateRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().patch(`/accounts/${request.id}`, request.data);
            return response.data.data;
        },
        onSuccess: () => {
            toast.success('Account was updated successfully')
            const userId = useAuthStore.getState().authData?.user.id
            if (userId) {
                queryClient.invalidateQueries({queryKey: ['userAccounts', userId]})
                queryClient.invalidateQueries({queryKey: ['user']})
            }

        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

export {useDeleteAccount, useUpdateAccount}
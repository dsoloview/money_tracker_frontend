import {useMutation, useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {IResponse} from "../../../../models/response.model.ts";
import api from "../../../api.ts";
import {IAccount, IAccountCreateUpdateRequest} from "../../../../models/account.model.ts";
import {IError} from "../../../../models/error.model.ts";
import {IParamRequest} from "../../../../models/request.model.ts";
import {toast} from "react-toastify";
import queryClient from "../../../queryClient.api.ts";

const useSuspenseGetUserAccounts = (userId: number) => {
    return useSuspenseQuery<IResponse<IAccount[]>>({
        queryKey: ['userAccounts', userId],
        queryFn: async () => {
            const response = await api().get(`users/${userId}/accounts`);
            return response.data;
        },
    })
}

const useGetUserAccounts = (userId: number) => {
    return useQuery<IResponse<IAccount[]>>({
        queryKey: ['userAccounts', userId],
        queryFn: async () => {
            const response = await api().get(`users/${userId}/accounts`);
            return response.data;
        },
    })
}

const useCreateUserAccount = () => {
    return useMutation<IAccount, IError<IAccountCreateUpdateRequest>, IParamRequest<IAccountCreateUpdateRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().post(`users/${request.id}/accounts`, request.data);
            return response.data.data;
        },
        onSuccess: (_, request) => {
            toast.success('Account was created successfully')
            queryClient.invalidateQueries({queryKey: ['userAccounts', request.id]})
            queryClient.invalidateQueries({queryKey: ['user']})
        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

export {useGetUserAccounts, useSuspenseGetUserAccounts, useCreateUserAccount};
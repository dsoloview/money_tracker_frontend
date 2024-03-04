import {useMutation, useQuery} from "@tanstack/react-query";
import {IResponse} from "../../../../models/response.model.ts";
import api from "../../../api.ts";
import {IError} from "../../../../models/error.model.ts";
import {IParamRequest} from "../../../../models/request.model.ts";
import {toast} from "react-toastify";
import queryClient from "../../../queryClient.api.ts";
import {ITransaction, ITransactionRequest} from "../../../../models/transaction.model.ts";
import useAuthStore from "../../../../stores/authStore.ts";

const useGetAccountTransactions = (accountId: number) => {
    return useQuery<IResponse<ITransaction[]>>({
        queryKey: ['accountTransactions', accountId],
        queryFn: async () => {
            const response = await api().get(`accounts/${accountId}/transactions`);
            return response.data;
        },
    })
}

const useCreateAccountTransaction = () => {
    return useMutation<ITransaction, IError<ITransactionRequest>, IParamRequest<ITransactionRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().post(`accounts/${request.id}/transactions`, request.data);
            return response.data.data;
        },
        onSuccess: (_, request) => {
            toast.success('Account was created successfully')
            const user = useAuthStore.getState().authData?.user
            queryClient.invalidateQueries({queryKey: ['accountTransactions', request.id]})
            if (user) {
                queryClient.invalidateQueries({queryKey: ['userAccounts', user.id]})
                queryClient.invalidateQueries({queryKey: ['userTransactions', user.id]})
            }
        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

export {useGetAccountTransactions, useCreateAccountTransaction};
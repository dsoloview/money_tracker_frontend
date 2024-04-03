import {useMutation, useQuery} from "@tanstack/react-query";
import {IResponse} from "../../../../models/response.model.ts";
import api from "../../../api.ts";
import {IError} from "../../../../models/error.model.ts";
import {IParamRequest} from "../../../../models/request.model.ts";
import {toast} from "react-toastify";
import queryClient from "../../../queryClient.api.ts";
import {ITransaction} from "../../../../models/transaction.model.ts";
import useAuthStore from "../../../../stores/authStore.ts";
import {ITransfer, ITransferRequest} from "../../../../models/transfer.model.ts";

const useGetAccountTransfers = (accountId: number) => {
    return useQuery<IResponse<ITransaction[]>>({
        queryKey: ['accountTransfers', accountId],
        queryFn: async () => {
            const response = await api().get(`accounts/${accountId}/transfers`);
            return response.data;
        },
    })
}

const useCreateAccountTransfer = () => {
    return useMutation<ITransfer, IError<ITransferRequest>, IParamRequest<ITransferRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().post(`accounts/${request.id}/transfers`, request.data);
            return response.data.data;
        },
        onSuccess: (_, request) => {
            toast.success('Transaction was created successfully')
            const user = useAuthStore.getState().authData?.user
            queryClient.invalidateQueries({queryKey: ['accountTransfers', request.id]})
            if (user) {
                queryClient.invalidateQueries({queryKey: ['userAccounts', user.id]})
                queryClient.invalidateQueries({queryKey: ['userTransfers', user.id]})
                queryClient.invalidateQueries({queryKey: ['user']})
            }
        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

export {useGetAccountTransfers, useCreateAccountTransfer};
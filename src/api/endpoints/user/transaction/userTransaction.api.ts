import {useQuery, useMutation, useSuspenseQuery} from "@tanstack/react-query";
import {IMinMax, IResponse} from "../../../../models/response.model.ts";
import api from "../../../api.ts";
import {ITransaction, ITransactionsInfo, ITransactionWithInfoResponse} from "../../../../models/transaction.model.ts";
import {IError} from "../../../../models/error.model.ts"
import { IParamRequest } from "../../../../models/request.model.ts";
import {IParamTableGetRequest} from "../../../../models/request.model.ts";
import {toast} from "react-toastify";
import qs from "qs";
import queryClient from "../../../queryClient.api.ts";

const useGetUserTransactions = (request: IParamTableGetRequest) => {
    return useQuery<ITransactionWithInfoResponse<ITransaction[]>>({
        queryKey: ['userTransactions', request.id, request.page, request.sort, request.direction, request.filters],
        queryFn: async () => {
            const query = qs.stringify({
                page: request.page,
                sort: [`${request.sort}:${request.direction}`],
                filters: request.filters,
            });
            const response = await api().get(`users/${request.id}/transactions?${query}`);
            return response.data;
        },
    })
}

const useGetUserTransactionsMinMax = (request: IParamTableGetRequest) => {
    return useQuery<IResponse<IMinMax>>({
        queryKey: ['userTransactionsMinMax', request.id, request.filters],
        queryFn: async () => {
            const query = qs.stringify({
                page: request.page,
                filters: request.filters,
            });
            const response = await api().get(`users/${request.id}/transactions/min_max?${query}`);
            return response.data;
        },
    })
}

const useGetUserTransactionsInfo = (request: IParamTableGetRequest) => {
    return useSuspenseQuery<IResponse<ITransactionsInfo>>({
        queryKey: ['useTransactionsInfo', request.id, request.filters],
        queryFn: async () => {
            const query = qs.stringify({
                page: request.page,
                filters: request.filters,
            });
            const response = await api().get(`users/${request.id}/transactions/info?${query}`);
            return response.data;
        },
    })
}

const useGetUserTransactionInfo = (transactionId: number) => {
    return useQuery<IResponse<ITransaction>>({
        queryKey: ["transactionId", transactionId],
        queryFn: async () => {
            const response = await api().get(`transactions/${transactionId}`);
            return response.data;

        },
        gcTime: 0,
      });
}

const useUpdateUserTransaction = () => {
    return useMutation<ITransaction, IError<ITransaction>, IParamRequest<ITransaction>, unknown> ({
        mutationFn: async (request) => {
            const response = await api().patch(`transactions/${request.id}`, request.data);
            return response.data;
        },
        onSuccess: (_, request) => {
            toast.success("Transaction was updated successfully");
            queryClient.invalidateQueries({queryKey: ['transactionId', request.id]})

        }
    })
}

export {useGetUserTransactions, useGetUserTransactionsMinMax, useGetUserTransactionsInfo, useGetUserTransactionInfo, useUpdateUserTransaction}
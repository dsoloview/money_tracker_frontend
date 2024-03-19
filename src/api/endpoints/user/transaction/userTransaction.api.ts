import {useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {IMinMax, IResponse} from "../../../../models/response.model.ts";
import api from "../../../api.ts";
import {ITransaction, ITransactionsInfo, ITransactionWithInfoResponse} from "../../../../models/transaction.model.ts";
import {IParamTableGetRequest} from "../../../../models/request.model.ts";
import qs from "qs";

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
    return useSuspenseQuery<IResponse<IMinMax>>({
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

export {useGetUserTransactions, useGetUserTransactionsMinMax, useGetUserTransactionsInfo}
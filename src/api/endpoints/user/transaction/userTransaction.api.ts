import {useQuery} from "@tanstack/react-query";
import {IPaginationResponse} from "../../../../models/response.model.ts";
import api from "../../../api.ts";
import {ITransaction} from "../../../../models/transaction.model.ts";
import {IParamTableGetRequest} from "../../../../models/request.model.ts";
import qs from "qs";

const useGetUserTransactions = (request: IParamTableGetRequest) => {
    return useQuery<IPaginationResponse<ITransaction[]>>({
        queryKey: ['userTransactions', request.id, request.page, request.sort, request.direction],
        queryFn: async () => {
            const query = qs.stringify({
                page: request.page,
                sort: [`${request.sort}:${request.direction}`]
            });
            const response = await api().get(`users/${request.id}/transactions?${query}`);
            return response.data;
        },
    })
}

export {useGetUserTransactions};
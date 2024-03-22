import {useQuery} from "@tanstack/react-query";
import {IPaginationResponse} from "../../../../models/response.model.ts";
import api from "../../../api.ts";
import {IParamTableGetRequest} from "../../../../models/request.model.ts";
import qs from "qs";
import {ITransfer} from "../../../../models/transfer.model.ts";

const useGetUserTransfers = (request: IParamTableGetRequest) => {
    return useQuery<IPaginationResponse<ITransfer[]>>({
        queryKey: ['userTransfers', request.id, request.page, request.sort, request.direction, request.filters],
        queryFn: async () => {
            const query = qs.stringify({
                page: request.page,
                sort: [`${request.sort}:${request.direction}`],
                filters: request.filters,
            });
            const response = await api().get(`users/${request.id}/transfers?${query}`);
            return response.data;
        },
    })
}

export {useGetUserTransfers}
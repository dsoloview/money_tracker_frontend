import {useSuspenseQuery} from "@tanstack/react-query";
import {IResponse} from "../../models/response.model.ts";
import {ICurrency} from "../../models/currency.model.ts";
import api from "../api.ts";

const useCurrencies = () => {
    return useSuspenseQuery<IResponse<ICurrency[]>>({
        queryKey: ['currencies'],
        queryFn: async () => {
            const response = await api().get('currencies');
            return response.data;
        },
    })
}

export {useCurrencies};
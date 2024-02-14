import {useQuery} from "@tanstack/react-query";
import {IResponse} from "../models/response.model.ts";
import {ICurrency} from "../models/currency.model.ts";

const useCurrencies = () => {
    return useQuery<IResponse<ICurrency[]>>({
        queryKey: ['currencies'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8080/api/v1/currencies');
            return response.json();
        }
    })
}

export { useCurrencies };
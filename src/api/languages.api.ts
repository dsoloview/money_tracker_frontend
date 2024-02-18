import {useQuery} from "@tanstack/react-query";
import {ILanguage} from "../models/language.model.ts";
import {IResponse} from "../models/response.model.ts";

const useLanguages = () => {
    return useQuery<IResponse<ILanguage[]>>({
        queryKey: ['languages'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8080/api/v1/languages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw {
                    data: errorResponse,
                    status: response.status
                }
            }

            return response.json();
        },
        retry: 0
    })
}

export { useLanguages };
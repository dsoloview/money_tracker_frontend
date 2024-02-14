import {useQuery} from "@tanstack/react-query";
import {IResponse} from "../models/response.model.ts";
import {ILanguage} from "../models/language.model.ts";

const useLanguages = () => {
    return useQuery<IResponse<ILanguage[]>>({
        queryKey: ['languages'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8080/api/v1/languages');
            return response.json();
        }
    })
}

export { useLanguages };
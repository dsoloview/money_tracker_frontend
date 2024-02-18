import {useQuery} from "@tanstack/react-query";
import {ILanguage} from "../../models/language.model.ts";
import {IResponse} from "../../models/response.model.ts";
import api from "../api.ts";

const useLanguages = () => {
    return useQuery<IResponse<ILanguage[]>>({
        queryKey: ['languages'],
        queryFn: async () => {
            const response = await api.get('languages');
            return response.data;
        },
    })
}

export { useLanguages };
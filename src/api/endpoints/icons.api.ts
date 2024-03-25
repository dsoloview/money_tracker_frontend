import {useQuery} from "@tanstack/react-query";
import {IResponse} from "../../models/response.model.ts";
import api from "../api.ts";
import {IIcon} from "../../models/icon.model.ts";

const useGetIcons = () => {
    return useQuery<IResponse<IIcon[]>>({
        queryKey: ['icons'],
        queryFn: async () => {
            const response = await api().get('icons');
            return response.data;
        },
    })
}

export {useGetIcons};
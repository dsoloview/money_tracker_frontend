import {useQuery} from "@tanstack/react-query";
import {IResponse} from "../../../../models/response.model.ts";
import api from "../../../api.ts";
import {ICategory} from "../../../../models/category.model.ts";

const useGetUserCategories = (userId: number) => {
    return useQuery<IResponse<ICategory[]>>({
        queryKey: ['userCategories', userId],
        queryFn: async () => {
            const response = await api().get(`users/${userId}/categories`);
            return response.data;
        },
    })
}

export {useGetUserCategories};
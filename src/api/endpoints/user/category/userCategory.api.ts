import {useMutation, useSuspenseQuery} from "@tanstack/react-query";
import {IResponse} from "../../../../models/response.model.ts";
import api from "../../../api.ts";
import {ICategory, ICategoryRequest} from "../../../../models/category.model.ts";
import {IError} from "../../../../models/error.model.ts";
import {IParamRequest} from "../../../../models/request.model.ts";
import {toast} from "react-toastify";
import queryClient from "../../../queryClient.api.ts";

const useGetUserCategoriesTree = (userId: number) => {
    return useSuspenseQuery<IResponse<ICategory[]>>({
        queryKey: ['userCategoriesTree', userId],
        queryFn: async () => {
            const response = await api().get(`users/${userId}/categories/tree`);
            return response.data;
        },
    })
}

const useGetUserCategories = (userId: number) => {
    return useSuspenseQuery<IResponse<ICategory[]>>({
        queryKey: ['userCategories', userId],
        queryFn: async () => {
            const response = await api().get(`users/${userId}/categories`);
            return response.data;
        },
    })
}

const useCreateUserCategory = () => {
    return useMutation<ICategory, IError<ICategoryRequest>, IParamRequest<ICategoryRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().post(`users/${request.id}/categories`, request.data);
            return response.data.data;
        },
        onSuccess: (_, request) => {
            toast.success('Category was created successfully')
            queryClient.invalidateQueries({queryKey: ['userCategories', request.id]})
            queryClient.invalidateQueries({queryKey: ['userCategoriesTree', request.id]})
        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

export {useGetUserCategories, useCreateUserCategory, useGetUserCategoriesTree};
import {useMutation} from "@tanstack/react-query";
import {ISuccessResponse} from "../../../models/response.model.ts";
import {IError} from "../../../models/error.model.ts";
import api from "../../api.ts";
import {toast} from "react-toastify";
import useAuthStore from "../../../stores/authStore.ts";
import queryClient from "../../queryClient.api.ts";
import {IParamRequest} from "../../../models/request.model.ts";
import {ICategory, ICategoryRequest} from "../../../models/category.model.ts";

const useDeleteCategory = () => {
    return useMutation<ISuccessResponse, IError<unknown>, number, unknown>({
        mutationFn: async (categoryId) => {
            const response = await api().delete(`categories/${categoryId}`);
            return response.data.data;
        },
        onSuccess: () => {
            toast.success('Category was deleted successfully')
            const userId = useAuthStore.getState().authData?.user.id
            if (userId) {
                queryClient.invalidateQueries({queryKey: ['userCategories', userId]})
            }
        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

const useUpdateCategory = () => {
    return useMutation<ICategory, IError<ICategoryRequest>, IParamRequest<ICategoryRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().patch(`/categories/${request.id}`, request.data);
            return response.data.data;
        },
        onSuccess: () => {
            toast.success('Category was updated successfully')
            const userId = useAuthStore.getState().authData?.user.id
            if (userId) {
                queryClient.invalidateQueries({queryKey: ['userCategories', userId]})
            }

        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

export {useDeleteCategory, useUpdateCategory}

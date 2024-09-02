import {useMutation, useQuery} from "@tanstack/react-query";
import api from "@/api/api.ts";
import {IResponse} from "@/models/response.model.ts";
import {IUserNewsletter, IUserNewsletterUpdateRequest} from "@/models/newsletter.model.ts";
import {IError} from "@/models/error.model.ts";
import {IParamRequest} from "@/models/request.model.ts";
import {toast} from "react-toastify";
import queryClient from "@/api/queryClient.api.ts";

const useGetUserNewsletters = (userId: number) => {
    return useQuery<IResponse<IUserNewsletter[]>>({
        queryKey: ['userNewsletters', userId],
        queryFn: async () => {
            const response = await api().get(`users/${userId}/newsletters`);
            return response.data;
        },
    })
}

const useUpdateUserNewsletter = (userId: number) => {
    return useMutation<null, IError<IUserNewsletterUpdateRequest>, IParamRequest<IUserNewsletterUpdateRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().patch(`/users/${userId}/newsletters/${request.id}`, request.data);
            return response.data.data;
        },
        onSuccess: () => {
            if (userId) {
                queryClient.invalidateQueries({queryKey: ['userNewsletters', userId]})
            }

        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

const useSubscribeUserNewsletter = (userId: number) => {
    return useMutation<null, IError<unknown>, number, unknown>({
        mutationFn: async (userNewsletterId: number) => {
            const response = await api().post(`/users/${userId}/newsletters/${userNewsletterId}/subscribe`);
            return response.data.data;
        },
        onSuccess: () => {
            if (userId) {
                queryClient.invalidateQueries({queryKey: ['userNewsletters', userId]})
            }

        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

const useUnsubscribeUserNewsletter = (userId: number) => {
    return useMutation<null, IError<unknown>, number, unknown>({
        mutationFn: async (userNewsletterId: number) => {
            const response = await api().post(`/users/${userId}/newsletters/${userNewsletterId}/unsubscribe`);
            return response.data.data;
        },
        onSuccess: () => {
            if (userId) {
                queryClient.invalidateQueries({queryKey: ['userNewsletters', userId]})
            }

        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

export {useGetUserNewsletters, useUpdateUserNewsletter, useSubscribeUserNewsletter, useUnsubscribeUserNewsletter};
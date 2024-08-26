import {IResponse, ISuccessResponse} from "@/models/response.model.ts";

import api from "../../../api.ts";
import {ITelegramToken, ITelegramUser} from "@/models/telegram.model.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import queryClient from "@/api/queryClient.api.ts";
import {IError} from "@/models/error.model.ts";

const useGetUserTelegramToken = (userId: number) => {
    return useQuery<IResponse<ITelegramToken>>({
        queryKey: ["userTelegramToken", userId],
        queryFn: async () => {
            const response = await api().get(`users/${userId}/telegram/token`);
            return response.data;
        },
        gcTime: 0,

    });
};

const useGetTelegramUser = (userId: number, enabled: boolean = true) => {
    return useQuery<IResponse<ITelegramUser>>({
        queryKey: ["userTelegram", userId],
        queryFn: async () => {
            const response = await api().get(`users/${userId}/telegram`);
            return response.data;
        },
        retry: false,
        enabled: enabled,
    });
}

const useLogoutTelegramUser = (userId: number) => {
    return useMutation<ISuccessResponse, IError<unknown>>({
        mutationFn: async () => {
            const response = await api().post(`users/${userId}/telegram/logout`);
            return response.data.data;
        },
        onSuccess: () => {
            toast.success('Successfully logged out from Telegram')
            queryClient.invalidateQueries({queryKey: ['userTelegram', userId]})
            queryClient.invalidateQueries({queryKey: ['userTelegramToken', userId]})
        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}
export {useGetUserTelegramToken, useGetTelegramUser, useLogoutTelegramUser};

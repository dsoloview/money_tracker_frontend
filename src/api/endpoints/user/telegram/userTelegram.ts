import {IResponse} from "@/models/response.model.ts";

import api from "../../../api.ts";
import {ITelegramToken, ITelegramUser} from "@/models/telegram.model.ts";
import {useQuery} from "@tanstack/react-query";

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
export {useGetUserTelegramToken, useGetTelegramUser};

import { IResponse } from "../../../../models/response.model.ts";

import api from "../../../api.ts";
import { ITelegramToken } from "../../../../models/telegram.model.ts";
import { useQuery } from "@tanstack/react-query";

const useGetUserTelegramToken = (userId: number) => {
  return useQuery<IResponse<ITelegramToken>>({
    queryKey: ["userId", userId],
    queryFn: async () => {
      const response = await api().get(`users/${userId}/telegram/token`);
      return response.data;
    },
    gcTime: 0,
    
  });
};
export { useGetUserTelegramToken };

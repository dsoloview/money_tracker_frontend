import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api.ts";
import { IError } from "../../../models/error.model.ts";
import { toast } from "react-toastify";
import queryClient from "../../queryClient.api.ts";
import useAuthStore from "../../../stores/authStore.ts";
import {ITransactionId, ITransaction} from "../../../models/transaction.model.ts";
import { IParamRequest } from "../../../models/request.model.ts";
import {IResponse} from "../../../models/response.model.ts";


const useDeleteTransaction = () => {
  return useMutation<ITransactionId, IError<unknown>, number, unknown>({
    mutationFn: async (transactionId) => {
      const response = await api().delete(`transactions/${transactionId}`);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("Transaction was deleted successfully");
      const user = useAuthStore.getState().authData?.user;
      if (user) {
        queryClient.invalidateQueries({
          queryKey: ["userTransactions", user.id],
        });
        if (user) {
          queryClient.invalidateQueries({
            queryKey: ["userAccounts", user.id],
          });
          queryClient.invalidateQueries({ queryKey: ["user"] });
        }
      }
    },
    onError: (error) => {
      toast.error(error.data.message);
    },
  });
};

const useGetUserTransactionInfo = (transactionId: number) => {
  return useQuery<IResponse<ITransaction>>({
      queryKey: ["transactionId", transactionId],
      queryFn: async () => {
          const response = await api().get(`transactions/${transactionId}`);
          return response.data;

      },
      gcTime: 0,
    });
}

const useUpdateUserTransaction = () => {
  return useMutation<ITransaction, IError<ITransaction>, IParamRequest<ITransaction>, unknown> ({
      mutationFn: async (request) => {
          const response = await api().patch(`transactions/${request.id}`, request.data);
          return response.data;
      },
      onSuccess: (_, request) => {
          toast.success("Transaction was updated successfully");
          queryClient.invalidateQueries({queryKey: ['transactionId', request.id]})

      }
  })
}

export { useDeleteTransaction, useGetUserTransactionInfo, useUpdateUserTransaction };

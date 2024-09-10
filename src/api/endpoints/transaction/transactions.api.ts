import {useMutation} from "@tanstack/react-query";
import api from "../../api.ts";
import {IError} from "../../../models/error.model.ts";
import {toast} from "react-toastify";
import queryClient from "../../queryClient.api.ts";
import useAuthStore from "../../../stores/authStore.ts";
import {ITransactionId, ITransactionRequest} from "../../../models/transaction.model.ts";
import {IParamRequest} from "@/models/request.model.ts";

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
                    queryClient.invalidateQueries({queryKey: ["user"]});
                }
            }
        },
        onError: (error) => {
            toast.error(error.data.message);
        },
    });
};

const useUpdateTransaction = () => {
    return useMutation<ITransactionId, IError<ITransactionRequest>, IParamRequest<ITransactionRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().put(`transactions/${request.id}`, request.data);
            return response.data.data;
        },
        onSuccess: () => {
            toast.success("Transaction was updated successfully");
            const user = useAuthStore.getState().authData?.user;
            if (user) {
                queryClient.invalidateQueries({
                    queryKey: ["userTransactions", user.id],
                });
                queryClient.invalidateQueries({
                    queryKey: ["userAccounts", user.id],
                });
                queryClient.invalidateQueries({queryKey: ["user"]});
            }
        },
        onError: (error) => {
            toast.error(error.data.message);
        },
    });
}

export {useDeleteTransaction, useUpdateTransaction};

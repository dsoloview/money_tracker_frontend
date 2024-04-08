import {useMutation} from "@tanstack/react-query";
import api from "../../api.ts";
import {IError} from "../../../models/error.model.ts";
import {toast} from "react-toastify";
import queryClient from "../../queryClient.api.ts";
import useAuthStore from "../../../stores/authStore.ts";

const useDeleteTransaction = () => {
    return useMutation<number, IError<unknown>, number, unknown>({
        mutationFn: async (transactionId) => {
            const response = await api().delete(`transactions/${transactionId}`);
            return response.data.data;
        },
        onSuccess: () => {
            toast.success('Transaction was deleted successfully');
            const user = useAuthStore.getState().authData?.user
            if (user) {
                queryClient.invalidateQueries({queryKey: ['userTransactions', user.id]})
                if (user) {
                    queryClient.invalidateQueries({queryKey: ['userAccounts', user.id]})
                    queryClient.invalidateQueries({queryKey: ['user']})
                }
            }

        },
        onError: (error) => {
            toast.error(error.data.message)
        },
    })
}

export {useDeleteTransaction}
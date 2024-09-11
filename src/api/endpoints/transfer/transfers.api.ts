import {useMutation} from "@tanstack/react-query";
import api from "@/api/api.ts";
import {IError} from "@/models/error.model.ts";
import {toast} from "react-toastify";
import queryClient from "@/api/queryClient.api.ts";
import useAuthStore from "@/stores/authStore.ts";
import {IParamRequest} from "@/models/request.model.ts";
import {ITransfer, ITransferRequest} from "@/models/transfer.model.ts";
import {ISuccessResponse} from "@/models/response.model.ts";

const useDeleteTransfer = () => {
    return useMutation<ISuccessResponse, IError<unknown>, number, unknown>({
        mutationFn: async (transferId) => {
            const response = await api().delete(`transfers/${transferId}`);
            return response.data.data;
        },
        onSuccess: () => {
            toast.success("Transfer was deleted successfully");
            const user = useAuthStore.getState().authData?.user;
            if (user) {
                queryClient.invalidateQueries({
                    queryKey: ["userTransfers", user.id],
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

const useUpdateTransfer = () => {
    return useMutation<ITransfer, IError<ITransferRequest>, IParamRequest<ITransferRequest>, unknown>({
        mutationFn: async (request) => {
            const response = await api().put(`transfers/${request.id}`, request.data);
            return response.data.data;
        },
        onSuccess: () => {
            toast.success("Transfer was updated successfully");
            const user = useAuthStore.getState().authData?.user;
            if (user) {
                queryClient.invalidateQueries({
                    queryKey: ["userTransfers", user.id],
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

export {useDeleteTransfer, useUpdateTransfer};

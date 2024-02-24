import {useMutation} from "@tanstack/react-query";
import {IError} from "../../../models/error.model.ts";
import {IParamRequest} from "../../../models/request.model.ts";
import {toast} from "react-toastify";
import {IUserSettings} from "../../../models/user.model.ts";
import api from "../../api.ts";
import {ISettingsForm} from "../../../routes/_authenticated/account/settings";
import useAuthStore from "../../../stores/authStore.ts";

const useUpdateUserSettings = () => {
    return useMutation<IUserSettings, IError<ISettingsForm>, IParamRequest<ISettingsForm>, unknown>({
        mutationFn: async (request) => {
            const response = await api().patch(`users/${request.id}/settings`, request.data);
            return response.data.data;
        },
        onSuccess: (response) => {
            useAuthStore.getState().setSettings(response)
            toast.success('Settings updated')
        },
        onError: (error) => {
            toast.error(error.data.message)
        }
    })
}

export { useUpdateUserSettings };
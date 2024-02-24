
import {IAuthResponse} from "../models/response.model.ts";
import {create} from "zustand";
import {persist} from "zustand/middleware";

export interface AuthState {
    authData: IAuthResponse | null;
    setData: (data: IAuthResponse) => void;
    removeData: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, ) => ({
            authData: null,
            setData: (authData) => set({authData: authData}),
            removeData: () => set({authData: null})
        }),
        {name: 'authStore'}
    )
);

export default useAuthStore;
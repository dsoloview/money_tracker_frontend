import {IAuthResponse} from "../models/response.model.ts";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {IUser, IUserSettings} from "../models/user.model.ts";
import {produce} from "immer";

export interface AuthState {
    authData: IAuthResponse | null;
    setData: (data: IAuthResponse) => void;
    removeData: () => void;
    setSettings: (settings: IUserSettings) => void;
    setUser: (user: IUser) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set,) => ({
            authData: null,
            setData: (authData) => set({authData: authData}),
            removeData: () => set({authData: null}),
            setUser: (user) => set(produce((state) => {
                state.authData!.user = user
            })),
            setSettings: (settings) => set(produce((state) => {
                state.authData!.user.settings = settings
            }))
        }),
        {name: 'authStore'}
    )
);

export default useAuthStore;
import {IAccount} from "@/models/account.model.ts";
import {create} from "zustand";

type UpdateAccountModalState = {
    isOpen: boolean;
    onClose: () => void;
    account: IAccount;
    toggleModal: (account: IAccount) => void;
}

const useUpdateAccountModal = create<UpdateAccountModalState>((set) => ({
    isOpen: false,
    onClose: () => {
        set({isOpen: false, account: {} as IAccount})
    },
    account: {} as IAccount,
    toggleModal: (account?: IAccount) => set((state) => ({isOpen: !state.isOpen, account: account as IAccount}))
}));

export {useUpdateAccountModal};
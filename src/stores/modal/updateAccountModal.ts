import {IAccount} from "@/models/account.model.ts";
import {create} from "zustand";

type UpdateAccountModalState = {
    isOpen: boolean;
    onClose: () => void;
    account: IAccount;
    toggleModal: (account: IAccount) => void;
}

const baseAccount: IAccount = {
    id: 0,
    name: "",
    bank: "",
    balance: 0,
    currency: {
        id: 1,
        name: "",
        symbol: "",
        code: ""
    },
    created_at: "",
    updated_at: ""
}
const useUpdateAccountModal = create<UpdateAccountModalState>((set) => ({
    isOpen: false,
    onClose: () => {
        set({isOpen: false, account: baseAccount})
    },
    account: baseAccount,
    toggleModal: (account?: IAccount) => set((state) => ({isOpen: !state.isOpen, account: account}))
}));

export {useUpdateAccountModal};
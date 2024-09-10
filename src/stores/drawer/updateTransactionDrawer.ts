import {ITransaction} from "@/models/transaction.model.ts";
import {create} from "zustand";

type UpdateTransactionDrawerState = {
    isOpen: boolean;
    onClose: () => void;
    transaction: ITransaction;
    toggle: (transaction: ITransaction) => void;
    onOpenChange: (isOpen: boolean, transaction: ITransaction) => void;
}

const useUpdateTransactionDrawer = create<UpdateTransactionDrawerState>((set) => ({
    isOpen: false,
    onClose: () => {
        set({isOpen: false, transaction: {} as ITransaction})
    },
    transaction: {} as ITransaction,
    onOpenChange: (isOpen, transaction) => {
        set({isOpen: isOpen, transaction: transaction})
    },
    toggle: (transaction?: ITransaction) => set((state) => ({isOpen: !state.isOpen, transaction: transaction}))
}));

export {useUpdateTransactionDrawer};
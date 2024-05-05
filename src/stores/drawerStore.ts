import {create} from "zustand";

export interface ITransactionEditDrawer {
    isOpen: boolean
    transactionId: number
    onOpen: (transactionId:number) => void
    onClose: () => void
}

const useTransactionEditDrawer = create<ITransactionEditDrawer>((set) => ({
    isOpen: false,
    transactionId: 0,
    onOpen: (transactionId:number) => set({isOpen: true, transactionId: transactionId}),
    onClose: () => set({isOpen: false}),
}))

export default useTransactionEditDrawer;
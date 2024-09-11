import {create} from "zustand";
import {ITransfer} from "@/models/transfer.model.ts";

type UpdateTransferDrawerState = {
    isOpen: boolean;
    onClose: () => void;
    transfer: ITransfer;
    toggle: (transfer: ITransfer) => void;
    onOpenChange: (isOpen: boolean, transfer: ITransfer) => void;
}

const useUpdateTransferDrawer = create<UpdateTransferDrawerState>((set) => ({
    isOpen: false,
    onClose: () => {
        set({isOpen: false, transfer: {} as ITransfer})
    },
    transaction: {} as ITransfer,
    onOpenChange: (isOpen, transfer) => {
        set({isOpen: isOpen, transaction: transfer})
    },
    toggle: (transfer?: ITransfer) => set((state) => ({isOpen: !state.isOpen, transfer: transfer}))
}));

export {useUpdateTransferDrawer};
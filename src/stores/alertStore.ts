import {create} from "zustand";

export interface AreYouSureState {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    description: string;
    onAccept: () => void;
    openAlert: (description: string, onAccept: () => void) => void;
}

const useAreYouSureStore = create<AreYouSureState>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({isOpen}),
    description: '',
    onAccept: () => {
    },
    openAlert: (description: string, onAccept: () => void) => {
        set({isOpen: true, description, onAccept});
    }
}));

export default useAreYouSureStore;
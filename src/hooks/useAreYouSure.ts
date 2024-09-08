import useAreYouSureStore from "@/stores/alertStore.ts";

type Props = {
    description: string;
    onAccept: () => void;
}
const useAreYouSure = ({description, onAccept}: Props) => {
    const {openAlert: open} = useAreYouSureStore((state) => state)

    const openAlert = () => {
        open(description, onAccept)
    }

    return {openAlert}
}

export default useAreYouSure;
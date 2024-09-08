import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/ui/alert-dialog.tsx";
import {useTranslation} from "react-i18next";
import useAreYouSureStore from "@/stores/alertStore.ts";
import {useEffect} from "react";

const AreYouSure = () => {
    const {t} = useTranslation();
    const {isOpen, setIsOpen, description, onAccept} = useAreYouSureStore((state) => state)

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                document.body.style.pointerEvents = 'auto'
            }, 500)
        }
    }, [isOpen])
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('alert.are_you_sure')}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t('button.no')}</AlertDialogCancel>
                    <AlertDialogAction onClick={onAccept}>{t('button.yes')}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AreYouSure;
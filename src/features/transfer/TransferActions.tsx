import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/ui/dropdown-menu.tsx";
import {Button} from "@/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {useTranslation} from "react-i18next";
import useAreYouSure from "@/hooks/modal/useAreYouSure.ts";
import {useDeleteTransfer} from "@/api/endpoints/transfer/transfers.api.ts";
import {useUpdateTransferDrawer} from "@/stores/drawer/updateTransferDrawer.ts";
import {ITransfer} from "@/models/transfer.model.ts";

type Props = {
    transfer: ITransfer;
}
export default function TransferActions({transfer}: Props): JSX.Element {
    const {mutate} = useDeleteTransfer();
    const {openAlert} = useAreYouSure({
        description: "Are you sure you want to delete this transfer?",
        onAccept: () => handleTransferDelete()
    });
    const {t} = useTranslation();
    const {toggle} = useUpdateTransferDrawer();
    const handleTransferDelete = async () => {
        mutate(transfer.id);
    };

    const handleTransferEdit = () => {
        toggle(transfer);
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                    >
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleTransferEdit}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={openAlert}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

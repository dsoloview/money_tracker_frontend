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
import useAreYouSure from "@/hooks/useAreYouSure.ts";

type Props = {
    transferId: number;
}
export default function TransferActions({transferId}: Props): JSX.Element {
    const {openAlert} = useAreYouSure({
        description: "Are you sure you want to delete this transaction?",
        onAccept: () => console.log("Transaction deleted")
    });
    const {t} = useTranslation();
    const handleTransactionDelete = async () => {
        openAlert()
    };

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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleTransactionDelete}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

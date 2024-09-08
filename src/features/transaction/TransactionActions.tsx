import {useDeleteTransaction} from "@/api/endpoints/transaction/transactions.api.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/ui/dropdown-menu.tsx";
import {Button} from "@/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import useAreYouSure from "@/hooks/useAreYouSure.ts";

type Props = {
    transactionId: number;
};

export default function TransactionActions({
                                               transactionId,
                                           }: Props): JSX.Element {
    const {mutate} = useDeleteTransaction();
    const {openAlert} = useAreYouSure({
        description: "Are you sure you want to delete this transaction?",
        onAccept: () => handleTransactionDelete()
    })
    const handleTransactionDelete = async () => {
        mutate(transactionId);
    };


    return (
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
                <DropdownMenuItem onClick={openAlert}>Delete</DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    );
}

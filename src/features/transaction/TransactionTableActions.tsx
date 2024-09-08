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

type Props = {
    transactionId: number;
};

export default function TransactionTableActions({
                                                    transactionId,
                                                }: Props): JSX.Element {
    const {mutate} = useDeleteTransaction();
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
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={handleTransactionDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
        // <>
        //     <Button
        //         isLoading={isPending}
        //         variant="red"
        //         onClick={handleTransactionDelete}
        //     >
        //         {i18next.t("button.delete")}
        //     </Button>
        // </>
    );
}

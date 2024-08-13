import {useDeleteTransaction} from "@/api/endpoints/transaction/transactions.api.ts";
import i18next from "@/tools/language/language.ts";
import {Button} from "@/ui/button.tsx";

type Props = {
    transactionId: number;
};

export default function TransactionTableTools({
                                                  transactionId,
                                              }: Props): JSX.Element {
    const {mutate, isPending} = useDeleteTransaction();
    const handleTransactionDelete = async () => {
        mutate(transactionId);
    };

    return (
        <>
            <Button
                isLoading={isPending}
                variant="red"
                onClick={handleTransactionDelete}
            >
                {i18next.t("button.delete")}
            </Button>
        </>
    );
}

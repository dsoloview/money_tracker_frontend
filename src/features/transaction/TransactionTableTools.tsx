import { Button } from "@chakra-ui/react";
import { useDeleteTransaction } from "../../api/endpoints/transactions/transactions.api.ts";
import { useState } from "react";
import i18next from "../../tools/language/language.ts";
type Props = {
  transactionId: number;
};

export default function TransactionTableTools({
  transactionId,
}: Props): JSX.Element {
  const { mutate } = useDeleteTransaction();
  const [pendingDelete, setPendingDelete] = useState(false);
  const handleTransactionDelete = async () => {
    if (pendingDelete) return;
    setPendingDelete(true);
    try {
      await mutate(transactionId);
      setPendingDelete(false);
    } catch (error) {
      setPendingDelete(false);
    }
    mutate(transactionId);
  };

  return (
    <>
      <Button colorScheme="red" size="xs" onClick={handleTransactionDelete}>
        {i18next.t('button.delete')}
      </Button>
    </>
  );
}

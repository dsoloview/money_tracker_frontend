import { Button } from "@chakra-ui/react";
import { useDeleteTransaction } from "../../api/endpoints/transactions/transactions.api.ts";

type props= {
  transactionId: number;
}

export default function TransactionTableTools({transactionId}:props): JSX.Element {
  const {mutate} = useDeleteTransaction();
  const handleTransactionDelete = (id: number) => {
    mutate(id);
  };
  return (
    <>
      <Button
        colorScheme="red"
        size="xs"
        onClick={() => handleTransactionDelete(transactionId)}
      >
        Delete
      </Button>
    </>
  );
}

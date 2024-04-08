import { Button } from "@chakra-ui/react";
import { useDeleteTransaction } from "../../api/endpoints/transactions/transactions.api.ts";

type Props = {
  transactionId: number;
};

export default function TransactionTableTools({
  transactionId,
}: Props): JSX.Element {
  const { mutate } = useDeleteTransaction();

  return (
    <>
      <Button colorScheme="red" size="xs" onClick={() => mutate(transactionId)}>
        Delete
      </Button>
    </>
  );
}

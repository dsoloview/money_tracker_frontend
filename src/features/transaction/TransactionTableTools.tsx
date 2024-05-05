import { Button } from "@chakra-ui/react";
import { useDeleteTransaction } from "../../api/endpoints/transaction/transactions.api.ts";
import i18next from "../../tools/language/language.ts";
import {useGetUserTransactionInfo} from "../../api/endpoints/user/transaction/userTransaction.api.ts";
import useTransactionEditDrawer from "../../stores/drawerStore.ts";

type Props = {
  transactionId: number;
};

export default function TransactionTableTools({
  transactionId,
}: Props): JSX.Element {
  const { mutate, isPending } = useDeleteTransaction();
  const handleTransactionDelete = async () => {
    mutate(transactionId);
  };

  const {onOpen} = useTransactionEditDrawer()
  const handleTransactionEdit = () => {
    onOpen(transactionId);
  };

  return (
    <>
      <Button
        isLoading={isPending}
        colorScheme="red"
        size="xs"
        onClick={handleTransactionDelete}
      >
        {i18next.t("button.delete")}
      </Button>

      <Button
        isLoading={false}
        colorScheme="blue"
        size="xs"
        onClick={handleTransactionEdit}
      >
        {i18next.t("button.edit")}
      </Button>
    </>
  );
}

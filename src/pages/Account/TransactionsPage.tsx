import AccountLayout from "../../layouts/AccountLayout.tsx";
import {Heading} from "@chakra-ui/react";
import TransactionsTable from "../../features/transaction/TransactionsTable.tsx";

export function TransactionsPage() {
    return (
        <AccountLayout>
            <Heading size="lg">Transactions</Heading>
            <TransactionsTable/>
        </AccountLayout>
    );
}


import {createFileRoute} from "@tanstack/react-router";
import AccountLayout from "../../../layouts/AccountLayout.tsx";
import {Heading} from "@chakra-ui/react";
import TransactionsTable from "../../../features/transaction/TransactionsTable.tsx";

export const Route = createFileRoute('/_authenticated/account/transactions')({
    component: Transactions,
})

export function Transactions() {

    return (
        <AccountLayout>
            <Heading size="lg">Transactions</Heading>
            <TransactionsTable/>
        </AccountLayout>
    );
}


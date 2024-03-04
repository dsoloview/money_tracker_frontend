import {createFileRoute} from "@tanstack/react-router";
import AccountLayout from "../../../layouts/AccountLayout.tsx";
import {Heading, Skeleton} from "@chakra-ui/react";
import {Suspense} from "react";
import TransactionsTable from "../../../features/transaction/TransactionsTable.tsx";

export const Route = createFileRoute('/_authenticated/account/transactions')({
    component: Transactions,
})

export function Transactions() {

    return (
        <AccountLayout>
            <Heading size="lg">Transactions</Heading>
            <Suspense fallback={Array.from({length: 10}, (_, index) => (
                <Skeleton key={index} height="53px" my="5px"/>
            ))}>
                <TransactionsTable/>
            </Suspense>
        </AccountLayout>
    );
}


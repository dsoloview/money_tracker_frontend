import AccountLayout from "../../layouts/AccountLayout.tsx";
import {Heading} from "@chakra-ui/react";
import TransactionsTable from "../../features/transaction/TransactionsTable.tsx";
import {useLocation} from "react-router-dom";

export function TransactionsPage() {
    const location = useLocation();
    console.log(location)
    return (
        <AccountLayout>
            <Heading size="lg">Transactions</Heading>
            <TransactionsTable/>
        </AccountLayout>
    );
}


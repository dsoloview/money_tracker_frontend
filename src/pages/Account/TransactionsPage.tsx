import AccountLayout from "../../layouts/AccountLayout.tsx";
import TransactionsTable from "../../features/transaction/TransactionsTable.tsx";

export function TransactionsPage() {
    return (
        <AccountLayout>
            <h2>Transactions</h2>
            <TransactionsTable/>
        </AccountLayout>
    );
}


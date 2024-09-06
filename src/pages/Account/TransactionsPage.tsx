import AccountLayout from "../../layouts/AccountLayout.tsx";
import TransactionsTable from "../../features/transaction/TransactionsTable.tsx";
import MobileTransactionsList from "@/features/transaction/mobile/MobileTransactionsList.tsx";

export function TransactionsPage() {
    return (
        <AccountLayout>
            <div className="max-md:hidden">
                <TransactionsTable/>
            </div>
            <div className="md:hidden">
                <MobileTransactionsList/>
            </div>
        </AccountLayout>
    );
}


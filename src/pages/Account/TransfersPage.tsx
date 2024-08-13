import AccountLayout from "../../layouts/AccountLayout.tsx";
import TransfersTable from "../../features/transfer/TransfersTable.tsx";

export default function TransfersPage() {
    return (
        <AccountLayout>
            <h2>Transfers</h2>
            <TransfersTable/>
        </AccountLayout>
    );
}


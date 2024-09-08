import AccountLayout from "../../layouts/AccountLayout.tsx";
import TransfersTable from "../../features/transfer/TransfersTable.tsx";

export default function TransfersPage() {
    return (
        <AccountLayout>
            <TransfersTable/>
        </AccountLayout>
    );
}


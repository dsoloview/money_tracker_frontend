import AccountLayout from "../../layouts/AccountLayout.tsx";
import TransfersTable from "../../features/transfer/TransfersTable.tsx";
import MobileTransfersList from "@/features/transfer/mobile/MobileTransfersList.tsx";

export default function TransfersPage() {
    return (
        <AccountLayout>
            <div className="max-md:hidden">
                <TransfersTable/>
            </div>
            <div className="md:hidden">
                <MobileTransfersList/>
            </div>
        </AccountLayout>
    );
}


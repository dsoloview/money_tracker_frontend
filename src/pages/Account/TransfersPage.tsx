import AccountLayout from "../../layouts/AccountLayout.tsx";
import TransfersTable from "../../features/transfer/TransfersTable.tsx";
import MobileTransfersList from "@/features/transfer/mobile/MobileTransfersList.tsx";
import UpdateTransferDrawer from "@/widgets/drawers/UpdateTransferDrawer.tsx";

export default function TransfersPage() {
    return (
        <AccountLayout>
            <div className="max-lg:hidden">
                <TransfersTable/>
            </div>
            <div className="lg:hidden">
                <MobileTransfersList/>
            </div>
            <UpdateTransferDrawer/>
        </AccountLayout>
    );
}


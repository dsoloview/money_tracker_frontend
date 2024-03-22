import AccountLayout from "../../layouts/AccountLayout.tsx";
import {Heading} from "@chakra-ui/react";
import TransfersTable from "../../features/transfer/TransfersTable.tsx";

export default function TransfersPage() {
    return (
        <AccountLayout>
            <Heading size="lg">Transfers</Heading>
            <TransfersTable/>
        </AccountLayout>
    );
}


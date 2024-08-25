import {ReactNode} from "react";
import AccountTopBar from "../features/topBar/AccountTopBar.tsx";
import CreateTransactionGroup from "../features/transaction/CreateTransactionGroup.tsx";
import CreateTransferGroup from "../features/transfer/CreateTransferGroup.tsx";
import Container from "@/layouts/Container.tsx";

type Props = {
    children: ReactNode
}
const AccountLayout = ({children}: Props) => {
    return (
        <div className="grid grid-rows-[96px,auto]">
            <AccountTopBar/>
            <main className="min-h-[calc(100vh-96px)]">
                <Container>
                    {children}
                </Container>
                <CreateTransactionGroup/>
                <CreateTransferGroup/>
            </main>
        </div>
    );
}

export default AccountLayout;
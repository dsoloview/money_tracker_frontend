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
        <div>
            <AccountTopBar/>
            <main>
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
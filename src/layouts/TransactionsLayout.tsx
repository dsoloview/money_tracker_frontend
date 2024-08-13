import {ReactNode} from "react";
import AccountTopBar from "../features/topBar/AccountTopBar.tsx";
import CreateTransactionGroup from "../features/transaction/CreateTransactionGroup.tsx";
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
                    <CreateTransactionGroup/>
                </Container>

            </main>
        </div>
    );
}

export default AccountLayout;
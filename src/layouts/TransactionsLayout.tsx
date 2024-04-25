import {ReactNode} from "react";
import AccountTopBar from "../features/topBar/AccountTopBar.tsx";
import CreateTransactionGroup from "../features/transaction/CreateTransactionGroup.tsx";
import {Container} from "@chakra-ui/react";
import EditTransactionGroup from "../features/transaction/EditTransactionGroup.tsx";

type Props = {
    children: ReactNode
}
const AccountLayout = ({children}: Props) => {
    return (
        <div>
            <AccountTopBar/>
            <main>
                <Container padding="4" maxW="95%">
                    {children}
                    <CreateTransactionGroup/>
                    <EditTransactionGroup/>
                </Container>

            </main>
        </div>
    );
}

export default AccountLayout;
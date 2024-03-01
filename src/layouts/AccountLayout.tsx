import {ReactNode} from "react";
import AccountTopBar from "../features/topBar/AccountTopBar.tsx";
import CustomContainer from "./CustomContainer.tsx";
import CreateTransactionGroup from "../features/transaction/CreateTransactionGroup.tsx";

type Props = {
    children: ReactNode
}
const AccountLayout = ({children}: Props) => {
    return (
        <div>
            <AccountTopBar/>
            <main>
                <CustomContainer>
                    {children}
                </CustomContainer>
                <CreateTransactionGroup/>
            </main>
        </div>
    );
}

export default AccountLayout;
import {ReactNode} from "react";
import AccountTopBar from "../features/topBar/AccountTopBar.tsx";
import CustomContainer from "./CustomContainer.tsx";
import CreateTransactionGroup from "../features/transaction/CreateTransactionGroup.tsx";
import CreateTransferGroup from "../features/transfer/CreateTransferGroup.tsx";
import EditTransactionGroup from "../features/transaction/EditTransactionGroup.tsx";
import Footer from "@/widgets/footer/Footer.tsx";

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
                <CreateTransferGroup/>
                <EditTransactionGroup/>
            </main>
            <Footer/>
        </div>
    );
}

export default AccountLayout;
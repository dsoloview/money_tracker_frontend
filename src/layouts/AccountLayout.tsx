import {ReactNode} from "react";
import AccountTopBar from "../features/topBar/AccountTopBar.tsx";
import CustomContainer from "./CustomContainer.tsx";

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
            </main>
        </div>
    );
}

export default AccountLayout;
import {ReactNode} from "react";
import AccountTopBar from "../features/topBar/AccountTopBar.tsx";

type Props = {
    children: ReactNode
}
const AccountLayout  = ({children}: Props) => {
    return (
        <>
            <AccountTopBar/>
            <main>
                {children}
            </main>
        </>
    );
}

export default AccountLayout;
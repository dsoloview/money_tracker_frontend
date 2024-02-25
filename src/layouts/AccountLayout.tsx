import {ReactNode} from "react";
import AccountTopBar from "../features/topBar/AccountTopBar.tsx";
import Container from "./Container.tsx";

type Props = {
    children: ReactNode
}
const AccountLayout  = ({children}: Props) => {
    return (
        <Container>
            <AccountTopBar/>
            <main>
                {children}
            </main>
        </Container>
    );
}

export default AccountLayout;
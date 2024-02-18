import {ReactNode} from "react";
import IndexTopBar from "../features/topBar/IndexTopBar.tsx";

type Props = {
    children: ReactNode
}
const IndexLayout  = ({children}: Props) => {
    return (
        <>
            <IndexTopBar />
            <main>
                {children}
            </main>
        </>
    );
}

export default IndexLayout;
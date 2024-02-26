import {ReactNode} from "react";
import IndexTopBar from "../features/topBar/IndexTopBar.tsx";

type Props = {
    children: ReactNode
}
const IndexLayout  = ({children}: Props) => {
    return (
        <div>
            <IndexTopBar />
            <main>
                {children}
            </main>
        </div>
    );
}

export default IndexLayout;
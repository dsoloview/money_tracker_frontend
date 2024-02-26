import {ReactNode} from "react";
import IndexTopBar from "../features/topBar/IndexTopBar.tsx";
import CustomContainer from "./CustomContainer.tsx";

type Props = {
    children: ReactNode
}
const IndexLayout = ({children}: Props) => {
    return (
        <div>
            <IndexTopBar/>
            <main>
                <CustomContainer>
                    {children}
                </CustomContainer>
            </main>
        </div>
    );
}

export default IndexLayout;
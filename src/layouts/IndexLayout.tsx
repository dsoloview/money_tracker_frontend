import {ReactNode} from "react";
import IndexTopBar from "../features/topBar/IndexTopBar.tsx";
import CustomContainer from "./CustomContainer.tsx";
import Footer from "@/widgets/footer/Footer.tsx";

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
            <Footer/>
        </div>
    );
}

export default IndexLayout;
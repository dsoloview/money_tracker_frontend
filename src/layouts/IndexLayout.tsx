import {ReactNode} from "react";
import IndexTopBar from "../features/topBar/IndexTopBar.tsx";
import Container from "@/layouts/Container.tsx";

type Props = {
    children: ReactNode
}
const IndexLayout = ({children}: Props) => {
    return (
        <div>
            <IndexTopBar/>
            <main>
                <Container>
                    {children}
                </Container>
            </main>
        </div>
    );
}

export default IndexLayout;
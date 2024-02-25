import {ReactNode} from "react";
import IndexTopBar from "../features/topBar/IndexTopBar.tsx";
import Container from "./Container.tsx";

type Props = {
    children: ReactNode
}
const IndexLayout  = ({children}: Props) => {
    return (
        <Container>
            <IndexTopBar />
            <main>
                {children}
            </main>
        </Container>
    );
}

export default IndexLayout;
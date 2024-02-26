import {ReactNode} from "react";
import {Container} from "@chakra-ui/react";

type Props = {
    children: ReactNode

}
export default function CustomContainer({children}: Props) {
    return (
        <Container padding="4" maxW="container.xl">
            {children}
        </Container>
    )
}
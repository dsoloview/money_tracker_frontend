import {QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import queryClient from "./api/queryClient.api.ts";
import {ChakraProvider} from "@chakra-ui/react";



export default function Providers({children}: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                {children}
                <ReactQueryDevtools initialIsOpen={false}/>
            </ChakraProvider>
        </QueryClientProvider>
    )
}
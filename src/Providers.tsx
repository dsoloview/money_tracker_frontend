import {QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {NextUIProvider} from "@nextui-org/react";
import queryClient from "./api/queryClient.api.ts";



export default function Providers({children}: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                {children}
                <ReactQueryDevtools initialIsOpen={false}/>
            </NextUIProvider>
        </QueryClientProvider>
    )
}
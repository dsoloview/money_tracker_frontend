import {QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import queryClient from "./api/queryClient.api.ts";
import {ErrorBoundary} from "react-error-boundary";
import ErrorComponent from "./ErrorComponent.tsx";


export default function Providers({children}: { children: ReactNode }) {
    return (
        <ErrorBoundary fallback={<ErrorComponent/>}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </ErrorBoundary>

    )
}
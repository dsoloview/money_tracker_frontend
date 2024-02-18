import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {NextUIProvider} from "@nextui-org/react";
import {isIError} from "./tools/errors/errors.tools.ts";
import {toast} from "react-toastify";
import useAuthStore from "./stores/authStore.ts";

const queryClient = new QueryClient({
    mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
            if (mutation.options.onError) return;

            if (isIError(error)) {
                if (error.status === 401) {
                    toast.error('You are not authenticated')
                    useAuthStore.getState().removeData()
                    window.location.reload()
                }

                toast.error(error.message)
            }
        }
    }),
    queryCache: new QueryCache({
        onError: (error) => {

            if (isIError(error)) {
                if (error.status === 401) {
                    toast.error('You are not authenticated')
                    useAuthStore.getState().removeData()
                    window.location.reload()
                }

                toast.error(error.message)
            }
        }
    })
});

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
import {MutationCache, QueryCache, QueryClient} from "@tanstack/react-query";
import {isIError} from "../tools/errors/errors.tools.ts";
import {toast} from "react-toastify";
import useAuthStore from "../stores/authStore.ts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry (failureCount, error) {
                if (isIError(error) && error.status === 401) return false
                return failureCount < 3
            },
        }
    },
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
        },
    })
});

export default queryClient;
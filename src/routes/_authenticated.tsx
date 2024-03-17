import {createFileRoute, redirect} from "@tanstack/react-router";
import {isAuthenticated} from "../tools/auth/auth.tools.ts";
import {toast} from "react-toastify";

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({location}) => {
        if (!isAuthenticated()) {
            toast.info('You need to be logged in to access this page')
            throw redirect({
                to: '/',
                search: {
                    redirect: location.href
                }
            })
        }
    }
})
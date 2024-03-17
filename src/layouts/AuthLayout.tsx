import {Navigate, Outlet} from "react-router-dom";
import useUserState from "../hooks/useUserState.ts";
import {Suspense} from "react";
import {Spinner} from "@chakra-ui/react";

const AuthLayout = () => {
    return (
        <Suspense fallback={<Spinner/>}>
            <SuspenseAuthLayout/>
        </Suspense>
    )
}

const SuspenseAuthLayout = () => {
    try {
        useUserState();
    } catch (e) {
        return <Navigate to={'/'}/>
    }

    return (
        <Outlet/>
    )
}

export default AuthLayout;
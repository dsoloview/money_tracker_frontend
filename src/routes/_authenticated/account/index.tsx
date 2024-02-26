import {createFileRoute} from "@tanstack/react-router";
import AccountLayout from "../../../layouts/AccountLayout.tsx";
import {toast} from "react-toastify";
import {Button} from "@chakra-ui/react";

export const Route = createFileRoute('/_authenticated/account/')({
    component: Account
})

export function Account() {
    function handleClick() {
        toast.error('test');
    }
    return (
        <AccountLayout>
            <Button onClick={handleClick} />
            <div>Account</div>
        </AccountLayout>
    )
}


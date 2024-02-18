import {createFileRoute} from "@tanstack/react-router";
import AccountLayout from "../../../layouts/AccountLayout.tsx";
import {Button} from "@nextui-org/react";
import {toast} from "react-toastify";

export const Route = createFileRoute('/_authenticated/account/')({
    component: Account
})

export function Account() {
    function handleClick() {
        toast.error('test');
    }
    return (
        <AccountLayout>
            <Button onPress={handleClick}>Click</Button>
            <div>Account</div>
        </AccountLayout>
    )
}


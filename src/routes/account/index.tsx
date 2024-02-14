import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute('/account/')({
    component: Account
})

export function Account() {
    return (
        <div className="p-2">
            <h3>Welcome Account!</h3>
        </div>
    )
}
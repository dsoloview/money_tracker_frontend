import {createFileRoute} from "@tanstack/react-router";

const Test = () => {
    return (
        <div>Test</div>
    )
}

export const Route = createFileRoute('/_authenticated/test')({
    component: Test
})
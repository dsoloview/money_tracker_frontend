import {createLazyFileRoute} from "@tanstack/react-router";
import IndexLayout from "../layouts/IndexLayout.tsx";

export const Route = createLazyFileRoute('/')({
    component: Index
})

function Index() {
    return (
        <IndexLayout>
            <div>Index</div>
        </IndexLayout>
    )
}
import {routeTree} from './routeTree.gen'
import {createRouter, RouterProvider} from "@tanstack/react-router";
import Providers from "./Providers.tsx";
import {ToastContainer} from "react-toastify";

const router = createRouter({routeTree})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function App() {
    return (
        <Providers>
            <RouterProvider router={router}/>
            <ToastContainer
                position="bottom-right"
            />
        </Providers>
    )
}

export default App
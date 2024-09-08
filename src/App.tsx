import Providers from "./Providers.tsx";
import {ToastContainer} from "react-toastify";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AccountsPage from "./pages/Account/AccountsPage.tsx";
import {TransactionsPage} from "./pages/Account/TransactionsPage.tsx";
import SettingsPage from "./pages/Account/SettingsPage.tsx";
import TelegramPage from "./pages/Account/TelegramPage.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import ErrorComponent from "./ErrorComponent.tsx";
import TransfersPage from "./pages/Account/TransfersPage.tsx";
import CategoriesPage from "./pages/Account/CategoriesPage.tsx";
import TelegramConnectPage from "@/pages/Account/TelegramConnectPage.tsx";
import AccountPage from "@/pages/Account/AccountPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/account",
        element: <AuthLayout/>,
        errorElement: <ErrorComponent/>,
        children: [
            {
                index: true,
                element: <AccountPage/>,
            },
            {
                path: "accounts",
                element: <AccountsPage/>
            },
            {
                path: "transactions",
                element: <TransactionsPage/>,
            },
            {
                path: "settings",
                element: <SettingsPage/>,
            },
            {
                path: "telegram",
                element: <TelegramPage/>,
            },
            {
                path: "telegram/connect",
                element: <TelegramConnectPage/>,
            },
            {
                path: "settings/categories",
                element: <CategoriesPage/>,
            },
            {
                path: "transfers",
                element: <TransfersPage/>,
            },
        ],
    },
]);

function App() {
    return (
        <Providers>
            <RouterProvider router={router}/>
            <ToastContainer position="bottom-right"/>
        </Providers>
    );
}

export default App;

import AccountLayout from "../../layouts/AccountLayout.tsx";
import {Suspense} from "react";
import CategoriesTree from "../../features/categories/CategoriesTree.tsx";
import {Spinner} from "@/ui/spinner.tsx";

const CategoriesPage = () => {
    return (
        <AccountLayout>
            <h1>Categories</h1>
            <div>
                <Suspense fallback={<Spinner/>}>
                    <CategoriesTree/>
                </Suspense>
            </div>

        </AccountLayout>
    )
}
export default CategoriesPage;
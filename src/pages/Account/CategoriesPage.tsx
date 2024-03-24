import AccountLayout from "../../layouts/AccountLayout.tsx";
import {Box, Heading, Spinner} from "@chakra-ui/react";
import {Suspense} from "react";
import CategoriesTree from "../../features/categories/CategoriesTree.tsx";

const CategoriesPage = () => {
    return (
        <AccountLayout>
            <Heading>Categories</Heading>
            <Box>
                <Suspense fallback={<Spinner/>}>
                    <CategoriesTree/>
                </Suspense>
            </Box>

        </AccountLayout>
    )
}
export default CategoriesPage;
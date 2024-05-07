import useUserState from "@/hooks/useUserState.ts";
import {Box, Flex, useDisclosure} from "@chakra-ui/react";
import CreateCategoryModal from "@/widgets/modals/CreateCategoryModal.tsx";
import CategoriesList from "./CategoriesList.tsx";
import {useGetUserCategoriesTree} from "@/api/endpoints/user/category/userCategory.api.ts";
import {Button} from "@/ui/button.tsx";
import {Accordion} from "@/ui/accordion.tsx";

const CategoriesTree = () => {
    const user = useUserState();
    const {data} = useGetUserCategoriesTree(user.id)
    const {onOpen, isOpen, onClose} = useDisclosure();
    return (
        <Flex
            direction="column"
            gap={4}
        >
            <Box
                p={4}
                borderWidth="1px"
                borderRadius="lg"
            >
                <h2>Income</h2>
                <Accordion type="multiple">
                    <CategoriesList categories={data.data.filter((category) => category.type === 'income')}/>
                </Accordion>
            </Box>
            <Box
                p={4}
                borderWidth="1px"
                borderRadius="lg"
            >
                <h2>Expense</h2>
                <Accordion type="multiple">
                    <CategoriesList categories={data.data.filter((category) => category.type === 'expense')}/>
                </Accordion>
            </Box>
            <Button className="mt-4" onClick={onOpen}>Add Category</Button>
            <CreateCategoryModal isOpen={isOpen} onClose={onClose}/>
        </Flex>
    );
}

export default CategoriesTree;
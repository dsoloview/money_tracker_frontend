import useUserState from "../../hooks/useUserState.ts";
import {Accordion, Box, Button, Flex, Text, useDisclosure} from "@chakra-ui/react";
import CreateCategoryModal from "../../widgets/modals/CreateCategoryModal.tsx";
import CategoriesList from "./CategoriesList.tsx";
import {useGetUserCategoriesTree} from "../../api/endpoints/user/category/userCategory.api.ts";

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
                <Text>Income</Text>
                <Accordion allowMultiple>
                    <CategoriesList categories={data.data.filter((category) => category.type === 'income')}/>
                </Accordion>
            </Box>
            <Box
                p={4}
                borderWidth="1px"
                borderRadius="lg"
            >
                <Text>Expense</Text>
                <Accordion allowMultiple>
                    <CategoriesList categories={data.data.filter((category) => category.type === 'expense')}/>
                </Accordion>
            </Box>
            <Button mt={4} onClick={onOpen}>Add Category</Button>
            <CreateCategoryModal isOpen={isOpen} onClose={onClose}/>
        </Flex>
    );
}

export default CategoriesTree;
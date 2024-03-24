import useUserState from "../../hooks/useUserState.ts";
import {useGetUserCategories} from "../../api/endpoints/user/category/userCategory.api.ts";
import {Box, Button, Flex, Text, useDisclosure} from "@chakra-ui/react";
import TreeView from "./TreeView.tsx";
import CreateCategoryModal from "../../widgets/modals/CreateCategoryModal.tsx";

const CategoriesTree = () => {
    const user = useUserState();
    const {data} = useGetUserCategories(user.id)
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
                <TreeView data={data.data.filter((category) => category.type === 'income')}/>
            </Box>
            <Box
                p={4}
                borderWidth="1px"
                borderRadius="lg"
            >
                <Text>Expense</Text>
                <TreeView data={data.data.filter((category) => category.type === 'expense')}/>
            </Box>
            <Button mt={4} onClick={onOpen}>Add Category</Button>
            <CreateCategoryModal isOpen={isOpen} onClose={onClose}/>
        </Flex>
    );
}

export default CategoriesTree;
import {Box, Button, Text} from "@chakra-ui/react";
import {ICategory} from "../../models/category.model.ts";
import CategoryAvatar from "./CategoryAvatar.tsx";

type Props = {
    category: ICategory;
    handleCategoryClick: (categoryId: number) => void;
    values: number[];
};
const CategoryButton = (
    {
        category,
        handleCategoryClick,
        values
    }: Props
) => {
    return (
        <Box key={category.id} textAlign="center" mx={2}>
            <Button
                onClick={() => handleCategoryClick(category.id)}
                borderRadius="full"
                p={1}
                mb={1} // Margin below the button
                variant={values.includes(category.id) ? "solid" : "outline"}
                borderWidth={1}
                borderColor="gray.300"
                bg={values.includes(category.id) ? "blue.200" : "transparent"}
                _hover={{bg: "blue.100"}}
                w="60px" // Fixed width
                h="60px" // Fixed height
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box>
                    <CategoryAvatar category={category}/>
                </Box>
            </Button>
            <Text fontSize="sm" mt={1} maxWidth="60px" mx="auto" textAlign="center">
                {category.name}
            </Text>
        </Box>
    )
}

export default CategoryButton;
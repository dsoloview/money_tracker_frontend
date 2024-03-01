import {Box, Button, Collapse, Flex, Text} from "@chakra-ui/react";
import {useState} from "react";
import useAuthStore from "../../stores/authStore.ts";
import {useGetUserCategories} from "../../api/endpoints/user/category/userCategory.api.ts";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";
import {CategoryTransactionType} from "../../models/category.model.ts";

type Props = {
    id: string;
    name: string;
    onBlur: (e: unknown) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    values: number[]; // Formik values object
    type: CategoryTransactionType;
};

const CategorySelect = ({setFieldValue, values, name, type}: Props) => {
    const user = useAuthStore((state) => state.authData?.user);
    const {data, isLoading, isError} = useGetUserCategories(user?.id || 0);
    const [showAll, setShowAll] = useState(false);

    if (isLoading) {
        return <div>Loading</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    if (!data) {
        return <div>No data</div>;
    }

    const handleCategoryClick = (categoryId: number) => {
        if (values.includes(categoryId)) {
            setFieldValue(name, values.filter((id) => id !== categoryId));
        } else {
            setFieldValue(name, [...values, categoryId]);
        }
    };

    const options = data.data
        .filter((category) => category.type === type)
        .map((category) => (
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
                    {category.icon ? (
                        <img src={category.icon} alt={category.name}
                             style={{width: "30px", height: "30px", borderRadius: "50%"}}/>
                    ) : (
                        <Text fontSize="lg">{category.name.charAt(0)}</Text>
                    )}
                </Button>
                <Text fontSize="sm" mt={1} maxWidth="60px" mx="auto" textAlign="center">
                    {category.name}
                </Text>
            </Box>
        ));

    // Create rows with a maximum of 6 circles each
    const rows = [];
    for (let i = 0; i < options.length; i += 6) {
        rows.push(options.slice(i, i + 6));
    }

    const visibleOptions = rows[0]; // First row is visible by default
    const hiddenOptions = rows.slice(1);

    return (
        <Box textAlign="center" boxShadow="md" p="4" borderRadius="md">
            <Flex justifyContent="center" mt={0}>
                {visibleOptions}
            </Flex>
            <Collapse in={showAll}>
                {hiddenOptions.map((row, index) => (
                    <Flex key={index} justifyContent="center" mt={4}>
                        {row}
                    </Flex>
                ))}
            </Collapse>
            <Button
                mt="3"
                variant="unstyled"
                onClick={() => setShowAll(!showAll)}
                aria-label={showAll ? "Hide options" : "Show more options"}
            >
                {showAll ? <ChevronUpIcon boxSize={6}/> : <ChevronDownIcon boxSize={6}/>}
            </Button>
        </Box>
    );
};

export default CategorySelect;

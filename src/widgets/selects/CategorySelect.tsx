import {Box, Button, Collapse, Flex} from "@chakra-ui/react";
import {useState} from "react";
import {useGetUserCategories} from "../../api/endpoints/user/category/userCategory.api.ts";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";
import {CategoryTransactionType} from "../../models/category.model.ts";
import CategoryButton from "../category/CategoryButton.tsx";
import useUserState from "../../hooks/useUserState.ts";

type Props = {
    id: string;
    name: string;
    onBlur: (e: unknown) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    values: number[]; // Formik values object
    type: CategoryTransactionType;
};
``
const CategorySelect = ({setFieldValue, values, name, type}: Props) => {
    const user = useUserState();
    const {data} = useGetUserCategories(user.id);
    const [showAll, setShowAll] = useState(false);

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
            <CategoryButton
                key={category.id}
                category={category}
                handleCategoryClick={handleCategoryClick}
                values={values}
            />
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

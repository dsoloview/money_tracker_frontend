import {Badge, Text} from "@chakra-ui/react";
import {CategoryTransactionType, ICategory} from "../../models/category.model.ts";

type Props = {
    category: ICategory;
};
const CategoryBadge = (
    {
        category,
    }: Props
) => {
    return (
        <Badge colorScheme={category.type === CategoryTransactionType.EXPENSE ? "yellow" : "green"}>
            <Text>
                {category.name}
            </Text>
        </Badge>
    )
}

export default CategoryBadge;
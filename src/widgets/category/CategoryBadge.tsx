import {CategoryTransactionType, ICategory} from "@/models/category.model.ts";
import {Badge} from "@/ui/badge.tsx";

type Props = {
    category: ICategory;
};
const CategoryBadge = (
    {
        category,
    }: Props
) => {
    return (
        <Badge variant={category.type === CategoryTransactionType.EXPENSE ? "yellow" : "green"}>
            {category.name}
        </Badge>
    )
}

export default CategoryBadge;
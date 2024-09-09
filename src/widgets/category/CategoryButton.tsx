import {ICategory} from "@/models/category.model.ts";
import CategoryAvatar from "./CategoryAvatar.tsx";
import {Button} from "@/ui/button.tsx";

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
    const buttonBackground = values.includes(category.id) ? "bg-blue-100" : "transparent";
    return (
        <div key={category.id} className="text-center mx-2 flex flex-col justify-start items-center">
            <Button
                className={"rounded-full p-1 mb-1 border-2 border-gray-300 max-lg:hover:bg-transparent hover:bg-blue-100 w-15 h-15 flex items-center justify-center " + buttonBackground}
                onClick={() => handleCategoryClick(category.id)}
                variant={"outline"}
                type="button"
            >
                <div>
                    <CategoryAvatar name={category.name} icon={category.icon?.path}/>
                </div>
            </Button>
            <div className="text-sm mt-1 max-w-[92px] text-wrap mx-auto text-center">
                {category.name}
            </div>
        </div>
    )
}

export default CategoryButton;
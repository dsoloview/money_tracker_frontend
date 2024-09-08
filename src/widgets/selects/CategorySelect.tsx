import {useState} from "react";
import {CategoryTransactionType} from "@/models/category.model.ts";
import CategoryButton from "@/widgets/category/CategoryButton.tsx";
import useUserState from "@/hooks/useUserState.ts";
import {useGetUserCategories} from "@/api/endpoints/user/category/userCategory.api.ts";
import {Button} from "@/ui/button.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/ui/collapsible.tsx";
import {ChevronDownIcon, ChevronUpIcon} from "lucide-react";

type Props = {
    id: string;
    onChange: (option: number[]) => void;
    values: number[]; // Formik values object
    type: CategoryTransactionType;
};
``
const CategorySelect = ({onChange, values, type}: Props) => {
    const user = useUserState();
    const {data} = useGetUserCategories(user.id);
    const [showAll, setShowAll] = useState(false);

    const handleCategoryClick = (categoryId: number) => {
        if (values.includes(categoryId)) {
            onChange(values.filter((id) => id !== categoryId));
        } else {
            onChange([...values, categoryId]);
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

    let rowsCount = 6;

    if (window.innerWidth < 800) {
        rowsCount = 4;
    }
    const rows = [];
    for (let i = 0; i < options.length; i += rowsCount) {
        rows.push(options.slice(i, i + rowsCount));
    }

    const visibleOptions = rows[0];
    const hiddenOptions = rows.slice(1);

    return (
        <div className="text-center shadow-md p-4 rounded-md">
            <div className="flex justify-center mt-0">
                {visibleOptions}
            </div>
            <Collapsible>
                <CollapsibleContent>
                    {hiddenOptions.map((row, index) => (
                        <div className="flex justify-center mt-4" key={index}>
                            {row}
                        </div>
                    ))}
                </CollapsibleContent>
                <CollapsibleTrigger asChild>
                    <Button
                        className="mt-3"
                        variant="ghost"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? <ChevronUpIcon/> : <ChevronDownIcon/>}
                    </Button>
                </CollapsibleTrigger>
            </Collapsible>
        </div>
    );
};

export default CategorySelect;

import {useState} from "react";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";
import {CategoryTransactionType} from "@/models/category.model.ts";
import CategoryButton from "../category/CategoryButton.tsx";
import useUserState from "@/hooks/useUserState.ts";
import {useGetUserCategories} from "@/api/endpoints/user/category/userCategory.api.ts";
import {Button} from "@/ui/button.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/ui/collapsible.tsx";

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
                        {showAll ? <ChevronUpIcon boxSize={6}/> : <ChevronDownIcon boxSize={6}/>}
                    </Button>
                </CollapsibleTrigger>
            </Collapsible>
        </div>
    );
};

export default CategorySelect;

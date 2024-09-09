import {useEffect, useState} from "react";
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
    values: number[];
    type: CategoryTransactionType;
};

const CategorySelect = ({onChange, values, type}: Props) => {
    const user = useUserState();
    const {data} = useGetUserCategories(user.id);
    const [showAll, setShowAll] = useState(false);
    const [perRow, setPerRow] = useState(0);

    useEffect(() => {
        const itemMinWidth = 92;
        const container = document.getElementById("categorySelectContainer");

        if (!container) {
            return;
        }
        const calculatePerRow = () => {
            const computedStyle = window.getComputedStyle(container);
            const paddings = parseInt(computedStyle.paddingLeft) + parseInt(computedStyle.paddingRight);
            const width = container.clientWidth - paddings
            const newPerRow = Math.floor(width / itemMinWidth);
            if (newPerRow !== perRow) {
                setPerRow(newPerRow);
            }
        }

        window.addEventListener('resize', calculatePerRow, false);

        calculatePerRow();
        return () => window.removeEventListener('resize', () => {
        });
    }, []);


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
    
    const firstRow = options.slice(0, perRow);
    const collapsedRows = options.slice(perRow);
    return (
        <div id="categorySelectContainer" className="text-center shadow-md p-4 rounded-md">
            <div className="flex flex-wrap justify-center mt-0 gap-y-3">
                {firstRow.map((row, index) => (
                    <div className="flex flex-1 flex-shrink min-w-[92px] justify-center" key={index}>
                        {row}
                    </div>
                ))}
            </div>
            <Collapsible>
                <CollapsibleContent className="flex flex-wrap justify-center mt-0 gap-y-3">
                    {collapsedRows.map((row, index) => (
                        <div className="flex flex-1 flex-shrink min-w-[92px] justify-center" key={index}>
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

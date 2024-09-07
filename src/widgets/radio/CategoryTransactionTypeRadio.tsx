import {CategoryTransactionType} from "@/models/category.model.ts";
import {useMemo} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/ui/tabs.tsx";

type Props = {
    id?: string;
    name?: string;
    value: CategoryTransactionType | undefined;
    onChange: (nextValue: string) => void;
    defaultValue?: CategoryTransactionType | undefined;
    haveEmpty?: boolean;
    className?: string;
}
const CategoryTransactionTypeRadio = ({onChange, value}: Props) => {

    const options = useMemo(() => {
        return Object.values(CategoryTransactionType).map((type) => {
            return type;
        })
    }, []);

    return (
        <Tabs onValueChange={onChange} defaultValue={value} className="flex">
            <TabsList className="mx-auto">
                {options.map((type) => {
                    return (
                        <TabsTrigger value={type} key={type}>{type}</TabsTrigger>
                    )
                })}
            </TabsList>
        </Tabs>

    );
}

export default CategoryTransactionTypeRadio;
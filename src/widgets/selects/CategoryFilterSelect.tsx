import {MultiSelect} from "@/ui/multi-select.tsx";
import {useGetUserCategories} from "@/api/endpoints/user/category/userCategory.api.ts";
import useUserState from "@/hooks/useUserState.ts";
import * as React from "react";
import {CategoryTransactionType} from "@/models/category.model.ts";

type Option = {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    type?: CategoryTransactionType
}

type Props = {
    onChange: (categoryIds: string[]) => void;
    values: string[];
}
const CategoryFilterSelect = ({onChange, values}: Props) => {
    const user = useUserState()
    const {data, isLoading} = useGetUserCategories(user.id)

    const options = data.data
        .filter((category) => category.type === CategoryTransactionType.EXPENSE)
        .map((category) => {
            const option: Option = {
                label: category.name,
                value: category.id.toString(),
                icon: undefined
            }
            return option
        });
    return (
        <MultiSelect
            options={options}
            onValueChange={onChange}
            defaultValue={values}
            disabled={isLoading}
            variant={"inverted"}
            animation={2}
            maxCount={3}
            placeholder={"Select categories"}
        />
    )
}

export default CategoryFilterSelect;
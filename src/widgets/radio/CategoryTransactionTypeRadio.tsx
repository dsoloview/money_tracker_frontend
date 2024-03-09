import {HStack, useRadioGroup} from "@chakra-ui/react";
import {CategoryTransactionType} from "../../models/category.model.ts";
import {useMemo} from "react";
import RadioCard from "./RadioCard.tsx";

type Props = {
    id?: string;
    name?: string;
    value: CategoryTransactionType | undefined;
    onChange: (nextValue: string) => void;
    defaultValue?: CategoryTransactionType | undefined;
    haveEmpty?: boolean;
}
const CategoryTransactionTypeRadio = ({onChange, name, defaultValue, haveEmpty}: Props) => {
    const {getRootProps, getRadioProps} = useRadioGroup({
        name: name,
        onChange: onChange,
        defaultValue: defaultValue,
    })
    
    const group = getRootProps()

    const options = useMemo(() => {
        return Object.values(CategoryTransactionType).map((type) => {
            return type;
        })
    }, []);

    return (
        <HStack {...group}>
            {haveEmpty && (
                <RadioCard {...getRadioProps({value: ""})}>
                    All
                </RadioCard>
            )}
            {options.map((value) => {
                const radio = getRadioProps({value})
                return (
                    <RadioCard key={value} {...radio}>
                        {value}
                    </RadioCard>
                )
            })}
        </HStack>
    )
}

export default CategoryTransactionTypeRadio;
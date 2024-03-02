import {Radio, RadioGroup, Stack} from "@chakra-ui/react";
import {CategoryTransactionType} from "../../models/category.model.ts";
import {ChangeEvent} from "react";

type Props = {
    id?: string;
    name?: string;
    value: CategoryTransactionType;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: unknown) => void;
}
const CategoryTransactionTypeRadio = ({value, onChange, onBlur, id, name}: Props) => {
    return (
        <RadioGroup
            id={id}
            name={name}
            defaultValue={value}
            onBlur={onBlur}
        >
            <Stack spacing={5} direction='row'>
                {Object.values(CategoryTransactionType).map((type) => (
                    <Radio onChange={onChange} key={type} value={type}>{type}</Radio>
                ))}
            </Stack>
        </RadioGroup>
    )

}

export default CategoryTransactionTypeRadio;
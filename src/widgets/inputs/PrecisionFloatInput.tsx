import {NumberInput, NumberInputField} from "@chakra-ui/react";
import {ChangeEvent} from "react";

type Props = {
    value: number;
    onBlur: (val: unknown) => void;
    id: string;
    name: string;
    placeholder: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
    precision: number;
}

const PrecisionFloatInput = (
    {
        value,
        onBlur,
        id,
        name,
        placeholder,
        setFieldValue,
        precision
    }: Props
) => {

    const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value).toFixed(precision);
        if (setFieldValue) setFieldValue(name, value);
    }

    return (
        <NumberInput
            w="full"
            precision={precision}
            defaultValue={value}
        >
            <NumberInputField
                placeholder={placeholder}
                id={id}
                name={name}
                value={value}
                onChange={handleChangeAmount}
                onBlur={onBlur}
            />
        </NumberInput>
    )
}

export default PrecisionFloatInput;
import {NumberInput, NumberInputField} from "@chakra-ui/react";
import {ChangeEvent} from "react";

type Props = {
    value: number;
    onBlur?: (val: unknown) => void;
    id: string;
    name: string;
    placeholder: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
    precision: number;
    defaultValue?: number;
    max?: number;
    min?: number;
}

const PrecisionFloatInput = (
    {
        value,
        onBlur,
        id,
        name,
        placeholder,
        setFieldValue,
        onChange,
        precision,
        max,
        min
    }: Props
) => {

    const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value).toFixed(precision);
        if (setFieldValue) {
            setFieldValue(name, value)
            return;
        }

        if (onChange) {
            onChange(event);
        }
    }

    return (
        <NumberInput
            w="full"
            precision={precision}
            defaultValue={value}
            max={max}
            min={min}
        >
            <NumberInputField
                placeholder={placeholder}
                min={min}
                max={max}
                id={id}
                name={name}
                onBlur={onBlur}
                onChange={handleChangeAmount}
            />
        </NumberInput>
    )
}

export default PrecisionFloatInput;
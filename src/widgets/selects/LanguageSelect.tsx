import {Select, SelectItem, Spinner} from "@nextui-org/react";
import {ChangeEvent} from "react";
import {useLanguages} from "../../api/languages.api.ts";

type Props = {
    value?: string
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
    hasError?: boolean
    errorMessage?: string
}
const CurrencySelect = ({value, onChange, hasError, errorMessage}: Props) => {
    const {data, isLoading, isError} = useLanguages();

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <div>Error</div>
    }
    return (
        <Select
            items={data?.data}
            label="Languages"
            placeholder="Select language"
            className="max-w-xs"
            id="language"
            name="language"
            defaultSelectedKeys={value}
            onChange={onChange}
            isRequired
            errorMessage={errorMessage}
            isInvalid={hasError}
        >
            {(language) =>
                <SelectItem
                    key={language.id}
                    value={language.id}

                >
                    {`${language.name} - ${language.code}`}
                </SelectItem>
            }
        </Select>
    )
}

export default CurrencySelect;
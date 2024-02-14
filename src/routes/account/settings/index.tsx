import {createFileRoute} from "@tanstack/react-router";
import {useCurrencies} from "../../../api/currencies.api.ts";
import {useLanguages} from "../../../api/languages.api.ts";
import {InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

export const Route = createFileRoute('/account/settings/')({
    component: Settings
})

export function Settings() {
    const currenciesQuery = useCurrencies();
    const languagesQuery = useLanguages();
    const [currency, setCurrency] = useState('');
    const [language, setLanguage] = useState('');

    return (
        <div className="p-2">
            <Select
                label="Currency"
                id="currency"
                displayEmpty
                value={currency}
                onChange={(event) => {
                    setCurrency(event.target.value)
                }}
            >
                <MenuItem disabled value="">
                    <em>Choose currency</em>
                </MenuItem>
                {currenciesQuery.data?.data.map((currency) => (
                    <MenuItem key={currency.id} value={currency.name}>
                        {currency.name}
                    </MenuItem>
                ))}
            </Select>

            <Select
                label="Language"
                id="language"
                displayEmpty
                value={language}
                onChange={(event) => {
                    setLanguage(event.target.value)
                }}
            >
                <MenuItem disabled value="">
                    <em>Choose language</em>
                </MenuItem>
                {languagesQuery.data?.data.map((language) => (
                    <MenuItem key={language.id} value={language.name}>
                        {language.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}
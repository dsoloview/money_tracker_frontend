import {ISelectProps} from "@/models/widget.model.ts";
import {Suspense} from "react";
import {useLanguages} from "@/api/endpoints/languages.api.ts";
import {Spinner} from "@/ui/spinner.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/ui/select.tsx";

const LanguageSelect = (
    {
        value,
        onChange,
    }: ISelectProps) => {

    return (
        <Suspense fallback={<Spinner/>}>
            <SuspenseLanguageSelect
                value={value}
                onChange={onChange}
            />
        </Suspense>
    )
}

const SuspenseLanguageSelect = (
    {
        onChange,
        value

    }: ISelectProps) => {
    const {data} = useLanguages();

    return (
        <Select onValueChange={onChange} defaultValue={value.toString()}>
            <SelectTrigger>
                <SelectValue placeholder="Select language"/>
            </SelectTrigger>
            <SelectContent>
                {data?.data.map((language) => (
                    <SelectItem key={language.id} value={language.id.toString()}>
                        {language.name} ({language.code})
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default LanguageSelect;
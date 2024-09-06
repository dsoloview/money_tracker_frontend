import {CategoryTransactionType} from "@/models/category.model.ts";
import {useMemo} from "react";
import RadioCard from "./RadioCard.tsx";
import {ButtonGroup} from "@/ui/button-group.tsx";
import {cn} from "@/lib/utils.ts";

type Props = {
    id?: string;
    name?: string;
    value: CategoryTransactionType | undefined;
    onChange: (nextValue: string) => void;
    defaultValue?: CategoryTransactionType | undefined;
    haveEmpty?: boolean;
    className?: string;
}
const CategoryTransactionTypeRadio = ({onChange, value, haveEmpty, className}: Props) => {

    const options = useMemo(() => {
        return Object.values(CategoryTransactionType).map((type) => {
            return type;
        })
    }, []);

    const styles = cn("flex justify-center items-center", className);
    return (
        <ButtonGroup
            className={styles}
            defaultValue={value}
            onValueChange={onChange}
        >
            {haveEmpty && (
                <RadioCard value="all" label="All"/>
            )}
            {options.map((value) => {
                return (
                    <RadioCard key={value} value={value} label={value}/>
                )
            })}
        </ButtonGroup>
    )
}

export default CategoryTransactionTypeRadio;
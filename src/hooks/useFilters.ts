import {useState} from "react";

type Props = {
    onFiltersChange?: () => void;
}

const useFilters = <T extends object>(props?: Props) => {
    const initialFilters: T = {} as T;

    const [filters, setFilters] = useState(initialFilters);

    const updateFilters = (key: string, value: any) => {
        if (typeof value === "object") {
            setFilters({
                ...filters, [key]: value,
            });
            return;
        }

        setFilters({
            ...filters, [key]: {
                '$eq': value,
            }
        });
    }

    const removeFilter = (key: string) => {
        const newFilters = {...filters};
        if (key in newFilters) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete newFilters[key];
        }
        setFilters(newFilters);
    }

    const onFilterChange = (key: string, value: any) => {
        if (value === "" || (typeof value === "object" && Object.keys(value).length === 0)) {
            removeFilter(key);
        } else {
            updateFilters(key, value);
        }
    }

    const resetFilters = () => {
        setFilters({} as T);
    }

    return {filters, updateFilters, removeFilter, onFilterChange, resetFilters};
}

export default useFilters;
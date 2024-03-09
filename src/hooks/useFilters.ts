import {useEffect, useState} from "react";
import useQueryParams from "./useQueryParams.ts";

type Props = {
    onFiltersChange?: () => void;
}

const useFilters = <T extends object>(props?: Props) => {
    const {params, updateQueryParams, removeQueryParams} = useQueryParams();

    let initialFilters: T = {} as T;

    if (params.filters) {
        initialFilters = params.filters as T;
    }
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        if (props?.onFiltersChange) {
            props.onFiltersChange();
        }

        if (Object.keys(filters).length > 0) {
            if (params.filters !== filters) {
                console.log(filters)
                updateQueryParams({filters: filters});
            }
        } else {
            removeQueryParams(["filters"]);
        }
    }, [filters]);

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
import {useEffect, useState} from "react";
import useQueryParams from "./useQueryParams.ts";

export function useSorting(initialField = "id", initialOrder = "desc") {
    const {params, updateQueryParams, removeQueryParams} = useQueryParams();

    if (params.sort && params.sort.length > 0) {
        const [field, order] = params.sort[0].split(":");
        initialField = field;
        initialOrder = order;
    }

    const [sort, setSort] = useState([
        {id: initialField, desc: initialOrder === "desc"}
    ]);

    useEffect(() => {
        if (sort.length > 0) {
            updateQueryParams({sort: [`${sort[0].id}:${sort[0].desc ? "desc" : "asc"}`]});
        } else {
            removeQueryParams(["sort"]);
        }
    }, [sort]);
    return {
        sort,
        onSortingChange: setSort,
        order: !sort.length ? initialOrder : sort[0].desc ? "desc" : "asc",
        field: sort.length ? sort[0].id : initialField,
    };
}
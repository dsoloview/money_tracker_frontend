import {useState} from "react";

export function useSorting(initialField = "id", initialOrder = "desc") {
    const [sort, setSort] = useState([
        {id: initialField, desc: initialOrder === "DESC"},
    ]);

    return {
        sort,
        onSortingChange: setSort,
        order: !sort.length ? initialOrder : sort[0].desc ? "desc" : "asc",
        field: sort.length ? sort[0].id : initialField,
    };
}
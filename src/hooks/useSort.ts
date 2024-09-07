import {useState} from "react";

export function useSorting(initialField = "id", desc = true) {

    const [sort, setSort] = useState([
        {id: initialField, desc: desc}
    ]);

    return {
        sort,
        onSortingChange: setSort,
        order: sort[0].desc ? "desc" : "asc",
        field: sort[0].id,
    };
}
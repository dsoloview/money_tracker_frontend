import {useEffect, useState} from "react";
import useQueryParams from "./useQueryParams.ts";

const usePagination = () => {
    const {params, updateQueryParams} = useQueryParams();

    let initialPage = 1;
    if (params.page) {
        initialPage = params.page;
    }
    const [pagination, setPagination] = useState({
        pageIndex: initialPage - 1,
        pageSize: 0,
    });

    const resetPagination = () => {
        setPagination({pageIndex: 0, pageSize: 0});
    }

    useEffect(() => {
        updateQueryParams({page: pagination.pageIndex + 1});
    }, [pagination]);

    return {
        onPaginationChange: setPagination,
        resetPagination,
        pagination,
        page: pagination.pageIndex + 1,
    }
}

export default usePagination;
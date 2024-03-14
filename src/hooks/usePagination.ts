import {useState} from "react";
import useQueryParams from "./useQueryParams.ts";

const usePagination = () => {
    const {params, updateQueryParams} = useQueryParams();

    const [pagination, setPagination] = useState({
        pageIndex: params.page ?? 1,
        pageSize: 0,
    });

    const resetPagination = () => {
        setPagination({pageIndex: 0, pageSize: 0});
        updateQueryParams({page: 1});
    }

    const onPaginationChange = (stateUpdater) => {
        const vars = stateUpdater(pagination)
        setPagination(vars)
        updateQueryParams({page: vars.pageIndex + 1})
    }

    // useEffect(() => {
    //     updateQueryParams({page: pagination.pageIndex + 1});
    // }, [pagination]);
    return {
        onPaginationChange,
        resetPagination,
        pagination,
        page: pagination.pageIndex + 1,
    }
}

export default usePagination;
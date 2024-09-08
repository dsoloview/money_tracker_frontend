import {useState} from "react";

export type Pagination = {
    pageIndex: number,
    pageSize: number,
}
const usePagination = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const resetPagination = () => {
        setPagination({pageIndex: 0, pageSize: 10});
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const onPaginationChange = (stateUpdater) => {
        const vars = stateUpdater(pagination)
        setPagination(vars)
    }

    const onMobilePaginationChange = (update: Pagination) => {
        setPagination(update)
    }

    return {
        onPaginationChange,
        resetPagination,
        onMobilePaginationChange,
        pagination,
        page: pagination.pageIndex + 1,
    }
}

export default usePagination;
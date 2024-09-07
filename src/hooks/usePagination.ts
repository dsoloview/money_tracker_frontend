import {useState} from "react";

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

    return {
        onPaginationChange,
        resetPagination,
        pagination,
        page: pagination.pageIndex + 1,
    }
}

export default usePagination;
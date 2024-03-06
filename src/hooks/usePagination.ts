import {useState} from "react";

const usePagination = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 0,
    });
    
    return {
        onPaginationChange: setPagination,
        pagination,
        page: pagination.pageIndex + 1,
    }
}

export default usePagination;
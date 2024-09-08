import {Button} from "@/ui/button.tsx";
import {Pagination} from "@/hooks/usePagination.ts";

type MobilePaginationProps = {
    pagination: Pagination;
    pageCount: number;
    onPaginationChange: (update: Pagination) => void;
};

const MobilePagination = ({pagination, pageCount, onPaginationChange}: MobilePaginationProps) => {
    return (
        <div className="flex justify-center items-center mt-4">
            <Button
                onClick={() => onPaginationChange({pageIndex: 0, pageSize: pagination.pageSize})}
                disabled={pagination.pageIndex === 0}
                className="mr-2"
            >
                {"<<"}
            </Button>
            <Button
                onClick={() => onPaginationChange({pageIndex: pagination.pageIndex - 1, pageSize: pagination.pageSize})}
                disabled={pagination.pageIndex === 0}
                className="mr-2"
            >
                {"<"}
            </Button>
            <span className="mr-2">
                Page <strong>{pagination.pageIndex + 1} of {pageCount}</strong>
            </span>
            <Button
                onClick={() => onPaginationChange({pageIndex: pagination.pageIndex + 1, pageSize: pagination.pageSize})}
                disabled={pagination.pageIndex === pageCount - 1}
                className="mr-2"
            >
                {">"}
            </Button>
            <Button
                onClick={() => onPaginationChange({pageIndex: pageCount - 1, pageSize: pagination.pageSize})}
                disabled={pagination.pageIndex === pageCount - 1}
            >
                {">>"}
            </Button>
        </div>
    );
};

export default MobilePagination;
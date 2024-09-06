import {Button} from "@/ui/button.tsx";

type MobilePaginationProps = {
    pageIndex: number;
    pageCount: number;
    onPaginationChange: (update: { pageIndex: number }) => void;
};

const MobilePagination = ({pageIndex, pageCount, onPaginationChange}: MobilePaginationProps) => {
    return (
        <div className="flex justify-center items-center mt-4">
            <Button
                onClick={() => onPaginationChange({pageIndex: 0})}
                disabled={pageIndex === 0}
                className="mr-2"
            >
                {"<<"}
            </Button>
            <Button
                onClick={() => onPaginationChange({pageIndex: pageIndex - 1})}
                disabled={pageIndex === 0}
                className="mr-2"
            >
                {"<"}
            </Button>
            <span className="mr-2">
                Page <strong>{pageIndex + 1} of {pageCount}</strong>
            </span>
            <Button
                onClick={() => onPaginationChange({pageIndex: pageIndex + 1})}
                disabled={pageIndex === pageCount - 1}
                className="mr-2"
            >
                {">"}
            </Button>
            <Button
                onClick={() => onPaginationChange({pageIndex: pageCount - 1})}
                disabled={pageIndex === pageCount - 1}
            >
                {">>"}
            </Button>
        </div>
    );
};

export default MobilePagination;
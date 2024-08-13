import {Table} from "@tanstack/react-table";
import {Button} from "@/ui/button.tsx";

type Props<Data> = {
    tableInfo: Table<Data>
};

const Pagination = <Data extends object>(
    {
        tableInfo
    }: Props<Data>
) => {
    return (
        <div className="flex justify-center items-center mt-4">
            <Button
                onClick={() => {
                    tableInfo.setPageIndex(0)
                }
                }
                disabled={!tableInfo.getCanPreviousPage()}
                className="mr-2"
            >
                {"<<"}
            </Button>
            <Button
                onClick={tableInfo.previousPage}
                disabled={!tableInfo.getCanPreviousPage()}
                className="mr-2"
            >
                {"<"}
            </Button>
            <span className="mr-2">
                Page{" "}
                <strong>
                    {tableInfo.getState().pagination.pageIndex + 1} of {tableInfo.getPageCount()}
                </strong>{" "}
            </span>
            <Button
                onClick={tableInfo.nextPage}
                disabled={!tableInfo.getCanNextPage()}
                className="mr-2"
            >
                {">"}
            </Button>
            <Button
                onClick={() => {
                    tableInfo.setPageIndex(tableInfo.getPageCount() - 1)
                }}
                disabled={!tableInfo.getCanNextPage()}
            >
                {">>"}
            </Button>
        </div>
    );
};

export default Pagination;
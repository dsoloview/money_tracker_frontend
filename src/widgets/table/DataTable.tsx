import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {Dispatch, SetStateAction} from "react";
import CustomPagination from "./CustomPagination.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/ui/table.tsx";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Skeleton} from "@/ui/skeleton.tsx";

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: any[];
    onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
    pagination: PaginationState;
    pageCount: number;
    sort: SortingState,
    onSortingChange: Dispatch<SetStateAction<SortingState>>;
    isLoading?: boolean;
};

export function DataTable<Data extends object>(
    {
        data,
        columns,
        onPaginationChange,
        pagination,
        pageCount,
        sort,
        onSortingChange,
        isLoading

    }: DataTableProps<Data>) {

    const columnHelper = createColumnHelper<Data>();

    const cols = columns.map((column) => {
        return columnHelper.accessor(column.accessor, {
            cell: (row) => {
                if (column.cell) {
                    return column.cell(row.row.original);
                }

                return row.getValue();
            },
            header: column.header,
            enableSorting: column.enableSorting,
        });
    });

    const table = useReactTable({
        data,
        columns: cols,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        onPaginationChange,
        state: {pagination, sorting: sort},
        onSortingChange,
        pageCount
    });

    const skeleton = Array.from({length: pagination.pageSize}, (_, index) => (
        (<TableRow key={index}>
            {table.getHeaderGroups().map((headerGroup) => (
                headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                        <Skeleton className="h-[25px]"/>
                    </TableCell>
                ))
            ))}
        </TableRow>)
    ));

    let content = null;
    if (isLoading) {
        content = skeleton;
    } else {
        content = table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                    return (
                        <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    );
                })}
            </TableRow>
        ));
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto min-h-[630px]">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>

                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <div className="flex items-center cursor-pointer">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}

                                                <div className="pl-4">
                                                    {header.column.getIsSorted() ? (
                                                        header.column.getIsSorted() === "desc" ? (
                                                            <ChevronDown/>
                                                        ) : (
                                                            <ChevronUp/>
                                                        )
                                                    ) : null}
                                                </div>
                                            </div>

                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {content}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4">
                <CustomPagination table={table}/>
            </div>
        </div>
    );
}
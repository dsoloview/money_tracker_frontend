import {Box, chakra, Skeleton, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {TriangleDownIcon, TriangleUpIcon} from "@chakra-ui/icons";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {Dispatch, SetStateAction} from "react";
import PaginationNew from "./PaginationNew.tsx";

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
            cell: (row) => row.getValue(),
            header: column.header,
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

    const skeleton = Array.from({length: 10}, (_, index) => (
        (<Tr key={index}>
            {table.getHeaderGroups().map((headerGroup) => (
                headerGroup.headers.map((header) => (
                    <Td key={header.id}>
                        <Skeleton height="20px"/>
                    </Td>
                ))
            ))}
        </Tr>)
    ));

    let content = null;
    if (isLoading) {
        content = skeleton;
    } else {
        content = table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                    const meta: any = cell.column.columnDef.meta;
                    return (
                        <Td key={cell.id} isNumeric={meta?.isNumeric}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Td>
                    );
                })}
            </Tr>
        ));
    }

    return (
        <Box>
            <Table>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const meta: any = header.column.columnDef.meta;
                                return (
                                    <Th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                        <chakra.span pl="4">
                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() === "desc" ? (
                                                    <TriangleDownIcon aria-label="sorted descending"/>
                                                ) : (
                                                    <TriangleUpIcon aria-label="sorted ascending"/>
                                                )
                                            ) : null}
                                        </chakra.span>
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {content}
                </Tbody>
            </Table>
            <PaginationNew tableInfo={table}/>
        </Box>
    );
}
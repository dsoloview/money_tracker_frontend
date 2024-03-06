import {Button, Flex, Text} from "@chakra-ui/react";
import {Table} from "@tanstack/react-table";

type Props<Data> = {
    tableInfo: Table<Data>
};

const PaginationNew = <Data extends object>(
    {
        tableInfo
    }: Props<Data>
) => {
    return (
        <Flex justifyContent="center" alignItems="center" mt="4">
            <Button
                onClick={() => {
                    tableInfo.setPageIndex(0)
                }
                }
                isDisabled={!tableInfo.getCanPreviousPage()}
                mr="2"
            >
                {"<<"}
            </Button>
            <Button
                onClick={tableInfo.previousPage}
                isDisabled={!tableInfo.getCanPreviousPage()}
                mr="2"
            >
                {"<"}
            </Button>
            <Text mr="2">
                Page{" "}
                <strong>
                    {tableInfo.getState().pagination.pageIndex + 1} of {tableInfo.getPageCount()}
                </strong>{" "}
            </Text>
            <Button
                onClick={tableInfo.nextPage}
                isDisabled={!tableInfo.getCanNextPage()}
                mr="2"
            >
                {">"}
            </Button>
            <Button
                onClick={() => {
                    tableInfo.setPageIndex(tableInfo.getPageCount() - 1)
                }}
                isDisabled={!tableInfo.getCanNextPage()}
            >
                {">>"}
            </Button>
        </Flex>
    );
};

export default PaginationNew;
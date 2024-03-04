import {Button, Flex, Text} from "@chakra-ui/react";

type Props = {
    pageIndex: number;
    pageCount: number;
    gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
    nextPage: () => void;
    previousPage: () => void;
    canNextPage: boolean;
    canPreviousPage: boolean;
};

const Pagination = (
    {
        pageIndex,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage
    }: Props
) => {
    return (
        <Flex justifyContent="center" alignItems="center" mt="4">
            <Button onClick={() => gotoPage(0)} isDisabled={!canPreviousPage} mr="2">
                {"<<"}
            </Button>
            <Button onClick={() => previousPage()} isDisabled={!canPreviousPage} mr="2">
                {"<"}
            </Button>
            <Text mr="2">
                Page{" "}
                <strong>
                    {pageIndex} of {pageCount}
                </strong>{" "}
            </Text>
            <Button onClick={() => nextPage()} isDisabled={!canNextPage} mr="2">
                {">"}
            </Button>
            <Button onClick={() => gotoPage(pageCount)} isDisabled={!canNextPage}>
                {">>"}
            </Button>
        </Flex>
    );
};

export default Pagination;
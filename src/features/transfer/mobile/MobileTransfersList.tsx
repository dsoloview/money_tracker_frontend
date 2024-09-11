import usePagination from "@/hooks/usePagination.ts";
import {useSorting} from "@/hooks/useSort.ts";
import useFilters from "@/hooks/useFilters.ts";
import useUserState from "@/hooks/useUserState.ts";
import Title from "@/widgets/texts/Title.tsx";
import SkeletonList from "@/widgets/skeleton/SkeletonList.tsx";
import MobilePagination from "@/widgets/pagination/MobilePagination.tsx";
import {useGetUserTransfers} from "@/api/endpoints/user/transfer/userTransfer.api.ts";
import {IParamTableGetRequest} from "@/models/request.model.ts";
import MobileTransfersFilters from "@/features/transfer/mobile/MobileTransfersFilters.tsx";
import {ITransfer} from "@/models/transfer.model.ts";
import TransferListItem from "@/features/transfer/mobile/TransferListItem.tsx";

export type TransferTableFiltersType = {
    account_from_id?: {
        '$eq'?: string;
    };
    account_to_id?: {
        '$eq'?: string;
    };
}

const MobileTransfersList = () => {
    const {pagination, onMobilePaginationChange, resetPagination} = usePagination();
    const {field, order} = useSorting();
    const {filters, onFilterChange, resetFilters} = useFilters<TransferTableFiltersType>({onChange: resetPagination});
    const user = useUserState();

    const {data, isLoading} = useGetUserTransfers({
        id: user.id,
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize,
        sort: field,
        direction: order,
        filters: filters
    } as IParamTableGetRequest);

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Title>Transfers</Title>
                <MobileTransfersFilters
                    filters={filters}
                    onFiltersChange={onFilterChange}
                    resetFilters={resetFilters}
                    isLoading={isLoading}
                />
            </div>
            <div className="space-y-4 px-4">
                {isLoading ? (
                    <SkeletonList count={10}/>
                ) : (
                    data?.data.map((transfer: ITransfer) => (
                        <TransferListItem key={transfer.id} transfer={transfer}/>
                    ))
                )}
            </div>
            <MobilePagination
                pagination={pagination}
                pageCount={data?.meta.last_page || 0}
                onPaginationChange={onMobilePaginationChange}
            />
        </>
    );
}

export default MobileTransfersList;
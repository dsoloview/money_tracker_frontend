import {Card} from "@/ui/card.tsx";
import {formatDateTimeString} from "@/tools/date/date.helper.ts";
import {ITransfer} from "@/models/transfer.model.ts";
import TransferActions from "@/features/transfer/TransferActions.tsx";

const TransactionListItem = ({transfer}: { transfer: ITransfer }) => {
    return (
        <Card className="p-4 shadow-md rounded-xl border border-gray-200">
            <div className="flex justify-between items-center">
                <div>
                    <div className="font-medium text-lg">{transfer.account_from.name} - {transfer.account_to.name}</div>
                    <div className="text-sm text-gray-500">{formatDateTimeString(transfer.date)}</div>
                </div>
                <div>
                    {transfer.amount_from} {transfer.account_from.currency.symbol} - {transfer.amount_to} {transfer.account_to.currency.symbol}
                </div>
                <div className="flex items-center gap-3">
                    <TransferActions transfer={transfer}/>
                </div>
            </div>
        </Card>
    );
};

export default TransactionListItem;
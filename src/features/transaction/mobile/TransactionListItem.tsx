import {Card} from "@/ui/card.tsx";
import {ITransaction} from "@/models/transaction.model.ts";
import {formatDateTimeString} from "@/tools/date/date.helper.ts";
import {CategoryTransactionType} from "@/models/category.model.ts";
import CategoryBadge from "@/widgets/category/CategoryBadge.tsx";
import {Badge} from "@/ui/badge.tsx";
import TransactionActions from "@/features/transaction/TransactionActions.tsx";

const TransactionListItem = ({transaction}: { transaction: ITransaction }) => {
    return (
        <Card className="p-4 shadow-md rounded-xl border border-gray-200">
            <div className="flex justify-between items-center">
                <div>
                    <div className="font-medium text-lg">{transaction.account.name}</div>
                    <div className="text-sm text-gray-500">{formatDateTimeString(transaction.date)}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {transaction.categories.map((category) => (
                            <CategoryBadge key={category.id} category={category}/>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Badge
                        variant={transaction.type === CategoryTransactionType.EXPENSE ? "destructive" : "positive"}
                        className="px-3 py-1 text-md"
                    >
                        {transaction.amount} {transaction.account.currency.symbol}
                    </Badge>
                    <TransactionActions transactionId={transaction.id}/>
                </div>
            </div>
        </Card>
    );
};

export default TransactionListItem;
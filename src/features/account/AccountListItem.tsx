import {IAccount} from "@/models/account.model.ts";
import AccountActions from "@/features/account/AccountActions.tsx";

type Props = {
    account: IAccount;
}
const AccountListItem = ({account}: Props) => {
    return (
        <>
            <li className="rounded-md shadow-md bg-white p-5" key={account.id}>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold">{account.name}</span>
                        <span className="text-gray-500">{account.bank}</span>
                        <span>{account.balance} {account.currency.symbol}</span>
                    </div>
                    <div>
                        <AccountActions account={account}/>
                    </div>
                </div>
            </li>
        </>
    )
}

export default AccountListItem;
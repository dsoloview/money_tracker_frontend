import {useSuspenseGetUserAccounts} from "@/api/endpoints/user/account/userAccount.api.ts";
import useUserState from "@/hooks/useUserState.ts";
import AccountListItem from "@/features/account/AccountListItem.tsx";

const AccountsList = () => {
    const user = useUserState();
    const {data} = useSuspenseGetUserAccounts(user.id);

    return (
        <div>
            <ul className="space-y-2">
                {data.data.map((account) => (
                    <AccountListItem account={account} key={account.id}/>
                ))}
            </ul>
        </div>
    )
}

export default AccountsList;
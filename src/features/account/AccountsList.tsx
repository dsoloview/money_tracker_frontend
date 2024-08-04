import {useSuspenseGetUserAccounts} from "@/api/endpoints/user/account/userAccount.api.ts";
import {useDeleteAccount} from "@/api/endpoints/account/account.api.ts";
import {useState} from "react";
import UpdateAccountModal from "@/widgets/modals/UpdateAccountModal.tsx";
import {IAccount} from "@/models/account.model.ts";
import useUserState from "@/hooks/useUserState.ts";
import {useNavigate} from "react-router-dom";
import qs from "qs";
import {Button} from "@/ui/button.tsx";
import {PanelLeftOpen, Pencil, Trash2} from "lucide-react";

const AccountsList = () => {
    const user = useUserState();
    const {data} = useSuspenseGetUserAccounts(user.id);
    const {mutate} = useDeleteAccount();
    const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const handleDelete = (accountId: number) => {
        mutate(accountId)
    }

    const handleEdit = (account: IAccount) => {
        setSelectedAccount(account);
        setIsEditModalOpen(true);
    }

    const handleSelectAccount = (account: IAccount) => {
        const query = qs.stringify({
            filters: {
                account_id: {
                    $eq: account.id
                }
            }
        })
        navigate(`/account/transactions?${query}`);
    }

    const onModalClose = () => {
        setSelectedAccount(null);
        setIsEditModalOpen(false);
    }

    return (
        <div>
            <ul className="space-y-2">
                {data.data.map((account) => (
                    <li className="rounded-md shadow-md bg-white p-5" key={account.id}>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span className="text-lg font-bold">{account.name}</span>
                                <span className="text-gray-500">{account.bank}</span>
                                <span>{account.balance} {account.currency.symbol}</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <Button variant="red" onClick={() => handleDelete(account.id)}>
                                    <Trash2/>
                                </Button>
                                <Button variant="yellow" onClick={() => handleEdit(account)}>
                                    <Pencil/>
                                </Button>
                                <Button onClick={() => handleSelectAccount(account)} variant="green">
                                    <PanelLeftOpen/>
                                </Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedAccount
                && <UpdateAccountModal
                    key={`${selectedAccount.id}-${selectedAccount.balance}`}
                    isOpen={isEditModalOpen}
                    onClose={onModalClose}
                    setIsOpen={setIsEditModalOpen}
                    account={selectedAccount}/>
            }
        </div>
    )
}

export default AccountsList;
import {IAccount} from "@/models/account.model.ts";
import {Button} from "@/ui/button.tsx";
import {PanelLeftOpen, Pencil, Trash2} from "lucide-react";
import {useDeleteAccount} from "@/api/endpoints/account/account.api.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useAreYouSure from "@/hooks/useAreYouSure.ts";

type Props = {
    account: IAccount;
}
const AccountListItem = ({account}: Props) => {
    const {mutate: deleteAccount} = useDeleteAccount();
    const {openAlert: deleteAreYouSure} = useAreYouSure({
        description: "Are you sure you want to delete this account?",
        onAccept: () => {
            deleteAccount(account.id)
        }
    })

    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


    const handleEdit = () => {
        setIsEditModalOpen(true);
    }

    const handleSelectAccount = () => {
        navigate(`/account/transactions`);
    }

    const onModalClose = () => {
        setIsEditModalOpen(false);
    }

    return (
        <>
            <li className="rounded-md shadow-md bg-white p-5" key={account.id}>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold">{account.name}</span>
                        <span className="text-gray-500">{account.bank}</span>
                        <span>{account.balance} {account.currency.symbol}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <Button variant="red" onClick={deleteAreYouSure}>
                            <Trash2/>
                        </Button>
                        <Button variant="yellow" onClick={() => handleEdit()}>
                            <Pencil/>
                        </Button>
                        <Button onClick={() => handleSelectAccount()} variant="green">
                            <PanelLeftOpen/>
                        </Button>
                    </div>
                </div>
            </li>

        </>
    )
}

export default AccountListItem;
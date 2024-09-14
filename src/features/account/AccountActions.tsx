import {IAccount} from "@/models/account.model.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/ui/dropdown-menu.tsx";
import {Button} from "@/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {useDeleteAccount} from "@/api/endpoints/account/account.api.ts";
import useAreYouSure from "@/hooks/modal/useAreYouSure.ts";
import {useUpdateAccountModal} from "@/stores/modal/updateAccountModal.ts";

type Props = {
    account: IAccount;
}
const AccountActions = ({account}: Props) => {

    const {mutate: deleteAccount} = useDeleteAccount();
    const {openAlert: deleteAreYouSure} = useAreYouSure({
        description: "Are you sure you want to delete this account?",
        onAccept: () => {
            deleteAccount(account.id)
        }
    })
    const {toggleModal} = useUpdateAccountModal();

    const handleEdit = () => {
        toggleModal(account);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                >
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={deleteAreYouSure}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AccountActions;
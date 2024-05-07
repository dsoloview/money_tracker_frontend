import {Box, List, ListItem, Stack, Text, useDisclosure} from "@chakra-ui/react";
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
    const {onOpen, isOpen, onClose} = useDisclosure();
    const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);
    const navigate = useNavigate();
    const handleDelete = (accountId: number) => {
        mutate(accountId)
    }

    const handleEdit = (account: IAccount) => {
        setSelectedAccount(account);
        onOpen();
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
        onClose();
    }

    return (
        <Box>
            <List spacing={3}>
                {data.data.map((account) => (
                    <ListItem key={account.id}>
                        <Box shadow="md" p={5} rounded="md" bg="white">
                            <Stack direction="row" align="center" justify="space-between">
                                <Stack direction="column">
                                    <Text fontSize="lg" fontWeight="bold">{account.name}</Text>
                                    <Text color="gray.500">{account.bank}</Text>
                                    <Text>{account.balance} {account.currency.symbol}</Text>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="red" onClick={() => handleDelete(account.id)}>
                                        <Trash2/>
                                    </Button>
                                    <Button variant="yellow" onClick={() => handleEdit(account)}>
                                        <Pencil/>
                                    </Button>
                                    <Button onClick={() => handleSelectAccount(account)} variant="green">
                                        <PanelLeftOpen/>
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </ListItem>
                ))}
            </List>
            {selectedAccount
                && <UpdateAccountModal
                    key={`${selectedAccount.id}-${selectedAccount.balance}`}
                    isOpen={isOpen}
                    onClose={onModalClose}
                    account={selectedAccount}/>
            }
        </Box>
    )
}

export default AccountsList;
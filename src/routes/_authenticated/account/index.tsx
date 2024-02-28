import {createFileRoute} from "@tanstack/react-router";
import AccountLayout from "../../../layouts/AccountLayout.tsx";
import {Box, Flex, Heading, IconButton, useDisclosure} from "@chakra-ui/react";
import CreateAccountModal from "../../../widgets/modals/CreateAccountModal.tsx";
import AccountsList from "../../../features/account/components/AccountsList.tsx";
import {AddIcon} from "@chakra-ui/icons";

export const Route = createFileRoute('/_authenticated/account/')({
    component: Account
})

export function Account() {
    const {onOpen, isOpen, onClose} = useDisclosure()

    return (
        <AccountLayout>
            <Heading size="lg">Accounts</Heading>
            <AccountsList/>
            <Box mt={5}>
                <Flex justifyContent="flex-end">
                    <IconButton
                        onClick={onOpen}
                        aria-label="Create Account"
                        icon={<AddIcon/>}
                        colorScheme="blue"
                        size="lg"
                    />
                </Flex>
            </Box>
            <CreateAccountModal isOpen={isOpen} onClose={onClose}/>
        </AccountLayout>
    );
}


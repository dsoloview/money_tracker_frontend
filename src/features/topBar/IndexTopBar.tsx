'use client'

import {Box, Button, Container, Flex, useColorModeValue, useDisclosure,} from '@chakra-ui/react'
import useAuthStore from "../../stores/authStore.ts";
import {useTranslation} from "react-i18next";
import LogoutButton from "../../widgets/buttons/LogoutButton.tsx";
import LoginModal from "../../widgets/modals/LoginModal.tsx";
import SignupModal from "../../widgets/modals/SignupModal.tsx";
import {Link} from "react-router-dom";


export default function IndexTopBar() {

    const user = useAuthStore(state => state.authData?.user);
    const {isOpen: isOpenLoginModal, onOpen: onOpenLoginModal, onClose: onCloseLoginModal} = useDisclosure()
    const {isOpen: isOpenSignupModal, onOpen: onOpenSignupModal, onClose: onCloseSignupModal} = useDisclosure()
    const {t} = useTranslation();

    const authContent = (
        <Flex
            gap={3}
        >
            <Button colorScheme="blue" as={Link} to="/account">{t('menu.account')}</Button>
            <LogoutButton/>
        </Flex>
    )

    const notAuthContent = (
        <>
            <Button onClick={onOpenLoginModal}>{t('auth.login')}</Button>
            <LoginModal
                isOpen={isOpenLoginModal}
                onClose={onCloseLoginModal}
            />
            <Button onClick={onOpenSignupModal}>{t('auth.register')}</Button>
            <SignupModal
                isOpen={isOpenSignupModal}
                onClose={onCloseSignupModal}
            />
        </>
    )
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Container maxW="container.xl">
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box><a href="/">Money Tracker</a></Box>
                    <Flex alignItems={'center'}>
                        {user ? authContent : notAuthContent}
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}
'use client'

import {Box, Button, Flex, useColorModeValue, useDisclosure,} from '@chakra-ui/react'
import useAuthStore from "../../stores/authStore.ts";
import {useTranslation} from "react-i18next";
import LogoutButton from "../../widgets/buttons/LogoutButton.tsx";
import LoginModal from "../../widgets/modals/LoginModal.tsx";
import SignupModal from "../../widgets/modals/SignupModal.tsx";
import {Link} from "@tanstack/react-router";

export default function IndexTopBar() {

    const user = useAuthStore(state => state.authData?.user);
    const {isOpen: isOpenLoginModal, onOpen: onOpenLoginModal, onClose: onCloseLoginModal} = useDisclosure()
    const {isOpen: isOpenSignupModal, onOpen: onOpenSignupModal, onClose: onCloseSignupModal} = useDisclosure()
    const {t} = useTranslation();

    const authContent = (
        <>
            <Button as={Link} to="/account">{t('menu.account')}</Button>
            <LogoutButton/>
        </>
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
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Box>Money Tracker</Box>
                <Flex alignItems={'center'}>
                    {user ? authContent : notAuthContent}
                </Flex>
            </Flex>
        </Box>
    )
}
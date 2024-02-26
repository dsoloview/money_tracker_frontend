import useAuthStore from "../../stores/authStore.ts";
import {useTranslation} from "react-i18next";
import {Box, Flex, HStack, IconButton, Stack, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons";
import LogoutButton from "../../widgets/buttons/LogoutButton.tsx";
import {ILink} from "../../models/navigation.model.ts";
import {NavLink} from "../../widgets/navigation/NavLink.tsx";

const AccountTopBar = () => {
    const user = useAuthStore(state => state.authData?.user);
    const {t} = useTranslation();
    const {isOpen, onOpen, onClose} = useDisclosure()

    const menuItems: ILink[] = [
        {name: t('menu.home'), href: "/"},
        {name: t('menu.settings'), href: "/account/settings"},
        {name: t('menu.account'), href: "/account"},
    ];

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
                    aria-label={'Open Menu'}
                    display={{md: 'none'}}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box>Money Tracker</Box>
                    <HStack as={'nav'} spacing={4} display={{base: 'none', md: 'flex'}}>
                        {menuItems.map((link) => (
                            <NavLink link={link} key={link.href}/>
                        ))}
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <Box>
                        {user?.email}
                    </Box>
                    <LogoutButton/>
                </Flex>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{md: 'none'}}>
                    <Stack as={'nav'} spacing={4}>
                        {menuItems.map((link) => (
                            <NavLink link={link} key={link.href}/>
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    )
}

export default AccountTopBar;
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack
} from '@chakra-ui/react'
import {useTranslation} from "react-i18next";
import {useRegister} from "../../api/endpoints/auth/auth.api.ts";
import {IRegisterData} from "../../models/request.model.ts";
import CurrencySelect from "../selects/CurrencySelect.tsx";
import LanguageSelect from "../selects/LanguageSelect.tsx";
import * as yup from "yup";
import {ref} from "yup";
import i18next from "i18next";
import {useMutateWithFormik} from "../../hooks/useMutateWithFormik.ts";

const validationSchema = yup.object({
    name: yup.string()
        .required(i18next.t('form.validation.required'))
        .max(254, i18next.t('form.validation.maxLength', {count: 254})),
    email: yup.string()
        .email(i18next.t('form.validation.email'))
        .required(i18next.t('form.validation.required'))
        .max(254, i18next.t('form.validation.maxLength', {count: 254})),
    password: yup.string()
        .required(i18next.t('form.validation.required'))
        .min(8, i18next.t('form.validation.minLength', {count: 8}))
        .max(254, i18next.t('form.validation.maxLength', {count: 254})),
    password_confirmation: yup.string()
        .required(i18next.t('form.validation.required'))
        .oneOf([ref("password")], i18next.t('form.validation.confirmPassword')),
    settings: yup.object({
        main_currency_id: yup.number()
            .required(i18next.t('form.validation.required'))
            .integer('Must be an integer'),
        language_id: yup.number()
            .required(i18next.t('form.validation.required'))
            .integer('Must be an integer'),
    }),
});

type Props = {
    isOpen: boolean;
    onClose: () => void;
}
const SignupModal = ({isOpen, onClose}: Props) => {
    const {t} = useTranslation()
    const {formik} = useMutateWithFormik<IRegisterData>({
        mutation: useRegister,
        initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            settings: {
                main_currency_id: 0,
                language_id: 0
            }
        },
        validationSchema: validationSchema,
        onSuccess: onClose,
    });


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
            <ModalOverlay/>
            <ModalContent>
                <Box p={5}>
                    <ModalHeader>
                        <Heading as="h2" size="lg">{t('auth.register')}</Heading>
                    </ModalHeader>
                    <ModalBody>
                        <form id="registerForm" onSubmit={formik.handleSubmit}>
                            <Stack spacing={3}>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                                >
                                    <FormLabel>{t('form.name')}</FormLabel>
                                    <Input
                                        autoFocus
                                        placeholder="Enter your name"
                                        id="name"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                                >
                                    <FormLabel>{t('form.email')}</FormLabel>
                                    <Input
                                        placeholder={t('form.placeholder.email')}
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                                >
                                    <FormLabel>{t('form.password')}</FormLabel>
                                    <Input
                                        placeholder="Enter your password"
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                                >
                                    <FormLabel>{t('form.confirmPassword')}</FormLabel>
                                    <Input
                                        placeholder="Confirm your password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={formik.values.password_confirmation}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.password_confirmation}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.settings?.main_currency_id && Boolean(formik.errors.settings?.main_currency_id)}
                                >
                                    <FormLabel>{t('form.currency')}</FormLabel>
                                    <CurrencySelect
                                        id="main_currency_id"
                                        name="settings.main_currency_id"
                                        value={formik.values.settings?.main_currency_id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.settings?.main_currency_id}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.settings?.language_id && Boolean(formik.errors.settings?.language_id)}
                                >
                                    <FormLabel>{t('form.language')}</FormLabel>
                                    <LanguageSelect
                                        id="language_id"
                                        name="settings.language_id"
                                        value={formik.values.settings?.language_id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.settings?.language_id}</FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap="3">
                            <Button colorScheme="blue" type="submit" form="registerForm">
                                {t('form.submit')}
                            </Button>
                            <Button onClick={onClose} colorScheme="red">
                                {t('button.close')}
                            </Button>
                        </Flex>
                    </ModalFooter>
                </Box>
            </ModalContent>
        </Modal>
    );
}

export default SignupModal;
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
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
import * as yup from "yup";
import {useFormik} from "formik";
import {isIValidationErrorResponse} from "../../tools/errors/errors.tools.ts";
import i18next from "i18next";
import {useEffect} from "react";
import useAuthStore from "../../stores/authStore.ts";
import {IAccountCreateUpdateRequest} from "../../models/account.model.ts";
import {useCreateUserAccount} from "../../api/endpoints/user/account/userAccount.api.ts";
import CurrencySelect from "../selects/CurrencySelect.tsx";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const validationSchema = yup.object({
    name: yup.string()
        .required(i18next.t('form.validation.required')),
    bank: yup.string()
        .required(i18next.t('form.validation.required')),
    currency_id: yup.number()
        .required(i18next.t('form.validation.required')),
    balance: yup.number()
        .required(i18next.t('form.validation.required')),
});

const CreateAccountModal = ({isOpen, onClose}: Props) => {
    const authData = useAuthStore(state => state.authData);
    const {mutate, isError, error, isSuccess} = useCreateUserAccount()
    const {t} = useTranslation()
    const formik = useFormik<IAccountCreateUpdateRequest>({
        initialValues: {
            name: "",
            bank: "",
            currency_id: 1,
            balance: 0
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (!authData?.user.id) return
            mutate({
                id: authData.user.id,
                data: values
            })
        },
    })

    useEffect(() => {
        if (isError && error) {
            if (isIValidationErrorResponse(error.data)) {
                const errors = error.data.errors
                if (errors) {
                    formik.setErrors(errors)
                }
            } else {
                formik.setErrors({})
            }
        }
    }, [error, isError]);

    useEffect(() => {
        if (isSuccess) {
            formik.resetForm()
            onClose()
        }
    }, [isSuccess]);

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
                        <Heading as="h2" size="lg">{t('modal.createAccount')}</Heading>
                    </ModalHeader>
                    <ModalBody>
                        <form id="createAccountForm" onSubmit={formik.handleSubmit}>
                            <Stack spacing={3}>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                                >
                                    <Input
                                        placeholder={t('form.placeholder.name')}
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
                                    isInvalid={formik.touched.bank && Boolean(formik.errors.bank)}
                                >
                                    <Input
                                        placeholder={t('form.placeholder.bank')}
                                        id="bank"
                                        name="bank"
                                        value={formik.values.bank}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.bank}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.currency_id && Boolean(formik.errors.currency_id)}
                                >
                                    <CurrencySelect
                                        id="currency_id"
                                        name="currency_id"
                                        value={formik.values.currency_id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.currency_id}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.balance && Boolean(formik.errors.balance)}
                                >
                                    <Input
                                        placeholder={t('form.placeholder.balance')}
                                        id="balance"
                                        name="balance"
                                        type="number"
                                        value={formik.values.balance}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.balance}</FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap="3">
                            <Button colorScheme="blue" type="submit" form="createAccountForm">
                                {t('form.submit')}
                            </Button>
                            <Button onClick={onClose}>{t('form.cancel')}</Button>
                        </Flex>
                    </ModalFooter>
                </Box>
            </ModalContent>
        </Modal>
    );
}

export default CreateAccountModal
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
import i18next from "i18next";
import {IAccount, IAccountCreateUpdateRequest} from "../../models/account.model.ts";
import CurrencySelect from "../selects/CurrencySelect.tsx";
import {useUpdateAccount} from "../../api/endpoints/account/account.api.ts";
import {useMutateWithFormik} from "../../hooks/useMutateWithFormik.ts";
import PrecisionFloatInput from "../inputs/PrecisionFloatInput.tsx";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    account: IAccount
}

const validationSchema = yup.object({
    name: yup.string()
        .required(i18next.t('form.validation.required')),
    bank: yup.string()
        .required(i18next.t('form.validation.required')),
    currency_id: yup.number()
        .required(i18next.t('form.validation.required')),
    balance: yup.string()
        .required(i18next.t('form.validation.required')),
});

const UpdateAccountModal = ({isOpen, onClose, account}: Props) => {
    const {t} = useTranslation()

    const {formik, isPending} = useMutateWithFormik<IAccountCreateUpdateRequest>({
        mutation: useUpdateAccount,
        validationSchema: validationSchema,
        initialValues: {
            name: account.name,
            bank: account.bank,
            currency_id: account.currency.id,
            balance: account.balance
        },
        onSuccess: onClose,
        prepareSubmitData: (values) => {
            return {
                id: account.id,
                data: values
            }
        }
    })

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
                        <Heading as="h2" size="lg">{t('title.updateAccount')}</Heading>
                    </ModalHeader>
                    <ModalBody>
                        <form id={`updateAccountForm_${account.id}`} onSubmit={formik.handleSubmit}>
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
                                    <PrecisionFloatInput
                                        placeholder={t('form.placeholder.balance')}
                                        id="balance"
                                        name="balance"
                                        value={formik.values.balance}
                                        setFieldValue={formik.setFieldValue}
                                        onBlur={formik.handleBlur}
                                        precision={2}
                                    />
                                    <FormErrorMessage>{formik.errors.balance}</FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap="3">
                            <Button isLoading={isPending} colorScheme="blue" type="submit"
                                    form={`updateAccountForm_${account.id}`}>
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

export default UpdateAccountModal;
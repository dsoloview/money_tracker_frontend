import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    Spinner,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import {UpDownIcon} from "@chakra-ui/icons";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import {ITransferRequest} from "@/models/transfer.model.ts";
import AccountSelect from "@/widgets/selects/AccountSelect.tsx";
import {useMutateWithFormik} from "@/hooks/useMutateWithFormik.ts";
import {Suspense} from "react";
import PrecisionFloatInput from "@/widgets/inputs/PrecisionFloatInput.tsx";
import i18next from "@/tools/language/language.ts";
import {useCreateAccountTransfer} from "@/api/endpoints/account/accountTransfer/accountTransfer.api.ts";
import {getCurrenctDateTimeForInput} from "@/tools/date/date.helper.ts";

const validationSchema = yup.object({
    comment: yup.string()
        .required(i18next.t('form.validation.required')),
    amount_from: yup.string()
        .required(i18next.t('form.validation.required')),
    amount_to: yup.string()
        .required(i18next.t('form.validation.required')),
    account_from_id: yup.number()
        .required(i18next.t('form.validation.required')),
    account_to_id: yup.number()
        .required(i18next.t('form.validation.required')),
    date: yup.date()
        .required(i18next.t('form.validation.required')),
});


const CreateTransferGroup = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {t} = useTranslation();
    const {formik, isPending} = useMutateWithFormik<ITransferRequest>({
        mutation: useCreateAccountTransfer,
        initialValues: {
            comment: "",
            account_from_id: 0,
            account_to_id: 0,
            amount_from: 0,
            amount_to: 0,
            date: getCurrenctDateTimeForInput()
        },
        validationSchema: validationSchema,
        onSuccess: onClose,
        prepareSubmitData: (values) => {
            return {
                id: values.account_from_id,
                data: values
            }
        }
    });

    return (
        <>
            <Button
                position="fixed"
                bottom="100px"
                right="50px"
                onClick={onOpen}
                size="lg"
                colorScheme="teal"
                rounded="full"
            >
                <UpDownIcon/>
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size="md"
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton/>
                        <DrawerHeader>{t('title.createTransfer')}</DrawerHeader>
                        <DrawerBody>
                            <form id="createTransferForm" onSubmit={formik.handleSubmit}>
                                <Stack spacing={3}>
                                    <FormControl
                                        isInvalid={formik.touched.comment && Boolean(formik.errors.comment)}
                                    >
                                        <FormLabel htmlFor="comment">{t('form.label.comment')}</FormLabel>
                                        <Input
                                            placeholder={t('form.placeholder.comment')}
                                            id="comment"
                                            name="comment"
                                            value={formik.values.comment}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isRequired
                                        isInvalid={formik.touched.account_from_id && Boolean(formik.errors.account_from_id)}
                                    >
                                        <FormLabel htmlFor="account_from_id">{t('form.label.accountFrom')}</FormLabel>
                                        <Suspense fallback={<Spinner/>}>
                                            <AccountSelect
                                                id="account_from_id"
                                                name="account_from_id"
                                                onBlur={formik.handleBlur}
                                                setFieldValue={formik.setFieldValue}
                                            />
                                        </Suspense>
                                        <FormErrorMessage>{formik.errors.account_from_id}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isRequired
                                        isInvalid={formik.touched.amount_from && Boolean(formik.errors.amount_from)}
                                    >
                                        <FormLabel htmlFor="amount_from">{t('form.label.amountFrom')}</FormLabel>
                                        <InputGroup>
                                            <PrecisionFloatInput
                                                placeholder={t('form.placeholder.amountFrom')}
                                                id="amount_from"
                                                name="amount_from"
                                                value={formik.values.amount_from}
                                                setFieldValue={formik.setFieldValue}
                                                onBlur={formik.handleBlur}
                                                precision={2}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{formik.errors.amount_from}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isRequired
                                        isInvalid={formik.touched.account_to_id && Boolean(formik.errors.account_to_id)}
                                    >
                                        <FormLabel htmlFor="account_to_id">{t('form.label.accountTo')}</FormLabel>
                                        <Suspense fallback={<Spinner/>}>
                                            <AccountSelect
                                                id="account_to_id"
                                                name="account_to_id"
                                                onBlur={formik.handleBlur}
                                                setFieldValue={formik.setFieldValue}
                                            />
                                        </Suspense>
                                        <FormErrorMessage>{formik.errors.account_to_id}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isRequired
                                        isInvalid={formik.touched.amount_to && Boolean(formik.errors.amount_to)}
                                    >
                                        <FormLabel htmlFor="amount_to">{t('form.label.amountTo')}</FormLabel>
                                        <InputGroup>
                                            <PrecisionFloatInput
                                                placeholder={t('form.placeholder.amountTo')}
                                                id="amount_to"
                                                name="amount_to"
                                                value={formik.values.amount_to}
                                                setFieldValue={formik.setFieldValue}
                                                onBlur={formik.handleBlur}
                                                precision={2}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{formik.errors.amount_to}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isRequired
                                        isInvalid={formik.touched.date && Boolean(formik.errors.date)}
                                    >
                                        <FormLabel htmlFor="date">{t('form.label.date')}</FormLabel>
                                        <InputGroup>
                                            <Input
                                                placeholder={t('form.placeholder.date')}
                                                id="date"
                                                name="date"
                                                type="datetime-local"
                                                value={formik.values.date}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
                                    </FormControl>
                                </Stack>
                            </form>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button
                                isLoading={isPending}
                                type="submit"
                                form="createTransferForm"
                                colorScheme="blue"
                                mr={3}
                            >
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default CreateTransferGroup;
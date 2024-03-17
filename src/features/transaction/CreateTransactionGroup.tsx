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
import {AddIcon} from "@chakra-ui/icons";
import * as yup from "yup";
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import {ITransactionRequest} from "../../models/transaction.model.ts";
import CategoryTransactionTypeRadio from "../../widgets/radio/CategoryTransactionTypeRadio.tsx";
import AccountSelect from "../../widgets/selects/AccountSelect.tsx";
import CategorySelect from "../../widgets/selects/CategorySelect.tsx";
import {useCreateAccountTransaction} from "../../api/endpoints/account/accountTransaction/accountTransaction.api.ts";
import {useMutateWithFormik} from "../../hooks/useMutateWithFormik.ts";
import {Suspense} from "react";
import {CategoryTransactionType} from "../../models/category.model.ts";
import PrecisionFloatInput from "../../widgets/inputs/PrecisionFloatInput.tsx";
import {getCurrenctDateTimeForInput} from "../../tools/date/date.helper.ts";

const validationSchema = yup.object({
    comment: yup.string()
        .required(i18next.t('form.validation.required')),
    amount: yup.string()
        .required(i18next.t('form.validation.required')),
    type: yup.string()
        .required(i18next.t('form.validation.required')),
    account_id: yup.number()
        .required(i18next.t('form.validation.required')),
    date: yup.date()
        .required(i18next.t('form.validation.required')),
    categories_ids: yup.array()
        .required(i18next.t('form.validation.required'))
        .min(1),
});


const CreateTransactionGroup = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {t} = useTranslation();
    const {formik, isPending} = useMutateWithFormik<ITransactionRequest>({
        mutation: useCreateAccountTransaction,
        initialValues: {
            comment: "",
            amount: 0,
            type: CategoryTransactionType.EXPENSE,
            account_id: 0,
            date: getCurrenctDateTimeForInput(),
            categories_ids: []
        },
        validationSchema: validationSchema,
        onSuccess: onClose,
        prepareSubmitData: (values) => {
            return {
                id: values.account_id,
                data: values
            }
        }
    });

    console.log(formik.values)

    const handleChangeType = (nextValue: string) => {
        formik.values.categories_ids = [];
        formik.setFieldValue('type', nextValue);
    }

    return (
        <>
            <Button
                position="fixed"
                bottom="50px"
                right="50px"
                onClick={onOpen}
                size="lg"
                colorScheme="teal"
                rounded="full"
            >
                <AddIcon/>
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
                        <DrawerHeader>Create Transaction</DrawerHeader>
                        <DrawerBody>
                            <form id="createTransactionForm" onSubmit={formik.handleSubmit}>
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
                                        isInvalid={formik.touched.amount && Boolean(formik.errors.amount)}
                                    >
                                        <FormLabel htmlFor="amount">{t('form.label.amount')}</FormLabel>
                                        <InputGroup>
                                            <PrecisionFloatInput
                                                placeholder={t('form.placeholder.amount')}
                                                id="amount"
                                                name="amount"
                                                value={formik.values.amount}
                                                setFieldValue={formik.setFieldValue}
                                                onBlur={formik.handleBlur}
                                                precision={2}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{formik.errors.amount}</FormErrorMessage>
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
                                    <FormControl
                                        isRequired
                                        isInvalid={formik.touched.account_id && Boolean(formik.errors.account_id)}
                                    >
                                        <FormLabel htmlFor="account_id">{t('form.label.account')}</FormLabel>
                                        <Suspense fallback={<Spinner/>}>
                                            <AccountSelect
                                                id="account_id"
                                                name="account_id"
                                                onBlur={formik.handleBlur}
                                                setFieldValue={formik.setFieldValue}
                                            />
                                        </Suspense>
                                        <FormErrorMessage>{formik.errors.account_id}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isRequired
                                        isInvalid={formik.touched.categories_ids && Boolean(formik.errors.categories_ids)}
                                    >
                                        <FormLabel htmlFor="categories_ids">{t('form.label.categories')}</FormLabel>
                                        <Suspense fallback={<Spinner/>}>
                                            <CategorySelect
                                                type={formik.values.type}
                                                values={formik.values.categories_ids}
                                                id="categories_ids"
                                                name="categories_ids"
                                                onBlur={formik.handleBlur}
                                                setFieldValue={formik.setFieldValue}
                                            />
                                        </Suspense>
                                        <FormErrorMessage>{formik.errors.categories_ids}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isRequired
                                        isInvalid={formik.touched.type && Boolean(formik.errors.type)}
                                    >
                                        <FormLabel htmlFor="type">{t('form.label.type')}</FormLabel>
                                        <CategoryTransactionTypeRadio
                                            id="type"
                                            name="type"
                                            value={formik.values.type}
                                            onChange={handleChangeType}
                                            defaultValue={CategoryTransactionType.EXPENSE}
                                        />
                                        <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
                                    </FormControl>
                                </Stack>
                            </form>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button
                                isLoading={isPending}
                                type="submit"
                                form="createTransactionForm"
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

export default CreateTransactionGroup;
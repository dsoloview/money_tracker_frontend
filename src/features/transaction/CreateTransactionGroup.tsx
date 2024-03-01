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
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import * as yup from "yup";
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import {ITransactionRequest} from "../../models/transaction.model.ts";
import {CategoryTransactionType} from "../../models/category.model.ts";
import CategoryTransactionTypeRadio from "../../widgets/radio/CategoryTransactionTypeRadio.tsx";
import AccountSelect from "../../widgets/selects/AccountSelect.tsx";
import CategorySelect from "../../widgets/selects/CategorySelect.tsx";
import {useCreateAccountTransaction} from "../../api/endpoints/account/accountTransaction/accountTransaction.api.ts";
import {useEffect} from "react";
import {isIValidationErrorResponse} from "../../tools/errors/errors.tools.ts";

const validationSchema = yup.object({
    comment: yup.string()
        .required(i18next.t('form.validation.required')),
    amount: yup.number()
        .required(i18next.t('form.validation.required'))
        .min(1),
    type: yup.string()
        .required(i18next.t('form.validation.required')),
    account_id: yup.number()
        .required(i18next.t('form.validation.required')),
    categories_ids: yup.array()
        .required(i18next.t('form.validation.required'))
        .min(1),
});


const CreateTransactionGroup = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {t} = useTranslation();
    const {mutate, isError, error, isSuccess} = useCreateAccountTransaction();
    const formik = useFormik<ITransactionRequest>({
        initialValues: {
            account_id: 0,
            comment: '',
            amount: 0,
            categories_ids: [],
            type: CategoryTransactionType.EXPENSE,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            mutate({
                id: values.account_id,
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

    const handleChangeType = (e) => {
        formik.values.categories_ids = [];
        formik.setFieldValue('type', e.target.value);
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
                                            <Input
                                                placeholder={t('form.placeholder.amount')}
                                                id="amount"
                                                name="amount"
                                                type="number"
                                                value={formik.values.amount}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{formik.errors.amount}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isRequired
                                        isInvalid={formik.touched.account_id && Boolean(formik.errors.account_id)}
                                    >
                                        <FormLabel htmlFor="account_id">{t('form.label.account')}</FormLabel>
                                        <AccountSelect
                                            id="account_id"
                                            name="account_id"
                                            onBlur={formik.handleBlur}
                                            setFieldValue={formik.setFieldValue}
                                        />
                                        <FormErrorMessage>{formik.errors.account_id}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isRequired
                                        isInvalid={formik.touched.categories_ids && Boolean(formik.errors.categories_ids)}
                                    >
                                        <FormLabel htmlFor="categories_ids">{t('form.label.categories')}</FormLabel>
                                        <CategorySelect
                                            type={formik.values.type}
                                            values={formik.values.categories_ids}
                                            id="categories_ids"
                                            name="categories_ids"
                                            onBlur={formik.handleBlur}
                                            setFieldValue={formik.setFieldValue}
                                        />
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
                                            onBlur={formik.handleBlur}
                                        />
                                        <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
                                    </FormControl>
                                </Stack>
                            </form>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button
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
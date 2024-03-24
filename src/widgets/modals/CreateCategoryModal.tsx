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
import * as yup from "yup";
import {useMutateWithFormik} from "../../hooks/useMutateWithFormik.ts";
import i18next from '../../tools/language/language.ts';
import {CategoryTransactionType, ICategory, ICategoryCreateRequest} from "../../models/category.model.ts";
import {useCreateUserCategory} from "../../api/endpoints/user/category/userCategory.api.ts";
import CategoryTransactionTypeRadio from "../radio/CategoryTransactionTypeRadio.tsx";
import useUserState from "../../hooks/useUserState.ts";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    parentCategory?: ICategory;
}

const validationSchema = yup.object({
    name: yup.string()
        .required(i18next.t('form.validation.required')),
    type: yup.string()
        .required(i18next.t('form.validation.required')),
    description: yup.string(),
    parent_category_id: yup.number()
        .nullable()
        .transform((value, originalValue) => originalValue === '' ? null : value),
});

const CreateCategoryModal = ({isOpen, onClose, parentCategory}: Props) => {
    const user = useUserState();
    const {t} = useTranslation()
    const {formik, isPending} = useMutateWithFormik<ICategoryCreateRequest>({
        mutation: useCreateUserCategory,
        validationSchema: validationSchema,
        initialValues: {
            name: '',
            icon: '',
            type: parentCategory?.type || CategoryTransactionType.EXPENSE,
            description: '',
            parent_category_id: parentCategory?.id
        },
        onSuccess: onClose,
        prepareSubmitData: (values) => {
            return {
                id: user.id,
                data: values
            }
        }
    })

    const handleChangeType = (nextValue: string) => {
        formik.setFieldValue('type', nextValue);
    }

    console.log(formik.values)

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
                        <Heading as="h2" size="lg">{t('title.createCategory')}</Heading>
                    </ModalHeader>
                    <ModalBody>
                        <form id="createCategoryForm" onSubmit={formik.handleSubmit}>
                            <Stack spacing={3}>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                                >
                                    <FormLabel htmlFor="type">{t('form.label.name')}</FormLabel>
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
                                    isInvalid={formik.touched.type && Boolean(formik.errors.type)}
                                    isDisabled={Boolean(parentCategory)}
                                >
                                    <FormLabel htmlFor="type">{t('form.label.type')}</FormLabel>
                                    <CategoryTransactionTypeRadio
                                        id="type"
                                        name="type"
                                        value={formik.values.type}
                                        onChange={handleChangeType}
                                        defaultValue={formik.values.type}
                                    />
                                    <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={formik.touched.description && Boolean(formik.errors.description)}
                                >
                                    <FormLabel htmlFor="type">{t('form.label.description')}</FormLabel>
                                    <Input
                                        placeholder={t('form.placeholder.description')}
                                        id="description"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap="3">
                            <Button isLoading={isPending} colorScheme="blue" type="submit" form="createCategoryForm">
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

export default CreateCategoryModal;
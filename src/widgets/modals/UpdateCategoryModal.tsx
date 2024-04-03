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
import {CategoryTransactionType, ICategory, ICategoryRequest} from "../../models/category.model.ts";
import CategoryTransactionTypeRadio from "../radio/CategoryTransactionTypeRadio.tsx";
import IconSelect from "../selects/IconSelect.tsx";
import {useUpdateCategory} from "../../api/endpoints/category/category.api.ts";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    category: ICategory;
}

const validationSchema = yup.object({
    name: yup.string()
        .required(i18next.t('form.validation.required')),
    type: yup.string()
        .required(i18next.t('form.validation.required')),
    description: yup.string(),
    icon_id: yup.number().nullable(),
    parent_category_id: yup.number()
        .nullable()
        .transform((value, originalValue) => originalValue === '' ? null : value),
});

const UpdateCategoryModal = ({isOpen, onClose, category}: Props) => {
    const {t} = useTranslation()
    const {formik, isPending} = useMutateWithFormik<ICategoryRequest>({
        mutation: useUpdateCategory,
        validationSchema: validationSchema,
        initialValues: {
            name: category.name,
            icon_id: category?.icon?.id || undefined,
            type: category.type || CategoryTransactionType.EXPENSE,
            description: category.description || '',
            parent_category_id: category?.parent_category?.id
        },
        onSuccess: onClose,
        prepareSubmitData: (values) => {
            return {
                id: category.id,
                data: values
            }
        }
    })

    console.log(formik.values)
    const handleChangeType = (nextValue: string) => {
        formik.setFieldValue('type', nextValue);
    }

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
                        <Heading as="h2" size="lg">{t('title.updateCategory')}</Heading>
                    </ModalHeader>
                    <ModalBody>
                        <form id="updateCategoryForm" onSubmit={formik.handleSubmit}>
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
                                    isDisabled={Boolean(category.parent_category)}
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
                                <FormControl
                                    isInvalid={formik.touched.description && Boolean(formik.errors.description)}
                                >
                                    <FormLabel htmlFor="type">{t('form.label.icon')}</FormLabel>
                                    <IconSelect
                                        id="icon_id"
                                        name="icon_id"
                                        onBlur={formik.handleBlur}
                                        setFieldValue={formik.setFieldValue}
                                        defaultValue={category?.icon?.id}
                                    />
                                    <FormErrorMessage>{formik.errors.icon_id}</FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap="3">
                            <Button isLoading={isPending} colorScheme="blue" type="submit" form="updateCategoryForm">
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

export default UpdateCategoryModal;
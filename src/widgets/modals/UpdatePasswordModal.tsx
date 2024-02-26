import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
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
import {IUpdatePasswordRequest} from "../../models/request.model.ts";
import {isIValidationErrorResponse} from "../../tools/errors/errors.tools.ts";
import i18next from "i18next";
import {useEffect, useState} from "react";
import useAuthStore from "../../stores/authStore.ts";
import {useUpdatePassword} from "../../api/endpoints/user/user.api.ts";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const validationSchema = yup.object({
    current_password: yup
        .string()
        .required(i18next.t('form.validation.required')),
    password: yup.string()
        .required(i18next.t('form.validation.required'))
        .min(8, i18next.t('form.validation.minLength', {count: 8})),
    password_confirmation: yup.string()
        .required(i18next.t('form.validation.required'))
        .oneOf([yup.ref('password')], i18next.t('form.validation.confirmPassword')),
});

const UpdatePasswordModal = ({isOpen, onClose}: Props) => {
    const authData = useAuthStore(state => state.authData);
    const {mutate, isError, error, isSuccess} = useUpdatePassword()
    const {t} = useTranslation()
    const formik = useFormik<IUpdatePasswordRequest>({
        initialValues: {
            current_password: '',
            password: '',
            password_confirmation: ''
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
    const [showPassword, setShowPassword] = useState(false)

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
                        <Heading as="h2" size="lg">{t('button.update_password')}</Heading>
                    </ModalHeader>
                    <ModalBody>
                        <form id="updatePasswordForm" onSubmit={formik.handleSubmit}>
                            <Stack spacing={3}>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.current_password && Boolean(formik.errors.current_password)}
                                >
                                    <Input
                                        placeholder={t('form.placeholder.current_password')}
                                        id="current_password"
                                        name="current_password"
                                        type="password"
                                        value={formik.values.current_password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.current_password}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                                >
                                    <InputGroup>
                                        <Input
                                            placeholder={t('form.placeholder.password')}
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm"
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                                >
                                    <Input
                                        placeholder={t('form.placeholder.password_confirmation')}
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={formik.values.password_confirmation}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                    <FormErrorMessage>{formik.errors.password_confirmation}</FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap="3">
                            <Button colorScheme="blue" type="submit" form="updatePasswordForm">
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

export default UpdatePasswordModal;
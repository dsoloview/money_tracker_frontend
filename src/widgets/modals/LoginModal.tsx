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
import {useLogin} from "../../api/endpoints/auth/auth.api.ts";
import {ILoginData} from "../../models/request.model.ts";
import i18next from "i18next";
import {useMutateWithFormik} from "../../hooks/useMutateWithFormik.ts";
import {useState} from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const validationSchema = yup.object({
    email: yup.string()
        .email(i18next.t('form.validation.email'))
        .required(i18next.t('form.validation.required')),
    password: yup.string()
        .min(8, i18next.t('form.validation.minLength', {count: 8}))
        .required(i18next.t('form.validation.required')),
});

const LoginModal = ({isOpen, onClose}: Props) => {
    const {t} = useTranslation()
    const [showPassword, setShowPassword] = useState(false)

    const {formik} = useMutateWithFormik<ILoginData>({
        mutation: useLogin,
        initialValues: {
            email: "",
            password: ""
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
                        <Heading as="h2" size="lg">{t('auth.login')}</Heading>
                    </ModalHeader>
                    <ModalBody>
                        <form id="loginForm" onSubmit={formik.handleSubmit}>
                            <Stack spacing={3}>
                                <FormControl
                                    isRequired
                                    isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                                >
                                    <Input
                                        autoFocus
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
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap="3">
                            <Button colorScheme="blue" type="submit" form="loginForm">
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

export default LoginModal;
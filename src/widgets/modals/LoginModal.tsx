import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import * as yup from "yup";
import {useLogin} from "../../api/endpoints/auth/auth.api.ts";
import {useFormik} from "formik";
import {ILoginData} from "../../models/request.model.ts";
import {isIValidationErrorResponse} from "../../tools/errors/errors.tools.ts";
import {Navigate} from "@tanstack/react-router";
import i18next from "i18next";
type Props = {
    isOpen: boolean;
    onOpenChange: (value: boolean) => void;
}

const validationSchema = yup.object({
    email: yup.string()
        .email(i18next.t('form.validation.email'))
        .required(i18next.t('form.validation.required')),
    password: yup.string()
        .required(i18next.t('form.validation.required')),
});

const LoginModal = ({isOpen, onOpenChange}: Props) => {
    const {mutate, isSuccess, isError, error} = useLogin()
    const {t} = useTranslation()
    const formik = useFormik<ILoginData>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            mutate(values)
        },
    })

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

    if (isSuccess) {
        return <Navigate to="/account" />
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            motionProps={
                {
                    initial: {opacity: 0, y: -20},
                    animate: {opacity: 1, y: 0},
                    exit: {opacity: 0, y: -20},
                }
            }
        >
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader>{t('auth.login')}</ModalHeader>
                        <ModalBody>
                            <form className="flex flex-col gap-3" id="loginForm" onSubmit={formik.handleSubmit}>
                                <Input
                                    autoFocus
                                    label={t('form.email')}
                                    placeholder="Enter your email"
                                    id="email"
                                    name="email"
                                    variant="bordered"
                                    isRequired
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                                    errorMessage={formik.errors.email}
                                />
                                <Input
                                    label={t('form.password')}
                                    placeholder="Enter your password"
                                    id="password"
                                    name="password"
                                    variant="bordered"
                                    type="password"
                                    isRequired
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                                    errorMessage={formik.errors.password}
                                />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                {t('button.close')}
                            </Button>
                            <Button type="submit" form="loginForm" color="primary">
                                {t('form.submit')}
                            </Button>
                        </ModalFooter>
                    </>
                )}

            </ModalContent>
        </Modal>
    );
}

export default LoginModal;
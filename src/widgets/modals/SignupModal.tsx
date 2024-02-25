import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import {useRegister} from "../../api/endpoints/auth/auth.api.ts";
import {useFormik} from "formik";
import {IRegisterData} from "../../models/request.model.ts";
import {isIValidationErrorResponse} from "../../tools/errors/errors.tools.ts";
import CurrencySelect from "../selects/CurrencySelect.tsx";
import LanguageSelect from "../selects/LanguageSelect.tsx";
import * as yup from "yup";
import {ref} from "yup";
import i18next from "i18next";

const validationSchema = yup.object({
    name: yup.string()
        .required(i18next.t('form.validation.required'))
        .max(254, i18next.t('form.validation.maxLength', {count: 254})),
    email: yup.string()
        .email(i18next.t('form.validation.email'))
        .required(i18next.t('form.validation.required'))
        .max(254, i18next.t('form.validation.maxLength', {count: 254})),
    password: yup.string()
        .required(i18next.t('form.validation.required'))
        .min(8, i18next.t('form.validation.minLength', {count: 8}))
        .max(254, i18next.t('form.validation.maxLength', {count: 254})),
    password_confirmation: yup.string()
        .required(i18next.t('form.validation.required'))
        .oneOf([ref("password")], i18next.t('form.validation.confirmPassword')),
    settings: yup.object({
        main_currency_id: yup.number()
            .required(i18next.t('form.validation.required'))
            .integer('Must be an integer'),
        language_id: yup.number()
            .required(i18next.t('form.validation.required'))
            .integer('Must be an integer'),
    }),
});

type Props = {
    isOpen: boolean;
    onOpenChange: (value: boolean) => void;
}
const SignupModal = ({isOpen, onOpenChange}: Props) => {
    const {mutate, isError, error} = useRegister()
    const {t} = useTranslation()
    const formik = useFormik<IRegisterData>({
        initialValues: {
            email: '',
            name: '',
            password: '',
            password_confirmation: '',
            settings: {
                language_id: 1,
                main_currency_id: 1,
            }
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
                        <ModalHeader>{t('auth.register')}</ModalHeader>
                        <ModalBody>
                            <form className="flex flex-col gap-3" id="registerForm" onSubmit={formik.handleSubmit}>
                                <Input
                                    label={t('form.name')}
                                    placeholder="Enter your name"
                                    id="name"
                                    name="name"
                                    variant="bordered"
                                    isRequired
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                                    errorMessage={formik.errors.name}
                                />
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
                                <Input
                                    label={t('form.confirmPassword')}
                                    placeholder="Confirm your password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    variant="bordered"
                                    type="password"
                                    isRequired
                                    value={formik.values.password_confirmation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                                    errorMessage={formik.errors.password_confirmation}
                                />
                                <CurrencySelect
                                    label={t('model.currency')}
                                    id="main_currency_id"
                                    name="settings.main_currency_id"
                                    value={formik.values.settings.main_currency_id.toString()}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    hasError={formik.touched.settings?.main_currency_id && Boolean(formik.errors.settings?.main_currency_id)}
                                    errorMessage={formik.errors.settings?.main_currency_id}
                                    required
                                />
                                <LanguageSelect
                                    label={t('model.language')}
                                    id="language_id"
                                    name="settings.language_id"
                                    value={formik.values.settings.language_id.toString()}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    hasError={formik.touched.settings?.language_id && Boolean(formik.errors.settings?.language_id)}
                                    errorMessage={formik.errors.settings?.language_id}
                                    required
                                />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                {t('button.close')}
                            </Button>
                            <Button color="primary" type="submit" form="registerForm">
                                {t('auth.register')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default SignupModal;
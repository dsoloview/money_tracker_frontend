import {Input} from "@nextui-org/react";
import {useFormik} from "formik";
import * as yup from "yup";
import {useRegister} from "../../api/endpoints/auth/auth.api.ts";
import {useEffect} from "react";
import {isIValidationErrorResponse} from "../../tools/errors/errors.tools.ts";
import {useTranslation} from "react-i18next";
import {IRegisterData} from "../../models/request.model.ts";
import {ref} from "yup";
import CurrencySelect from "../selects/CurrencySelect.tsx";
import LanguageSelect from "../selects/LanguageSelect.tsx";

const validationSchema = yup.object({
    name: yup.string().required('Required').max(254),
    email: yup.string().email('Invalid email address').required('Required').max(254),
    password: yup.string().required('Required').min(8).max(254),
    password_confirmation: yup.string().required('Required').oneOf([ref("password")], "Passwords does not match"),
    settings: yup.object({
        main_currency_id: yup.number().required('Required').integer('Must be an integer'),
        language_id: yup.number().required('Required').integer('Must be an integer'),
    }),
});

type Props = {
    formId: string;
    onSubmit: () => void;
}

const RegisterForm = ({formId, onSubmit}: Props) => {
    const {mutate, isError, isSuccess, error} = useRegister()
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
            console.log(values)
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

    useEffect(() => {
        if (isSuccess) {
            onSubmit()
        }
    }, [isSuccess, onSubmit])

    return (
        <form className="flex flex-col gap-3" id={formId} onSubmit={formik.handleSubmit}>
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
    )
}

export default RegisterForm;
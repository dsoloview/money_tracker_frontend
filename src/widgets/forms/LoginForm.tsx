import {Input} from "@nextui-org/react";
import {useFormik} from "formik";
import * as yup from "yup";
import {useLogin} from "../../api/endpoints/auth/auth.api.ts";
import {useEffect} from "react";
import {isIValidationErrorResponse} from "../../tools/errors/errors.tools.ts";
import {useTranslation} from "react-i18next";
import {ILoginData} from "../../models/request.model.ts";

const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup.string().required('Required'),
});

type Props = {
    formId: string;
    onSubmit: () => void;
}

const LoginForm = ({formId, onSubmit}: Props) => {
    const {mutate, isError, isSuccess, error} = useLogin()
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

    useEffect(() => {
        if (isSuccess) {
            onSubmit()
        }
    }, [isSuccess, onSubmit])

    return (
        <form className="flex flex-col gap-3" id={formId} onSubmit={formik.handleSubmit}>
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
    )
}

export default LoginForm;
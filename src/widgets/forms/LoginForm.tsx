import {Input} from "@nextui-org/react";
import {useFormik} from "formik";
import * as yup from "yup";
import {useLogin} from "../../api/auth/auth.api.ts";
import {useNavigate} from "@tanstack/react-router";
import {useEffect} from "react";
import {isIValidationErrorResponse} from "../../tools/errors/errors.tools.ts";

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
    const navigate = useNavigate()

    const formik = useFormik({
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
            navigate({
                to: '/account/settings'
            })
        }
    }, [isSuccess, onSubmit, navigate])

    return (
        <form className="flex flex-col gap-3" id={formId} onSubmit={formik.handleSubmit}>
            <Input
                autoFocus
                label="Email"
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
                label="Password"
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
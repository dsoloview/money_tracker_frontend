import {FormikValues, useFormik} from "formik";
import {useEffect} from "react";
import {isIValidationErrorResponse} from "../tools/errors/errors.tools.ts";
import * as yup from "yup";
import {UseMutationResult} from "@tanstack/react-query";

type Props<T> = {
    mutation: () => UseMutationResult<any, any, any, any>;
    validationSchema: yup.ObjectSchema<any>;
    onSuccess: () => void;
    prepareSubmitData?: (values: T) => any;
    initialValues: T;

}
const useMutateWithFormik = <T extends FormikValues>(
    {
        mutation,
        validationSchema,
        onSuccess,
        prepareSubmitData,
        initialValues
    }: Props<T>
) => {
    const {mutate, error, isError, isSuccess} = mutation();

    const formik = useFormik<T>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            mutate(prepareSubmitData ? prepareSubmitData(values) : values)
        }
    });

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
            onSuccess()
        }
    }, [isSuccess]);

    return {formik};
}

export {useMutateWithFormik};
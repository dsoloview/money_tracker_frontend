import {useEffect} from "react";
import {isIValidationErrorResponse} from "../tools/errors/errors.tools.ts";
import * as yup from "yup";
import {UseMutationResult} from "@tanstack/react-query";
import {DefaultValues, FieldValues, Path, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {IValidationErrorResponse} from "@/models/response.model.ts";

type Props<T> = {
    mutation: () => UseMutationResult<any, any, any, any>;
    validationSchema: yup.ObjectSchema<any>;
    onSuccess?: () => void;
    prepareSubmitData?: (values: T) => any;
    initialValues: T;
    resetOnSuccess?: boolean;
}

const useMutateWithForm = <T extends FieldValues>(
    {
        mutation,
        validationSchema,
        onSuccess,
        prepareSubmitData,
        initialValues,
        resetOnSuccess = true
    }: Props<T>
) => {
    const {mutate, isPending, error, isError, isSuccess} = mutation();

    const form = useForm<T>({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues as DefaultValues<T>,
    });

    const onSubmit = (values: T) => {
        if (prepareSubmitData) {
            mutate(prepareSubmitData(values))
            return;
        }
        mutate(values)
    }


    useEffect(() => {
        if (isError && error) {
            if (isIValidationErrorResponse(error.data)) {
                const errors = error.data as IValidationErrorResponse<T>
                if (errors) {
                    Object.keys(errors.errors).forEach((key) => {
                        form.setError(key as Path<T>, {
                            type: 'manual',
                            message: errors.errors[key as keyof T] as string
                        })
                    });
                }
            } else {
                form.clearErrors()
            }
        }
    }, [error, isError]);

    useEffect(() => {
        if (isSuccess) {
            if (resetOnSuccess) {
                form.reset()
            }
            if (onSuccess) {
                onSuccess()
            }
        }
    }, [isSuccess]);

    return {form, isPending, onSubmit};
}

export {useMutateWithForm};
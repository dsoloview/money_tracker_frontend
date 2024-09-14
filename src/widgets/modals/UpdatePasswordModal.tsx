import {useTranslation} from "react-i18next";
import * as yup from "yup";
import {IUpdatePasswordRequest} from "@/models/request.model.ts";
import useAuthStore from "@/stores/authStore.ts";
import {useUpdatePassword} from "@/api/endpoints/user/user.api.ts";
import i18next from '@/tools/language/language.ts';
import {useMutateWithForm} from "@/hooks/form/useMutateWithForm.ts";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/ui/form.tsx";
import {Input} from "@/ui/input.tsx";
import {Button} from "@/ui/button.tsx";
import PasswordInput from "@/widgets/inputs/PasswordInput.tsx";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
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

const UpdatePasswordModal = ({isOpen, setIsOpen}: Props) => {
    const authData = useAuthStore(state => state.authData);
    const {t} = useTranslation()

    const {form, onSubmit, isPending} = useMutateWithForm<IUpdatePasswordRequest>({
        mutation: useUpdatePassword,
        validationSchema: validationSchema,
        initialValues: {
            current_password: "",
            password: "",
            password_confirmation: ""
        },
        onSuccess: () => {
            setIsOpen(false)
        },
        prepareSubmitData: (values) => {
            if (!authData?.user.id) return
            return {
                id: authData.user.id,
                data: values
            }
        }
    })


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <div className="p-5">
                    <DialogHeader>
                        <DialogTitle>{t('button.update_password')}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form id="updatePasswordForm" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col space-y-3">
                                <FormField
                                    control={form.control}
                                    name="current_password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.current_password')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoFocus
                                                    placeholder={t('form.placeholder.current_password')}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.password')}</FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    placeholder={t('form.placeholder.password')}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password_confirmation"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.confirmPassword')}</FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    placeholder={t('form.placeholder.password_confirmation')}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                    <DialogFooter>
                        <div className="flex gap-3 mt-5">
                            <Button isLoading={isPending} type="submit" form="updatePasswordForm">
                                {t('form.submit')}
                            </Button>
                            <DialogClose>
                                <Button variant="red">{t('button.close')}</Button>
                            </DialogClose>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UpdatePasswordModal;
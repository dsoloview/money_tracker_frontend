import {useTranslation} from "react-i18next";
import * as yup from "yup";
import {useLogin} from "@/api/endpoints/auth/auth.api.ts";
import {ILoginData} from "@/models/request.model.ts";
import i18next from '@/tools/language/language.ts';
import {Button} from '@/ui/button.tsx';
import {useMutateWithForm} from "@/hooks/form/useMutateWithForm.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/ui/form.tsx";
import {Input} from "@/ui/input.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/ui/dialog.tsx";
import PasswordInput from "@/widgets/inputs/PasswordInput.tsx";

const validationSchema = yup.object({
    email: yup.string()
        .email(i18next.t('form.validation.email'))
        .required(i18next.t('form.validation.required')),
    password: yup.string()
        .min(8, i18next.t('form.validation.minLength', {count: 8}))
        .required(i18next.t('form.validation.required')),
});

const LoginModal = () => {
    const {t} = useTranslation()

    const {form, onSubmit, isPending} = useMutateWithForm<ILoginData>({
        mutation: useLogin,
        validationSchema: validationSchema,
        initialValues: {
            email: "",
            password: ""
        },

    })


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>{t('auth.login')}</Button>
            </DialogTrigger>
            <DialogContent>
                <div className="p-5">
                    <DialogHeader>
                        <DialogTitle>{t('auth.login')}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form className="mt-5 mb-5" id="loginForm" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col space-y-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.email')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoFocus
                                                    placeholder={t('form.placeholder.email')}
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
                            </div>
                        </form>
                    </Form>
                    <DialogFooter>
                        <div className="flex gap-3">
                            <Button isLoading={isPending} type="submit" form="loginForm">
                                {t('form.submit')}
                            </Button>
                            <DialogClose asChild>
                                <Button variant="red">
                                    {t('button.close')}
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default LoginModal;
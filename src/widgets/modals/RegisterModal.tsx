import {useTranslation} from "react-i18next";
import {useRegister} from "@/api/endpoints/auth/auth.api.ts";
import {IRegisterData} from "@/models/request.model.ts";
import * as yup from "yup";
import {ref} from "yup";
import i18next from '@/tools/language/language.ts';
import {useMutateWithForm} from "@/hooks/useMutateWithForm.ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/ui/dialog.tsx";
import {Button} from "@/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/ui/form.tsx";
import {Input} from "@/ui/input.tsx";
import CurrencySelect from "@/widgets/selects/CurrencySelect.tsx";
import LanguageSelect from "@/widgets/selects/LanguageSelect.tsx";

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

const RegisterModal = () => {
    const {t} = useTranslation()

    const {form, isPending, onSubmit} = useMutateWithForm<IRegisterData>({
        mutation: useRegister,
        validationSchema: validationSchema,
        initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            settings: {
                main_currency_id: "",
                language_id: ""
            }
        },
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>{t('auth.register')}</Button>
            </DialogTrigger>
            <DialogContent>
                <div className="p-5">
                    <DialogHeader>
                        <DialogTitle>{t('auth.register')}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form id="registerForm" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex  flex-col space-y-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.name')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoFocus
                                                    placeholder={t('form.placeholder.name')}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.email')}</FormLabel>
                                            <FormControl>
                                                <Input
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
                                                <Input
                                                    placeholder={t('form.placeholder.password')}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name="password_confirmation"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.confirmPassword')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={t('form.placeholder.password_confirmation')}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name="settings.main_currency_id"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.currency')}</FormLabel>
                                            <FormControl>
                                                <CurrencySelect
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name="settings.language_id"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.language')}</FormLabel>
                                            <FormControl>
                                                <LanguageSelect
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                            </div>
                        </form>
                    </Form>
                    <DialogFooter>
                        <div className="flex gap-3 mt-5">
                            <Button isLoading={isPending} type="submit" form="registerForm">
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

export default RegisterModal;